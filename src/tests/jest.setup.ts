import "@testing-library/jest-dom";

// Mocks

jest.mock("three", () => {
  const originalThree = jest.requireActual("three");

  return {
    ...originalThree,
    Scene: jest.fn(() => ({
      add: jest.fn(),
      clear: jest.fn(),
      remove: jest.fn(),
    })),
    WebGLRenderer: jest.fn(() => ({
      setSize: jest.fn(),
      setPixelRatio: jest.fn(),
      render: jest.fn(),
      setAnimationLoop: jest.fn(),
    })),
    OrthographicCamera: jest.fn(() => ({
      lookAt: jest.fn(),
      position: {
        set: jest.fn(),
      },
      updateProjectionMatrix: jest.fn(),
    })),
    AmbientLight: jest.fn(),
    DirectionalLight: jest.fn(() => ({
      position: {
        set: jest.fn(),
      },
    })),
  };
});

jest.mock("cannon", () => {
  const originalCannon = jest.requireActual("cannon");

  return {
    ...originalCannon,
    World: jest.fn(() => ({
      addBody: jest.fn(),
      step: jest.fn(),
      gravity: {
        set: jest.fn(),
      },
      solver: {
        iterations: 40,
      },
    })),
    NaiveBroadphase: jest.fn(),
  };
});
