import "@/index.css";
import StackGamePage from "@/pages/StackGamePage/StackGamePage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const stackGamePage = StackGamePage();
  app.appendChild(stackGamePage);
};

document.addEventListener("DOMContentLoaded", onInit);
