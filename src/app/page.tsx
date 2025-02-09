'use client'
import { useState } from "react";
import { Button } from "@/Components/Button";
import { Card } from "@/Components/Card";
import { Dropdown } from "@/Components/Dropdown";
import { Modal } from "@/Components/Modal";
import { SearchBar } from "@/Components/SearchBar";
import { tasks as initialTasks } from "@/mocks/InitialTask";
import { Priority, Status, Tasks } from "@/Types/types";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [tasks, setTasks] = useState(initialTasks);
  const [currentTask, setCurrentTask] = useState<{ title: string, description: string, priority: Priority, status: Status, dueDate: string } | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);

  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  const handlePriorityChange = (priority: string) => {
    setPriorityFilter(priority);
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleAddTask = (newTask: { title: string, description: string, priority: Priority, status: Status, dueDate: string }) => {
    if (currentTaskIndex !== null) {
      const updatedTasks: Tasks[] = [...tasks];
      updatedTasks[currentTaskIndex] = newTask;
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, newTask]);
    }
    setCurrentTask(null);
    setCurrentTaskIndex(null);
  };

  const handleEditTask = (index: number) => {
    setCurrentTask(tasks[index]);
    setCurrentTaskIndex(index);
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === '' || task.status === statusFilter) &&
    (priorityFilter === '' || task.priority === priorityFilter)
  );

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-between">
        <Dropdown onStatusChange={handleStatusChange} onPriorityChange={handlePriorityChange} />
        <div>
          <Button onClick={toggleModal} />
        </div>
      </div>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <Card 
            title={task.title} 
            description={task.description} 
            priority={task.priority} 
            status={task.status} 
            dueDate={task.dueDate} 
            key={index} 
            onDelete={() => handleDeleteTask(index)} 
            onEdit={() => handleEditTask(index)}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No tasks match the selected filters.
        </div>
      )}
      {isModalOpen &&
        <Modal closeModal={toggleModal} onAddTask={handleAddTask} task={currentTask} />
      }
    </div>
  );
}
