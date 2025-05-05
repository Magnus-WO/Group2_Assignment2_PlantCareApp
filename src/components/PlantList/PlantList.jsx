import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig.js";
import PlantCard from "../PlantCard/PlantCard.jsx";
import styles from "./PlantList.module.css";

const PlantList = ({ onPlantClick }) => {
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
        console.error("Error fetching data: ", error);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ul className={styles.plantsList}>
      {dataFromDatabase.map((plant) => (
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
