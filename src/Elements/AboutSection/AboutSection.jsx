import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import "./AboutSection.css";

function AboutSection() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
    // Reset error and submission states when changing category
    setSubmitError("");
    setFormSubmitted(false);
  };

  const handleDayClick = (day) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((d) => d !== day); // Remove the day if already selected
      } else {
        return [...prevDays, day]; // Add the day if not selected
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
  
    // Prepare form data to be sent
    const formData = new FormData(formRef.current);
    const formObject = Object.fromEntries(formData.entries());
  
    // Add the selected category to the form data
    formObject.category = selectedCategory;
  
    // Add selected days for Moreh category
    if (selectedCategory === "Moreh") {
      formObject.selectedDays = selectedDays.join(", ");
    }
  
    // Wrap the form data in an object with a `hasData` property
    const emailData = {
      ...formObject, // Spread the form data into the object
    };

     // Dynamically add hasData properties based on the selected category
  if (selectedCategory.includes("Sungkai Buffet")) {
    emailData.hasData_restaurant_name = true;
    emailData.hasData_opening_time = true;
    emailData.hasData_adult_price = true;
  } else if (selectedCategory.includes("Sungkai Bazaar")) {
    emailData.hasData_event_name = true;
    emailData.hasData_opening_time = true;
    emailData.hasData_start_date = true;
    emailData.hasData_location = true;
  } else if (selectedCategory.includes("Sahur Buffet")) {
    emailData.hasData_restaurant_name = true;
    emailData.hasData_opening_time = true;
    emailData.hasData_start_date = true;
    emailData.hasData_adult_price = true;
  } else if (selectedCategory.includes("Sahur Bazaar")) {
    emailData.hasData_event_name = true;
    emailData.hasData_opening_time = true;
    emailData.hasData_start_date = true;
    emailData.hasData_location = true;
  } else if (selectedCategory.includes("Moreh")) {
    emailData.hasData_restaurant_name = true;
    emailData.hasData_opening_time = true;
    emailData.hasData_selectedDays = true;
  }
  
    
  
    // Using your actual EmailJS credentials
    const serviceId = "service_86c4dmr";
    const templateId = "template_hdo3d5j";
    const publicKey = "KbTjDc5U8JYf8Fk1Y";
  
    emailjs
      .send(serviceId, templateId, emailData, publicKey)
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setFormSubmitted(true);
        setIsSubmitting(false);
        // Reset form after successful submission
        formRef.current.reset();
        setSelectedDays([]);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setSubmitError("Failed to submit form. Please try again later.");
        setIsSubmitting(false);
      });
  };

  const handleBackToForm = () => {
    setFormSubmitted(false);
  };

  return (
    <section id="about" className="about-section">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="about-content"
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <h2>We missed your favourite restaurant?</h2>
            <p>
              Help us improve the B-Jaur Ramadhan Guide by requesting it or reaching out to us!
            </p>
            <button className="about-btn" onClick={() => setShowForm(true)}>
              Request a Restaurant
            </button>
          </motion.div>
        ) : formSubmitted ? (
          <motion.div
            key="success-message"
            className="success-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Thank You!</h2>
            <p>Your {selectedCategory} request has been submitted successfully.</p>
            <p>We'll review your request and update our guide accordingly.</p>
            <div className="button-container">
              <button onClick={handleBackToForm}>Submit Another Request</button>
              <button onClick={() => setShowForm(false)}>Back to Home</button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form-content"
            className="form-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="category-header">Choose a Category</h2>
            <div className="category-buttons">
              <button 
                onClick={() => handleCategorySelect("Sungkai Buffet")} 
                className={selectedCategory === "Sungkai Buffet" ? "active" : ""}
              >
                Sungkai Buffet
              </button>
              <button 
                onClick={() => handleCategorySelect("Sungkai Bazaar")} 
                className={selectedCategory === "Sungkai Bazaar" ? "active" : ""}
              >
                Sungkai Bazaar
              </button>
              <button 
                onClick={() => handleCategorySelect("Sahur Buffet")} 
                className={selectedCategory === "Sahur Buffet" ? "active" : ""}
              >
                Sahur Buffet
              </button>
              <button 
                onClick={() => handleCategorySelect("Sahur Bazaar")} 
                className={selectedCategory === "Sahur Bazaar" ? "active" : ""}
              >
                Sahur Bazaar
              </button>
              <button 
                onClick={() => handleCategorySelect("Moreh")} 
                className={selectedCategory === "Moreh" ? "active" : ""}
              >
                Moreh
              </button>
            </div>

            <hr className="category-divider" />

            <h2 className="header-form">
              {selectedCategory ? `${selectedCategory} Form` : "Please Select Your Category"}
            </h2>
            
            {submitError && <div className="error-message">{submitError}</div>}
            
            <form ref={formRef} onSubmit={handleSubmit}>
              {selectedCategory.includes("Sungkai Buffet") ? (
                <>
                  <label>Restaurant Name:</label>
                  <input type="text" name="restaurant_name" placeholder="Enter restaurant name" required />

                  <label>Opening Hours:</label>
                  <div className="form-group">
                    <input type="time" name="opening_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                    <input type="time" name="closing_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                  </div>

                  <label>Buffet Price Range:</label>
                  <div className="form-group">
                    <input type="text" name="adult_price" placeholder="Adult Price" required />
                    <input type="text" name="child_price" placeholder="Child Price" required />
                  </div>

                  <label>District:</label>
                  <select name="district" className="district-dropdown" placeholder="Choose district" required>
                    <option value="">Select District</option>
                    <option value="Brunei-Muara">Brunei-Muara</option>
                    <option value="Tutong">Tutong</option>
                    <option value="Belait">Belait</option>
                    <option value="Temburong">Temburong</option>
                  </select>

                  {/* <label>Your Email:</label>
                  <input type="email" name="from_email" placeholder="Enter your email" required /> */}

                <div className="button-container">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
                </>
            ) : selectedCategory.includes("Sungkai Bazaar") ? (
              <>
                <label>Event Name:</label>
                <input type="text" name="event_name" placeholder="Enter event name" required />

                <label>Event Period:</label>
                <div className="form-group">
                  <input type="date" name="start_date" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                  <input type="date" name="end_date" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                </div>

                <label>Opening Hours:</label>
                <div className="form-group">
                  <input type="time" name="opening_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required placeholder="Opening Time" />
                  <input type="time" name="closing_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required placeholder="Closing Time" />
                </div>

                <label>Location/Area Name:</label>
                <input type="text" name="location" placeholder="Enter location" required />

                <label>District:</label>
                <select name="district" className="district-dropdown" placeholder="Choose district" required>
                    <option value="">Select District</option>
                    <option value="Brunei-Muara">Brunei-Muara</option>
                    <option value="Tutong">Tutong</option>
                    <option value="Belait">Belait</option>
                    <option value="Temburong">Temburong</option>
                  </select>

                {/* <label>Your Email:</label>
                <input type="email" name="from_email" placeholder="Enter your email" required /> */}

                <div className="button-container">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </>
            ) : selectedCategory.includes("Sahur Buffet") ?(
              <>
                <label>Restaurant Name:</label>
                <input type="text" name="restaurant_name" placeholder="Enter restaurant name" required />

                <label>Opening Hours:</label>
                <div className="form-group">
                  <input type="time" name="opening_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                  <input type="time" name="closing_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                </div>

                <label>Event Period:</label>
                <div className="form-group">
                  <input type="date" name="start_date" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                  <input type="date" name="end_date" onFocus={(e) => e.target.showPicker && e.target.showPicker()}   required />
                </div>

                <label>Buffet Price Range:</label>
                <div className="form-group">
                  <input type="text" name="adult_price" placeholder="Adult Price" required />
                  <input type="text" name="child_price" placeholder="Child Price" required />
                </div>

                <label>District:</label>
                <select name="district" className="district-dropdown" placeholder="Choose district" required>
                    <option value="">Select District</option>
                    <option value="Brunei-Muara">Brunei-Muara</option>
                    <option value="Tutong">Tutong</option>
                    <option value="Belait">Belait</option>
                    <option value="Temburong">Temburong</option>
                  </select>

                {/* <label>Your Email:</label>
                <input type="email" name="from_email" placeholder="Enter your email" required /> */}

                <div className="button-container">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </>
            ) : selectedCategory.includes("Sahur Bazaar") ? (
              <>
                <label>Event Name:</label>
                <input type="text" name="event_name" placeholder="Enter event name" required />

                <label>Event Period:</label>
                <div className="form-group">
                  <input type="date" name="start_date" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                  <input type="date" name="end_date" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                </div>

                <label>Opening Hours:</label>
                <div className="form-group">
                  <input type="time" name="opening_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required placeholder="Opening Time" />
                  <input type="time" name="closing_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required placeholder="Closing Time" />
                </div>

                <label>Location/Area Name:</label>
                <input type="text" name="location" placeholder="Enter location" required />

                <label>District:</label>
                <select name="district" className="district-dropdown" placeholder="Choose district" required>
                    <option value="">Select District</option>
                    <option value="Brunei-Muara">Brunei-Muara</option>
                    <option value="Tutong">Tutong</option>
                    <option value="Belait">Belait</option>
                    <option value="Temburong">Temburong</option>
                  </select>

                {/* <label>Your Email:</label>
                <input type="email" name="from_email" placeholder="Enter your email" required /> */}

                <div className="button-container">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </>
            ) : selectedCategory.includes("Moreh") ?(
              <>
                <label>Restaurant Name:</label>
                <input type="text" name="restaurant_name" placeholder="Enter restaurant name" required />

                <label>Opening Hours:</label>
                <div className="form-group">
                  <input type="time" name="opening_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                  <input type="time" name="closing_time" onFocus={(e) => e.target.showPicker && e.target.showPicker()} required />
                </div>

                <label>Opening Days:</label>
                <div className="form-group">
                  <button
                    type="button"
                    className={`day-button ${selectedDays.includes("Monday") ? "active" : ""}`}
                    onClick={() => handleDayClick("Monday")}
                  >
                    Monday
                  </button>
                  <button
                    type="button"
                    className={`day-button ${selectedDays.includes("Tuesday") ? "active" : ""}`}
                    onClick={() => handleDayClick("Tuesday")}
                  >
                    Tuesday
                  </button>
                  <button
                    type="button"
                    className={`day-button ${selectedDays.includes("Wednesday") ? "active" : ""}`}
                    onClick={() => handleDayClick("Wednesday")}
                  >
                    Wednesday
                  </button>
                  <button
                    type="button"
                    className={`day-button ${selectedDays.includes("Thursday") ? "active" : ""}`}
                    onClick={() => handleDayClick("Thursday")}
                  >
                    Thursday
                  </button>
                  <button
                    type="button"
                    className={`day-button ${selectedDays.includes("Friday") ? "active" : ""}`}
                    onClick={() => handleDayClick("Friday")}
                  >
                    Friday
                  </button>
                  <button
                    type="button"
                    className={`day-button ${selectedDays.includes("Saturday") ? "active" : ""}`}
                    onClick={() => handleDayClick("Saturday")}
                  >
                    Saturday
                  </button>
                  <button
                    type="button"
                    className={`day-button ${selectedDays.includes("Sunday") ? "active" : ""}`}
                    onClick={() => handleDayClick("Sunday")}
                  >
                    Sunday
                  </button>
                </div>

                <label>District:</label>
                <select name="district" className="district-dropdown" placeholder="Choose district" required>
                    <option value="">Select District</option>
                    <option value="Brunei-Muara">Brunei-Muara</option>
                    <option value="Tutong">Tutong</option>
                    <option value="Belait">Belait</option>
                    <option value="Temburong">Temburong</option>
                  </select>

                {/* <label>Your Email:</label>
                <input type="email" name="from_email" placeholder="Enter your email" required /> */}

                <div className="button-container">
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
              {/* Default */}
              <p>Please select a category to proceed.</p>
              </>
            )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default AboutSection;