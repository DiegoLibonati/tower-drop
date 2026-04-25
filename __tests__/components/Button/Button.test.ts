import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonProps } from "@/types/props";
import type { ButtonComponent } from "@/types/components";

import Button from "@/components/Button/Button";

const mockOnClick = jest.fn();

const defaultProps: ButtonProps = {
  id: "test-btn",
  ariaLabel: "Test button",
  className: "primary",
  children: "Click me",
};

const renderComponent = (props: Partial<ButtonProps> = {}): ButtonComponent => {
  const element = Button({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Button", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should set the id attribute", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("id", "test-btn");
    });

    it("should set the aria-label attribute", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Test button" })
      ).toBeInTheDocument();
    });

    it("should apply the button base class and the custom className", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("button", "primary");
    });

    it("should render children as inner HTML", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("should default to type button when type is not provided", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should set the type attribute when provided", () => {
      renderComponent({ type: "submit" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("should apply only the base class when className is not provided", () => {
      renderComponent({ className: "" });
      expect(screen.getByRole("button")).toHaveClass("button");
    });

    it("should render empty content when children is not provided", () => {
      renderComponent({ children: "" });
      expect(screen.getByRole("button")).toHaveTextContent("");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      renderComponent({ onClick: mockOnClick });
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should not attach a click listener when type is submit", async () => {
      renderComponent({ type: "submit", onClick: mockOnClick });
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Test button" }));
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should not attach a click listener when type is reset", async () => {
      renderComponent({ type: "reset", onClick: mockOnClick });
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Test button" }));
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("should not throw when onClick is not provided and button is clicked", async () => {
      renderComponent();
      const user = userEvent.setup();
      await expect(
        user.click(screen.getByRole("button"))
      ).resolves.not.toThrow();
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method when type is button and onClick is provided", () => {
      const element = renderComponent({ onClick: mockOnClick });
      expect(typeof element.cleanup).toBe("function");
    });

    it("should not expose a cleanup method when type is submit", () => {
      const element = renderComponent({ type: "submit", onClick: mockOnClick });
      expect(element.cleanup).toBeUndefined();
    });

    it("should not expose a cleanup method when onClick is not provided", () => {
      const element = renderComponent();
      expect(element.cleanup).toBeUndefined();
    });

    it("should remove the click listener after cleanup is called", async () => {
      const element = renderComponent({ onClick: mockOnClick });
      element.cleanup!();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
