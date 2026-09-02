import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

<Navbar />



      {/* Hero */}
      <section className="hero">

        <div className="hero-text">

          <span className="badge">
            AI Powered Healthcare
          </span>


          <h1>
            The Future of
            <br />
            <span>Eye Health Intelligence</span>
          </h1>


          <p>
            An advanced eye health platform powered by deep learning
            technologies. Discover the future of healthcare with modern
            artificial intelligence models and computer vision systems.
          </p>


          <div className="actions">

            <a href="/predict">
              Try System →
            </a>

            <a href="/about" className="secondary">
              Explore Technology
            </a>

          </div>



          <div className="stats">

            <div>
              <strong>AI</strong>
              <span>Deep Learning</span>
            </div>


            <div>
              <strong>CV</strong>
              <span>Computer Vision</span>
            </div>


            <div>
              <strong>24/7</strong>
              <span>Smart Healthcare</span>
            </div>

          </div>


        </div>



        {/* Visual Area */}
        <div className="hero-image">

          <div className="circle"></div>


          <div className="ai-card">

            <div className="eye-icon">
              👁
            </div>


            <h3>
              Intelligent Eye Health
            </h3>


            <p>
              Artificial Intelligence
              <br />
              Medical Vision System
            </p>


            <div className="line"></div>


            <span>
              Future of Healthcare
            </span>


          </div>


        </div>


      </section>




      {/* Features */}
      <section className="features">


        <div className="feature-card">

          <h3>
            🧠 Deep Learning
          </h3>

          <p>
            Powerful image processing infrastructure based on advanced
            neural network technologies.
          </p>

        </div>



        <div className="feature-card">

          <h3>
            🔬 Computer Vision
          </h3>

          <p>
            Modern AI technology that extracts meaningful insights
            from medical images.
          </p>

        </div>



        <div className="feature-card">

          <h3>
            🔒 Secure Platform
          </h3>

          <p>
            A secure, reliable, and user-focused healthcare technology
            platform.
          </p>

        </div>


      </section>


    </div>
  );
}