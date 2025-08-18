import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseBookURL } from "../axios";

export function ClientChatRedirect() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("clientId");
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const { data } = await baseBookURL.get("/hireRequest/getHireRequest");
        if (data?.hireData) {
          const myAcceptedRequests = data.hireData.filter(
            (req) => req.clientID === userId && req.status === "accepted"
          );
          setAcceptedRequests(myAcceptedRequests);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchRequests();
    const interval = setInterval(fetchRequests, 5000); // check every 5 sec
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
  if (acceptedRequests.length > 0) {
    const consent = window.confirm(
      "Your request has been accepted by the lawyer. Do you want to join the chat room now?"
    );
    if (consent) {
      // auto-redirect to first accepted request's chat room
      navigate(`/chat/${acceptedRequests[0]._id}?role=client`);
    }
  }
}, [acceptedRequests, navigate]);


  return null; // nothing to render
}
