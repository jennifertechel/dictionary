import { render } from "@testing-library/react";
import App from "./App";
import { expect } from "vitest";

test("testing suite works", () => {
  render(<App />);
  expect(true).toBe(true);
});
