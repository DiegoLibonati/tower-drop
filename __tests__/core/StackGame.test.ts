import type { Page } from "@/types/pages";

import { StackGame } from "@/core/StackGame";

describe("StackGame", () => {
  let canvas: HTMLCanvasElement;
  let container: Page;
  let stackGame: StackGame;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    container = document.createElement("div") as Page;

    container.innerHTML = `
      <p class="stack-game__score">0</p>
      <div class="stack-game__menu" style="display: flex;"></div>
      <h3 class="stack-game__last-score">Last Score: 0</h3>
      <button class="stack-game__button">Play</button>
    `;

    document.body.appendChild(container);
    document.body.appendChild(canvas);
  });

  afterEach(() => {
    stackGame.dispose();
    document.body.innerHTML = "";
  });

  it("should initialize StackGame", () => {
    stackGame = new StackGame(canvas, container);

    expect(stackGame).toBeInstanceOf(StackGame);
    expect(stackGame.canvas).toBe(canvas);
  });

  it("should handle window resize event", () => {
    stackGame = new StackGame(canvas, container);

    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    window.dispatchEvent(new Event("resize"));

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: initialWidth,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: initialHeight,
    });

    expect(stackGame).toBeDefined();
  });

  it("should start game when play button is clicked", () => {
    stackGame = new StackGame(canvas, container);

    const playButton = container.querySelector<HTMLButtonElement>(
      ".stack-game__button"
    );
    const menu = container.querySelector<HTMLDivElement>(".stack-game__menu");
    const score =
      container.querySelector<HTMLParagraphElement>(".stack-game__score");

    playButton?.click();

    expect(menu?.style.display).toBe("none");
    expect(score?.style.display).toBe("block");
  });

  it("should not start game if already started", () => {
    stackGame = new StackGame(canvas, container);

    const playButton = container.querySelector<HTMLButtonElement>(
      ".stack-game__button"
    );

    playButton?.click();
    const menu = container.querySelector<HTMLDivElement>(".stack-game__menu");
    const firstMenuDisplay = menu?.style.display;

    playButton?.click();

    expect(menu?.style.display).toBe(firstMenuDisplay);
  });

  it("should cleanup resources on dispose", () => {
    stackGame = new StackGame(canvas, container);

    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    stackGame.dispose();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "click",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
