import { StackGame } from "@src/models/StackGame";
import { getElements } from "@src/helpers/getElements";

const onInit = () => {
  const { canvas } = getElements();

  new StackGame(canvas);
};

document.addEventListener("DOMContentLoaded", onInit);