import React, { useState } from 'react';
import './CaseDetailsModal.css';
import { NavbarLaw } from '../../Nyaysetu/Navbar';
import { Footer } from '../../Nyaysetu/Footer';

function ClientCaseDetails() {
  const [caseData, setCaseData] = useState({
    clientName: '',
    caseType: '',
    status: '',
    dateFiled: '',
    documents: []
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a document to upload.");
      return;
    }

    const newDoc = {
      name: selectedFile.name,
      url: URL.createObjectURL(selectedFile)
    };

    setCaseData(prev => ({
      ...prev,
      documents: [...prev.documents, newDoc]
    }));

    setSelectedFile(null);
  };

  return (
    <>
    <NavbarLaw/>
    <div className='body3'>
    <div className="case-container">
      <h1 className='headers'>Client Case Details</h1>

      <div className="form-section">
        <label>Client Name:</label>
        <input type="text" name="clientName" value={caseData.clientName} onChange={handleChange} />

        <label>Case Type:</label>
        <input type="text" name="caseType" value={caseData.caseType} onChange={handleChange} />

        

        <label>Date Filed:</label>
        <input type="date" name="dateFiled" value={caseData.dateFiled} onChange={handleChange} />
      </div>

      <div className="upload-section">
  <input
    type="file"
    id="file-upload"
    onChange={handleFileChange}
    style={{ display: 'none' }}
  />
  <label id='choose1' htmlFor="file-upload" className="custom-file-upload">
    Choose File
  </label>
  
  <button id='upload' onClick={handleUpload}>Upload Document</button>
</div>

      <h3 className='headers'>Uploaded Documents</h3>
      <table className="documents-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Document Name</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {caseData.documents.map((doc, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{doc.name}</td>
              <td><a href={doc.url} target="_blank" rel="noreferrer">View</a></td>
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

export default ClientCaseDetails;
