interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface ButtonProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  type?: "button" | "reset" | "submit";
  onClick?: (e: MouseEvent) => void;
}
