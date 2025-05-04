import styles from "./PlantCard.module.css";

const PlantCard = ({ plantImage, plantName }) => {
  return (
    <li className={styles.plantCardContainer}>
      <div className={styles.plantImageContainer}>
        <img
          className={styles.plantImage}
          src={plantImage}
          alt={`Image of ${plantName}`}
        />
      </div>
      <h3 className={styles.plantName}>{plantName}</h3>
    </li>
  );
};

export default PlantCard;
