
import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Predict.css";

export default function Predict() {
  const [image, setImage] = useState(null);

  const [patient, setPatient] = useState({
    fullName: "",
    age: "",
    gender: "",
    previousDiseases: "",
    medications: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  const handlePredict = async () => {
    if (!image) {
      alert("Please select an eye image.");
      return;
    }

    const formData = new FormData();

    const user = JSON.parse(
  localStorage.getItem("user")
);

if (!user) {
  alert("Please login first.");
  return;
}

formData.append(
  "UserId",
  user.id
);

    formData.append("FullName", patient.fullName);
    formData.append("Age", patient.age);
    formData.append("Gender", patient.gender);
    formData.append(
      "PreviousDiseases",
      patient.previousDiseases
    );
    formData.append(
      "Medications",
      patient.medications
    );
    formData.append("Image", image);

    try {
      const response = await fetch(
        "http://localhost:5194/api/Prediction",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      setResult({
        disease: data.disease,
        confidence: (
          data.confidenceValue * 100
        ).toFixed(2),
      });
    } catch (error) {
      console.log(error);

      setResult({
        disease: "API Error",
        confidence: 0,
      });
    }
  };

  return (
    <div className="predict-page">
      <Navbar />

      <main className="predict-container">

        {/* HEADER */}

        <div className="predict-header">

          <div className="predict-label">
            EYE AI · DIAGNOSTICS
          </div>

          <h1>
            AI Eye Disease
            <span> Prediction</span>
          </h1>

          <p>
            Upload an eye image and provide patient
            information to receive an AI-powered
            prediction.
          </p>

        </div>


        {/* MAIN GRID */}

        <div className="predict-grid">

          {/* LEFT SIDE */}

          <div className="predict-card">

            <div className="card-header">

              <div className="card-number">
                01
              </div>

              <div>
                <h2>Patient Information</h2>

                <p>
                  Enter the patient's basic information.
                </p>
              </div>

            </div>


            <div className="form-grid">

              {/* FULL NAME */}

              <div className="field full-width">

                <label>
                  Full Name
                </label>

                <input
                  name="fullName"
                  placeholder="Enter patient's full name"
                  value={patient.fullName}
                  onChange={handleChange}
                />

              </div>


              {/* AGE */}

              <div className="field">

                <label>
                  Age
                </label>

                <input
                  name="age"
                  type="number"
                  placeholder="Age"
                  value={patient.age}
                  onChange={handleChange}
                />

              </div>


              {/* GENDER */}

              <div className="field">

                <label>
                  Gender
                </label>

                <select
                  name="gender"
                  value={patient.gender}
                  onChange={handleChange}
                >

                  <option value="">
                    Select gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>

              </div>


              {/* PREVIOUS DISEASES */}

              <div className="field full-width">

                <label>
                  Previous Diseases
                </label>

                <textarea
                  name="previousDiseases"
                  placeholder="Enter previous eye diseases or medical history..."
                  value={patient.previousDiseases}
                  onChange={handleChange}
                />

              </div>


              {/* MEDICATIONS */}

              <div className="field full-width">

                <label>
                  Current Medications
                </label>

                <textarea
                  name="medications"
                  placeholder="Enter current medications..."
                  value={patient.medications}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="predict-card">

            <div className="card-header">

              <div className="card-number">
                02
              </div>

              <div>
                <h2>Eye Image</h2>

                <p>
                  Upload a clear retinal or eye image.
                </p>
              </div>

            </div>


            {/* UPLOAD */}

            <label className="upload-area">

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />

              <div className="upload-icon">

                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >

                  <path d="M12 16V4" />

                  <path d="M8 8l4-4 4 4" />

                  <path d="M4 14v4a2 2 0 002 2h12a2 2 0 002-2v-4" />

                </svg>

              </div>

              <h3>
                {image
                  ? image.name
                  : "Upload eye image"}
              </h3>

              <p>
                {image
                  ? "Image selected successfully"
                  : "PNG, JPG or JPEG · Max 10MB"}
              </p>

            </label>


            {/* PREVIEW */}

            {image && (
              <div className="image-preview">

                <img
                  src={URL.createObjectURL(image)}
                  alt="Eye preview"
                />

                <div className="preview-info">

                  <strong>
                    Selected image
                  </strong>

                  <span>
                    {image.name}
                  </span>

                </div>

              </div>
            )}


            {/* BUTTON */}

            <button
              className="predict-button"
              onClick={handlePredict}
            >

              <span>
                Start AI Prediction
              </span>

              <strong>
                →
              </strong>

            </button>


            {/* RESULT */}

            {result && (
              <div className="prediction-result">

                <div className="result-top">

                  <span>
                    AI ANALYSIS
                  </span>

                  <div className="result-status">
                    ● Complete
                  </div>

                </div>

                <div className="result-disease">

                  <small>
                    Predicted condition
                  </small>

                  <h3>
                    {result.disease}
                  </h3>

                </div>

                <div className="confidence">

                  <div className="confidence-heading">

                    <span>
                      Confidence
                    </span>

                    <strong>
                      {result.confidence}%
                    </strong>

                  </div>

                  <div className="confidence-bar">

                    <div
                      style={{
                        width: `${result.confidence}%`,
                      }}
                    />

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>


        {/* DISCLAIMER */}

        <div className="predict-disclaimer">

          <span>ⓘ</span>

          <p>
            AI predictions are intended for
            informational and research purposes only
            and should not replace professional medical
            diagnosis.
          </p>

        </div>

      </main>
    </div>
  );
}

