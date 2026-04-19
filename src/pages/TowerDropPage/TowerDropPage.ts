import type { Page } from "@/types/pages";

import Button from "@/components/Button/Button";

import { TowerDrop } from "@/core/TowerDrop";

import "@/pages/TowerDropPage/TowerDropPage.css";

const TowerDropPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "tower-drop-page";

  main.innerHTML = `
    <canvas class="tower-drop__webgl"></canvas>

    <div class="tower-drop__container" id="mainContainer">
        <p class="tower-drop__score">0</p>

        <div class="tower-drop__menu">
            <div class="tower-drop__menu-wrapper">
                <h2 class="tower-drop__title">TowerDrop</h2>
                <h3 class="tower-drop__last-score">Last Score: 0</h3>
            </div>
        </div>
    </div>
  `;

  const canvas = main.querySelector<HTMLCanvasElement>(".tower-drop__webgl");
  const towerDropMenuWrapper = main.querySelector<HTMLDivElement>(
    ".tower-drop__menu-wrapper"
  );

  const playButton = Button({
    id: "playbtn",
    ariaLabel: "Start game",
    className: "tower-drop__button",
    children: "¡Play!",
  });

  towerDropMenuWrapper?.append(playButton);

  const game = new TowerDrop(canvas!, main);

  main.cleanup = (): void => {
    game.dispose();

    playButton.cleanup?.();
  };

  return main;
};

export default TowerDropPage;
