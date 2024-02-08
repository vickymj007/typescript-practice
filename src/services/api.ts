import axios from "axios";
import { TodoList } from "../types";


const axiosInstance = axios.create({
    baseURL:"http://localhost:4000/todos",
})


export const getTodos = async ()=>{
    return (await axiosInstance<TodoList[]>('/')).data.sort((a,b)=> b.id-a.id)
}

export const addTodo = async (todo:TodoList)=>{
    return (await axiosInstance.post('/',todo)).data
}

export const completeTodo = async (todo:TodoList)=>{
    return (await axiosInstance.put(`/${todo.id}`,todo))
}

export const deleteTodo = async (id:number)=>{
    return (await axiosInstance.delete(`/${id}`))
}

export const updateTodo = async (todo:TodoList)=>{
    return (await axiosInstance.put(`/${todo.id}`,todo))
}