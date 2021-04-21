export const actions = {
  ADD_TODOSAPP_SUCCESS: "ADD_TODOSAPP_SUCCESS",
  EDIT_TODOSAPP_SUCCESS: "EDIT_TODOSAPP_SUCCESS",
  DELETE_TODOSAPP_SUCCESS: "DELETE_TODOSAPP_SUCCESS",
  BULK_DELETE_SUCCESS: "BULK_DELETE_SUCCESS ",
};

export const addTask = (todo) => (dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch({ type: actions.ADD_TODOSAPP_SUCCESS, payload: todo });
      resolve("success");
    }, 1000);
  });
};
export const editTask = (todo) => (dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch({ type: actions.EDIT_TODOSAPP_SUCCESS, payload: todo });
      resolve("success");
    }, 1000);
  });
};
export const deleteTask = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch({ type: actions.DELETE_TODOSAPP_SUCCESS, payload: data });
      resolve("success");
    }, 1000);
  });
};
export const bulkDeleteTask = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch({ type: actions.BULK_DELETE_SUCCESS, payload: data });
      resolve("success");
    }, 1000);
  });
};
