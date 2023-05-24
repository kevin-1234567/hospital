import Navbar from './navbar';
import Carousel from './carousel';
import Footer from './footer';

const First = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <h4 className="caption">
        Effortlessly streamline your hospital operations with our advanced
        hospital management system.
      </h4>
      <br></br>

      <div class="testimonial-row">
        <div class="testimonial-container">
          <div class="testimonial">
            <p class="testimonial-text">
              "As the CEO of our esteemed healthcare organization, I am
              delighted to share my testimonial for the exceptional hospital
              management system we have implemented. This advanced solution has
              revolutionized our operations, enabling us to seamlessly manage
              and optimize every aspect of our hospital."
            </p>
            <p class="testimonial-author">- Kevin Babu Varkey, CEO</p>
          </div>
        </div>
        <div class="testimonial-container">
          <div class="testimonial">
            <p class="testimonial-text">
              "As the Chief Medical Officer of our esteemed healthcare
              organization, I am pleased to provide my testimonial for the
              remarkable hospital management system we have implemented. This
              cutting-edge solution has greatly transformed our hospital's
              efficiency and effectiveness in delivering exceptional patient
              care."
            </p>
            <p class="testimonial-author">
              - Asvin L Vinod, Chief Medical Officer
            </p>
          </div>
        </div>
      </div>
      <div class="services">
        <h2>Our Services</h2>
        <ul>
          <li>Patient Management</li>
          <li>Appointment Scheduling</li>
          <li>Inventory Management</li>
          <li>Bed and Resource Allocation</li>
          <li>Medical Records Management</li>
          <li>Compliance and Regulatory Tracking</li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};
export default First;
