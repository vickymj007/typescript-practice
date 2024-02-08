import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TodoList } from "../types";
import { customFetch } from "../api/axios";

interface InitState{
    data:TodoList[] | []
    isLoading:boolean
    isAdding:boolean
}

const initialState:InitState = {
    data:[],
    isLoading:false,
    isAdding:false
}

export const fetchTodos = createAsyncThunk("todo/getTodo", async()=>{
    try {
        const response = await customFetch('/')
        return response.data
    } catch (error) {
        return error
    }
})

export const addTodo = createAsyncThunk("todo/addTodo", async(todo:TodoList)=>{
    try {
        const response = await customFetch.post(`/`,todo)
        return response.data
    } catch (error) {
        return error
    }
})

export const completeTodo = createAsyncThunk("todo/completeTodo", async(todo:TodoList,thunk)=>{
    try {
        const id = todo.id.toString()
        const response = await customFetch.patch(`/${id}`,todo)
        return response.data
    } catch (error) {
        return error
    }
})

export const activeTodo = createAsyncThunk("todo/activeTodo", async(todo:TodoList)=>{
    try {
        const id = todo.id.toString()
        const response = await customFetch.put(`/${id}`,todo)
        return response.data
    } catch (error) {
        return error
    }
})

export const updateTodo = createAsyncThunk("todo/updateTodo", async([todo,newTodo]:[TodoList,string],)=>{
    try {
        const id = todo.id.toString()
        const response = await customFetch.put(`/${id}`,{...todo,todo:newTodo})
        return response.data
    } catch (error) {
        return error
    }
})

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async(id:number)=>{
    try {
        const response = await customFetch.delete(`/${id}`)
        return response.data
    } catch (error) {
        return error
    }
})


const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchTodos.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(fetchTodos.fulfilled,(state,action)=>{
            state.data = action.payload.sort((a:TodoList,b:TodoList)=> b.id - a.id)
            state.isLoading = false
        })
        .addCase(addTodo.pending,(state)=>{
            state.isAdding = true
        })
        .addCase(addTodo.fulfilled,(state,action)=>{
            state.data = [...state.data, action.payload].sort((a:TodoList,b:TodoList)=> b.id - a.id)
            state.isAdding = false
        })
        .addCase(completeTodo.fulfilled,(state,action)=>{
            const newData = state.data.filter(todo => todo.id !== action.payload.id)
            state.data = [...newData,action.payload].sort((a:TodoList,b:TodoList)=> b.id - a.id)
        })
        .addCase(activeTodo.fulfilled,(state,action)=>{
            state.data = [...state.data, action.payload]
        })
        .addCase(updateTodo.fulfilled,(state,action)=>{
            const newState = state.data.filter(todo=> todo.id !== action.payload.id)
            state.data = [...newState, action.payload].sort((a:TodoList,b:TodoList)=> b.id - a.id)
        })
        .addCase(deleteTodo.fulfilled,(state,action)=>{
            state.data = state.data.filter(todo=> todo.id !== action.meta.arg)            
        })
    }
})


export default todoSlice.reducer