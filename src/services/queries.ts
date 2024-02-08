import { useMutation, useQuery } from "@tanstack/react-query";
import { addTodo, completeTodo, deleteTodo, getTodos, updateTodo } from "./api";
import {queryClient} from '../index'

export const useGetTodos = ()=>{
    return useQuery({
        queryKey:['todos'],
        queryFn: getTodos,
        refetchOnWindowFocus:false
    })
}

export const useAddTodo = ()=>{
    return useMutation({
        mutationFn:addTodo,
        onSuccess :()=>[
            queryClient.invalidateQueries({queryKey:['todos']})
        ]
    })
}

export const useCompleteTodo = ()=>{
    return useMutation({
        mutationFn:completeTodo,
        onSuccess :()=>[
            queryClient.invalidateQueries({queryKey:['todos']})
        ]
    })
}

export const useDeleteTodo = ()=>{
    return useMutation({
        mutationFn:deleteTodo,
        onSuccess :()=>[
            queryClient.invalidateQueries({queryKey:['todos']})
        ]
    })
}

export const useUpdateTodo = ()=>{
    return useMutation({
        mutationFn:updateTodo,
        onSuccess :()=>[
            queryClient.invalidateQueries({queryKey:['todos']})
        ]
    })
}