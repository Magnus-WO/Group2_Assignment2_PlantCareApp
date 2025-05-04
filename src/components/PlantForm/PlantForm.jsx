import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { database } from "../../firebaseConfig";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./PlantForm.module.css";

const PlantForm = ({ closeModal }) => {
  const [plantDetails, setPlantDetails] = useState({
    plantName: "",
    toxicity: "",
    scientificName: "",
    wateringSchedule: "",
    lightRequirement: "",
    soilType: "",
    temperatureMin: "",
    temperatureMax: "",
    humidity: "",
    imageUrl: "",
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleValidation = () => {
    const errors = { ...errorMessages };
    let isFormValid = true;

    if (!plantDetails.plantName.trim()) {
      errors.plantName = "Plant name is required!";
      isFormValid = false;
    } else {
      errors.plantName = "";
    }

    if (!plantDetails.toxicity.trim()) {
      errors.toxicity = "Toxicity is required!";
      isFormValid = false;
    } else {
      errors.toxicity = "";
    }

    if (!plantDetails.scientificName.trim()) {
      errors.scientificName = "Scientific name is required!";
      isFormValid = false;
    } else {
      errors.scientificName = "";
    }

    if (!plantDetails.wateringSchedule.trim()) {
      errors.wateringSchedule = "Watering schedule is required!";
      isFormValid = false;
    } else {
      errors.wateringSchedule = "";
    }

    if (!plantDetails.lightRequirement.trim()) {
      errors.lightRequirement = "Light requirement is required!";
      isFormValid = false;
    } else {
      errors.lightRequirement = "";
    }

    if (!plantDetails.soilType.trim()) {
      errors.soilType = "Soil type is required!";
      isFormValid = false;
    } else {
      errors.soilType = "";
    }

    if (
      !plantDetails.temperatureMin.trim() ||
      isNaN(plantDetails.temperatureMin)
    ) {
      errors.temperatureMin = "Min temperature is required!";
      isFormValid = false;
    } else {
      errors.temperatureMin = "";
    }

    if (
      !plantDetails.temperatureMax.trim() ||
      isNaN(plantDetails.temperatureMax)
    ) {
      errors.temperatureMax = "Max temperature is required!";
      isFormValid = false;
    } else {
      errors.temperatureMax = "";
    }

    if (!plantDetails.humidity.trim()) {
      errors.humidity = "Humidity is required!";
      isFormValid = false;
    } else {
      errors.humidity = "";
    }

    if (!plantDetails.imageUrl.trim()) {
      errors.imageUrl = "Image URL is required!";
      isFormValid = false;
    } else if (!/\b(jpg|jpeg|png|gif|webp)\b/i.test(plantDetails.imageUrl)) {
      errors.imageUrl =
        "Image URL must contain a supported image format (jpg, jpeg, png, gif, webp)!";
      isFormValid = false;
    } else {
      errors.imageUrl = "";
    }

    setErrorMessages(errors);
    setIsValid(isFormValid);
    return isFormValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessages((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const storeToFirebase = async (data) => {
    try {
      const docRef = await addDoc(collection(database, "plantGuidences"), data);
      console.log(`Data has been added to database with id ${docRef.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = handleValidation();
    if (!isFormValid) {
      console.log("Form was not submitted");
      return;
    } else {
      console.log("Form was submitted successfully", plantDetails);
      storeToFirebase(plantDetails);
      closeModal();
    }
  };

  return (
    <div className={styles.plantFormContainer}>
      <h2 className={styles.formTitle}>Add plant</h2>
      <form className={styles.plantForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="plantName">Plant name</label>
          <input
            type="text"
            name="plantName"
            id="plantName"
            value={plantDetails.plantName}
            onChange={handleChange}
            placeholder="e.g. Golden bamboo"
          />
          {errorMessages && <ErrorMessage message={errorMessages.plantName} />}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="toxicity">Toxicity</label>
          <input
            type="text"
            name="toxicity"
            id="toxicity"
            value={plantDetails.toxicity}
            onChange={handleChange}
            placeholder="e.g. Non-toxic, Toxic to pets"
          />
          {errorMessages && <ErrorMessage message={errorMessages.toxicity} />}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="scientificName">Scientific name</label>
          <input
            type="text"
            name="scientificName"
            id="scientificName"
            value={plantDetails.scientificName}
            onChange={handleChange}
            placeholder="e.g. Phyllostachys aurea"
          />
          {errorMessages && (
            <ErrorMessage message={errorMessages.scientificName} />
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="wateringSchedule">Watering schedule</label>
          <input
            type="text"
            name="wateringSchedule"
            id="wateringSchedule"
            value={plantDetails.wateringSchedule}
            onChange={handleChange}
            placeholder="e.g. Once a week"
          />
          {errorMessages && (
            <ErrorMessage message={errorMessages.wateringSchedule} />
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lightRequirement">Light requirement</label>
          <input
            type="text"
            name="lightRequirement"
            id="lightRequirement"
            value={plantDetails.lightRequirement}
            onChange={handleChange}
            placeholder="e.g. Full sun, Partial shade"
          />
          {errorMessages && (
            <ErrorMessage message={errorMessages.lightRequirement} />
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="soilType">Soil type</label>
          <input
            type="text"
            name="soilType"
            id="soilType"
            value={plantDetails.soilType}
            onChange={handleChange}
            placeholder="e.g. Well-draining soil"
          />
          {errorMessages && <ErrorMessage message={errorMessages.soilType} />}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="temperatureRange">Temperature range</label>
          <div className={styles.temperatureInputs}>
            <input
              className={styles.temperatureInput}
              type="number"
              name="temperatureMin"
              id="temperatureMin"
              value={plantDetails.temperatureMin}
              onChange={handleChange}
              placeholder="Min"
            />
            <span>–</span>
            <input
              className={styles.temperatureInput}
              type="number"
              name="temperatureMax"
              id="temperatureMax"
              value={plantDetails.temperatureMax}
              onChange={handleChange}
              placeholder="Max"
            />
          </div>
          <div className={styles.temperatureErrorContainer}>
            {errorMessages && (
              <ErrorMessage message={errorMessages.temperatureMin} />
            )}
            {errorMessages && (
              <ErrorMessage message={errorMessages.temperatureMax} />
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="humidity">Humidity</label>
          <input
            type="text"
            name="humidity"
            id="humidity"
            value={plantDetails.humidity}
            onChange={handleChange}
            placeholder="e.g. High humidity"
          />
          {errorMessages && <ErrorMessage message={errorMessages.humidity} />}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={plantDetails.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/plant.jpg"
          />
          {errorMessages && <ErrorMessage message={errorMessages.imageUrl} />}
        </div>

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
