import React, { FormEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import {addTodo, updateTodo as updateTodoRedux,deleteTodo, completeTodo, fetchTodos} from '../redux/todoSlice'
import { TodoList } from "../types"
import Modal from "./Modal"





const Todo = () => {

    const dispatch = useDispatch<AppDispatch>()
    const {data: todos, isLoading,isAdding} = useSelector((state:RootState) => state.todos)

    const [newTodo, setNewTodo] = useState("")
    const [editTodo, setEditTodo] = useState<TodoList>()
    const [editTodoString, setEditTodoString] = useState<string>("")

    const [openModal,setOpenModal] = useState(false)


    useEffect(()=>{
        dispatch(fetchTodos())
    },[dispatch])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNewTodo(e.target.value)
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(newTodo){
            dispatch(addTodo({id: Date.now(), todo:newTodo,completed:false, edit:false}))
            setNewTodo("")
        } 
    }

    const handleComplete = (todo:TodoList)=>{
        dispatch(completeTodo({...todo,completed:!todo.completed}))
    }

    const handleUpdate = (e:FormEvent)=>{
        e.preventDefault()
        dispatch(updateTodoRedux([editTodo!,editTodoString]))
        setOpenModal(false)
    }

    const handleDelete = (id:number)=>{
        dispatch(deleteTodo(id))
    }

    const handleOpenModal = (todo:TodoList)=>{
        setEditTodo(todo)
        setEditTodoString(todo.todo)
        setOpenModal(true)
    }

  return (
    <>
        <form onSubmit={handleSubmit} className="max-w-lg shadow-lg border bg-white mx-auto my-10 p-6 rounded-md flex flex-col gap-2">
            <h1 className="text-l text-center text-2xl my-2">Create Todo</h1>
            <input onChange={handleChange} type="text" value={newTodo} className="rounded w-full py-1 px-2 border shadow focus:outline-blue-300"/>
            <button disabled={isAdding} className="rounded bg-blue-600 hover:bg-blue-800 transition-colors py-1 px-4 text-white disabled:opacity-50">{isAdding?"Adding Todo":"Add Todo"}</button>
        </form>
        {isLoading? <p className="text-center font-semibold">Loading...</p> : 
        todos.length !== 0 ? 
            <div className="flex flex-col gap-2 p-3 rounded-md mb-4 bg-white shadow-lg border w-full max-w-lg mx-auto">
                {todos.map(todo=>(
                    <div key={todo.id} className="flex align-middle gap-2 p-1">
                        <input className="w-4 cursor-pointer" onChange={()=>handleComplete(todo)} type="checkbox" checked={todo.completed}/>
                        <p className="flex-1 font-medium" style={{textDecoration:todo.completed? "line-through":""}}>{todo.todo}</p>
                        <div>
                            {!todo.completed && <button onClick={()=>handleOpenModal(todo)} className="hover:bg-blue-800 mr-2 transition rounded bg-blue-600 text-white px-4 py-1 text-sm cursor-pointer font-medium">Edit</button>}
                            <button onClick={()=>handleDelete(todo.id)} className="hover:bg-red-800 transition rounded bg-red-600 text-white px-4 py-1 text-sm cursor-pointer font-medium">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            
        : 
            <p className="text-center text-red-700">No Items to show</p>
        }
        <div id="popup-modal" tabIndex={-1} className="hidden absolute max-w-lg gap-2 rounded border p-4 shadow top-2/4 left-2/4 translate-y-[-50%] translate-x-[-50%]">
            
        </div>  
        <Modal open={openModal} close={setOpenModal} onSubmit={handleUpdate}>
            <>
                <p className="tex-center font-semibold">Update Todo</p>
                <input type="text" value={editTodoString} onChange={(e)=>setEditTodoString(e.target.value)} className="rounded w-full py-1 px-2 border shadow focus:outline-blue-300"/>
                <div>
                    <button type="submit" className="hover:bg-blue-800 mr-2 transition rounded bg-blue-600 text-white px-4 py-1 text-sm cursor-pointer font-medium">Update</button>
                    <button type="reset" onClick={()=>setOpenModal(false)} className="hover:bg-red-800 mr-2 transition rounded bg-red-600 text-white px-4 py-1 text-sm cursor-pointer font-medium">Cancel</button>
                </div>
            </>
        </Modal>
    </>
  )
}

export default Todo