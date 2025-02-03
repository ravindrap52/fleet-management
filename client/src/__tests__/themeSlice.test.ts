import { describe, expect, it } from "vitest";

import reducer, { toggleAppTheme } from "@/features/theme/themeSlice";

describe("Theme Slice", () => {
  it("should return the initial state", () => {
    const storedTheme = localStorage.getItem("theme") || "light";
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      theme: storedTheme,
    });
  });
  it("should toggle the theme", () => {
    const previousState = {
      theme: "light",
    };
    expect(reducer(previousState, toggleAppTheme())).toEqual({
      theme: localStorage.getItem("theme"),
    });
  });
});
