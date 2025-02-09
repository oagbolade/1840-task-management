'use client'
import { useState } from "react";
import { Button } from "@/Components/Button";
import { Card } from "@/Components/Card";
import { Dropdown } from "@/Components/Dropdown";
import { Modal } from "@/Components/Modal";
import { SearchBar } from "@/Components/SearchBar";
import { tasks } from "@/mocks/InitialTask";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = (): void => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <SearchBar />
      <div className="flex justify-between">
        <Dropdown />
        <div>
          <Button onClick={toggleModal} />
        </div>
      </div>
      {tasks.map((task, index) => (
        <Card title={task.title} description={task.description} priority={task.priority} status={task.status} dueDate={task.dueDate} key={index} />
      ))}
      {isModalOpen &&
        <Modal closeModal={toggleModal} />
      }
    </div>
  );
}
