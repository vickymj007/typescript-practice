import axios from "axios";


export const customFetch = axios.create({
    baseURL:"http://localhost:4000/todos",
})