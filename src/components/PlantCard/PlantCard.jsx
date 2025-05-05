import styles from "./PlantCard.module.css";

const PlantCard = ({ plantImage, plantName, onClick }) => {
  const capitalizeFirstLetter = (string) =>
    `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
  return (
    <li className={styles.plantCardContainer} onClick={onClick}>
      <div className={styles.plantCard}>
        <div className={styles.plantImageContainer}>
          <img
            className={styles.plantImage}
            src={plantImage}
            alt={`Image of ${plantName}`}
          />
        </div>
        <h3 className={styles.plantName}>{capitalizeFirstLetter(plantName)}</h3>
      </div>
    </li>
  );
};

export default PlantCard;
