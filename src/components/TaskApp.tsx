'use client';

import { Plus, User } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";

function TaskApp() {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
         <div className="bg-white rounded-3xl p-8 max-w-6xl mx-auto">

             {/* Content Header */}
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Your Tasks</h2>

                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-black hover:bg-gray-700
                    text-white px-6 py-3 cursor-pointer rounded-xl font-medium flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create Task
                </Button>
             </div>

             {/* Task Table */}
             <TaskTable />
         </div>

        <TaskModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

    </div>
  )
}

export default TaskApp
