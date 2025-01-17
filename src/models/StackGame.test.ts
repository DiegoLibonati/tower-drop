import * as THREE from "three";
import * as CANNON from "cannon";

import { Block, Coords, Direction, Sizes } from "../entities/entities";

import { StackGame } from "./StackGame";

import { OFFICIAL_BODY } from "../tests/jest.constants";

import { getElements } from "../helpers/getElements";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("StackGame", () => {
  let camera: THREE.OrthographicCamera;
  let scene: THREE.Scene;
  let world: CANNON.World;
  let renderer: THREE.WebGLRenderer;

  let canvas: HTMLCanvasElement;
  let score: HTMLHeadingElement;
  let menu: HTMLElement;

  let stackGame: StackGame;

  let blocks: Block[];
  let fallBlocks: Block[];
  let isMovingForward: boolean;

  beforeEach(() => {
    const {
      canvas: canvasElement,
      score: scoreElement,
      menu: menuElement,
    } = getElements();

    canvas = canvasElement;
    score = scoreElement;
    menu = menuElement;

    stackGame = new StackGame(canvas);

    scene = stackGame["scene"];
    camera = stackGame["camera"];
    world = stackGame["world"];
    renderer = stackGame["renderer"];

    blocks = stackGame["gameState"]["blocks"];
    fallBlocks = stackGame["gameState"]["fallBlocks"];
    isMovingForward = stackGame["gameState"]["isMovingForward"];
  });

  test("It must initialize the class correctly.", () => {
    expect(stackGame).toBeDefined();
    expect(THREE.Scene).toHaveBeenCalledTimes(1);

    expect(THREE.OrthographicCamera).toHaveBeenCalledTimes(1);
    expect(THREE.OrthographicCamera).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      1,
      100
    );

    expect(CANNON.World).toHaveBeenCalledTimes(1);

    expect(THREE.WebGLRenderer).toHaveBeenCalledTimes(1);
    expect(THREE.WebGLRenderer).toHaveBeenCalledWith({
      canvas: canvas,
      antialias: true,
    });
  });

  test("It must add the camera to the scene.", () => {
    stackGame["addCamera"]();

    expect(camera.position.set).toHaveBeenCalled();
    expect(camera.position.set).toHaveBeenCalledWith(4, 4, 4);
    expect(camera.lookAt).toHaveBeenCalled();
    expect(camera.lookAt).toHaveBeenCalledWith(0, 0, 0);

    expect(scene.add).toHaveBeenCalled();
    expect(scene.add).toHaveBeenCalledWith(camera);
  });

  test("It must add the lights to the scene.", () => {
    stackGame["addLights"]();

    expect(THREE.AmbientLight).toHaveBeenCalled();
    expect(THREE.AmbientLight).toHaveBeenCalledWith("#FFFFFF", 0.6);
    expect(THREE.DirectionalLight).toHaveBeenCalled();
    expect(THREE.DirectionalLight).toHaveBeenCalledWith("#FFFFFF", 0.6);

    expect(scene.add).toHaveBeenCalled();
  });

  test("It must add a block to the block list.", () => {
    expect(blocks).toHaveLength(2);

    const coords: Coords = {
      x: 1,
      y: 1,
      z: 1,
    };
    const direction: Direction = "x";
    const sizes: Sizes = {
      height: 1,
      width: 1,
      depth: 1,
    };

    stackGame["addBlock"]({
      coords: coords,
      direction: direction,
      sizes: sizes,
    });

    expect(blocks).toHaveLength(3);
  });

  test("It must add a fall block to the fall block list.", () => {
    expect(fallBlocks).toHaveLength(0);

    const coords: Coords = {
      x: 1,
      y: 1,
      z: 1,
    };
    const sizes: Sizes = {
      height: 1,
      width: 1,
      depth: 1,
    };

    stackGame["addFallBlock"]({ coords: coords, sizes: sizes });

    expect(fallBlocks).toHaveLength(1);
  });

  test("It must set up the cannon world.", () => {
    expect(world.gravity.set).toHaveBeenCalled();
    expect(world.gravity.set).toHaveBeenCalledWith(0, -10, 0);

    expect(CANNON.NaiveBroadphase).toHaveBeenCalled();
    expect(world.broadphase instanceof CANNON.NaiveBroadphase).toBeTruthy();

    expect(world.solver.iterations).toBe(40);
  });

  test("It must configure the game startup.", () => {
    stackGame["initialConfigGame"]();

    expect(scene.remove).toHaveBeenCalled();

    for (const block of blocks.concat(fallBlocks)) {
      expect(scene.remove).toHaveBeenCalledWith(block.mesh);
    }

    expect(blocks).toHaveLength(2);
    expect(fallBlocks).toHaveLength(0);
    expect(isMovingForward).toBeFalsy();
    expect(stackGame["gameState"]["gameStarted"]).toBeFalsy();

    expect(camera.position.y).toBe(4);
    expect(camera.updateProjectionMatrix).toHaveBeenCalled();

    expect(world.gravity.set).toHaveBeenCalled();
    expect(world.gravity.set).toHaveBeenCalledWith(0, -10, 0);

    expect(CANNON.NaiveBroadphase).toHaveBeenCalled();
    expect(world.broadphase instanceof CANNON.NaiveBroadphase).toBeTruthy();

    expect(world.solver.iterations).toBe(40);
  });

  test("It must render the scene.", () => {
    expect(renderer.setSize).toHaveBeenCalled();
    expect(renderer.setPixelRatio).toHaveBeenCalled();
    expect(renderer.render).toHaveBeenCalled();
    expect(renderer.render).toHaveBeenCalledWith(scene, camera);
  });

  test("It must render the scene when you do a resize.", () => {
    const resizeEvent = new Event("resize");
    window.dispatchEvent(resizeEvent);

    expect(camera.updateProjectionMatrix).toHaveBeenCalled();
    expect(renderer.setPixelRatio).toHaveBeenCalled();
    expect(renderer.setSize).toHaveBeenCalled();
  });

  test("It must start the game.", () => {
    stackGame["onGameStart"]();

    expect(scene.remove).toHaveBeenCalled();

    for (const block of blocks.concat(fallBlocks)) {
      expect(scene.remove).toHaveBeenCalledWith(block.mesh);
    }

    expect(blocks).toHaveLength(2);
    expect(fallBlocks).toHaveLength(0);
    expect(isMovingForward).toBeFalsy();

    expect(camera.position.y).toBe(4);
    expect(camera.updateProjectionMatrix).toHaveBeenCalled();

    expect(world.gravity.set).toHaveBeenCalled();
    expect(world.gravity.set).toHaveBeenCalledWith(0, -10, 0);

    expect(CANNON.NaiveBroadphase).toHaveBeenCalled();
    expect(world.broadphase instanceof CANNON.NaiveBroadphase).toBeTruthy();

    expect(world.solver.iterations).toBe(40);

    expect(score.style.display).toEqual("block");
    expect(score.style.color).toEqual("rgb(255, 255, 255)");
    expect(menu.style.display).toEqual("none");

    expect(renderer.setAnimationLoop).toHaveBeenCalled();

    expect(stackGame["gameState"]["gameStarted"]).toBeTruthy();
  });

  test("It must create a block and return it.", () => {
    const coords: Coords = {
      x: 1,
      y: 1,
      z: 1,
    };
    const sizes: Sizes = {
      height: 1,
      width: 1,
      depth: 1,
    };

    const block = stackGame["createBlock"]({
      coords: coords,
      isBlockFalling: false,
      sizes: sizes,
    });
    const fallBlock = stackGame["createBlock"]({
      coords: coords,
      isBlockFalling: true,
      sizes: sizes,
    });

    expect(block).toBeTruthy();
    expect(block.sizes).toEqual(sizes);
    expect(block.mesh.position).toEqual(coords);
    expect(block.body.mass).toEqual(0);

    expect(fallBlock).toBeTruthy();
    expect(fallBlock.sizes).toEqual(sizes);
    expect(fallBlock.mesh.position).toEqual(coords);
    expect(fallBlock.body.mass).toEqual(5);
  });

  test("It must update the physics.", () => {
    stackGame["updatePhysics"]();

    expect(world.step).toHaveBeenCalled();
    expect(world.step).toHaveBeenCalledWith(1 / 60);

    for (const fallBlock of fallBlocks) {
      expect(fallBlock.mesh.position.copy).toHaveBeenCalled();
      expect(fallBlock.mesh.position.copy).toHaveBeenCalledWith(
        fallBlock.body.position
      );
      expect(fallBlock.mesh.quaternion.copy).toHaveBeenCalled();
      expect(fallBlock.mesh.quaternion.copy).toHaveBeenCalledWith(
        fallBlock.body.quaternion
      );
    }
  });

  test("It should animate the game.", () => {
    stackGame["animate"]();

    expect(world.step).toHaveBeenCalled();
    expect(world.step).toHaveBeenCalledWith(1 / 60);

    for (const fallBlock of fallBlocks) {
      expect(fallBlock.mesh.position.copy).toHaveBeenCalled();
      expect(fallBlock.mesh.position.copy).toHaveBeenCalledWith(
        fallBlock.body.position
      );
      expect(fallBlock.mesh.quaternion.copy).toHaveBeenCalled();
      expect(fallBlock.mesh.quaternion.copy).toHaveBeenCalledWith(
        fallBlock.body.quaternion
      );
    }

    expect(renderer.setSize).toHaveBeenCalled();
    expect(renderer.setPixelRatio).toHaveBeenCalled();
    expect(renderer.render).toHaveBeenCalled();
    expect(renderer.render).toHaveBeenCalledWith(scene, camera);
  });
});
