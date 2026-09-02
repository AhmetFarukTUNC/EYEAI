import Navbar from "../components/Navbar";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">


      <Navbar />





      {/* Hero */}

      <section className="about-hero">


        <span className="about-badge">
          About EyeAI
        </span>



        <h1>
          Advancing Eye Healthcare
          <br />
          Through
          <span> Artificial Intelligence</span>
        </h1>



        <p>
          EyeAI is an advanced healthcare platform that combines
          artificial intelligence, deep learning, and computer vision
          technologies to support modern eye health solutions.
        </p>


      </section>






      {/* Mission Vision */}

      <section className="mission-section">


        <div className="info-card">

          <h2>
            Our Mission
          </h2>


          <p>
            Our mission is to improve eye healthcare by developing
            intelligent AI solutions that help detect eye diseases
            faster and more efficiently.
          </p>


        </div>




        <div className="info-card">

          <h2>
            Our Vision
          </h2>


          <p>
            We aim to create next-generation healthcare systems
            where artificial intelligence supports doctors and
            improves patient experiences.
          </p>


        </div>


      </section>






      {/* Technology */}

      <section className="technology-section">


        <h2>
          Powered By Advanced Technologies
        </h2>



        <div className="technology-grid">



          <div className="technology-card">

            <div className="icon">
              🧠
            </div>


            <h3>
              Deep Learning
            </h3>


            <p>
              Advanced neural networks designed for medical image
              understanding and intelligent analysis.
            </p>


          </div>






          <div className="technology-card">


            <div className="icon">
              👁️
            </div>


            <h3>
              Computer Vision
            </h3>


            <p>
              AI models capable of analyzing visual information
              and identifying important patterns.
            </p>


          </div>






          <div className="technology-card">


            <div className="icon">
              🔒
            </div>


            <h3>
              Data Security
            </h3>


            <p>
              Secure architecture designed to protect healthcare
              information and patient privacy.
            </p>


          </div>



        </div>



      </section>







      {/* Workflow */}

      <section className="workflow-section">


        <h2>
          How EyeAI Works
        </h2>



        <div className="workflow-grid">



          <div className="step-card">

            <span>
              01
            </span>

            <h3>
              Image Processing
            </h3>


            <p>
              Medical images are prepared and optimized for AI models.
            </p>

          </div>





          <div className="step-card">


            <span>
              02
            </span>


            <h3>
              AI Analysis
            </h3>


            <p>
              Deep learning algorithms analyze image patterns.
            </p>


          </div>






          <div className="step-card">


            <span>
              03
            </span>


            <h3>
              Smart Results
            </h3>


            <p>
              The system provides intelligent healthcare insights.
            </p>


          </div>



        </div>



      </section>



    </div>
  );
}