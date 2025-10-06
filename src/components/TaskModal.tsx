'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle,
    DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (title: string, label: 'work' | 'personal' | 'priority', dueDate: string) => void;
}


function TaskModal({isOpen, onClose, onAddTask}: TaskModalProps) {

  const [title, setTitle] = useState('');
  const [label, setLabel] = useState<'work' | 'personal' | 'priority'>('work');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() && dueDate) {
        onAddTask(title, label, dueDate);
        setTitle('');
        setLabel('work');
        setDueDate('');
        onClose();
    }
  }

  const handleClose = () => {
    setTitle('');
    setLabel('work');
    setDueDate('');
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>

        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label className='mb-4' htmlFor="title">Title</Label>
                    <Input
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title..."
                    />
                </div>

                <div>
                    <Label className='mb-4' htmlFor='label'>Label</Label>
                    <Select
                        value={label}
                        onValueChange={(value: 'work' | 'personal' | 'priority') => setLabel(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="work">Work</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label className='mb-4' htmlFor="dueDate">Due Date</Label>
                    <Input
                        id="dueDate"
                        type="date"
                        className='w-[180px]'
                        // To make calendar icon white in dark theme
                        style={{
                            colorScheme: 'dark',
                        }}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="submit" className="hover:bg-gray-300 cursor-pointer">
                        Add
                    </Button>
                    <Button type="button" className='cursor-pointer'
                            variant="outline" onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </div>

            </form>

        </DialogContent>
    </Dialog>
  )
}

export default TaskModal
