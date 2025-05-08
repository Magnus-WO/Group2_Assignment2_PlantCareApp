import { useState } from "react";
import styles from "./App.module.css";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import PlantForm from "./components/PlantForm/PlantForm";
import PlantItem from "./components/PlantItem/PlantItem";
import PlantList from "./components/PlantList/PlantList";
import PlantFilter from "./components/PlantFilter/PlantFilter";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [toxicityFilter, setToxicityFilter] = useState("");

  const openFormModal = () => setIsModalOpen(true);
  const closeFormModal = () => setIsModalOpen(false);
  const openPlantModal = (plant) => setSelectedPlant(plant);
  const closePlantModal = () => setSelectedPlant(null);

  return (
    <div className={styles.rootContainer}>
      <header>
        <h1 className={styles.title}>Plant Care</h1>
        <Button
          className={styles.openModalButton}
          onClick={openFormModal}
          ariaLabel="Open add plant form"
        >
          Add plant
        </Button>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} closeModal={closeFormModal}>
            <PlantForm closeModal={closeFormModal} />
          </Modal>
        )}
      </header>

      <main>
        <PlantFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          toxicityFilter={toxicityFilter}
          setToxicityFilter={setToxicityFilter}
        />
        <PlantList
          onPlantClick={openPlantModal}
          searchTerm={searchTerm}
          toxicityFilter={toxicityFilter}
        />
      </main>

      {selectedPlant && (
        <Modal isOpen={true} closeModal={closePlantModal}>
          <PlantItem {...selectedPlant} closeModal={closePlantModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
