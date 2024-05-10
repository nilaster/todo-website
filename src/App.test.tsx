import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import { App } from "./App";

test("renders header", () => {
  render(<App />);
  const headerElement = screen.getByText(/best task manager in the world/i);
  expect(headerElement).toBeInTheDocument();
});

test("renders create new task button", () => {
  render(<App />);
  const addTaskButton = screen.getByText(/create new task/i);
  expect(addTaskButton).toBeInTheDocument();
});

test("renders columns", () => {
  render(<App />);
  const notStartedColumn = screen.getByText(/not started/i);
  const inProgressColumn = screen.getByText(/in progress/i);
  const doneColumn = screen.getByText(/done/i);
  expect(notStartedColumn).toBeInTheDocument();
  expect(inProgressColumn).toBeInTheDocument();
  expect(doneColumn).toBeInTheDocument();
});
