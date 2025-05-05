import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig.js";
import PlantCard from "../PlantCard/PlantCard.jsx";
import PlantItem from "../PlantItem/PlantItem";
import styles from "./PlantList.module.css";

const PlantList = ({ onPlantClick }) => {
  // Fetching data from database
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
        console.log("Error fetching data: ", error);
      }
    );
    return () => unsubscribe();
  }, []);

  // const fetchFromDatabase = async () => {
  //   try {
  //     const querySnapshot = await getDocs(
  //       collection(database, "plantGuidences")
  //     );
  //     const plantData = querySnapshot.docs.map((guidence) => ({
  //       id: guidence.id,
  //       ...guidence.data(),
  //     }));
  //     setDataFromDatabase(plantData);
  //     console.log(plantData);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // // UseEffect
  // useEffect(() => {
  //   fetchFromDatabase();
  // }, []);
  return (
    <ul className={styles.plantsList}>
      {dataFromDatabase &&
        dataFromDatabase.map((plant) => {
          return (
            <PlantCard
              key={plant.id}
              plantImage={plant.imageUrl || plant.image}
              plantName={plant.plantName}
              onClick={() => onPlantClick(plant)}
            />
          );
        })}
    </ul>
  );
};

export default PlantList;
