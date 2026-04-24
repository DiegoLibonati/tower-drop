import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import TowerDropPage from "@/pages/TowerDropPage/TowerDropPage";

let currentPage: Page | null = null;

const renderPage = (): Page => {
  currentPage = TowerDropPage();
  document.body.appendChild(currentPage);
  return currentPage;
};

describe("TowerDropPage", () => {
  afterEach(() => {
    currentPage?.cleanup?.();
    document.body.innerHTML = "";
    currentPage = null;
  });

  describe("rendering", () => {
    it("should render a main element with the tower-drop-page class", () => {
      renderPage();
      const main = document.querySelector<HTMLElement>("main");
      expect(main).toHaveClass("tower-drop-page");
    });

    it("should render the webgl canvas element", () => {
      renderPage();
      expect(
        document.querySelector<HTMLCanvasElement>(".tower-drop__webgl")
      ).toBeInTheDocument();
    });

    it("should render the score element with an initial value of 0", () => {
      renderPage();
      const score =
        document.querySelector<HTMLParagraphElement>(".tower-drop__score");
      expect(score).toBeInTheDocument();
      expect(score).toHaveTextContent("0");
    });

    it("should render the menu container", () => {
      renderPage();
      expect(
        document.querySelector<HTMLDivElement>(".tower-drop__menu")
      ).toBeInTheDocument();
    });

    it("should render the game title", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "Tower Drop", level: 2 })
      ).toBeInTheDocument();
    });

    it("should render the last score heading with initial value", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: /Last Score: 0/i, level: 3 })
      ).toBeInTheDocument();
    });

    it("should render the play button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Start game" })
      ).toBeInTheDocument();
    });

    it("should render the play button with the correct id", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: "Start game" })
      ).toHaveAttribute("id", "playbtn");
    });

    it("should render the play button inside the menu wrapper", () => {
      renderPage();
      const wrapper = document.querySelector<HTMLDivElement>(
        ".tower-drop__menu-wrapper"
      );
      expect(
        wrapper?.querySelector<HTMLButtonElement>("#playbtn")
      ).toBeInTheDocument();
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      const page = renderPage();
      expect(typeof page.cleanup).toBe("function");
    });

    it("should not throw when cleanup is called", () => {
      const page = renderPage();
      expect(() => {
        page.cleanup!();
      }).not.toThrow();
    });
  });
});
