import Navbar from "../components/Navbar";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">


      <Navbar />





      {/* Hero */}

      <section className="contact-hero">


        <span>
          Contact EyeAI
        </span>


        <h1>
          Let's Build The Future
          <br />
          Of <strong>Eye Healthcare</strong>
        </h1>


        <p>
          Have questions about our AI healthcare platform?
          Contact our team for support, collaboration,
          or technology inquiries.
        </p>


      </section>







      {/* Contact Content */}

      <section className="contact-container">



        {/* Information */}

        <div className="contact-info">


          <h2>
            Get In Touch
          </h2>


          <p>
            We are here to answer your questions and
            provide information about EyeAI technology.
          </p>



          <div className="contact-item">

            <h3>
              📧 Email
            </h3>

            <p>
              support@eyeai.com
            </p>

          </div>




          <div className="contact-item">

            <h3>
              📍 Location
            </h3>

            <p>
              AI Healthcare Research Center
            </p>

          </div>





          <div className="contact-item">

            <h3>
              🕒 Support
            </h3>

            <p>
              Available 24/7
            </p>

          </div>



        </div>








        {/* Form */}

        <div className="contact-form">


          <h2>
            Send Message
          </h2>



          <input
            type="text"
            placeholder="Your Name"
          />


          <input
            type="email"
            placeholder="Your Email"
          />



          <textarea
            placeholder="Your Message"
            rows="5"
          />



          <button>
            Send Message →
          </button>



        </div>




      </section>



    </div>
  );
}