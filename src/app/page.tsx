'use client'
import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { Button } from "@/Components/Button";
import { Card } from "@/Components/Card";
import { Dropdown } from "@/Components/Dropdown";
import { Modal } from "@/Components/Modal";
import { SearchBar } from "@/Components/SearchBar";
import { Priority, Status, Tasks } from "@/Types/types";
import { getTasksFromLocalStorage, saveTasksToLocalStorage } from "@/utils/localStorage";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { NavBar } from "@/Components/NavBar";
import { useAuth } from "@/Hooks/useAuth";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status>('');
  const [priorityFilter, setPriorityFilter] = useState<Priority>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [currentTask, setCurrentTask] = useState<Tasks | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [isViewingMode, setIsViewingMode] = useState<boolean>(false);
    const { isAuth } = useAuth();

  useEffect(() => {
    // TODO: convert this to use context state management
    // console.log('isAuth:', isAuth);
    // if (isAuth === false) {
    //   window.location.href = '/login';
    // }

    try {
      const storedTasks = getTasksFromLocalStorage();
      setTasks(storedTasks);
    } catch (error) {
      console.error("Error fetching tasks from local storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      saveTasksToLocalStorage(tasks);
    } catch (error) {
      console.error("Error saving tasks to local storage:", error);
    }
  }, [tasks]);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleStatusChange = useCallback((status: Status) => {
    setStatusFilter(status);
  }, []);

  const handlePriorityChange = useCallback((priority: Priority) => {
    setPriorityFilter(priority);
  }, []);

  const handleSortChange = useCallback((sortBy: string) => {
    setSortBy(sortBy);
  }, []);

  const handleDeleteTask = useCallback((index: number) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  }, []);

  const handleViewMode = useCallback((viewType: 'edit' | 'view') => {
    setIsViewingMode(viewType === 'view');
  }, []);

  const handleAddTask = useCallback((newTask: Tasks) => {
    setTasks(prevTasks => {
      if (currentTaskIndex !== null) {
        const updatedTasks = [...prevTasks];
        updatedTasks[currentTaskIndex] = newTask;
        return updatedTasks;
      }
      return [...prevTasks, newTask];
    });
    setCurrentTask(null);
    setCurrentTaskIndex(null);
  }, [currentTaskIndex]);

  const handleEditTask = useCallback((index: number) => {
    setCurrentTask(tasks[index]);
    setCurrentTaskIndex(index);
    handleViewMode('edit');
    setIsModalOpen(true);
  }, [tasks]);

  const handleViewTask = useCallback((index: number) => {
    setCurrentTask(tasks[index]);
    setCurrentTaskIndex(index);
    handleViewMode('view');
    setIsModalOpen(true);
  }, [tasks]);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    setTasks(prevTasks => {
      const reorderedTasks = [...prevTasks];
      const [movedTask] = reorderedTasks.splice(result.source.index, 1);
      reorderedTasks.splice(result?.destination?.index as number, 0, movedTask);
      return reorderedTasks;
    });
  }, []);

  const filteredTasks = useMemo(() => {
    const sortedTasks = [...tasks];

    if (sortBy === 'dueDate') {
      sortedTasks.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    } else if (sortBy === 'priority') {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      sortedTasks.sort((a, b) => priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]);
    }

    return sortedTasks.filter(task =>
      (task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === '' || task.status === statusFilter) &&
      (priorityFilter === '' || task.priority === priorityFilter)
    );
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortBy]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div className="max-w-2xl mx-auto mt-10 p-4 sm:p-6 lg:p-8">
        <SearchBar onSearch={handleSearch} />
        <div className="flex justify-between items-center">
          <Dropdown onStatusChange={handleStatusChange} onPriorityChange={handlePriorityChange} onSortChange={handleSortChange} />
          <div>
            <Button onClick={toggleModal} />
          </div>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.length === 0 ? (
                  <div className="text-center text-gray-500 mt-10">
                    No tasks have been created.
                  </div>
                ) : filteredTasks.length === 0 ? (
                  <div className="text-center text-gray-500 mt-10">
                    No tasks found based on filters.
                  </div>
                ) : (
                  filteredTasks.map((task, index) => (
                    <Draggable key={index} draggableId={String(index)} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            title={task.title}
                            description={task.description}
                            priority={task.priority}
                            status={task.status}
                            dueDate={task.dueDate}
                            onDelete={() => handleDeleteTask(index)}
                            onEdit={() => handleEditTask(index)}
                            onView={() => handleViewTask(index)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {isModalOpen &&
          <Modal
            closeModal={toggleModal}
            onAddTask={handleAddTask}
            task={currentTask}
            isViewMode={isViewingMode}
          />
        }
      </div>
    </Suspense>
  );
}
