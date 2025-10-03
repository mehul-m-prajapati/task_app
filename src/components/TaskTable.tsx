'use client';
import { Task } from "@/types/Task";
import { Checkbox } from "./ui/checkbox";
import { cn } from '@/lib/utils';
import { PencilLine as Edit, Trash2, Save, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface TaskProps {
  title: string;
  label: 'work' | 'personal' | 'priority';
  dueDate: string;
}

interface TaskTableProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, title: string, label: 'work' | 'personal' | 'priority', dueDate: string) => void;
}

function TaskTable({tasks, onToggleTask, onDeleteTask, onUpdateTask}: TaskTableProps) {

  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TaskProps>({
    title: '',
    label: 'work',
    dueDate: '',
  });

  const editTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditForm({
        title: task.title,
        label: task.label,
        dueDate: task.dueDate,
    });
  }

  const getLabelColor = (label: string) => {

    switch (label) {
      case 'work':
        return 'bg-blue-100 text-blue-800 border border-blue-200';

      case 'personal':
        return 'bg-green-100 text-green-800 border border-green-200';

      case 'priority':
        return 'bg-red-100 text-red-800 border border-red-200';

      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6">

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 mb-6">
            <div className="col-span-1 border-r border-gray-600"></div>

            <div className="col-span-4 border-r border-gray-600">
                <h3 className="text-lg font-medium text-gray-600">Title</h3>
            </div>

            <div className="col-span-2 border-r border-gray-600">
                <h3 className="text-lg font-medium text-gray-600">Label</h3>
            </div>

            <div className="col-span-3 border-r border-gray-600">
                <h3 className="text-lg font-medium text-gray-600">Due Date</h3>
            </div>

            <div className="col-span-2 border-r border-gray-600">
                <h3 className="text-lg font-medium text-gray-600">Actions</h3>
            </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-4">
            {tasks.map(task => (
                <div key={task.id} className="grid grid-cols-12 gap-4 items-center py-4
                 border-b border-gray-100 last:border-b-0">

                    {/* Checkbox */}
                    <div className="col-span-1 border-r border-gray-600">
                        <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => onToggleTask(task.id)}
                            className="w-6 h-6 border-2 border-gray-300
                             data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                    </div>

                    {/* Title */}
                    <div className="col-span-4 border-r border-gray-600">
                        {editTaskId == task.id ? (
                            <Input
                                type="text"
                                value={editForm.title}
                                onChange={e => setEditForm({...editForm, title: e.target.value})}
                                className="font-medium border rounded px-2 py-1 w-full text-gray-900"
                                autoFocus
                             />
                        ) : (
                            <span className={cn(
                                "text-md font-medium",
                                task.completed ? "line-through text-gray-500" : "text-gray-900"
                            )}>
                                {task.title}
                            </span>
                        )}
                    </div>

                    {/* Label */}
                    <div className="col-span-2 border-r border-gray-600">
                        {editTaskId == task.id ? (
                            <select
                                value={editForm.label}
                                onChange={(e) => setEditForm({...editForm, label: e.target.value as any})}
                                className={cn(
                                  "rounded px-2 py-1",
                                  getLabelColor(editForm.label)
                                )}
                            >
                                <option value="work">work</option>
                                <option value="personal">personal</option>
                                <option value="priority">priority</option>
                            </select>
                        ) : (
                            <span className={cn(
                                "px-3 py-1 rounded-full text-sm font-medium",
                                getLabelColor(task.label)
                            )}>
                                {task.label}
                            </span>
                          )
                        }
                    </div>

                    {/* Due Date */}
                    <div className="col-span-3 border-r border-gray-600">
                        {editTaskId === task.id ? (
                            <Input
                                type="date"
                                value={editForm.dueDate}
                                onChange={(e) => setEditForm({...editForm, dueDate: e.target.value})}
                                className="border rounded px-2 py-1 w-full text-lg text-gray-700"
                            />
                        ) : (
                            <span className="text-lg text-gray-700">{task.dueDate}</span>
                          )
                        }
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center gap-2 border-r border-gray-600">

                        {editTaskId === task.id ? (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 hover:bg-gray-200"
                                onClick={() => {
                                  if (editForm.title.trim() && editForm.dueDate) {
                                    onUpdateTask(task.id, editForm.title.trim(), editForm.label, editForm.dueDate);
                                    setEditTaskId(null);
                                  }
                                  else {
                                    alert('Title and Due Date are required');
                                  }
                                }}
                              >
                                <Save className="w-4 h-4 text-gray-600" />
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 hover:bg-gray-200"
                                onClick={() => setEditTaskId(null)}
                              >
                                <CircleX className="w-4 h-4 text-gray-600" />
                              </Button>
                            </>
                        ) : (
                          <>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => editTask(task)}
                                className="w-8 h-8 p-0 hover:bg-gray-200"
                            >
                                <Edit className="w-4 h-4 text-gray-600" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDeleteTask(task.id)}
                                className="w-8 h-8 p-0 hover:bg-gray-200"
                            >
                                <Trash2 className="w-4 h-4 text-gray-600" />
                            </Button>
                          </>
                          )
                        }
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TaskTable
