"use client"
import { useTasks } from "@/context/TaskContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"


export default function page({params}) {
  
  const router = useRouter()
  const {register, handleSubmit, formState: {errors}, setValue} = useForm()

  const {tasks, createTask, updateTask} = useTasks()
  
  

  useEffect(()=>{
    if(params.id){
      const taskFound = tasks.find(task=>task.id===params.id)
      if (taskFound) {
        setValue('title', taskFound.title)
        setValue('description', taskFound.description)
      }
    }
  },[])

  const onSubmit = handleSubmit((data)=>{
    if(params.id){
      updateTask(params.id, data)
      toast.success('Task Updated')
    } else{
      createTask(data.title, data.description)
      toast.success('Task Created')
    }
    router.push("/")
  })

  return (
    <div className="flex justify-center items-center h-full">
      <form onSubmit={onSubmit} className="bg-gray-700 p-10">
        <h2 className="text-center mb-3">New Task</h2>
      <input 
        placeholder="Write a title" 
        {...register("title", {required: true})}
        className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full" 
      />
      {errors.title && (
        <span className="block text-red-400 mb-2">
          This field is required
        </span>
      )}
      <textarea 
        name="description" 
        placeholder="Write a description" 
        {...register("description", {required: true})} 
        className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full" 
      >
      </textarea>
      {errors.description && (
        <span className="block text-red-400 mb-2">
          This field is required
        </span>
      )}
      <button className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity:30 block mx-auto mt-2">Save</button>
    </form>
    </div>
  )
}
