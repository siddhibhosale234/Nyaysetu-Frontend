import { HomeLaw } from "../Nyaysetu/Home";
import { FaCalendarAlt, FaFolderOpen, FaUserCheck, FaEnvelope, FaBell } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
function HomeProp() {
  const navigate = useNavigate();
  const cards = [
    {
      Icon: <FaCalendarAlt size={40} />,
      Title: "View Schedule",
      Short_Info: "See your upcoming meetings and court dates.",
      onClick : ()=>{
        navigate('/viewschedule')
      }
    },
    {
      Icon: <FaFolderOpen size={40} />,
      Title: "Active Cases",
      Short_Info: "Access and manage ongoing legal cases.",
      onClick : ()=>{
        navigate('/activecases')
      }
    },
    {
      Icon: <FaUserCheck size={40} />,
      Title: "Client Requests",
      Short_Info: "View and respond to new client requests.",
      onClick : ()=>{
        navigate('/clientRequest')
      }
    },
    {
      Icon: <FaBell size={40} />,
      Title: "Reminders",
      Short_Info: "Set Reminders that will remind you with important dates.",
      onClick : ()=>{
        navigate('/reminders?role=lawyer')
      }
    },
    {
      Icon: <FaEnvelope size={40} />,
      Title: "Messages",
      Short_Info: "Check and respond to client messages.",
      onClick : ()=>{
        navigate('/messages')
      }
    },
  ];

  return (
    <div className="container3">
      {cards.map((val, index) => (
        <HomeLaw key={index} p={val} onClick={val.onClick}/>
      ))}
    </div>
  );
}

export default HomeProp;
