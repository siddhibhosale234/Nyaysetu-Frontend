import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ReminderPage.css";
import { baseBookURL } from "../axios";
import { ReminderContext } from "./ReminderProvider";
import { NavbarLaw } from "../Nyaysetu/Navbar";
import { Footer } from "../Nyaysetu/Footer";
import { Navbar } from "../Hiringpage/Hiringpage";
import { useSearchParams } from 'react-router-dom';
import '../LandingPage/Footer1.css'
const ReminderPage = () => {
   const id1 = localStorage.getItem('lawyerProfile')
   const [searchParams] = useSearchParams();
   const role = searchParams.get('role')
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState(null);
  const { reminders, fetchReminders, enableSound, soundEnabled } = useContext(ReminderContext);
  
  const handleAddReminder = async (e) => {
    e.preventDefault();
    if (!title || !dateTime) {
      alert("Please enter title and date/time");
      return;
    }
    const now = new Date();
    if (dateTime < now) {
      alert("Please select a future date and time.");
      return;
    }
    try {
      const res = await baseBookURL.post("/reminders/add", {
        id : id1,
        title: title,
        datetime: dateTime,
      });

      if (res.data.Success || res.data.success) {
        alert("Reminder added successfully");
        fetchReminders();
      } else {
        alert(res.data.Message || "Failed to add reminder");
      }

      setTitle("");
      setDateTime(null);
    } catch (err) {
      console.error("Error adding reminder", err);
    }
  };

  // Fetch reminders when page loads
  useEffect(() => {
    fetchReminders();
  }, [id1]);

  return (<>
    {role==='lawyer'?<NavbarLaw/>:<Navbar/>}
    <div className="reminder-body">
    <div className="reminder-container">
      <h2>Set a Reminder</h2>

      {!soundEnabled && (
        <button
          style={{
            background: "green",
            color: "white",
            padding: "8px 12px",
            marginBottom: "10px",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
          }}
          onClick={enableSound}
        >
          🔔 Enable Sound
        </button>
      )}

      <form className="reminder-form" onSubmit={handleAddReminder}>
        <input
          className="reminder-input"
          type="text"
          placeholder="Reminder Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <DatePicker
          selected={dateTime}
          onChange={(date) => setDateTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select Date & Time"
          minDate={new Date()}
          className="reminder-datepicker"
          required
        />
        <button className="reminder-button" type="submit">
          Add Reminder
        </button>
      </form>

      <h3>Your Reminders ⇩ </h3>
      {reminders.length === 0 ? (
        <p>No reminders found.</p>
      ) : (
        <ul className="reminder-list">
          {reminders.map((reminder) => (
            <li key={reminder._id}>
              <strong>{reminder.title}</strong> —{" "}
              {new Date(reminder.datetime).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    {role==='lawyer'?<Footer/>:<footer className="main-footer">
      <div className="footer-left">
        <h3>Nyay Setu</h3>
        <p>स्याद्य न्यायः सदा वर्धते</p>
      </div>
      <div className="footer-right">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:info@nyaysetu.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </footer>}
    </>
  );
};

export default ReminderPage;
