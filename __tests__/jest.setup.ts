import "@testing-library/jest-dom";

jest.mock("three", () => ({
  Scene: jest.fn(() => ({
    add: jest.fn(),
    remove: jest.fn(),
    clear: jest.fn(),
    traverse: jest.fn(),
    background: null,
  })),
  PerspectiveCamera: jest.fn(() => ({
    position: { z: 0, x: 0, y: 0, set: jest.fn() },
    aspect: 1,
    updateProjectionMatrix: jest.fn(),
    lookAt: jest.fn(),
  })),
  OrthographicCamera: jest.fn(() => ({
    position: { z: 0, x: 0, y: 0, set: jest.fn() },
    left: -7.5,
    right: 7.5,
    top: 7.5,
    bottom: -7.5,
    updateProjectionMatrix: jest.fn(),
    lookAt: jest.fn(),
  })),
  WebGLRenderer: jest.fn(() => ({
    setSize: jest.fn(),
    setPixelRatio: jest.fn(),
    render: jest.fn(),
    dispose: jest.fn(),
    setAnimationLoop: jest.fn(),
  })),
  AmbientLight: jest.fn(() => ({ position: { set: jest.fn() } })),
  DirectionalLight: jest.fn(() => ({ position: { set: jest.fn() } })),
  PointLight: jest.fn(() => ({ position: { set: jest.fn() } })),
  BoxGeometry: jest.fn(() => ({ dispose: jest.fn() })),
  MeshLambertMaterial: jest.fn(() => ({ dispose: jest.fn() })),
  MeshStandardMaterial: jest.fn(() => ({ dispose: jest.fn() })),
  Mesh: jest.fn((geometry, material) => ({
    geometry,
    material,
    position: { x: 0, y: 0, z: 0, set: jest.fn(), copy: jest.fn() },
    scale: { x: 1, y: 1, z: 1 },
    quaternion: { copy: jest.fn() },
  })),
  Color: jest.fn((color: string) => ({ value: color })),
  Vector3: jest.fn((x: number, y: number, z: number) => ({ x, y, z })),
}));

jest.mock("cannon", () => ({
  World: jest.fn(() => ({
    gravity: { set: jest.fn() },
    broadphase: null,
    solver: { iterations: 0 },
    step: jest.fn(),
    addBody: jest.fn(),
    remove: jest.fn(),
  })),
  NaiveBroadphase: jest.fn(),
  Box: jest.fn((size: unknown) => ({ size })),
  Body: jest.fn((options: { mass?: number; shape?: unknown }) => ({
    position: {
      x: 0,
      y: 0,
      z: 0,
      set: jest.fn(),
    },
    quaternion: {},
    shapes: [],
    addShape: jest.fn(),
    mass: options.mass ?? 0,
    shape: options.shape ?? null,
  })),
  Vec3: jest.fn((x: number, y: number, z: number) => ({ x, y, z })),
}));
