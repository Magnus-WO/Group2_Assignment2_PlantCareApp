import styles from "./PlantCard.module.css";

const PlantCard = ({ plantImage, plantName, onClick }) => {
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
        <h3 className={styles.plantName}>{plantName}</h3>
      </div>
    </li>
  );
};

export default PlantCard;
