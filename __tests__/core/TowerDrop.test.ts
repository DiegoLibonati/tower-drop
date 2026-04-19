import * as THREE from "three";
import * as CANNON from "cannon";

import type { Page } from "@/types/pages";

import { TowerDrop } from "@/core/TowerDrop";

const createContainer = (): Page => {
  const main = document.createElement("main") as Page;
  main.innerHTML = `
    <canvas class="tower-drop__webgl"></canvas>
    <div class="tower-drop__container" id="mainContainer">
      <p class="tower-drop__score">0</p>
      <div class="tower-drop__menu" style="display: flex">
        <div class="tower-drop__menu-wrapper">
          <h2 class="tower-drop__title">Tower Drop</h2>
          <h3 class="tower-drop__last-score">Last Score: 0</h3>
          <button class="tower-drop__button" id="playbtn">¡Play!</button>
        </div>
      </div>
    </div>
  `;
  return main;
};

describe("TowerDrop", () => {
  let canvas: HTMLCanvasElement;
  let container: Page;
  let game: TowerDrop;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    container = createContainer();
    document.body.appendChild(container);
    game = new TowerDrop(canvas, container);
  });

  afterEach(() => {
    game.dispose();
    document.body.innerHTML = "";
  });

  describe("initialization", () => {
    it("should create a Three.js scene", () => {
      expect(THREE.Scene).toHaveBeenCalledTimes(1);
    });

    it("should create an orthographic camera", () => {
      expect(THREE.OrthographicCamera).toHaveBeenCalledTimes(1);
    });

    it("should create a WebGL renderer with the provided canvas", () => {
      expect(THREE.WebGLRenderer).toHaveBeenCalledWith({
        canvas,
        antialias: true,
      });
    });

    it("should create a Cannon.js physics world", () => {
      expect(CANNON.World).toHaveBeenCalledTimes(1);
    });

    it("should expose the canvas as a public property", () => {
      expect(game.canvas).toBe(canvas);
    });

    it("should add ambient and directional lights to the scene", () => {
      expect(THREE.AmbientLight).toHaveBeenCalledTimes(1);
      expect(THREE.DirectionalLight).toHaveBeenCalledTimes(1);
    });

    it("should create the two initial base blocks", () => {
      expect(THREE.Mesh).toHaveBeenCalledTimes(2);
    });
  });

  describe("dispose", () => {
    it("should remove the resize event listener from window", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
      game.dispose();
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );
    });

    it("should remove the click event listener from window", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
      game.dispose();
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "click",
        expect.any(Function)
      );
    });

    it("should stop the animation loop", () => {
      const rendererInstance = (THREE.WebGLRenderer as jest.Mock).mock
        .results[0]!.value;
      game.dispose();
      expect(rendererInstance.setAnimationLoop).toHaveBeenCalledWith(null);
    });

    it("should call dispose on the WebGL renderer", () => {
      const rendererInstance = (THREE.WebGLRenderer as jest.Mock).mock
        .results[0]!.value;
      game.dispose();
      expect(rendererInstance.dispose).toHaveBeenCalled();
    });

    it("should clear the Three.js scene", () => {
      const sceneInstance = (THREE.Scene as unknown as jest.Mock).mock
        .results[0]!.value;
      game.dispose();
      expect(sceneInstance.clear).toHaveBeenCalled();
    });

    it("should remove all block bodies from the physics world", () => {
      const worldInstance = (CANNON.World as jest.Mock).mock.results[0]!.value;
      game.dispose();
      expect(worldInstance.remove).toHaveBeenCalled();
    });
  });

  describe("onWindowResize", () => {
    it("should update the renderer size on window resize", () => {
      const rendererInstance = (THREE.WebGLRenderer as jest.Mock).mock
        .results[0]!.value;
      rendererInstance.setSize.mockClear();
      window.dispatchEvent(new UIEvent("resize"));
      expect(rendererInstance.setSize).toHaveBeenCalledTimes(1);
    });

    it("should update the camera projection matrix on window resize", () => {
      const cameraInstance = (THREE.OrthographicCamera as unknown as jest.Mock)
        .mock.results[0]!.value;
      cameraInstance.updateProjectionMatrix.mockClear();
      window.dispatchEvent(new UIEvent("resize"));
      expect(cameraInstance.updateProjectionMatrix).toHaveBeenCalledTimes(1);
    });

    it("should re-render the scene on window resize", () => {
      const rendererInstance = (THREE.WebGLRenderer as jest.Mock).mock
        .results[0]!.value;
      rendererInstance.render.mockClear();
      window.dispatchEvent(new UIEvent("resize"));
      expect(rendererInstance.render).toHaveBeenCalledTimes(1);
    });
  });

  describe("onGameStart", () => {
    let playBtn: HTMLButtonElement;

    beforeEach(() => {
      playBtn = container.querySelector<HTMLButtonElement>("#playbtn")!;
    });

    it("should hide the menu when the play button is clicked", () => {
      const menu =
        container.querySelector<HTMLDivElement>(".tower-drop__menu")!;
      playBtn.click();
      expect(menu.style.display).toBe("none");
    });

    it("should show the score when the play button is clicked", () => {
      const score =
        container.querySelector<HTMLParagraphElement>(".tower-drop__score")!;
      playBtn.click();
      expect(score.style.display).toBe("block");
    });

    it("should start the animation loop when play is clicked", () => {
      const rendererInstance = (THREE.WebGLRenderer as unknown as jest.Mock)
        .mock.results[0]!.value;
      rendererInstance.setAnimationLoop.mockClear();
      playBtn.click();
      expect(rendererInstance.setAnimationLoop).toHaveBeenCalledWith(
        expect.any(Function)
      );
    });

    it("should reinitialize the blocks when play is clicked", () => {
      (THREE.Mesh as unknown as jest.Mock).mockClear();
      playBtn.click();
      expect(THREE.Mesh).toHaveBeenCalledTimes(2);
    });

    it("should not restart the game if it is already started", () => {
      const menu =
        container.querySelector<HTMLDivElement>(".tower-drop__menu")!;
      playBtn.click();
      menu.style.display = "flex";
      playBtn.click();
      expect(menu.style.display).toBe("flex");
    });
  });

  describe("onWindowClick", () => {
    describe("before game starts", () => {
      it("should not modify the score when game has not started", () => {
        const score =
          container.querySelector<HTMLParagraphElement>(".tower-drop__score")!;
        window.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(score.innerHTML).toBe("0");
      });
    });

    describe("after game starts", () => {
      let score: HTMLParagraphElement;
      let menu: HTMLDivElement;
      let lastScore: HTMLHeadingElement;
      let playBtn: HTMLButtonElement;

      beforeEach(() => {
        playBtn = container.querySelector<HTMLButtonElement>("#playbtn")!;
        score =
          container.querySelector<HTMLParagraphElement>(".tower-drop__score")!;
        menu = container.querySelector<HTMLDivElement>(".tower-drop__menu")!;
        lastScore = container.querySelector<HTMLHeadingElement>(
          ".tower-drop__last-score"
        )!;
        playBtn.click();
      });

      it("should increment the score on a valid window click", () => {
        window.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(score.innerHTML).toBe("1");
      });

      it("should not react when the click target is the play button", () => {
        playBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(score.innerHTML).toBe("0");
      });

      it("should show the menu on game over", () => {
        const topBlockMesh = (THREE.Mesh as unknown as jest.Mock).mock
          .results[3]!.value;
        topBlockMesh.position.x = 10;
        window.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(menu.style.display).toBe("flex");
      });

      it("should reset the score display on game over", () => {
        const topBlockMesh = (THREE.Mesh as unknown as jest.Mock).mock
          .results[3]!.value;
        topBlockMesh.position.x = 10;
        score.innerHTML = "5";
        window.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(score.innerHTML).toBe("0");
      });

      it("should update the last score on game over", () => {
        const topBlockMesh = (THREE.Mesh as unknown as jest.Mock).mock
          .results[3]!.value;
        topBlockMesh.position.x = 10;
        score.innerHTML = "7";
        window.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(lastScore.innerHTML).toBe("Last Score: 7");
      });

      it("should stop the animation on game over", () => {
        const rendererInstance = (THREE.WebGLRenderer as jest.Mock).mock
          .results[0]!.value;
        const topBlockMesh = (THREE.Mesh as unknown as jest.Mock).mock
          .results[3]!.value;
        topBlockMesh.position.x = 10;
        rendererInstance.setAnimationLoop.mockClear();
        window.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(rendererInstance.setAnimationLoop).toHaveBeenCalledWith(null);
      });
    });
  });
});
