import React, { FormEvent, ReactElement } from 'react'

interface ModalProps{
    open:boolean
    close:React.Dispatch<React.SetStateAction<boolean>>
    children:ReactElement
    onSubmit:(e:FormEvent)=>void
}

const Modal = ({open,close,children,onSubmit}:ModalProps) => {
  return (
    <div onClick={()=>close(false)} className={`fixed inset-0 flex justify-center items-center transition-colors 
    ${open? "visible bg-black/20":"invisible"}`}>
        <form onSubmit={(e)=>onSubmit(e)} onClick={(e)=>e.stopPropagation()} className={` bg-white rounded-xl py-10 max-w-96 w-full mx-4 flex flex-col justify-center items-center gap-3 shadow p-6 transition-all
        ${open?"scale-100 opacity-100":"scale-125 opacity-0"} h-fit`}>
            {children}
        </form>
    </div>
  )
}

export default Modal