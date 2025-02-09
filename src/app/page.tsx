import { Card } from "@/Components/Card";
import { Dropdown } from "@/Components/Dropdown";
import { Modal } from "@/Components/Modal";
import { SearchBar } from "@/Components/SearchBar";

export default function Home() {
  return (
    <>
      <SearchBar />
      <Card />
      <Dropdown />
      <Modal />
    </>
  );
}
