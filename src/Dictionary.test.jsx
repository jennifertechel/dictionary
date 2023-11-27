import { render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { userEvent } from "@testing-library/user-event";
import App from "./App";

test("should render search input field", () => {
  render(<App />);
  expect(screen.getByPlaceholderText("Enter word")).toBeInTheDocument();
});

test.todo("should be able to write in input field");

test("should display word data after searching", async () => {
  render(<App />);
  const user = userEvent.setup();
  const inputField = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  await user.click(inputField);
  await user.type(inputField, "hello");
  await user.click(button);
  await waitFor(() => expect(screen.queryByText("hello")).toBeInTheDocument());
});

test.todo("should find audio file");

test("should display error after empty search", async () => {
  render(<App />);
  const user = userEvent.setup();
  const button = screen.getByRole("button");
  await user.click(button);
  await waitFor(() =>
    expect(
      screen.queryByText("Word not found in the dictionary")
    ).toBeInTheDocument()
  );
});

test("should display error if word is not existing", async () => {
  render(<App />);
  const user = userEvent.setup();
  const inputField = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  await user.click(inputField);
  await user.type(inputField, "asd");
  await user.click(button);
  await waitFor(() =>
    expect(
      screen.queryByText("Word not found in the dictionary")
    ).toBeInTheDocument()
  );
});
