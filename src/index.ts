import { StackGame } from "./models/StackGame";
import { getElements } from "./helpers/getElements";

const onInit = () => {
  const { canvas } = getElements();

  new StackGame(canvas);
};

document.addEventListener("DOMContentLoaded", onInit);