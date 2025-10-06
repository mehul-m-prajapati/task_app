'use client';

import { Plus, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import { Task } from "@/types/Task";

function TaskApp() {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([{
      id: '1',
      title: 'Complete project proposal',
      completed: false,
      label: 'work',
      dueDate: '2023-06-30',
      createdAt: new Date(),
  }]);

  const addTask = (title: string, label: 'work' | 'personal' | 'priority', dueDate: string) => {

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      label,
      dueDate,
      createdAt: new Date(),
    }

    setTasks(prev => [...prev, newTask]);
  }

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const updateTask = (id: string, title: string, label: 'work' | 'personal' | 'priority', dueDate: string) => {
    setTasks(prev => prev.map(t => t.id === id ? {...t, title: title.trim(), label, dueDate} : t));
  }

  return (
    <div className='min-h-screen p-8'>

        {/* Header */}
        <div className='flex items-center justify-between mb-12'>
            <h1 className="text-3xl font-semibold">Task App</h1>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
            </div>
        </div>

        {/* Main Content Card */}
        <div className=" rounded-3xl p-8 max-w-6xl mx-auto">

             {/* Content Header */}
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Your Tasks</h2>

                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="hover:bg-gray-400 px-6 py-3 cursor-pointer
                    rounded-xl font-medium flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Task
                </Button>
             </div>

             {/* Task Table */}
             <TaskTable
                tasks={tasks}
                onToggleTask={toggleTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
        </div>

        <TaskModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onAddTask={addTask}
        />

    </div>
  )
}

export default TaskApp
