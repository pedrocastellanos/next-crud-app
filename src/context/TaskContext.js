"use client"
import useLocalStorage from '@/hooks/useLocalStorage'
import { createContext, useContext } from 'react'

export const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) throw new Error('useTasks must used within a provider')
    return context
}

const tasksExample = [
    {
        id: 1,
        title: "My first task",
        description: "Some task"
    }, {
        id: 2,
        title: "My second task",
        description: "Some task 2"
    }, {
        id: 3,
        title: "My third task",
        description: "Some task 3"
    }]

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useLocalStorage('tasks', [])

    const createTask = (title, description) => {
        setTasks([
            ...tasks,
            {
                id: Date.now().toString(),
                title,
                description
            }])
    }

    const deleteTask = (id) => setTasks([...tasks.filter(task => task.id !== id)])

    const updateTask = (id, newTask) => setTasks([...tasks.map(task => task.id === id ? { ...task, ...newTask } : task)])

    return <TaskContext.Provider value={{
        tasks,
        createTask,
        deleteTask,
        updateTask
    }}>
        {children}
    </TaskContext.Provider>
}