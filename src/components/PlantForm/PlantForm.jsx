import { addDoc, collection } from "firebase/firestore";
import { useRef, useState } from "react";
import { database } from "../../firebaseConfig";
// CSS import
import styles from "./PlantForm.module.css";
// Component imports
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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
    image: null,
    previewUrl: null,
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  // Ref variable
  const fileInputRef = useRef(null);

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

    // if (!plantDetails.imageUrl.trim()) {
    //   errors.imageUrl = "Image URL is required!";
    //   isFormValid = false;
    // } else if (!/\b(jpg|jpeg|png|gif|webp)\b/i.test(plantDetails.imageUrl)) {
    //   errors.imageUrl =
    //     "Image URL must contain a supported image format (jpg, jpeg, png, gif, webp)!";
    //   isFormValid = false;
    // } else {
    //   errors.imageUrl = "";
    // }
    if (!plantDetails.image) {
      errors.image = "Image is required!";
      isFormValid = false;
    } else {
      errors.image = "";
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setPlantDetails((prevDetails) => ({
        ...prevDetails,
        image: file,
        previewUrl,
      }));
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        image: "",
      }));
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        image: "Please select a valid image file!",
      }));
    }
  };

  // Remove the image preview
  const handleRemoveImage = () => {
    setPlantDetails((prevDetails) => ({
      ...prevDetails,
      image: null,
      previewUrl: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", plantDetails.image);
    formData.append("upload_preset", "upload_preset");
    formData.append("cloud_name", "diipbt2z6");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/diipbt2z6/upload",
        {
          method: "POST",
          body: formData,
        }
      ); //Should be hidden for API key purposes
      const data = await response.json();
      console.log("Image URL", data.secure_url);
      console.log("Public ID", data.public_id);

      setPlantDetails((prevDetails) => ({
        ...prevDetails,
        previewUrl: data.secure_url,
      }));

      setMessage("Image uploaded successfully!");
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error.message);
      return null;
    }
  };

  const storeToFirebase = async (data) => {
    try {
      const docRef = await addDoc(collection(database, "plantGuidences"), data);
      console.log(`Data has been added to database with id ${docRef.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = handleValidation();
    if (!isFormValid) {
      console.log("Form was not submitted");
      return;
    } else {
      try {
        const imageUrl = await uploadImage();
        const plantData = {
          ...plantDetails,
          image: imageUrl,
        };
        console.log("Plant details:", plantData);
        await storeToFirebase(plantData);
        console.log("Form was submitted successfully", plantDetails);

        closeModal();
      } catch (error) {
        console.error("Error submitting form:", error);
        setMessage("Form submission failed!");
      }
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

        {/* <div className={styles.formGroup}>
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
        </div> */}
        <div className={styles.formGroup}>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            ref={fileInputRef}
            className={styles.imageInput}
          />
          {plantDetails.previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={plantDetails.previewUrl}
                alt="Preview"
                className={styles.imagePreview}
              />
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
          )}
          {errorMessages && <ErrorMessage message={errorMessages.image} />}
        </div>
        {message && <ErrorMessage message={message} />}
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
