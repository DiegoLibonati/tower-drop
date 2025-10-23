import { ButtonProps } from "@src/entities/props";

export const Button = ({
  id,
  ariaLabel,
  type,
  className,
  children,
  onClick,
}: ButtonProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.id = id;
  button.type = type ?? "button";
  button.className = `button ${className ?? ""}`;
  button.setAttribute("aria-label", ariaLabel);

  button.innerHTML = children ?? "";

  if (button.type === "button" && onClick)
    button.addEventListener("click", onClick);

  return button;
};
