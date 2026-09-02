import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./PatientList.css";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleDeletePatient = async (patientId) => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    navigate("/login");
    return;
  }

  const user = JSON.parse(storedUser);

  const confirmed = window.confirm(
    "Are you sure you want to delete this patient?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5194/api/Patient/${patientId}/user/${user.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to delete patient."
      );
    }

    // Silinen hastayı ekrandan kaldır
    setPatients((currentPatients) =>
      currentPatients.filter(
        (patient) => patient.id !== patientId
      )
    );

  } catch (error) {
    console.error("Delete patient error:", error);

    alert(
      error.message ||
      "Could not delete patient."
    );
  }
};

  const API_URL = "http://localhost:5194";

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        // Kullanıcı giriş yapmamışsa login'e gönder
        if (!storedUser) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(storedUser);

        if (!user?.id) {
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        // Sadece giriş yapan kullanıcının hastalarını getir
        const response = await fetch(
          `${API_URL}/api/Patient/user/${user.id}`
        );

        if (response.status === 404) {
          setError("User not found.");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load patients.");
        }

        const data = await response.json();

        setPatients(data);
      } catch (err) {
        console.error("Patient list error:", err);
        setError("Could not load patient list.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [navigate]);

  // En son prediction'ı bul
  const getLatestPrediction = (predictions) => {
    if (!predictions || predictions.length === 0) {
      return null;
    }

    return [...predictions].sort(
      (a, b) =>
        new Date(b.createdDate) -
        new Date(a.createdDate)
    )[0];
  };

  return (
    <div className="patient-page">

      <Navbar />

      <main className="patient-container">

        {/* ==============================
            HEADER
        ============================== */}

        <div className="patient-header">

          <div>
            <span className="patient-label">
              EYE AI
            </span>

            <h1>
              Patient <em>List.</em>
            </h1>

            <p>
              Manage and review patients associated
              with your account.
            </p>
          </div>

          <div className="patient-count">
            <strong>
              {patients.length}
            </strong>

            <span>
              Patients
            </span>
          </div>

        </div>


        {/* ==============================
            LOADING
        ============================== */}

        {loading && (
          <div className="patient-status">
            Loading patients...
          </div>
        )}


        {/* ==============================
            ERROR
        ============================== */}

        {!loading && error && (
          <div className="patient-status error">
            {error}
          </div>
        )}


        {/* ==============================
            EMPTY
        ============================== */}

        {!loading &&
          !error &&
          patients.length === 0 && (

            <div className="patient-empty">

              <div className="empty-icon">
                +
              </div>

              <h2>
                No patients yet
              </h2>

              <p>
                Start an AI prediction to create
                your first patient.
              </p>

              <button
                onClick={() => navigate("/predict")}
              >
                Start Prediction →
              </button>

            </div>
          )}


        {/* ==============================
            PATIENT LIST
        ============================== */}

        {!loading &&
          !error &&
          patients.length > 0 && (

            <div className="patient-grid">

              {patients.map((patient) => {

                const latestPrediction =
                  getLatestPrediction(
                    patient.predictions
                  );

                return (

                  <div
                    className="patient-card"
                    key={patient.id}
                  >

                    {/* ==========================
                        ANALYZED IMAGE
                    ========================== */}

                    {latestPrediction?.imagePath ? (

                      <div className="patient-image-wrapper">

                        <img
                          src={`${API_URL}${latestPrediction.imagePath}`}
                          alt={`${patient.fullName} eye analysis`}
                          className="patient-image"
                        />
                        <br />
                        <br /><br /><br />
                        <br /><br /><br />
                        <br /><br /><br />
                        <br /><br /><br />
                        <br /><br />
                        

                      </div>

                    ) : (

                      <div className="patient-image-placeholder">

                        <span>
                          No image
                        </span>

                      </div>

                    )}


                    {/* ==========================
                        CARD CONTENT
                    ========================== */}

                    <div className="patient-card-content">

                      {/* CARD TOP */}

                      <div className="patient-card-top">

                        <div className="patient-avatar" style={{ textAlign: "center"}}  >
                          {patient.fullName
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div>

                          <h2>
                            {patient.fullName}
                          </h2>

                          <span>
                            Patient #{patient.id}
                          </span>

                        </div>

                      </div>


                      {/* ==========================
                          BASIC INFORMATION
                      ========================== */}

                      <div className="patient-info">

                        <div>

                          <small>
                            Age
                          </small>

                          <strong>
                            {patient.age}
                          </strong>

                        </div>


                        <div>

                          <small>
                            Gender
                          </small>

                          <strong>
                            {patient.gender}
                          </strong>

                        </div>

                      </div>


                      {/* ==========================
                          MEDICAL INFORMATION
                      ========================== */}

                      <div className="patient-medical">

                        <div>

                          <small>
                            Previous Diseases
                          </small>

                          <p>
                            {patient.previousDiseases ||
                              "None reported"}
                          </p>

                        </div>


                        <div>

                          <small>
                            Medications
                          </small>

                          <p>
                            {patient.medications ||
                              "None reported"}
                          </p>

                        </div>

                      </div>


                      {/* ==========================
                          AI PREDICTION
                      ========================== */}

                      <div className="prediction-history">

                        <small>
                          Latest AI Prediction
                        </small>


                        {latestPrediction ? (

                          <div className="prediction-result">

                            <div>
<span>
                                AI Diagnosis= 
                              </span>
                              <strong>
                                 {
                                  latestPrediction.diseaseResult
                                 }
                              </strong>

                              

                            </div>


                            <div className="confidence">

                              

                              <span>
                                Confidence=
                              </span>

                              <strong>%
                                {(
                                  latestPrediction.confidence *
                                  100
                                ).toFixed(2)}
                                
                              </strong>

                            </div>

                          </div>

                        ) : (

                          <div className="no-prediction">
                            No prediction available
                          </div>

                        )}

                      </div>

                      {latestPrediction && (
  <div className="prediction-date">
    {new Date(
      latestPrediction.createdDate
    ).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    )}
  </div>
)}

<div className="patient-card-actions">

  <button
    className="patient-delete-button"
    onClick={() =>
      handleDeletePatient(patient.id)
    }
  >
    Delete Patient
  </button>

</div>


                      {/* ==========================
                          DATE
                      ========================== */}

                      {latestPrediction && (

                        <div className="prediction-date">

                          Analyzed on{" "}

                          {new Date(
                            latestPrediction.createdDate
                          ).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            }
                          )}

                        </div>

                      )}

                    </div>

                  </div>

                );

              })}

            </div>

          )}

      </main>

    </div>
  );
}