export const getElements = () => ({
  canvas: document.querySelector(".stack-game__webgl") as HTMLCanvasElement,
  score: document.querySelector(".stack-game__score") as HTMLHeadingElement,
  menu: document.querySelector(".stack-game__menu") as HTMLElement,
  lastScore: document.querySelector(
    ".stack-game__last-score"
  ) as HTMLHeadingElement,
  btnPlay: document.querySelector(".stack-game__button") as HTMLButtonElement,
});
