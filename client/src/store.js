import { configureStore, createSlice } from '@reduxjs/toolkit'

const tokenFromStorage = localStorage.getItem('token')

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: tokenFromStorage || null },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
      if (action.payload) localStorage.setItem('token', action.payload)
      else localStorage.removeItem('token')
    }
  }
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], loading: false, error: '' },
  reducers: {
    setTasks: (state, action) => { state.items = action.payload || [] },
    addTask: (state, action) => { state.items.unshift(action.payload) },
    updateTask: (state, action) => {
      const idx = state.items.findIndex(t => t._id === action.payload._id)
      if (idx !== -1) state.items[idx] = action.payload
    },
    removeTask: (state, action) => { state.items = state.items.filter(t => t._id !== action.payload) },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload || '' }
  }
})

export const { setToken } = authSlice.actions
export const { setTasks, addTask, updateTask, removeTask, setLoading, setError } = tasksSlice.actions

const store = configureStore({
  reducer: { auth: authSlice.reducer, tasks: tasksSlice.reducer }
})

export default store
