import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig.js";
import PlantCard from "../PlantCard/PlantCard.jsx";
import PlantItem from "../PlantItem/PlantItem";
import styles from "./PlantList.module.css";

const PlantList = ({ onPlantClick }) => {
  // Fetching data from database
  const [dataFromDatabase, setDataFromDatabase] = useState([]);

  const fetchFromDatabase = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(database, "plantGuidences")
      );
      const plantData = querySnapshot.docs.map((guidence) => ({
        id: guidence.id,
        ...guidence.data(),
      }));
      setDataFromDatabase(plantData);
      console.log(plantData);
    } catch (error) {
      console.log(error.message);
    }
  };
  // UseEffect
  useEffect(() => {
    fetchFromDatabase();
  }, []);
  return (
    <ul className={styles.plantsList}>
      {dataFromDatabase &&
        dataFromDatabase.map((plant) => {
          return (
            // <PlantItem
            //   name={plant.plantName}
            //   scientificName={plant.scientificName}
            //   toxicity={plant.toxicity}
            //   soilType={plant.soilType}
            //   wateringSchedule={plant.wateringSchedule}
            //   humidity={plant.humidity}
            //   tempMax={plant.temperatureMax}
            //   tempMin={plant.temperatureMin}
            //   lightRequirement={plant.lightRequirement}
            //   image={plant.imageUrl}
            // />
            <PlantCard
              key={plant.id}
              plantImage={plant.imageUrl}
              plantName={plant.plantName}
              onClick={() => onPlantClick(plant)}
            />
          );
        })}
    </ul>
  );
};

export default PlantList;
