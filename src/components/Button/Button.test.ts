import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ButtonProps } from "@src/entities/props";

import { Button } from "@src/components/Button/Button";

type RenderComponent = {
  container: HTMLButtonElement;
  props: { onClick: jest.Mock } & ButtonProps;
};

const renderComponent = (
  custom?: Partial<{ onClick: jest.Mock } & ButtonProps>
): RenderComponent => {
  const props = {
    id: "test-button",
    ariaLabel: "test button",
    children: "<span>Click Me</span>",
    onClick: jest.fn(),
    ...custom,
  };
  const container = Button(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("Button.ts", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render a button element with correct id and aria-label", () => {
      const { container, props } = renderComponent();
      expect(container).toBeInstanceOf(HTMLButtonElement);
      expect(container.id).toBe(props.id);
      expect(container.getAttribute("aria-label")).toBe(props.ariaLabel);
    });

    test("It should have default type 'button' when type is not provided", () => {
      const { container } = renderComponent();
      expect(container.type).toBe("button");
    });

    test("It should use the provided type when specified", () => {
      const { container } = renderComponent({ type: "submit" });
      expect(container.type).toBe("submit");
    });

    test("It should apply base 'button' class", () => {
      const { container } = renderComponent();
      expect(container.className).toContain("button");
    });

    test("It should append custom className when provided", () => {
      const { container } = renderComponent({ className: "custom-class" });
      expect(container.className).toBe("button custom-class");
    });

    test("It should have only base class when no custom className provided", () => {
      const { container } = renderComponent({ className: undefined });
      expect(container.className).toBe("button ");
    });

    test("It should render the innerHTML correctly based on children", () => {
      renderComponent();
      const innerSpan = screen.getByText("Click Me");
      expect(innerSpan).toBeInTheDocument();
    });

    test("It should render empty innerHTML if no children provided", () => {
      const { container } = renderComponent({ children: undefined });
      expect(container.innerHTML).toBe("");
    });
  });

  describe("Interaction Tests.", () => {
    test("It should call onClick when clicked", async () => {
      const { container, props } = renderComponent();
      await user.click(container);
      expect(props.onClick).toHaveBeenCalledTimes(1);
    });

    test("It should not throw if onClick is not provided", async () => {
      const { container } = renderComponent({ onClick: undefined });
      expect(() => user.click(container)).not.toThrow();
    });

    test("It should not add click listener when type is 'submit'", async () => {
      const mockOnClick = jest.fn();
      const { container } = renderComponent({
        type: "submit",
        onClick: mockOnClick,
      });
      await user.click(container);
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    test("It should add click listener only when type is 'button' and onClick is provided", async () => {
      const mockOnClick = jest.fn();
      const { container } = renderComponent({
        type: "button",
        onClick: mockOnClick,
      });
      await user.click(container);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
