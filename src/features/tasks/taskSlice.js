import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  task: [],
  all_tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async (_, thunkAPI) => {
    try {
      const user_id = thunkAPI.getState().auth.user.data.id;
      return await taskService.getAllTasks(user_id);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTasks = createAsyncThunk("task/getAll", async (_, thunkAPI) => {
  try {
    const user_id = thunkAPI.getState().auth.user.data.id;
    const category_id = thunkAPI.getState().categories.category.id;
    return await taskService.getTasks(user_id, category_id);
  } catch (error) {
    const message =
      (error.message && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const editTask = createAsyncThunk(
  "task/edit",
  async ({ task_id, taskData }, thunkAPI) => {
    try {
      const user_id = thunkAPI.getState().auth.user.data.id;
      const category_id = thunkAPI.getState().categories.category.id;
      return await taskService.editTask(
        user_id,
        category_id,
        task_id,
        taskData
      );
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/create",
  async (taskData, thunkAPI) => {
    try {
      const user_id = thunkAPI.getState().auth.user.data.id;
      const category_id = thunkAPI.getState().categories.category.id;
      return await taskService.createTask(user_id, category_id, taskData);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (task_id, thunkAPI) => {
    try {
      const user_id = thunkAPI.getState().auth.user.data.id;
      const category_id = thunkAPI.getState().categories.category.id;
      return await taskService.deleteTask(user_id, category_id, task_id);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskCompletion = createAsyncThunk(
  "task/completion",
  async ({ task_id, completion_status }, thunkAPI) => {
    try {
      const user_id = thunkAPI.getState().auth.user.data.id;
      const category_id = thunkAPI.getState().categories.category.id;
      return await taskService.taskCompletion(
        user_id,
        category_id,
        task_id,
        completion_status
      );
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.all_tasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(taskCompletion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskCompletion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const existingTaskIndex = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        // state.tasks.push(action.payload);
        if (existingTaskIndex !== -1) {
          // If the task exists, update it with the new data
          state.tasks = state.tasks.map((task, index) =>
            index === existingTaskIndex ? action.payload : task
          );
        } else {
          // If the task doesn't exist, add it to the tasks array
          state.tasks.push(action.payload);
        }
      })
      .addCase(taskCompletion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
