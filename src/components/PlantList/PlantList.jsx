import styles from "./PlantList.module.css";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import PlantItem from "../PlantItem/PlantItem";

const PlantList = () => {
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
    } catch (error) {
      console.log(error.message);
    }
  };
  // UseEffect
  useEffect(() => {
    fetchFromDatabase();
  });
  return (
    <ul className={styles.plantsList}>
      {dataFromDatabase &&
        dataFromDatabase.map((plant) => {
          return (
            <PlantItem
              name={plant.plantName}
              scientificName={plant.scientificName}
              toxicity={plant.toxicity}
              soilType={plant.soilType}
              wateringSchedule={plant.wateringSchedule}
              humidity={plant.humidity}
              tempMax={plant.temperatureMax}
              tempMin={plant.temperatureMin}
              lightRequirement={plant.lightRequirement}
              image={plant.imageUrl}
            />
          );
        })}
    </ul>
  );
};

export default PlantList;
