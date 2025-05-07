"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { json, text } from "stream/consumers";
import { get } from "http";


interface TodoType {
  text: string;
  status: boolean;
  id: number;
}

export default function Home() {

  const [todos, setTodos] = useState<TodoType[]>([]);
  const getTodos = () => {
    let temptodos = localStorage.getItem("todos");

    if (temptodos == null) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(temptodos));
    }
  }
  useEffect(() => {
    getTodos();
  }, [])
  const [newTodoText, setNewTodoText] = useState("");
  const addTodo = () => {
    if (newTodoText.length == 0) {
      return toast.error("Please enter a todo");
    }
    let localStorageTodos = localStorage.getItem("todos");
    let newTodoObj = {
      text: newTodoText,
      status: false,
      id: new Date().getTime()
    }
    if (localStorageTodos == null) {
      localStorage.setItem('todos', JSON.stringify([newTodoObj]));
    } else {
      let todos = JSON.parse(localStorageTodos);
      todos.push(newTodoObj);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    setNewTodoText("");
    getTodos();
  }
  const updateTodo = (id: number) => {
    let temptodos = localStorage.getItem('todos');
    if (temptodos) {
      let jsonparsetodo = JSON.parse(temptodos);

      let index = jsonparsetodo.findIndex((todo: TodoType) => todo.id === id);
      if (index !== -1) {
        jsonparsetodo[index].status = !jsonparsetodo[index].status;
        localStorage.setItem("todos", JSON.stringify(jsonparsetodo));
      }
    }

    getTodos();
  };
  const deleteTodo = (id: number) => {
    let temptodos = localStorage.getItem('todos');
    if (temptodos) {
      let jsonparsetodo = JSON.parse(temptodos);
      let updatedTodos = jsonparsetodo.filter((todo: TodoType) => todo.id !== id);

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
    getTodos();
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.outerPage}>
      <div className={styles.todoOut}>
        <div className={styles.section1}>
          <h1>Todo App</h1>
        </div>
        <div className={styles.todos}>
          {
            todos.length > 0 ? todos.map((todo) => {
              return (
                <div className={styles.todocard}>
                  <h2>{todo.text}</h2>
                  <svg
                    onClick={() => {
                      deleteTodo(todo.id)
                    }}

                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>


                  <svg
                    onClick={() => {
                      updateTodo(todo.id)
                    }}

                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>


                </div>
              )
            })
              :
              <div className={styles.noTodos}>
                <h3>No Todos</h3>
              </div>
          }
        </div>
        <button
          onClick={() => {
            setShowModal(true)
          }}
        >Create Todo</button>
        {
          showModal &&
          <div className={styles.createTodoModal}>
            <input type="text" placeholder="Todo Text"
              value={newTodoText} onChange={(e) => { setNewTodoText(e.target.value) }}
            />
            <button
              onClick={() => {
                addTodo()
                setShowModal(false)
              }}
            >+</button>
          </div>
        }
      </div></div>


  );
}
