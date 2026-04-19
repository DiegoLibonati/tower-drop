import "@/index.css";
import TowerDropPage from "@/pages/TowerDropPage/TowerDropPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const towerDropPage = TowerDropPage();
  app.appendChild(towerDropPage);
};

document.addEventListener("DOMContentLoaded", onInit);
