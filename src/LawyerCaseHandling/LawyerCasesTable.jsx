import React, { useEffect, useState } from 'react';
import './LawyerCasesTable.css';
import logo from './logo.jpg';
import { NavbarLaw } from '../Nyaysetu/Navbar';
import { Footer } from '../Nyaysetu/Footer';
import { baseBookURL } from '../axios';
import { useNavigate } from 'react-router-dom';

function LawyerCasesTable() {
  const navigate = useNavigate()
  const lawyerId = localStorage.getItem('lawyerProfile')
  const [allCases, setAllCases] = useState([]);

  const [newCase, setNewCase] = useState({
    client: "",
    type: "",
    status: "Open",
    date: ""
  });

  useEffect(()=>{
    async function fetchCase() {
      try{
      const {data} = await baseBookURL('/caseDetails/getCases')
      if (data?.caseDataList) {
  const lawyerCases = data.caseDataList
    .filter(c => c.lawyerID === lawyerId)
    .map((c, index) => ({
      _id: c._id,
      id: index + 1,
      client: c.ClientName,
      type: c.CaseType,
      date: c.Date,
      status: "Open" // or c.Status if you store it in DB
    }));
  setAllCases(lawyerCases);
}
      else{
        alert('Something went wrong')
      }
    }
    catch(error){
      console.log(error);
      navigate('/error')
    }
    }
    fetchCase();
  },[lawyerId])

  const handleInput = (e) => {
  setNewCase({ ...newCase, [e.target.name]: e.target.value });
};

  const addCase = async () => {
    if (!newCase.client || !newCase.type || !newCase.date) {
  alert('Please fill everything');
  return;
}
    const caseToSend = {
        lawyerID: lawyerId,
        ClientName: newCase.client,
        CaseType: newCase.type,
        Date: newCase.date 
      };
    try {
      const { data } = await baseBookURL.post('/caseDetails/addCase', caseToSend);
      if (data?.Success) {
        alert(data?.Message);
        setAllCases([...allCases, { ...caseToSend, id: allCases.length + 1 }]);
        setNewCase({ client: "", type: "", status: "Open", date: "" });
      }
      else{
        alert('Some error occuered')
      }
    } catch (error) {
    console.error("Error adding case:", error);
    navigate('/error')
  }
};

  const changeStatus = async (id, status) => {
  try {
    const caseToDelete = allCases.find(c => c.id === id);
    if (!caseToDelete) {return;}

    if (status === "Closed") {
      
      await baseBookURL.delete(`/caseDetails/deleteCase/${caseToDelete._id}`);

      // Remove case from state
      setAllCases(prev => prev.filter(c => c.id !== id));
    } else {
      // Only update state locally for Open/Pending
      setAllCases(prev =>
        prev.map(c => c.id === id ? { ...c, status } : c)
      );
    }
  } catch (err) {
    console.error("Error deleting case:", err);
  }
};


  return (
    <>
    <NavbarLaw/>
    <div className='body'>
    <div className="case-wrapper">
      <img src={logo} alt="NYAYSETU" className="logo1" />
      <h1 className="title1">Case Management</h1>

      <div className="add-case-form">
        <input name="client" value={newCase.client} onChange={handleInput} placeholder="Client Name" />
        <input name="type" value={newCase.type} onChange={handleInput} placeholder="Case Type" />
        <input name="date" type="date" value={newCase.date} onChange={handleInput} />
        <button onClick={addCase}>Add Case</button>
      </div>

      <table className="case-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {allCases.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.client}</td>
              <td>{c.type}</td>
              <td>
                <span className={`status ${c.status.toLowerCase()}`}>{c.status}</span>
              </td>
              <td>{c.date}</td>
              <td>
                <select id='select' value={c.status} onChange={(e) => changeStatus(c.id, e.target.value)}>
                  <option>Open</option>
                  <option>Pending</option>
                  <option>Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default LawyerCasesTable;