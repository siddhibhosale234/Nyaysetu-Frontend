import React, { createContext, useEffect, useRef, useState } from "react";
import { baseBookURL } from "../axios";

export const ReminderContext = createContext();

export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);
  const timersRef = useRef([]); // store all timeouts
  const loggedin = localStorage.getItem("loggedin");
  const lawyerId = localStorage.getItem("lawyerProfile");
const clientId = localStorage.getItem("client");
const id = lawyerId || clientId;
  const enableSound = () => {
  if (audioRef.current) {
    audioRef.current
      .play()
      .then(() => {
        setSoundEnabled(true);
        localStorage.setItem("soundEnabled", "true"); // persist
        alert("Sound enabled for reminders ✅");
      })
      .catch((err) => console.warn("Sound enable failed:", err));
  }
};

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const fetchReminders = async () => {
     if (!id) {
    console.warn("⚠️ No user ID found in localStorage, skipping reminders fetch.");
    return;
  }
    try {
      const res = await baseBookURL.get(`reminders/fetch/${id}`);
      if (Array.isArray(res.data)) {
        setReminders(res.data);
      } else if (Array.isArray(res.data.reminders)) {
        setReminders(res.data.reminders);
      }
    } catch (err) {
      console.error("Error fetching reminders", err);
    }
  };
  useEffect(() => {
  const savedSound = localStorage.getItem("soundEnabled");
  if (savedSound === "true") {
    setSoundEnabled(true);
  }
}, []);

  useEffect(() => {
    fetchReminders();
  }, [id]);

  useEffect(() => {
    if (!loggedin) return;

    // Clear old timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    reminders
      .filter((r) => new Date(r.datetime) > new Date())
      .forEach((reminder) => {
        const now = new Date();
        const reminderTime = new Date(reminder.datetime);
        const delay = reminderTime.getTime() - now.getTime();

        const timerId = setTimeout(() => {
          if (soundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => console.warn("Play failed:", err));
          }

          setTimeout(() => {
            alert(`Reminder: ${reminder.title}`);
          }, 100);

          baseBookURL
            .delete(`/reminders/delete/${reminder._id}`)
            .then(() => {
              setReminders((prev) => prev.filter((r) => r._id !== reminder._id));
            })
            .catch((err) => console.error(err));
        }, delay);

        timersRef.current.push(timerId);
      });
  }, [reminders, soundEnabled, loggedin]);

  return (
    <ReminderContext.Provider
      value={{ reminders, fetchReminders, enableSound, stopSound, soundEnabled }}
    >
      {children}
      <audio ref={audioRef} src="/reminder-bell.mp3" preload="auto" />
    </ReminderContext.Provider>
  );
};
