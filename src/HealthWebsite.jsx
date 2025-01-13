// src/HealthWebsite.js
import React, { useState, useEffect } from 'react';
import { Phone, Mail, Calendar, ArrowRight, ChevronDown, ArrowLeft, Instagram, Facebook } from 'lucide-react';
import Card from './components/ui/card/Card';
import Button from './components/ui/button/Button';
import heroBackground from './assets/hero-background.jpg';
import logo from './assets/logo.jpg';
import lisaCummins from './assets/lisa-cummins.avif';
import visaniImage from './assets/image.png';
import emailjs from '@emailjs/browser';

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @media (max-width: 330px) {
    .nav-book-button {
      font-size: 0.7rem !important;
      padding: 0.25rem 0.5rem !important;
    }
    .nav-book-button svg {
      width: 14px !important;
      height: 14px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

const HealthWebsite = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hoveredNavLink, setHoveredNavLink] = useState(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredContactLink, setHoveredContactLink] = useState(null);
  const [isContactButtonHovered, setIsContactButtonHovered] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const cliniciansSection = document.querySelector('#clinicians-section');
      if (cliniciansSection) {
        const rect = cliniciansSection.getBoundingClientRect();
        setShowScrollIndicator(rect.top > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTeam = () => {
    const cliniciansSection = document.querySelector('#clinicians-section');
    if (cliniciansSection) {
      const offset = 100;
      const elementPosition = cliniciansSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1200; // Reduced from 2000ms to 1200ms for faster scroll
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smoother animation
        const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        
        window.scrollTo(0, startPosition + distance * ease(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  };

  const clinicians = [
    {
      name: "Lisa Cummins",
      title: "Physiotherapist",
      shortDescription: "Specialized in musculoskeletal rehabilitation and advanced therapeutic exercise techniques for optimal recovery.",
      focus: "Pain-free movement & functional recovery",
      credentials: "PT, HE",
      education: "Double degree in Physical Therapy and Health Education - Florida International University (1999)",
      expertise: [
        "Musculoskeletal & Neurological Rehabilitation",
        "Neurac Method™ Therapy",
        "Ergonomic Assessment & Workplace Design",
        "Home Visit Physiotherapy",
        "Healthcare Management & Consulting"
      ],
      detailedDescription: [
        "Specialized therapeutic exercise using the Neurac Method™ for pain-free motion",
        "Expert in biomechanics and occupational movement assessment",
        "Customized home visit programs for limited mobility patients",
        "Workplace ergonomic optimization and consulting",
        "Healthcare facility setup and improvement consulting"
      ]
    },
    {
      name: "Visani Wijesiriwardana",
      title: "Physiotherapist",
      shortDescription: "Expert in comprehensive physiotherapy with specialized focus on musculoskeletal rehabilitation and sports therapy.",
      focus: "Comprehensive rehabilitation & sports therapy",
      credentials: "BSc(Hons), Dip. Exercise & Sports Sciences, HCPC, CPAM, SLMC",
      education: "BSc(Hons) in Physiotherapy, Diploma in Exercise & Sports Sciences",
      expertise: [
        "Musculoskeletal & Neurological Rehabilitation",
        "Sports Physiotherapy",
        "Cardiorespiratory Rehabilitation",
        "Pediatric and Geriatric Physiotherapy",
        "Home Visit Physiotherapy",
        "Neurac Method™ Therapy"
      ],
      detailedDescription: [
        "Manual Therapy including IASTM, Cupping, and Trigger point dry needling",
        "Therapeutic exercises and Neurac Method™ for pain-free motion",
        "Cardiorespiratory care and rehabilitation",
        "Sports Injury management and Rehabilitation",
        "Post-Surgical Physiotherapy Management",
        "Exercise and Wellness Programs",
        "Ergonomic Assessment & Workplace Design"
      ]
    }
  ];

  const services = [
    {
      title: "Musculoskeletal & Neuromuscular Rehabilitation",
      description: "Specialized rehabilitation using advanced techniques for musculoskeletal conditions and neuromuscular disorders, with personalized treatment plans for optimal recovery.",
      icon: "🦾"
    },
    {
      title: "Neurac Method™ Therapy",
      description: "Advanced treatment focusing on restoring functional and pain-free movement patterns through high-level neuromuscular ",
      descriptionHighlight: "Neurac Method™",
      descriptionEnd: " activation, targeting root causes rather than just symptoms.",
      icon: "🧠"
    },
    {
      title: "Therapeutic Exercise & Rebounding",
      description: "Specialized exercise programs incorporating ",
      descriptionHighlight: "bellicon®",
      descriptionEnd: " rebounding therapy for proprioception, balance, core strength, and lymphatic flow enhancement.",
      icon: "⚡"
    },
    {
      title: "Holistic Wellness",
      description: "Comprehensive approach viewing each patient as a whole, combining traditional and modern techniques for complete wellness and recovery.",
      icon: "🌿"
    },
    {
      title: "Ergonomic Assessment",
      description: "Expert evaluation of office and home workstations using biomechanical principles, with immediate adjustments for optimal comfort and productivity.",
      icon: "💺"
    },
    {
      title: "Post-Operative Care",
      description: "Specialized rehabilitation programs for post-surgical recovery, ensuring optimal healing and return to function.",
      icon: "🏥"
    },
    {
      title: "Home Health Visits",
      description: "Personalized therapy sessions in the comfort of your home, ideal for limited mobility patients or those preferring home-based care.",
      icon: "🏠"
    },
    {
      title: "Spinal Health",
      description: "Comprehensive spinal care including balancing and neuromuscular activation techniques for optimal spinal health and function.",
      icon: "🔄"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      await emailjs.send(
        'Contact Form Email',
        'template_wyfr0ic',
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'info@islandcare.ky'
        },
        'tIHVeMU2SSMxIKSjp'
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <img src={logo} alt="Island Care Health" style={styles.navLogo} />
        </div>
        <div style={styles.navRight}>
          <a href="https://wa.me/13459256677" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button
              className="nav-book-button"
              style={{
                ...styles.navButton,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#c53030';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#e53e3e';
              }}
            >
              <Calendar style={styles.heroButtonIcon} />
              Book Now
            </Button>
          </a>
          <a
            href="tel:1-345-925-6677"
            style={{
              ...styles.navLink,
              ...(hoveredNavLink === 'phone' ? styles.navLinkHover : {}),
            }}
            onMouseEnter={() => setHoveredNavLink('phone')}
            onMouseLeave={() => setHoveredNavLink(null)}
          >
            +1 345 925 6677
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroTextBubble}>
            <h1 style={styles.heroTitle}>
              Modern Healthcare,
              <br />
              <span style={styles.heroTitleHighlight}>Personalized</span> Approach
            </h1>
            <p style={styles.heroParagraph}>
              Experience exceptional care at our state-of-the-art clinic,
              where modern & holistic science meets personalized wellness.
            </p>
            <div style={styles.heroButtons}>
              <a href="https://wa.me/13459256677" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button
                  style={{
                    ...styles.heroButton,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#c53030';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#e53e3e';
                  }}
                >
                  Book Consultation
                </Button>
              </a>
              <div style={styles.appointmentInfo}>
                <span style={styles.heroHomeVisit}>🏠 Home visits available across Grand Cayman</span>
                <div style={styles.socialLinks}>
                  <span style={styles.socialText}>Follow us:</span>
                  <a 
                    href="https://www.instagram.com/islandcarehealthphysio/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.socialLink}
                  >
                    <Instagram size={18} />
                  </a>
                  <a 
                    href="https://www.facebook.com/people/Island-Care-Health-Boutique-Physiotherapy/100064244141220/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.socialLink}
                  >
                    <Facebook size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={styles.scrollIndicator}
          onClick={scrollToTeam}
        >
          <ChevronDown style={styles.scrollArrow} />
          <span style={styles.scrollText}>Meet Our Team</span>
        </div>
      </section>

      {/* Clinicians Section */}
      <section id="clinicians-section" style={styles.cliniciansSection}>
        <div style={styles.cliniciansHeader}>
          <h2 style={styles.cliniciansTitle}>Our Expert Clinicians</h2>
          <p style={styles.cliniciansSubtitle}>
            Dedicated professionals committed to your recovery and well-being
          </p>
        </div>
        <div style={styles.cliniciansGrid}>
          {clinicians.map((clinician, index) => (
            <div 
              key={index} 
              style={styles.clinicianCardContainer}
              onClick={() => {
                setFlippedCards(prev => {
                  if (prev.includes(index)) {
                    return prev.filter(i => i !== index);
                  } else {
                    return [...prev, index];
                  }
                });
              }}
            >
              <div style={{
                ...styles.clinicianCardInner,
                transform: flippedCards.includes(index) ? 'rotateY(180deg)' : 'rotateY(0)',
              }}>
                {/* Front of card */}
                <div style={{
                  ...styles.clinicianCardFront,
                  transform: 'rotateY(0deg)',
                  backfaceVisibility: 'hidden',
                }}>
                  <div style={styles.clinicianImageContainer}>
                    <img
                      src={index === 0 ? lisaCummins : visaniImage}
                      alt={clinician.name}
                      style={styles.clinicianImage}
                    />
                  </div>
                  <div style={styles.clinicianInfo}>
                    <h3 style={styles.clinicianName}>{clinician.name}</h3>
                    <p style={styles.clinicianCredentials}>{clinician.credentials}</p>
                    <h4 style={styles.clinicianTitle}>{clinician.title}</h4>
                    <p style={styles.clinicianFocus}>{clinician.focus}</p>
                    <p style={styles.clinicianDescription}>{clinician.shortDescription}</p>
                    <div style={styles.clinicianLearnMore}>
                      <span>Click to see full profile</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
                {/* Back of card */}
                <div style={{
                  ...styles.clinicianCardBack,
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}>
                  <div style={styles.clinicianBackContent}>
                    <div style={styles.clinicianBackHeader}>
                      <h3 style={styles.clinicianBackName}>{clinician.name}</h3>
                      <p style={styles.clinicianBackEducation}>{clinician.education}</p>
                    </div>
                    <div style={styles.clinicianBackSection}>
                      <h4 style={styles.clinicianBackSubtitle}>Areas of Expertise</h4>
                      <ul style={styles.clinicianBackList}>
                        {clinician.expertise.map((item, i) => (
                          <li key={i} style={styles.clinicianBackListItem}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={styles.clinicianBackSection}>
                      <h4 style={styles.clinicianBackSubtitle}>Specialized Services</h4>
                      <ul style={styles.clinicianBackDetailsList}>
                        {clinician.detailedDescription.map((item, i) => (
                          <li key={i} style={styles.clinicianBackDetailsItem}>
                            <span style={styles.bulletPoint}>•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section style={styles.servicesSection}>
        <div style={styles.servicesHeader}>
          <h2 style={styles.servicesTitle}>Our Services</h2>
          <p style={styles.servicesSubtitle}>
            Comprehensive wellness solutions tailored to your unique needs
          </p>
        </div>
        <div style={styles.servicesGrid}>
          {services.map((service, index) => (
            <Card
              key={index}
              style={{
                ...styles.serviceCard,
                ...(hoveredService === index ? styles.serviceCardHover : {}),
              }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div style={styles.serviceIcon}>{service.icon}</div>
              <h3 style={styles.serviceTitle}>{service.title}</h3>
              <p style={styles.serviceDescription}>
                {service.description}
                {service.descriptionHighlight && (
                  <>
                    <span style={{ color: '#c53030', fontWeight: '700' }}>{service.descriptionHighlight}</span>
                    {service.descriptionEnd}
                  </>
                )}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section style={styles.locationSection}>
        <div style={styles.locationWrapper}>
          <div style={styles.locationHeader}>
            <h2 style={styles.locationTitle}>Visit Us</h2>
            <p style={styles.locationSubtitle}>
              Located in Countryside Shopping Village, Savannah
            </p>
          </div>
          <div style={styles.locationContent}>
            <div style={styles.locationMapContainer}>
              <div style={styles.locationMap}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.8076456647847!2d-81.30025702570371!3d19.273422186979843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f2589f5860751c7%3A0x2d3158e79d240ec8!2sIsland%20Care%20Health%2C%20Boutique%20Physiotherapy%20and%20Chiropractic%20Care!5e0!3m2!1sen!2s!4v1704169744635!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>
            <div style={styles.locationAddress}>
              <p style={styles.locationClinicName}>Island Care Health</p>
              <p style={styles.locationAddressText}>Countryside Shopping Village</p>
              <p style={styles.locationAddressText}>33 Hirst Rd, Savannah KY1-1506</p>
              <p style={styles.locationAddressText}>Cayman Islands</p>
              <div style={styles.openingHoursBox}>
                <p style={styles.openingHoursText}>Open 7:00 AM - 7:00 PM</p>
                <p style={styles.openingHoursText}>7 Days a Week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={styles.contactSection}>
        <div style={styles.contactWrapper}>
          <div style={styles.contactHeader}>
            <h2 style={styles.contactTitle}>Get in Touch</h2>
            <p style={styles.contactSubtitle}>
              We're here to help with any questions you may have
            </p>
          </div>
          <form style={styles.contactForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              style={styles.contactInput}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              style={styles.contactInput}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Message"
              style={styles.contactTextarea}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <Button
              type="submit"
              style={{
                ...styles.contactButton,
                backgroundColor: isContactButtonHovered ? '#c53030' : '#e53e3e',
                opacity: formStatus === 'sending' ? 0.7 : 1,
                cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={() => setIsContactButtonHovered(true)}
              onMouseLeave={() => setIsContactButtonHovered(false)}
              disabled={formStatus === 'sending'}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </Button>
            {formStatus === 'success' && (
              <p style={styles.formStatusSuccess}>Message sent successfully!</p>
            )}
            {formStatus === 'error' && (
              <p style={styles.formStatusError}>Error sending message. Please try again.</p>
            )}
          </form>

          <div style={styles.contactInfo}>
            <a
              href="tel:1-345-925-6677"
              style={{
                ...styles.contactLink,
                ...(hoveredContactLink === 'phone' ? styles.contactLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredContactLink('phone')}
              onMouseLeave={() => setHoveredContactLink(null)}
            >
              <Phone style={styles.contactIcon} />
              <span>+1 345 925 6677</span>
            </a>
            <a
              href="mailto:info@islandcare.ky"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.contactLink,
                ...(hoveredContactLink === 'email' ? styles.contactLinkHover : {}),
              }}
              onMouseEnter={() => setHoveredContactLink('email')}
              onMouseLeave={() => setHoveredContactLink(null)}
            >
              <Mail style={styles.contactIcon} />
              <span>info@islandcare.ky</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© {new Date().getFullYear()} Island Care Health. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    fontFamily: 'Arial, sans-serif',
  },
  nav: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '50',
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #e53e3e',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    '@media (max-width: 380px)': {
      padding: '0.5rem 1rem',
      height: '60px',
    },
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flex: '1',
  },
  navLogo: {
    height: '75px',
    width: 'auto',
    objectFit: 'contain',
    '@media (max-width: 376px)': {
      height: '55px',
    },
  },
  navRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '1rem',
    },
  },
  navLink: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em',
    color: '#4A5568',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    textAlign: 'center',
    '@media (min-width: 768px)': {
      fontSize: '0.75rem',
      marginTop: 0,
    },
    '@media (max-width: 767px)': {
      fontSize: '0.65rem',
      color: '#666',
      marginTop: '0.25rem',
      width: '100%',
    },
  },
  navLinkHover: {
    color: '#e53e3e',
  },
  navButton: {
    backgroundColor: '#e53e3e',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '0.9rem',
    '@media (max-width: 376px)': {
      fontSize: '0.85rem',
      padding: '0.4rem 0.9rem',
    },
    '@media (max-width: 330px)': {
      fontSize: '0.75rem',
      padding: '0.35rem 0.7rem',
    },
  },
  heroButtonIcon: {
    marginRight: '0.5rem',
    width: '1.25rem',
    height: '1.25rem',
  },
  heroSection: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #f9fafb, #ffffff)',
    padding: '0 1.5rem',
    textAlign: 'center',
    paddingTop: '100px',
    '@media (min-width: 768px)': {
      padding: '120px 1.5rem 4rem',
    },
    '@media (max-width: 380px)': {
      padding: '90px 1rem 2rem',
      minHeight: 'calc(100vh - 60px)',
    },
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.5,
    zIndex: 0,
  },
  heroContent: {
    maxWidth: '700px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    '@media (min-width: 768px)': {
      maxWidth: '768px',
    },
    '@media (max-width: 380px)': {
      maxWidth: '100%',
      padding: '1rem 0',
    },
  },
  heroTextBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    boxSizing: 'border-box',
    '@media (max-width: 380px)': {
      padding: '1.5rem',
      maxWidth: '100%',
      margin: '0',
      borderRadius: '0.75rem',
    },
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '300',
    lineHeight: '1.2',
    letterSpacing: '-0.025em',
    color: '#1a202c',
    '@media (min-width: 768px)': {
      fontSize: '3.5rem',
      lineHeight: '1.25',
    },
    '@media (max-width: 376px)': {
      fontSize: '1.75rem',
      lineHeight: '1.2',
    },
  },
  heroTitleHighlight: {
    color: '#e53e3e',
  },
  heroParagraph: {
    fontSize: '1rem',
    color: '#2d3748',
    fontWeight: '300',
    letterSpacing: '0.05em',
    marginBottom: '1.5rem',
    maxWidth: '600px',
    '@media (min-width: 768px)': {
      fontSize: '1.25rem',
      marginBottom: '2rem',
    },
    '@media (max-width: 376px)': {
      fontSize: '0.85rem',
      marginBottom: '1rem',
      maxWidth: '100%',
    },
  },
  heroButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    '@media (min-width: 768px)': {
      gap: '1rem',
    },
  },
  heroButton: {
    backgroundColor: '#e53e3e',
    color: '#ffffff',
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '9999px',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '@media (min-width: 768px)': {
      padding: '1.5rem 2rem',
      fontSize: '1.125rem',
    },
    '@media (max-width: 380px)': {
      padding: '0.75rem 1.25rem',
      fontSize: '0.9rem',
    },
  },
  heroAppointment: {
    fontSize: '0.875rem',
    color: '#a0aec0',
    letterSpacing: '0.05em',
  },
  scrollIndicator: {
    position: 'relative',
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    zIndex: 20,
    transition: 'opacity 0.3s ease',
    animation: 'bounce 2s infinite',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '0.75rem 1.5rem',
    borderRadius: '1rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  },
  scrollArrow: {
    color: '#e53e3e',
    width: '32px',
    height: '32px',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(5px)',
    },
  },
  scrollText: {
    color: '#4A5568',
    fontSize: '0.875rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    whiteSpace: 'nowrap',
  },
  cliniciansSection: {
    padding: '2rem 1rem',
    backgroundColor: '#f7fafc',
  },
  cliniciansHeader: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (max-width: 768px)': {
      marginBottom: '2rem',
    },
    '@media (max-width: 380px)': {
      marginBottom: '1.5rem',
    },
  },
  cliniciansTitle: {
    fontSize: '2.5rem',
    fontWeight: '300',
    letterSpacing: '-0.025em',
    color: '#1a202c',
    marginBottom: '1rem',
  },
  cliniciansSubtitle: {
    fontSize: '1rem',
    color: '#a0aec0',
    maxWidth: '32rem',
    margin: '0 auto',
  },
  cliniciansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 380px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      maxWidth: '250px',
      margin: '0 auto',
      padding: '0',
    },
  },
  clinicianCardContainer: {
    perspective: '1000px',
    cursor: 'pointer',
    height: '650px',
    width: '100%',
    '@media (max-width: 768px)': {
      height: '620px',
    },
    '@media (max-width: 380px)': {
      height: '600px',
      width: '250px',
    },
  },
  clinicianCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
  },
  clinicianCardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: '2rem',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
  },
  clinicianCardBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: '1.5rem',
    transform: 'rotateY(180deg)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicianBackContent: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem 0',
    boxSizing: 'border-box',
    position: 'relative',
    '@media (max-width: 380px)': {
      width: '95%',
      padding: '0.35rem 0',
      gap: '0.1rem',
    },
    '@media (max-width: 375px)': {
      padding: '0.25rem 0',
      gap: '0.05rem',
    },
  },
  clinicianBackHeader: {
    textAlign: 'center',
    marginBottom: '0.5rem',
    borderBottom: '2px solid #e53e3e',
    width: '100%',
    paddingBottom: '0.5rem',
    '@media (max-width: 380px)': {
      marginBottom: '0.25rem',
      paddingBottom: '0.15rem',
    },
  },
  clinicianBackName: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: '0.25rem',
    '@media (max-width: 380px)': {
      fontSize: '0.9rem',
      marginBottom: '0.1rem',
    },
  },
  clinicianBackEducation: {
    fontSize: '0.75rem',
    color: '#718096',
    lineHeight: '1.2',
    textAlign: 'center',
    '@media (max-width: 380px)': {
      fontSize: '0.6rem',
      lineHeight: '1',
      padding: '0 0.25rem',
    },
  },
  clinicianBackSection: {
    width: '100%',
    marginBottom: '1.5rem',
    textAlign: 'center',
    padding: '0 0.5rem',
    '@media (min-width: 768px)': {
      marginBottom: '2rem',
    },
    '@media (max-width: 380px)': {
      marginBottom: '0.15rem',
      fontSize: '0.75rem',
      padding: '0 0.15rem',
    },
    '@media (max-width: 375px)': {
      marginBottom: '0.1rem',
      padding: '0 0.1rem',
    },
  },
  clinicianBackSubtitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: '0.75rem',
    '@media (min-width: 768px)': {
      fontSize: '1rem',
      marginBottom: '1rem',
    },
    '@media (max-width: 380px)': {
      fontSize: '0.75rem',
      marginBottom: '0.15rem',
    },
  },
  clinicianBackList: {
    listStyle: 'none',
    padding: '0',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    maxWidth: '95%',
    '@media (max-width: 380px)': {
      gap: '0.1rem',
    },
    '@media (max-width: 375px)': {
      gap: '0.05rem',
    },
  },
  clinicianBackDetailsList: {
    listStyle: 'none',
    padding: '0',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    alignItems: 'center',
    maxWidth: '90%',
  },
  clinicianBackListItem: {
    fontSize: '0.8rem',
    color: '#4A5568',
    lineHeight: '1.4',
    textAlign: 'center',
    fontWeight: '400',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    '@media (max-width: 380px)': {
      fontSize: '0.6rem',
      lineHeight: '1',
      gap: '0.1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.55rem',
      gap: '0.05rem',
    },
  },
  clinicianBackDetailsItem: {
    fontSize: '0.8rem',
    color: '#4A5568',
    lineHeight: '1.4',
    textAlign: 'center',
    fontWeight: '400',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.35rem',
    padding: '0.1rem 0',
    width: '100%',
    '@media (max-width: 380px)': {
      fontSize: '0.6rem',
      lineHeight: '1',
      padding: '0.05rem 0',
      gap: '0.1rem',
    },
    '@media (max-width: 375px)': {
      fontSize: '0.55rem',
      padding: '0.025rem 0',
      gap: '0.05rem',
    },
  },
  bulletPoint: {
    color: '#e53e3e',
    fontSize: '1rem',
    lineHeight: '1',
    flexShrink: 0,
    marginTop: '1px',
  },
  clinicianImageContainer: {
    width: '100%',
    height: '350px',
    overflow: 'hidden',
    position: 'relative',
    borderTopLeftRadius: '2rem',
    borderTopRightRadius: '2rem',
    '@media (max-width: 768px)': {
      height: '300px',
    },
    '@media (max-width: 380px)': {
      height: '220px',
    },
  },
  clinicianImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 20%',
  },
  clinicianInfo: {
    padding: '1.5rem',
    backgroundColor: '#ffffff',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  clinicianName: {
    fontSize: '1.5rem',
    fontWeight: '500',
    color: '#1a202c',
    letterSpacing: '-0.025em',
    width: '100%',
    textAlign: 'center',
    marginBottom: '0.25rem',
  },
  clinicianCredentials: {
    fontSize: '0.75rem',
    color: '#e53e3e',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    width: '100%',
    textAlign: 'center',
    marginBottom: '0.25rem',
  },
  clinicianTitle: {
    fontSize: '1rem',
    color: '#4A5568',
    fontWeight: '500',
    letterSpacing: '0.025em',
    width: '100%',
    textAlign: 'center',
    marginBottom: '0.25rem',
  },
  clinicianFocus: {
    fontSize: '0.9rem',
    color: '#e53e3e',
    fontWeight: '500',
    fontStyle: 'italic',
    width: '100%',
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  clinicianDescription: {
    fontSize: '0.875rem',
    color: '#718096',
    lineHeight: '1.5',
    maxWidth: '90%',
    margin: '0 auto',
    textAlign: 'center',
  },
  clinicianLearnMore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.35rem',
    fontSize: '0.8rem',
    color: '#94A3B8',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '400',
    width: '100%',
    padding: '0.5rem 0',
    marginTop: 'auto',
    backgroundColor: '#ffffff',
    position: 'relative',
    zIndex: '10',
    letterSpacing: '0.02em',
    '&:hover': {
      color: '#e53e3e',
      gap: '0.5rem',
    },
  },
  servicesSection: {
    padding: '2rem 1rem',
    backgroundColor: '#ffffff',
  },
  servicesHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  servicesTitle: {
    fontSize: '2.5rem',
    fontWeight: '300',
    letterSpacing: '-0.025em',
    color: '#1a202c',
    marginBottom: '1rem',
  },
  servicesSubtitle: {
    fontSize: '1rem',
    color: '#a0aec0',
    maxWidth: '32rem',
    margin: '0 auto',
  },
  servicesGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    justifyContent: 'center',
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#f0f0f0',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    width: '250px',
    minHeight: '180px',
    boxSizing: 'border-box',
    position: 'relative',
    '@media (max-width: 380px)': {
      padding: '1rem',
      minHeight: '150px',
      gap: '0.25rem',
      width: '100%',
    },
  },
  serviceCardHover: {
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-5px)',
    borderColor: '#e53e3e',
    height: 'auto',
  },
  serviceIcon: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '35px',
    width: '35px',
  },
  serviceTitle: {
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#1a202c',
    marginBottom: '0.25rem',
    width: '100%',
  },
  serviceDescription: {
    fontSize: '0.875rem',
    color: '#718096',
    lineHeight: '1.4',
    marginBottom: '0.75rem',
    width: '100%',
    flex: '1 1 auto',
    opacity: 1,
  },
  serviceLearnMore: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    color: '#718096',
    transition: 'all 0.3s ease',
    gap: '0.25rem',
    marginTop: '0.5rem',
    width: 'auto',
  },
  serviceLearnMoreHover: {
    color: '#e53e3e',
  },
  serviceArrow: {
    width: '1rem',
    height: '1rem',
    transition: 'transform 0.3s ease',
  },
  serviceArrowHover: {
    transform: 'translateX(5px)',
  },
  locationSection: {
    padding: '4rem 1.5rem 2rem 1.5rem',
    backgroundColor: '#f7fafc',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 380px)': {
      padding: '2rem 1rem 1rem 1rem',
    },
  },
  locationWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: '1.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '2.5rem',
    maxWidth: '1000px',
    margin: '0 auto',
    border: '2px solid #e53e3e',
    '@media (max-width: 380px)': {
      padding: '1.5rem',
      borderRadius: '1rem',
    },
  },
  locationHeader: {
    textAlign: 'center',
    marginBottom: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  locationTitle: {
    fontSize: '2.25rem',
    fontWeight: '500',
    color: '#1a202c',
    letterSpacing: '-0.025em',
  },
  locationSubtitle: {
    fontSize: '1.1rem',
    color: '#4A5568',
    maxWidth: '32rem',
    margin: '0 auto',
  },
  locationContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  locationMapContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: '1rem',
    overflow: 'hidden',
    height: '400px',
    width: '100%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    },
  },
  locationMap: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  locationAddress: {
    textAlign: 'center',
    color: '#4A5568',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    border: '1px solid #e2e8f0',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
    },
  },
  locationClinicName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: '0.5rem',
  },
  locationAddressText: {
    color: '#4A5568',
    fontSize: '1.1rem',
    lineHeight: '1.6',
  },
  contactSection: {
    padding: '2rem 1rem 3rem 1rem',
    backgroundColor: '#f9fafb',
    maxWidth: '1200px',
    margin: '0 auto',
    '@media (max-width: 380px)': {
      padding: '1rem 1rem 2rem 1rem',
    },
  },
  contactWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: '1.5rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    padding: '2.5rem',
    maxWidth: '900px',
    margin: '0 auto',
    border: '2px solid #e53e3e',
    '@media (max-width: 380px)': {
      padding: '1.5rem',
      borderRadius: '1rem',
    },
  },
  contactHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  contactTitle: {
    fontSize: '2.25rem',
    fontWeight: '500',
    color: '#1a202c',
    marginBottom: '0.5rem',
  },
  contactSubtitle: {
    fontSize: '1.1rem',
    color: '#4A5568',
    maxWidth: '500px',
    margin: '0 auto',
  },
  contactForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    borderRadius: '1rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    '@media (max-width: 380px)': {
      padding: '1.5rem',
      gap: '0.75rem',
    },
  },
  contactInput: {
    width: '100%',
    maxWidth: '400px',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    textAlign: 'center',
    transition: 'outline 0.2s ease',
  },
  contactTextarea: {
    width: '100%',
    maxWidth: '400px',
    padding: '1rem',
    backgroundColor: '#f9fafb',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    textAlign: 'center',
    resize: 'vertical',
    minHeight: '120px',
    transition: 'outline 0.2s ease',
  },
  contactButton: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#e53e3e',
    color: '#ffffff',
    padding: '1rem',
    borderRadius: '0.5rem',
    fontSize: '1.125rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  contactInfo: {
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '3rem',
    flexWrap: 'wrap',
  },
  contactLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4A5568',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderColor: '#e53e3e',
    },
  },
  contactLinkHover: {
    color: '#e53e3e',
  },
  contactIcon: {
    width: '1.25rem',
    height: '1.25rem',
    marginRight: '0.75rem',
  },
  appointmentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'center',
  },
  heroHomeVisit: {
    fontSize: '0.9rem',
    color: 'black',
    letterSpacing: '0.05em',
    fontStyle: 'italic',
    '@media (max-width: 380px)': {
      fontSize: '0.8rem',
    },
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    position: 'relative',
  },
  modalCloseButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
  },
  formStatusSuccess: {
    color: '#38a169',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  formStatusError: {
    color: '#e53e3e',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    textAlign: 'center',
  },
  socialIconsFloat: {
    position: 'absolute',
    right: '2rem',
    bottom: '7rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    zIndex: 30,
    '@media (max-width: 768px)': {
      right: '1.5rem',
      bottom: '6rem',
    },
  },
  socialIconFloat: {
    color: '#2D3748',
    backgroundColor: '#ffffff',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#e53e3e',
      color: '#ffffff',
      border: '1px solid #e53e3e',
    },
  },
  socialLinks: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.75rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    fontSize: '0.85rem',
    color: '#4A5568',
    fontWeight: '400',
    letterSpacing: '0.02em',
    '@media (max-width: 380px)': {
      fontSize: '0.75rem',
    },
  },
  socialLink: {
    color: '#4A5568',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '0.35rem',
    borderRadius: '0.25rem',
    '&:hover': {
      color: '#e53e3e',
      transform: 'translateY(-1px)',
    },
  },
  footer: {
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
  },
  footerText: {
    color: '#4A5568',
    fontSize: '0.875rem',
    letterSpacing: '0.025em',
    '@media (max-width: 380px)': {
      fontSize: '0.8rem',
    },
  },
  openingHoursBox: {
    backgroundColor: '#ffffff',
    padding: '1rem 1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    marginTop: '1rem',
    border: '1px solid #e2e8f0',
  },
  openingHoursText: {
    color: '#1a202c',
    fontSize: '1.1rem',
    fontWeight: '700',
    lineHeight: '1.6',
    textAlign: 'center',
  },
};

export default HealthWebsite;

