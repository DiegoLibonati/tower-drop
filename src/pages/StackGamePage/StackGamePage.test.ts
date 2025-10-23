import { screen } from "@testing-library/dom";

import { Button } from "@src/components/Button/Button";

import { StackGamePage } from "@src/pages/StackGamePage/StackGamePage";

import { StackGame } from "@src/core/StackGame";

type RenderComponent = {
  container: HTMLDivElement;
};

const renderComponent = (): RenderComponent => {
  const container = StackGamePage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/core/StackGame");
jest.mock("@src/components/Button/Button");

describe("StackGamePage.ts", () => {
  let mockButtonElement: HTMLButtonElement;

  beforeEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();

    mockButtonElement = document.createElement("button");
    mockButtonElement.id = "playbtn";
    mockButtonElement.className = "button stack-game__button";
    mockButtonElement.textContent = "¡Play!";

    (Button as jest.Mock).mockReturnValue(mockButtonElement);
  });

  describe("General Tests.", () => {
    test("It should render a div element with correct class", () => {
      const { container } = renderComponent();
      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toBe("stack-game-page");
    });

    test("It should render a canvas element with correct class", () => {
      const { container } = renderComponent();
      const canvas =
        container.querySelector<HTMLCanvasElement>(".stack-game__webgl");
      expect(canvas).toBeInTheDocument();
      expect(canvas).toBeInstanceOf(HTMLCanvasElement);
      expect(canvas?.className).toBe("stack-game__webgl");
    });

    test("It should render the main container with correct id", () => {
      renderComponent();
      const mainContainer =
        document.querySelector<HTMLDivElement>("#mainContainer");
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer?.className).toBe("stack-game__container");
    });

    test("It should render the score element with initial value 0", () => {
      renderComponent();
      const score =
        document.querySelector<HTMLHeadingElement>(".stack-game__score");
      expect(score).toBeInTheDocument();
      expect(score?.textContent).toBe("0");
    });

    test("It should render the menu wrapper", () => {
      renderComponent();
      const menuWrapper = document.querySelector<HTMLDivElement>(
        ".stack-game__menu-wrapper"
      );
      expect(menuWrapper).toBeInTheDocument();
    });

    test("It should render the title", () => {
      renderComponent();
      const title = screen.getByRole("heading", {
        level: 2,
        name: /stack game/i,
      });
      expect(title).toBeInTheDocument();
      expect(title.className).toBe("stack-game__title");
    });

    test("It should render the last score with initial value 0", () => {
      renderComponent();
      const lastScore = screen.getByRole("heading", {
        level: 3,
        name: /last score: 0/i,
      });
      expect(lastScore).toBeInTheDocument();
      expect(lastScore.className).toBe("stack-game__last-score");
    });
  });

  describe("Button Tests.", () => {
    test("It should create Button component with correct props", () => {
      renderComponent();
      expect(Button).toHaveBeenCalledTimes(1);
      expect(Button).toHaveBeenCalledWith({
        id: "playbtn",
        ariaLabel: "play button",
        className: "stack-game__button",
        children: "¡Play!",
      });
    });

    test("It should append the play button to menu wrapper", () => {
      renderComponent();
      const menuWrapper = document.querySelector<HTMLDivElement>(
        ".stack-game__menu-wrapper"
      );
      const playButton = document.querySelector<HTMLButtonElement>("#playbtn");

      expect(playButton).toBeInTheDocument();
      expect(menuWrapper).toContainElement(playButton);
    });
  });

  describe("StackGame Initialization Tests.", () => {
    test("It should initialize StackGame with canvas element", () => {
      const { container } = renderComponent();
      const canvas =
        container.querySelector<HTMLCanvasElement>(".stack-game__webgl");

      expect(StackGame).toHaveBeenCalledTimes(1);
      expect(StackGame).toHaveBeenCalledWith(canvas);
    });

    test("It should initialize StackGame after button is appended", () => {
      renderComponent();

      const callOrder = (Button as jest.Mock).mock.invocationCallOrder[0];
      const stackGameCallOrder = (StackGame as jest.Mock).mock
        .invocationCallOrder[0];

      expect(callOrder).toBeLessThan(stackGameCallOrder);
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should have correct DOM hierarchy", () => {
      renderComponent();

      const stackGamePage =
        document.querySelector<HTMLDivElement>(".stack-game-page");
      const canvas =
        document.querySelector<HTMLCanvasElement>(".stack-game__webgl");
      const mainContainer = document.querySelector<HTMLDivElement>(
        ".stack-game__container"
      );
      const menu = document.querySelector<HTMLDivElement>(".stack-game__menu");
      const menuWrapper = document.querySelector<HTMLDivElement>(
        ".stack-game__menu-wrapper"
      );

      expect(stackGamePage).toContainElement(canvas);
      expect(stackGamePage).toContainElement(mainContainer);
      expect(mainContainer).toContainElement(menu);
      expect(menu).toContainElement(menuWrapper);
    });
  });
});
