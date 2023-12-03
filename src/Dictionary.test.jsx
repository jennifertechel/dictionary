import { render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { userEvent } from "@testing-library/user-event";
import App from "./App";
import Dictionary from "./Dictionary";

// Default test to make sure that h1 tag in the header is rendered
test("should render render h1 tag", () => {
  render(<App />);
  expect(screen.getByText("Just another dictionary ™")).toBeInTheDocument();
});

test("should render search input field", () => {
  render(<App />);
  expect(screen.getByPlaceholderText("Enter word")).toBeInTheDocument();
});

test("should display word data after searching", async () => {
  render(<App />);
  const user = userEvent.setup();
  const inputField = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  await user.click(inputField);
  await user.type(inputField, "hello");
  await user.click(button);
  await waitFor(() => expect(screen.queryByText("hello")).toBeInTheDocument());
  await waitFor(
    () =>
      // Test for the word to be rendered
      expect(screen.queryByText("hello")).toBeInTheDocument(),
    // Test for phonetics to be rendered
    expect(screen.queryByText("/həˈləʊ/")).toBeInTheDocument(),
    // Test for one of 'part of speech' to be rendered
    expect(screen.queryByText("interjection")).toBeInTheDocument(),
    // Test for definition to be rendered
    expect(
      screen.queryByText(
        "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence."
      )
    ).toBeInTheDocument(),
    // Test for example to be rendered
    expect(screen.queryByText("Hello, everyone.")).toBeInTheDocument()
  );
});

test.todo("should find audio file", async () => {
  render(<Dictionary />);
  const user = userEvent.setup();
  const inputField = screen.getByRole("textbox");
  const button = screen.getByRole("button");
  await user.click(inputField);
  await user.type(inputField, "hello");
  await user.click(button);
  await waitFor(() =>
    expect(screen.getAllByTestId("audio-element")).toBeInTheDocument()
  );
});

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
