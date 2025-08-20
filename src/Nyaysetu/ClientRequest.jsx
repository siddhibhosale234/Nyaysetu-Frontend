import { useEffect, useState } from 'react';
import { baseBookURL } from '../axios';
import './ClientRequest.css';
import { NavbarLaw } from './Navbar';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export function ClientRequest() {
  const id = localStorage.getItem('lawyerProfile');
  const [requests, setRequests] = useState([]);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHireRequests() {
      try {
        const { data } = await baseBookURL.get('/hireRequest/getHireRequest');
        if (data?.hireData) {
          const filteredRequests = data.hireData.filter(req => req.lawyerID === id);
          setRequests(filteredRequests);
        }
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
    }
    fetchHireRequests();
  }, [id]);

  useEffect(() => {
    async function fetchClients() {
      try {
        const { data } = await baseBookURL.get('/clientProfile/getClientProfiles');
        if (data?.clientProfileDataList) setClients(data.clientProfileDataList);
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
    }
    fetchClients();
  }, []);

  function getClientInfo(clientID) {
    return clients.find(c => c._id === clientID);
  }

  const handleDeny = async (requestId) => {
    try {
      const { data } = await baseBookURL.delete(`/hireRequest/deleteRequest/${requestId}`);
      if (data?.Success) {
        alert(data.Message);
        setRequests(prev => prev.filter(r => r._id !== requestId));
      }
    } catch (error) {
      console.log(error);
      navigate('/error')
    }
  };

  const handleAccept = async (requestId) => {
  try {
    const { data } = await baseBookURL.put(`/hireRequest/acceptRequest/${requestId}`);
    if (data?.Success) {
      alert('Request accepted! Redirecting to chat...');
      navigate(`/chat/${requestId}?role=lawyer`); // navigate to chat room
    }
  } catch (error) {
    console.log(error);
    alert('Error accepting request');
  }
};

  return (
    <>
      <NavbarLaw />
      <div id="client-request-container">
        {requests.length === 0 ? (
          <div className="no-requests-message">
            <h1>No Client Requests</h1>
          </div>
        ) : (
          <div className="requests-list">
            {requests.map((request) => {
              const clientInfo = getClientInfo(request.clientID);
              return (
                <div key={request._id} className="request-card">
                  <h2>Client Name: {clientInfo ? clientInfo.Name : 'Loading...'}</h2>
                  <h3>Client Email: {clientInfo ? clientInfo.Email : 'Loading...'}</h3>
                  <div className="client-buttons">
                    <button className='client-accept' onClick={() => handleAccept(request._id)}>Accept & Chat</button>
                    <button className='client-deny' onClick={() => handleDeny(request._id)}>Deny</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
