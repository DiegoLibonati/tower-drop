import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonProps } from "@/types/props";
import type { ButtonComponent } from "@/types/components";

import { Button } from "@/components/Button/Button";

const renderComponent = (props: ButtonProps): ButtonComponent => {
  const container = Button(props);
  document.body.appendChild(container);
  return container;
};

describe("Button Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: ButtonProps = {
    id: "test-button",
    ariaLabel: "Test button",
    children: "Click Me",
    onClick: mockOnClick,
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-button");
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("button");
    expect(button.innerHTML).toBe("Click Me");
  });

  it("should render submit button when type is submit", () => {
    const submitProps: ButtonProps = {
      ...defaultProps,
      type: "submit",
    };

    renderComponent(submitProps);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should call onClick handler when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test button" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: ButtonProps = {
      ...defaultProps,
      className: "custom-button",
    };

    renderComponent(propsWithClass);

    const button = screen.getByRole("button", { name: "Test button" });
    expect(button).toHaveClass("button", "custom-button");
  });

  it("should not add event listener for submit button", () => {
    const submitProps: ButtonProps = {
      ...defaultProps,
      type: "submit",
    };

    const button = renderComponent(submitProps);

    expect(button.cleanup).toBeUndefined();
  });

  it("should cleanup event listener for button type", async () => {
    const user = userEvent.setup();
    const button = renderComponent(defaultProps);

    button.cleanup?.();

    const buttonElement = screen.getByRole("button", { name: "Test button" });
    await user.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
