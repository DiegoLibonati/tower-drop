import { StackGamePage } from "@src/pages/StackGamePage/StackGamePage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const stackGamePage = StackGamePage();
  app.appendChild(stackGamePage);
};

document.addEventListener("DOMContentLoaded", onInit);
