import { useTasks } from "@/context/TaskContext"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"


export default function TaskCard({ task }) {
    const router = useRouter()
    const { deleteTask } = useTasks()

    const handleDelete = (e) => {
        e.stopPropagation()
        const confirm = window.confirm("Are you sure want to delete this task?")
        if (confirm) {
            deleteTask(task.id)
            toast.success("Task Deleted")
        }
    }
    return (
        <div
            onClick={() => router.push(`/edit/${task.id}`)}
            className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2"
        >
            <div className="flex justify-between">
                <h1>{task.title}</h1>
                <button className="bg-red-600 hover:bg-red-500 px-3 py-1 inline-flex items-center" onClick={handleDelete}>Delete</button>
            </div>
            <p className="text-gray-300">{task.description}</p>
        </div>
    )
}
