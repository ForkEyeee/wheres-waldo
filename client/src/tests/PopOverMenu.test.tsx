import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import PopOverMenu from "../components/PopOverMenu";

describe("PopOverMenu", () => {
  it("renders PopOverMenu Component", () => {
    const allCharacters = ["Waldo", "Sonic The Hedgehog", "Death"];
    const currentCharacter = "Waldo";
    const handleClick = vi.fn();
    render(
      <PopOverMenu
        allCharacters={allCharacters}
        currentcharacter={currentCharacter}
        setCurrentCharacter={handleClick}
        setAllCharacters={handleClick}
      />
    );
    expect(screen.getByRole("pop-menu")).toBeInTheDocument();
  });
});
