import a from './NyaysetuLogo.png';
import './LawyerRegistration1.css';
import { useNavigate } from 'react-router-dom';
import { baseBookURL } from '../axios';
import { useState, useEffect } from 'react';

export function LawyerRegistration1() {
  const navigate = useNavigate();
  const [step1Data, setStep1Data] = useState({});
  const lawyerId = localStorage.getItem('lawyerProfile')
  const [barCouncilNumber, setBarCouncilNumber] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState([]);
  const [courtLevel, setCourtLevel] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [language, setLanguage] = useState('');
  const [location, setLocation] = useState('');
  const [modeOfService, setModeOfService] = useState('');

  // ✅ Load step 1 data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("lawyerStep1");
    if (savedData) {
      setStep1Data(JSON.parse(savedData));
    } else {
      // If no data found, send user back to step 1
      navigate('/lawyerRegistration');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (
      !barCouncilNumber ||
      !city ||
      !experience ||
      !specialization.length ||
      !courtLevel ||
      !documentType ||
      !serviceType ||
      !language ||
      !location ||
      !modeOfService
    ) {
      alert('⚠️ Please fill in all the required fields.');
      return;
    }

    const { Name, Age, DOB, Email } = step1Data || {};

    const formData1 = {
      userId:'0',
      Name,
      Age: Number(Age),
      DOB: typeof DOB === 'string' ? DOB : new Date(DOB).toISOString().split('T')[0],
      Email,
      BarCouncilNumber: Number(barCouncilNumber),
      City: city,
      Experience: experience,
      Specialization: specialization,
      CourtLevel: courtLevel,
      DocumentType: documentType,
      ServiceType: serviceType,
      Language: language,
      Location: location,
      ModeOfService: modeOfService
    };

    try {
      const { data } = await baseBookURL.post('/lawyerProfile/addLawyerProfile', formData1);
      if (data?.Success) {
        alert(data?.Message);
        localStorage.removeItem("lawyerStep1");
        navigate('/login?role=lawyer');
      } else {
        alert('Failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="background">
      <div id="login1">
        <img src={a} alt="Nyaysetu Logo" id="logo" />
        <h1 id="head">ENTER YOUR DETAILS FOR PROFILE</h1>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "30px" }}>
          <div style={{ display: "flex", gap: "30px", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <input type='number' placeholder='Enter your Bar Council Number' required value={barCouncilNumber} onChange={(e) => setBarCouncilNumber(e.target.value)} />
            <select required value={city} onChange={(e) => setCity(e.target.value)} style={{backgroundColor:"#1e375a"}}>
              <option value="" disabled hidden>City of Practice</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Aurangabad">Aurangabad</option>
            </select>
            <textarea placeholder='Enter your Experience' required value={experience} onChange={(e) => setExperience(e.target.value)} />
           <select
  multiple
  required
  value={specialization}
  onChange={(e) =>
    setSpecialization(Array.from(e.target.selectedOptions, option => option.value))
  }
  style={{ backgroundColor: "#1e375a" }}
>
  <option value="Civil Law">Civil Law</option>
  <option value="Criminal Law">Criminal Law</option>
  <option value="Family Law">Family Law</option>
  <option value="Accident Claims">Accident Claims</option>
  <option value="Labour Law">Labour Law</option>
  <option value="Consumer Protection">Consumer Protection</option>
  <option value="Cooperative Society">Cooperative Society</option>
  <option value="Real Estate">Real Estate/RERA</option>
  <option value="Corporate Law">Corporate Law</option>
  <option value="Intellectual Property">Intellectual Property</option>
  <option value="Taxation">Taxation</option>
  <option value="Service Law">Service Law</option>
  <option value="Cyber Law">Cyber Law</option>
  <option value="Banking and Finance Law">Banking and Finance Law</option>
  <option value="Arbitration and Mediation">Arbitration and Mediation</option>
  <option value="Constitutional Law and Writs">Constitutional Law and Writs</option>
  <option value="Environmental Law">Environmental Law(NGT)</option>
  <option value="IT/Tech Legal">IT/Tech Legal</option>
</select>

            <select required value={courtLevel} onChange={(e) => setCourtLevel(e.target.value)} style={{backgroundColor:"#1e375a"}}>
              <option value="" disabled hidden>Court Level</option>
              <option value="Taluka Court">Taluka Court/Junior Civil Court</option>
              <option value="District Court">District Court/Sessions Court</option>
              <option value="Family Court">Family Court</option>
              <option value="Labour Court">Labour Court/Industrial Tribunal</option>
              <option value="Consumer Court">Consumer Court(District/State/National)</option>
              <option value="Cooperative Court">Cooperative Court</option>
              <option value="RERA Tribunal">RERA Tribunal</option>
              <option value="High Court">High Court</option>
              <option value="Supreme Court">Supreme Court of India</option>
              <option value="City Civil">City Civil Court</option>
              <option value="City Sessions">City Sessions Court</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "30px", flexDirection: "column", alignItems: "center", justifyContent: "center" }} id='text'>
            <textarea placeholder='Document Type' required value={documentType} onChange={(e) => setDocumentType(e.target.value)} />
            <textarea placeholder='Service Type' required value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
            <textarea placeholder='Language Preferences' required value={language} onChange={(e) => setLanguage(e.target.value)} />
            <input type="text" placeholder='Location' required value={location} onChange={(e) => setLocation(e.target.value)} />
            <select required value={modeOfService} onChange={(e) => setModeOfService(e.target.value)} style={{backgroundColor:"#1e375a"}}>
              <option value="" disabled hidden>Mode of Service</option>
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
            </select>
          </div>
        </div>

        <button type="submit" onClick={handleSubmit}>Done</button>
      </div>
    </div>
  );
}
