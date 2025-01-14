import React from 'react';
import './App.css';
import logoImage from './assets/Myoho-Therapy-final.jpg';
import profileImage from './assets/misae-profile.jpeg';

function App() {
  return (
    <div className="App">
      <header>
        <div className="header-container">
          <div className="logo">
            <img src={logoImage} alt="Myoho Therapy Logo" className="logo-image" />
          </div>
          <div className="header-right">
            <a href="tel:+17182905658" className="book-now-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg> Book Now</a>
            <div className="header-phone">+1 718-290-5658</div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-background">
            <img 
              src="https://images.unsplash.com/photo-1575089776834-8be34696ffb9?q=80&w=2574&auto=format&fit=crop"
              alt="Orlando Theme Parks"
              className="background-image"
            />
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <h1><span className="myoho">Myoho</span> <span className="therapy">Therapy</span></h1>
              <h2>Mobile Ortho-Bionomy & Massage Therapy</h2>
              <h3>Serving Greater Orlando Area</h3>
              <p>Professional massage therapy services brought directly to your location</p>
            </div>
            <div className="service-area-badge">
              <span>📍 Mobile Service</span>
              <p>I come to you in Orlando and surrounding areas</p>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d112430.75638357331!2d-81.37739721161!3d28.53821084501878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1704676418013!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Orlando Service Area Map"
              ></iframe>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section className="about" id="about">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="therapist-image">
              <img src={profileImage} alt="Masae Shimomoto, Licensed Massage Therapist" />
              <div className="therapist-caption">Masae Shimomoto, LMT</div>
            </div>
            <div className="about-text">
              <p>As a Licensed Massage Therapist in both Florida and New York, and a Registered Practitioner of Ortho-Bionomy®, I bring over a decade of experience to my practice. Since graduating from the prestigious Swedish Institute, I've been practicing massage therapy since March 2009, continuously expanding my therapeutic approaches.</p>
              
              <p>My practice integrates multiple modalities including Swedish massage, Shiatsu, Myofascial release, Trigger point manual therapy, Thai massage, and Ortho-Bionomy. This comprehensive approach helps facilitate the body's natural self-healing reflexes. In April 2021, I achieved registration as a Practitioner of Ortho-Bionomy, further enhancing my ability to provide effective, gentle therapeutic care.</p>
              
              <p>My path in therapeutic healing began with a deep fascination with the profound impact of human touch. Drawing from my Buddhist background, I've developed a holistic approach that recognizes the interconnectedness of body, mind, and environment. Through years of practice and continuous study, I've witnessed the transformative power of mindful, therapeutic touch.</p>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section className="story" id="story">
          <h2>Professional Timeline</h2>
          <p className="timeline-subtitle">A journey through my therapeutic practice and professional development</p>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2022 - Present</div>
              <div className="timeline-content">
                <h3>Myoho Therapy</h3>
                <h4>Orlando, Florida</h4>
                <p>Established private mobile massage therapy practice specializing in Ortho-Bionomy® and therapeutic massage.</p>
              </div>
            </div>

            <div className="timeline-milestone">
              <div className="milestone-content">
                <span className="milestone-date">April 2021</span>
                <h3>Registered Practitioner of Ortho-Bionomy®</h3>
                <p>Achieved professional registration as an Ortho-Bionomy® practitioner</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Feb - Dec 2021</div>
              <div className="timeline-content">
                <h3>Spavia</h3>
                <h4>Winter Park, Florida</h4>
                <p>Massage Therapist providing therapeutic massage services at Spavia Day Spa.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2016 - 2020</div>
              <div className="timeline-content">
                <h3>Complete Wellness</h3>
                <h4>New York</h4>
                <p>Massage Therapist collaborating with healthcare providers including chiropractors, podiatrists, and physical therapists.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2016 - 2018</div>
              <div className="timeline-content">
                <h3>Living Well Balanced</h3>
                <h4>New York</h4>
                <p>Massage Therapist working alongside chiropractors and wellness practitioners.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2009 - 2016</div>
              <div className="timeline-content">
                <h3>Liberty Wellness & Chiro</h3>
                <h4>New York</h4>
                <p>Massage Therapist specializing in treatment for no-fault cases and working collaboratively with chiropractic doctors.</p>
              </div>
            </div>

            <div className="timeline-milestone">
              <div className="milestone-content">
                <span className="milestone-date">March 2009</span>
                <h3>Swedish Institute Graduate</h3>
                <p>Graduated from the prestigious Swedish Institute College of Health Sciences certified in Massage Therapy</p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section className="services" id="services">
          <h2>My Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">❋</div>
              <h3>Ortho-Bionomy®</h3>
              <p>A gentle, holistic approach that works with your body's natural healing reflexes to release pain patterns and restore balance, embracing the body's innate wisdom.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">❊</div>
              <h3>Therapeutic Massage</h3>
              <p>Customized massage techniques combining Swedish, deep tissue, and myofascial release to address your specific needs and promote healing.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">✧</div>
              <h3>Holistic Healing</h3>
              <p>Integrating traditional Eastern wisdom with modern therapeutic techniques to support your body's natural healing abilities and restore balance to body, mind, and spirit.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">✤</div>
              <h3>Thai Massage</h3>
              <p>Traditional Thai massage incorporating stretching and pressure point therapy to improve flexibility and energy flow throughout the body.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">❉</div>
              <h3>Sports Massage</h3>
              <p>Targeted massage therapy designed for athletes and active individuals to enhance performance, prevent injuries, and speed up recovery.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">✺</div>
              <h3>Mobile Service</h3>
              <p>Convenient massage therapy brought to your location. Available throughout the Greater Orlando area for your comfort and convenience.</p>
            </div>
          </div>
        </section>

        <div className="section-divider"></div>

        <section className="contact" id="contact">
          <h2>Contact Me</h2>
          <div className="contact-info">
            <h3>Myoho <span className="therapy-text">Therapy</span></h3>
            <p className="clinician-name">Masae Shimomoto, LMT</p>
            <p>Professional Mobile Massage Therapy</p>
            <p>Serving Greater Orlando, Florida</p>
            <p>Licensed Massage Therapist & Ortho-Bionomy Practitioner</p>
            
            <div className="contact-buttons">
              <a href="tel:+1234567890" className="phone-button">📞 Call or Text</a>
              <div className="contact-divider">or send an email below</div>
            </div>
            
            <form className="contact-form">
              <div className="form-group">
                <input 
                  type="text" 
                  name="user_name" 
                  placeholder="Your Name" 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  name="user_email" 
                  placeholder="Your Email" 
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  rows="4" 
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
            <div className="contact-links">
              <a href="tel:+17182905658" className="contact-link">📞 +1 718-290-5658</a>
              <a href="mailto:masae.shimomoto@gmail.com" className="contact-link">✉️ myohotherapy@gmail.com</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Myoho Therapy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App; 