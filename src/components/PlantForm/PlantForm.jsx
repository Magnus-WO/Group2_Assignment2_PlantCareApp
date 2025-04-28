import Button from "../Button/Button";
import styles from "./PlantForm.module.css";

const PlantForm = ({ closeModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.plantFormContainer}>
      <form className={styles.plantForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="plantName">Plant name</label>
          <input
            type="text"
            name="plantName"
            id="plantName"
            placeholder="e.g. Golden bamboo"
          />
        </div>
        {/* -------------- */}

        <div className={styles.formGroup}>
          <label htmlFor="toxicity">Toxicity</label>
          <input
            type="text"
            name="toxicity"
            id="toxicity"
            placeholder="e.g. Non-toxic, Toxic to pets"
          />
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="scientificName">Scientific name</label>
          <input
            type="text"
            name="scientificName"
            id="scientificName"
            placeholder="e.g. Phyllostachys aurea"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="wateringSchedule">Watering schedule</label>
          <input
            type="text"
            name="wateringSchedule"
            id="wateringSchedule"
            placeholder="e.g. Once a week"
          />
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="lightRequirement">Light requirement</label>
          <input
            type="text"
            name="lightRequirement"
            id="lightRequirement"
            placeholder="e.g. Full sun, Partial shade"
          />
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="soilType">Soil type</label>
          <input
            type="text"
            name="soilType"
            id="soilType"
            placeholder="e.g. Well-draining soil"
          />
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="temperatureRange">Temperature range</label>
          <input
            type="text"
            name="temperatureRange"
            id="temperatureRange"
            placeholder="e.g. 18–24°C"
          />
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="humidity">Humidity</label>
          <input
            type="text"
            name="humidity"
            id="humidity"
            placeholder="e.g. High humidity"
          />
        </div>
        {/* -------------- */}

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="https://example.com/plant.jpg"
          />
        </div>
        {/* -------------- */}
        <div className={styles.buttonContainer}>
          <Button type="submit" className={styles.formButton}>
            Add Plant
          </Button>
          <Button
            type="button"
            className={styles.formButton}
            onClick={closeModal}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PlantForm;
