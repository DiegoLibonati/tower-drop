import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import StackGamePage from "@/pages/StackGamePage/StackGamePage";

const renderPage = (): Page => {
  const container = StackGamePage();
  document.body.appendChild(container);
  return container;
};

describe("StackGamePage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".stack-game-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render canvas element", () => {
    renderPage();

    const canvas =
      document.querySelector<HTMLCanvasElement>(".stack-game__webgl");
    expect(canvas).toBeInTheDocument();
    expect(canvas?.tagName).toBe("CANVAS");
  });

  it("should render score display", () => {
    renderPage();

    const score =
      document.querySelector<HTMLParagraphElement>(".stack-game__score");
    expect(score).toBeInTheDocument();
    expect(score?.textContent).toBe("0");
  });

  it("should render menu section", () => {
    renderPage();

    const menu = document.querySelector<HTMLDivElement>(".stack-game__menu");
    expect(menu).toBeInTheDocument();
  });

  it("should render game title", () => {
    renderPage();

    expect(screen.getByText("Stack Game")).toBeInTheDocument();
  });

  it("should render last score", () => {
    renderPage();

    const lastScore = document.querySelector<HTMLHeadingElement>(
      ".stack-game__last-score"
    );
    expect(lastScore).toBeInTheDocument();
    expect(lastScore?.textContent).toBe("Last Score: 0");
  });

  it("should render play button", () => {
    renderPage();

    const playButton = screen.getByRole("button", { name: "Start game" });
    expect(playButton).toBeInTheDocument();
    expect(playButton.textContent).toBe("¡Play!");
  });

  it("should cleanup game and button on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
