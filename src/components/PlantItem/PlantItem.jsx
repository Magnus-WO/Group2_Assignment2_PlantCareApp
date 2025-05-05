import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import plantStyles from "./PlantItem.module.css";

const PlantItem = ({
  plantName,
  toxicity,
  scientificName,
  wateringSchedule,
  lightRequirement,
  soilType,
  temperatureMin,
  temperatureMax,
  humidity,
  image,
  imageUrl,
  closeModal,
}) => {
  const capitalizeFirstLetter = (string) =>
    `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
  return (
    <li className={plantStyles.plantContainer}>
      <button className={plantStyles.closeModalButton} onClick={closeModal}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={plantStyles.closeButtonIcon}
        />
      </button>
      <div className={plantStyles.plantTitleContainer}>
        <div className={plantStyles.plantImageContainer}>
          <img
            src={image || imageUrl}
            alt={`Image of ${plantName}`}
            className={plantStyles.plantImage}
          />
        </div>
        <h4 className={plantStyles.plantTitle}>
          {capitalizeFirstLetter(plantName)}
        </h4>
      </div>
      <div className={plantStyles.plantDetailsContainer}>
        <div className={plantStyles.infoContainer}>
          <h4 className={plantStyles.header}>Scientific name</h4>
          <p className={plantStyles.info}>
            {capitalizeFirstLetter(scientificName)}
          </p>
        </div>
        <div className={plantStyles.infoContainer}>
          <h4 className={plantStyles.header}>Toxicity</h4>
          <p className={plantStyles.info}>{capitalizeFirstLetter(toxicity)}</p>
        </div>
        <div className={plantStyles.infoContainer}>
          <h4 className={plantStyles.header}>Soil type</h4>
          <p className={plantStyles.info}>{capitalizeFirstLetter(soilType)}</p>
        </div>
        <div className={plantStyles.infoContainer}>
          <h4 className={plantStyles.header}>Watering schedule</h4>
          <p className={plantStyles.info}>
            {capitalizeFirstLetter(wateringSchedule)}
          </p>
        </div>
        <div className={plantStyles.infoContainer}>
          <h4 className={plantStyles.header}>Humidity</h4>
          <p className={plantStyles.info}>{capitalizeFirstLetter(humidity)}</p>
        </div>
        <div className={plantStyles.infoContainer}>
          <h4 className={plantStyles.header}>Max temperature</h4>
          <p className={plantStyles.info}>{temperatureMax}</p>
        </div>
        <div className={plantStyles.infoContainer}>
          <h4 className={plantStyles.header}>Minimum temperature</h4>
          <p className={plantStyles.info}>{temperatureMin}</p>
        </div>
        <div className={plantStyles.infoContainer}>
          <h4 className={plantStyles.header}>Required light</h4>
          <p className={plantStyles.info}>
            {capitalizeFirstLetter(lightRequirement)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default PlantItem;
