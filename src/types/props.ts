interface DefaultProps {
  className?: string;
  children?: string;
}

export interface ButtonProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  type?: "button" | "reset" | "submit";
  onClick?: (e: MouseEvent) => void;
}
