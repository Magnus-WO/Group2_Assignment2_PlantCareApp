import { useState } from "react";
import plantStyles from "./PlantItem.module.css";

const PlantItem = ({
  name,
  scientificName,
  toxicity,
  soilType,
  wateringSchedule,
  humidity,
  tempMax,
  tempMin,
  lightRequirement,
  image,
}) => {
  return (
    <li>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Name</h3>
        <p className={plantStyles.info}>{name}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Scientific name</h3>
        <p className={plantStyles.info}>{scientificName}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Toxicity</h3>
        <p className={plantStyles.info}>{toxicity}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Soil type</h3>
        <p className={plantStyles.info}>{soilType}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Watering schedule</h3>
        <p className={plantStyles.info}>{wateringSchedule}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Humidity</h3>
        <p className={plantStyles.info}>{humidity}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Max temperature</h3>
        <p className={plantStyles.info}>{tempMax}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Minimum temperature</h3>
        <p className={plantStyles.info}>{tempMin}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Required light</h3>
        <p className={plantStyles.info}>{lightRequirement}</p>
      </div>
      <div className={plantStyles.infoContainer}>
        <h3 className={plantStyles.header}>Image</h3>
        <p className={plantStyles.info}>{image}</p>
      </div>
    </li>
  );
};

export default PlantItem;
