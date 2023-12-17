import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todoList, task = "write tests") {
    const taskInput = todoList.getByLabelText("Task:");
    fireEvent.change(taskInput, { target: { value: task }});

    const submitButton = todoList.getByText("Add a ToDo!");
    fireEvent.click(submitButton);
}

it("renders without crashing", () => {
    render(<TodoList />);
});

it("matches snapshot", () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("properly adds a new todo", () => {
    const list = render(<TodoList />);
    addTodo(list);

    // expect form clears input and renders todo on page
    expect(list.getByLabelText("Task:")).toHaveValue("");
    expect(list.getByText("write tests")).toBeInTheDocument();
    expect(list.getByText("Edit")).toBeInTheDocument();
    expect(list.getByText("X")).toBeInTheDocument();
});

it("can edit a todo", () => {
    const list = render(<TodoList />);
    addTodo(list);

    fireEvent.click(list.getByText("Edit"));

    const editInput = list.getByDisplayValue("write tests");
    fireEvent.change(editInput, { target: { value: "sleep" }});
    fireEvent.click(list.getByText("Update!"));

    // expect only edited updates to appear
    expect(list.getByText("sleep")).toBeInTheDocument();
    expect(list.queryByText("write tests")).not.toBeInTheDocument();
});

it("can delete a todo", () => {
    const list = render(<TodoList />);
    addTodo(list);

    fireEvent.click(list.getByText("X"));

    expect(list.queryByText("write tests")).not.toBeInTheDocument();
});