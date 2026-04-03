import "@testing-library/jest-dom";

const mockThreeSceneAdd = jest.fn();
const mockThreeSceneRemove = jest.fn();
const mockThreeSceneClear = jest.fn();
const mockThreeSceneTraverse = jest.fn();
const mockThreePerspectiveCameraPositionSet = jest.fn();
const mockThreePerspectiveCameraUpdateProjectionMatrix = jest.fn();
const mockThreePerspectiveCameraLookAt = jest.fn();
const mockThreeOrthographicCameraPositionSet = jest.fn();
const mockThreeOrthographicCameraUpdateProjectionMatrix = jest.fn();
const mockThreeOrthographicCameraLookAt = jest.fn();
const mockThreeWebGLRendererSetSize = jest.fn();
const mockThreeWebGLRendererSetPixelRatio = jest.fn();
const mockThreeWebGLRendererRender = jest.fn();
const mockThreeWebGLRendererDispose = jest.fn();
const mockThreeWebGLRendererSetAnimationLoop = jest.fn();
const mockThreeAmbientLightPositionSet = jest.fn();
const mockThreeDirectionalLightPositionSet = jest.fn();
const mockThreePointLightPositionSet = jest.fn();
const mockThreeBoxGeometryDispose = jest.fn();
const mockThreeMeshLambertMaterialDispose = jest.fn();
const mockThreeMeshStandardMaterialDispose = jest.fn();
const mockThreeMeshPositionSet = jest.fn();
const mockThreeMeshPositionCopy = jest.fn();
const mockThreeMeshPositionQuaternionCopy = jest.fn();

const mockCannonWorldGravitySet = jest.fn();
const mockCannonWorldStep = jest.fn();
const mockCannonWorldAddBody = jest.fn();
const mockCannonWorldRemove = jest.fn();
const mockCannonBodyPositionSet = jest.fn();
const mockCannonBodyAddShape = jest.fn();

const mockThreeScene = jest.fn(() => ({
  add: mockThreeSceneAdd,
  remove: mockThreeSceneRemove,
  clear: mockThreeSceneClear,
  traverse: mockThreeSceneTraverse,
  background: null,
}));
const mockThreePerspectiveCamera = jest.fn(() => ({
  position: { z: 0, x: 0, y: 0, set: mockThreePerspectiveCameraPositionSet },
  aspect: 1,
  updateProjectionMatrix: mockThreePerspectiveCameraUpdateProjectionMatrix,
  lookAt: mockThreePerspectiveCameraLookAt,
}));
const mockThreeOrthographicCamera = jest.fn(() => ({
  position: { z: 0, x: 0, y: 0, set: mockThreeOrthographicCameraPositionSet },
  left: -7.5,
  right: 7.5,
  top: 7.5,
  bottom: -7.5,
  updateProjectionMatrix: mockThreeOrthographicCameraUpdateProjectionMatrix,
  lookAt: mockThreeOrthographicCameraLookAt,
}));
const mockThreeWebGLRenderer = jest.fn(() => ({
  setSize: mockThreeWebGLRendererSetSize,
  setPixelRatio: mockThreeWebGLRendererSetPixelRatio,
  render: mockThreeWebGLRendererRender,
  dispose: mockThreeWebGLRendererDispose,
  setAnimationLoop: mockThreeWebGLRendererSetAnimationLoop,
}));
const mockThreeAmbientLight = jest.fn(() => ({
  position: { set: mockThreeAmbientLightPositionSet },
}));
const mockThreeDirectionalLight = jest.fn(() => ({
  position: { set: mockThreeDirectionalLightPositionSet },
}));
const mockThreePointLight = jest.fn(() => ({
  position: { set: mockThreePointLightPositionSet },
}));
const mockThreeBoxGeometry = jest.fn(() => ({
  dispose: mockThreeBoxGeometryDispose,
}));
const mockThreeMeshLambertMaterial = jest.fn(() => ({
  dispose: mockThreeMeshLambertMaterialDispose,
}));
const mockThreeMeshStandardMaterial = jest.fn(() => ({
  dispose: mockThreeMeshStandardMaterialDispose,
}));
const mockThreeMesh = jest.fn((geometry, material) => ({
  geometry,
  material,
  position: {
    x: 0,
    y: 0,
    z: 0,
    set: mockThreeMeshPositionSet,
    copy: mockThreeMeshPositionCopy,
  },
  scale: { x: 1, y: 1, z: 1 },
  quaternion: { copy: mockThreeMeshPositionQuaternionCopy },
}));
const mockThreeColor = jest.fn((color: string) => ({ value: color }));
const mockThreeVector3 = jest.fn((x: number, y: number, z: number) => ({
  x,
  y,
  z,
}));

const mockCannonWorld = jest.fn(() => ({
  gravity: { set: mockCannonWorldGravitySet },
  broadphase: null,
  solver: { iterations: 0 },
  step: mockCannonWorldStep,
  addBody: mockCannonWorldAddBody,
  remove: mockCannonWorldRemove,
}));
const mockCannonNaiveBroadphase = jest.fn();
const mockCannonBox = jest.fn((size: unknown) => ({ size }));
const mockCannonBody = jest.fn(
  (options: { mass?: number; shape?: unknown }) => ({
    position: {
      x: 0,
      y: 0,
      z: 0,
      set: mockCannonBodyPositionSet,
    },
    quaternion: {},
    shapes: [],
    addShape: mockCannonBodyAddShape,
    mass: options.mass ?? 0,
    shape: options.shape ?? null,
  })
);
const mockCannonVec3 = jest.fn((x: number, y: number, z: number) => ({
  x,
  y,
  z,
}));

jest.mock("three", () => ({
  Scene: mockThreeScene,
  PerspectiveCamera: mockThreePerspectiveCamera,
  OrthographicCamera: mockThreeOrthographicCamera,
  WebGLRenderer: mockThreeWebGLRenderer,
  AmbientLight: mockThreeAmbientLight,
  DirectionalLight: mockThreeDirectionalLight,
  PointLight: mockThreePointLight,
  BoxGeometry: mockThreeBoxGeometry,
  MeshLambertMaterial: mockThreeMeshLambertMaterial,
  MeshStandardMaterial: mockThreeMeshStandardMaterial,
  Mesh: mockThreeMesh,
  Color: mockThreeColor,
  Vector3: mockThreeVector3,
}));

jest.mock("cannon", () => ({
  World: mockCannonWorld,
  NaiveBroadphase: mockCannonNaiveBroadphase,
  Box: mockCannonBox,
  Body: mockCannonBody,
  Vec3: mockCannonVec3,
}));
