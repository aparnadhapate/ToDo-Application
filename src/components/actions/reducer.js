import { actions } from "./actions";

const initialState = { todos: [] };

const reducer = (state = initialState, actionType) => {
  switch (actionType.type) {
    case actions.ADD_TODOSAPP_SUCCESS: {
      return {
        todos: [actionType.payload, ...state.todos],
      };
    }
    case actions.EDIT_TODOSAPP_SUCCESS: {
      const findIndex = state.todos.findIndex(
        (x) => x.createdAt === actionType.payload.createdAt
      );
      const todos = [...state.todos];
      todos[findIndex] = actionType.payload;
      todos[actionType.index] = actionType.todo;
      return {
        todos: todos,
      };
    }
    case actions.DELETE_TODOSAPP_SUCCESS: {
      const todos = state.todos.filter(
        (x, i) => x.createdAt !== actionType.payload
      );
      return {
        todos: todos,
      };
    }
    case actions.BULK_DELETE_SUCCESS: {
      console.log(state.todos);
      const todos = state.todos.filter((x) => {
        actionType.payload.forEach((element) => {
          return x.createdAt !== element;
        });
      });
      return {
        todos: todos,
      };
    }
    default:
      return state;
  }
};

export default reducer;
