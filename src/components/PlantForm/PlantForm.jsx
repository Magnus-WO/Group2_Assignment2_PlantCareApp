import { useState } from "react";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./PlantForm.module.css";

const PlantForm = ({ closeModal }) => {
  // State variables
  const [formData, setFormData] = useState({
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

  const handleFieldValidation = (name, value) => {
    const errors = { ...errorMessages };
    let isValid = true;

    if (!formData.plantName.trim()) {
      errors.plantName = "Plant name is required!";
      isValid = false;
    } else {
      errors.plantName = "";
    }

    if (!formData.toxicity.trim()) {
      errors.toxicity = "Toxicity is required!";
      isValid = false;
    } else {
      errors.toxicity = "";
    }

    if (!formData.scientificName.trim()) {
      errors.scientificName = "Scientific name is required!";
      isValid = false;
    } else {
      errors.scientificName = "";
    }

    if (!formData.wateringSchedule.trim()) {
      errors.wateringSchedule = "Watering schedule is required!";
      isValid = false;
    } else {
      errors.wateringSchedule = "";
    }

    if (!formData.lightRequirement.trim()) {
      errors.lightRequirement = "Light requirement is required!";
      isValid = false;
    } else {
      errors.lightRequirement = "";
    }

    if (!formData.soilType.trim()) {
      errors.soilType = "Soil type is required!";
      isValid = false;
    } else {
      errors.soilType = "";
    }

    if (!formData.temperatureMin.trim() || isNaN(formData.temperatureMin)) {
      errors.temperatureMin = "Min temperature is required!";
      isValid = false;
    } else {
      errors.temperatureMin = "";
    }

    if (!formData.temperatureMax.trim() || isNaN(formData.temperatureMax)) {
      errors.temperatureMax = "Max temperature is required!";
      isValid = false;
    } else {
      errors.temperatureMax = "";
    }

    if (!formData.humidity.trim()) {
      errors.humidity = "Humidity is required!";
      isValid = false;
    } else {
      errors.humidity = "";
    }

    if (!formData.imageUrl.trim()) {
      errors.imageUrl = "Image URL is required!";
      isValid = false;
    } else if (
      !/^https?:\/\/[\w.-]+\.[a-z]{2,}(\/[\w\-._~:/?#\[\]@!$&'()*+,;=%]*)*\.(jpg|jpeg|png|gif|webp)$/i.test(
        value
      )
    ) {
      errors.imageUrl = "Image URL must end with (jpg, jpeg, png, gif, webp)!";
      isValid = false;
    } else {
      errors.imageUrl = "";
    }

    setErrorMessages(errors);
  };

  const handleValidation = (e) => {
    let isValid = true;
    Object.entries(formData).forEach(([name, value]) => {
      handleFieldValidation(name, value);
      if (!value.trim()) isValid = false;
    });
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    handleFieldValidation(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();
    if (!isValid) return;
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
            value={formData.plantName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Golden bamboo"
          />
          {errorMessages && <ErrorMessage message={errorMessages.plantName} />}
        </div>
        {/* -------------- */}

        <div className={styles.formGroup}>
          <label htmlFor="toxicity">Toxicity</label>
          <input
            type="text"
            name="toxicity"
            id="toxicity"
            value={formData.toxicity}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Non-toxic, Toxic to pets"
          />
          {errorMessages && <ErrorMessage message={errorMessages.toxicity} />}
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="scientificName">Scientific name</label>
          <input
            type="text"
            name="scientificName"
            id="scientificName"
            value={formData.scientificName}
            onChange={handleChange}
            onBlur={handleBlur}
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
            value={formData.wateringSchedule}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Once a week"
          />
          {errorMessages && (
            <ErrorMessage message={errorMessages.wateringSchedule} />
          )}
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="lightRequirement">Light requirement</label>
          <input
            type="text"
            name="lightRequirement"
            id="lightRequirement"
            value={formData.lightRequirement}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Full sun, Partial shade"
          />
          {errorMessages && (
            <ErrorMessage message={errorMessages.lightRequirement} />
          )}
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="soilType">Soil type</label>
          <input
            type="text"
            name="soilType"
            id="soilType"
            value={formData.soilType}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Well-draining soil"
          />
          {errorMessages && <ErrorMessage message={errorMessages.soilType} />}
        </div>
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="temperatureRange">Temperature range</label>
          <div className={styles.temperatureInputs}>
            <input
              className={styles.temperatureInput}
              type="number"
              name="temperatureMin"
              id="temperatureMin"
              value={formData.temperatureMin}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Min"
            />

            <span>–</span>
            <input
              className={styles.temperatureInput}
              type="number"
              name="temperatureMax"
              id="temperatureMax"
              value={formData.temperatureMax}
              onChange={handleChange}
              onBlur={handleBlur}
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
        {/* -------------- */}
        <div className={styles.formGroup}>
          <label htmlFor="humidity">Humidity</label>
          <input
            type="text"
            name="humidity"
            id="humidity"
            value={formData.humidity}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. High humidity"
          />
          {errorMessages && <ErrorMessage message={errorMessages.humidity} />}
        </div>
        {/* -------------- */}

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://example.com/plant.jpg"
          />
          {errorMessages && <ErrorMessage message={errorMessages.imageUrl} />}
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
