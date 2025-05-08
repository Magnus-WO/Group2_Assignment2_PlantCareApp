import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import PlantCard from "../PlantCard/PlantCard";
import styles from "./PlantList.module.css";

const PlantList = ({ onPlantClick, searchTerm, toxicityFilter }) => {
  const [dataFromDatabase, setDataFromDatabase] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, "plantGuidences"),
      (snapshot) => {
        const plantData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataFromDatabase(plantData);
      },
      (error) => {
        console.error("❌ Firestore error:", error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredPlants = dataFromDatabase.filter((plant) => {
    const matchesSearch = plant.plantName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesToxicity =
      !toxicityFilter ||
      plant.toxicity?.toLowerCase() === toxicityFilter.toLowerCase();
    return matchesSearch && matchesToxicity;
  });

  return (
    <ul className={styles.plantsList}>
      {filteredPlants.map((plant) => (
        <PlantCard
          key={plant.id}
          plantImage={plant.imageUrl || plant.image}
          plantName={plant.plantName}
          onClick={() => onPlantClick(plant)}
        />
      ))}
    </ul>
  );
};

export default PlantList;
