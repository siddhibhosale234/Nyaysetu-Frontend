// src/CreateProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProfile.css";
import { baseBookURL } from "../axios";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    job:"",
    appointmentFor:"",
    caseDescription:""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.age.trim()) err.age = "Age is required";
    if (!form.gender.trim()) err.gender = "Gender is required";
    if (!form.phone.trim()) err.phone = "Phone is required";
    if (!form.email.trim()) err.email = "Email is required";
    if (!form.address.trim()) err.address = "Address is required";
    if (!form.job.trim()) err.job = "Job is required";
    if (!form.appointmentFor.trim()) err.appointmentFor = "Reason for appointment is required";
    if (!form.caseDescription.trim()) err.caseDescription = "Case description is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const form1 = {
        userId:'0',
        Name: form.name,
        Age: Number(form.age),
        Gender:form.gender,
        Phone: form.phone.trim(),
        Email: form.email,
        Address: form.address,
        Job: form.job,
        AppointmentFor: form.appointmentFor,
        CaseDescription: form.caseDescription
      }
      const clientProfile = await baseBookURL.post('/clientProfile/addClientProfile',form1)
      if(clientProfile.data?.Success){
        alert(clientProfile.data?.Message)
        navigate("/login?role=client");
      }
      else{
        alert('Some error occurred')
      }
    } catch (error) {
      alert('Check log')
      console.log(error);
    }
  };

  return (
    <div className="body2">
    <div className="create-container">
      <h2>Create Your Profile</h2>
      <form className="create-profile" onSubmit={handleSubmit}>
        {["name", "age", "gender", "phone", "email", "address","job","appointmentFor","caseDescription"].map((field) => (
          <label key={field}>
            {field.toUpperCase()}:
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
            />
            {errors[field] && <div className="error-text">{errors[field]}</div>}
          </label>
        ))}
        <button type="submit" className="edit-btn">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default CreateProfile;
