import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import WheresWaldoBackground from "../components/WheresWaldoBackground";

describe("WheresWaldoImage", () => {
  it("renders WheresWaldoImage Component and handles click", () => {
    const handleClick = vi.fn();
    handleClick("hello", 1);
    render(<WheresWaldoBackground handleClick={handleClick} />);
    const waldoImage = screen.getByTestId("waldo-background");
    expect(waldoImage).toHaveAttribute("src", "/assets/images/simple.jpg");
    expect(vi.isMockFunction(handleClick)).toBe(true);
    expect(handleClick.mock.calls[0]).toEqual(["hello", 1]);
  });
});
