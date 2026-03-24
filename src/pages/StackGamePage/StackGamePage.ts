import type { Page } from "@/types/pages";

import { Button } from "@/components/Button/Button";

import { StackGame } from "@/core/StackGame";

import "@/pages/StackGamePage/StackGamePage.css";

export const StackGamePage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "stack-game-page";

  main.innerHTML = `
    <canvas class="stack-game__webgl"></canvas>

    <div class="stack-game__container" id="mainContainer">
        <p class="stack-game__score">0</p>

        <div class="stack-game__menu">
            <div class="stack-game__menu-wrapper">
                <h2 class="stack-game__title">Stack Game</h2>
                <h3 class="stack-game__last-score">Last Score: 0</h3>
            </div>
        </div>
    </div>
  `;

  const canvas = main.querySelector<HTMLCanvasElement>(".stack-game__webgl");
  const stackGameMenuWrapper = main.querySelector<HTMLDivElement>(
    ".stack-game__menu-wrapper"
  );

  const playButton = Button({
    id: "playbtn",
    ariaLabel: "Start game",
    className: "stack-game__button",
    children: "¡Play!",
  });

  stackGameMenuWrapper?.append(playButton);

  const game = new StackGame(canvas!, main);

  main.cleanup = (): void => {
    game.dispose();

    playButton.cleanup?.();
  };

  return main;
};
