import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AboutSection.css";

function AboutSection() {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
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

            <hr className="category-divider" />  {/* Horizontal line added here */}

            <h2 className="header-form">
              {selectedCategory ? `${selectedCategory} Form` : "Please Select Your Category"}
            </h2>
            
            <form>
              {selectedCategory.includes("Sungkai Buffet") ? (
                <>
                {/* Sunkai Buffet  */}
                  <label>Restaurant Name:</label>
                  <input type="text" placeholder="Enter restaurant name" required />

                  <label>Opening Hours:</label>
                    <div className="form-group">
                      <input type="time" required />
                      <input type="time" required />
                    </div>

                    <label>Buffet Price Range:</label>
                    <div className="form-group">
                      <input type="text" placeholder="Adult Price" required />
                      <input type="text" placeholder="Child Price" required />
                    </div>

                  <label>District:</label>
                  <input type="text" placeholder="Enter district" required />

                <div className="button-container">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
                </>
            ) : selectedCategory.includes("Sungkai Bazaar") ? (
              <>
              {/* Sungkai Bazaar  */}
                <label>Event Name:</label>
                <input type="text" placeholder="Enter event name" required />

                <label>Event Period:</label>
                <div className="form-group">
                  <input type="date" required />
                  <input type="date" required />
                </div>

                <label>Opening Hours:</label>
                <div className="form-group">
                  <input type="time" required placeholder="Opening Time" />
                  <input type="time" required placeholder="Closing Time" />
                </div>

                <label>Location/Area Name:</label>
                <input type="text" placeholder="Enter location" required />

                <label>District:</label>
                <input type="text" placeholder="Enter district" required />

                <div className="button-container">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </>
            ) : selectedCategory.includes("Sahur Buffet") ?(
              <>
              {/* Sahur Buffet  */}
                <label>Restaurant Name:</label>
                <input type="text" placeholder="Enter restaurant name" required />

                <label>Opening Hours:</label>
                  <div className="form-group">
                    <input type="time" required />
                    <input type="time" required />
                  </div>

                <label>Event Period:</label>
                <div className="form-group">
                  <input type="date" required />
                  <input type="date" required />
                </div>

                <label>Buffet Price Range:</label>
                <div className="form-group">
                  <input type="text" placeholder="Adult Price" required />
                  <input type="text" placeholder="Child Price" required />
                </div>

                <label>District:</label>
                <input type="text" placeholder="Enter district" required />

                <div className="button-container">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </>
            ) : selectedCategory.includes("Sahur Bazaar") ? (
              <>
              {/* Sahur Bazaar  */}
                <label>Event Name:</label>
                <input type="text" placeholder="Enter event name" required />

                <label>Event Period:</label>
                <div className="form-group">
                  <input type="date" required />
                  <input type="date" required />
                </div>

                <label>Opening Hours:</label>
                <div className="form-group">
                  <input type="time" required placeholder="Opening Time" />
                  <input type="time" required placeholder="Closing Time" />
                </div>

                <label>Location/Area Name:</label>
                <input type="text" placeholder="Enter location" required />

                <label>District:</label>
                <input type="text" placeholder="Enter district" required />

                <div className="button-container">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </>
            ) : selectedCategory.includes("Moreh") ?(
              <>
                {/* Moreh */}
                <label>Restaurant Name:</label>
                <input type="text" placeholder="Enter restaurant name" required />

                <label>Opening Hours:</label>
                  <div className="form-group">
                    <input type="time" required />
                    <input type="time" required />
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
                <input type="text" placeholder="Enter district" required />

                <div className="button-container">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
              {/* Default */}
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
