import { Button } from "@src/components/Button/Button";

import { StackGame } from "@src/core/StackGame";

import "@src/pages/StackGamePage/StackGamePage.css";

export const StackGamePage = (): HTMLDivElement => {
  const divRoot = document.createElement("div");
  divRoot.className = "stack-game-page";

  divRoot.innerHTML = `
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

  const canvas = divRoot.querySelector<HTMLCanvasElement>(".stack-game__webgl");
  const stackGameMenuWrapper = divRoot.querySelector<HTMLDivElement>(
    ".stack-game__menu-wrapper"
  );

  const playButton = Button({
    id: "playbtn",
    ariaLabel: "play button",
    className: "stack-game__button",
    children: "¡Play!",
  });

  stackGameMenuWrapper?.append(playButton);

  new StackGame(canvas!);

  return divRoot;
};
