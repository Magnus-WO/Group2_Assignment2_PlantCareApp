import { useState } from "react";
import styles from "./App.module.css";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import PlantForm from "./components/PlantForm/PlantForm";
import PlantList from "./components/PlantList/PlantList";

function App() {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    // setEditingExpense(null); // Reset the editing state
  };

  return (
    <div className={styles.rootContainer}>
      <div className={styles.heroContainer}>
        <header>
          <h1 className={styles.title}>Plant Care</h1>
          <Button
            className={styles.openModalButton}
            onClick={openModal}
            ariaLabel="Open add plant form"
          >
            Add plant
          </Button>
          {isModalOpen && (
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              <PlantForm closeModal={closeModal} />
            </Modal>
          )}
        </header>
        <main>
          <PlantList></PlantList>
        </main>
      </div>
    </div>
  );
}

export default App;
