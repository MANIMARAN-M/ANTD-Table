import React, { createContext, useReducer } from "react";
import { Provider } from "react-redux";

// Create context
export const TodosContext = createContext();

// set initial state here
const initialState = {
  isLoading: false,
  todos: [],
  errorMessage: "",
  filteredTodos: [],
  sortedTodos: [],
  SampleName: "Sample name",
};

// Our reduce fucntions
const reducer = (state, action) => {
  switch (action.type) {
    case "fetching_data":
      return {
        ...state,
        todos: action.payload,
        filteredTodos: action.payload,
      };
    case "fetching_error":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "filter_data":
      return {
        ...state,
        filteredTodos: action.payload,
      };
    case "sorted_data":
      return {
        ...state,
        sortedTodos: action.payload,
      };
    case "fetching_post_data":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        filteredTodos: [...state.filteredTodos, action.payload],
      };
    case "todo_progress_data":
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (action.payload.id === el.id) {
            return {
              ...el,
              completed: !el.completed,
            };
          }
          return el;
        }),
        filteredTodos: state.filteredTodos.map((el) => {
          if (action.payload.id === el.id) {
            return {
              ...el,
              completed: !el.completed,
            };
          }
          return el;
        }),
      };
    case "delete_data":
      return {
        ...state,
        filteredTodos: state.filteredTodos.filter(
          (el) => el.id !== action.payload.id
        ),
        todos: state.todos.filter((el) => el.id !== action.payload.id),
      };
    case "update_data":
      return {
        ...state,
        todos: state.todos.map((el) => {
          if (action.payload.id === el.id) {
            return {
              ...el,
              title: action.payload.title,
              completed: action.payload.completed,
            };
          }
          return el;
        }),
        filteredTodos: state.filteredTodos.map((el) => {
          if (action.payload.id === el.id) {
            return {
              ...el,
              title: action.payload.title,
              completed: action.payload.completed,
            };
          }
          return el;
        }),
      };

    default:
      return state;
  }
};

// export Provider using useContext hooks
export const TodosProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodosContext.Provider>
  );
};
