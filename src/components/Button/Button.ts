import type { ButtonComponent } from "@/types/components";
import type { ButtonProps } from "@/types/props";

export const Button = ({
  id,
  ariaLabel,
  type,
  className,
  children,
  onClick,
}: ButtonProps): ButtonComponent => {
  const button = document.createElement("button") as ButtonComponent;
  button.id = id;
  button.type = type ?? "button";
  button.className = `button ${className ?? ""}`;
  button.setAttribute("aria-label", ariaLabel);

  button.innerHTML = children ?? "";

  if (button.type === "button" && onClick) {
    button.addEventListener("click", onClick);

    button.cleanup = (): void => {
      button.removeEventListener("click", onClick);
    };
  }

  return button;
};
