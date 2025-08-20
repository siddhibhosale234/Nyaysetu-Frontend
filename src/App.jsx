import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Disclaimer from './Login/Index.jsx';
import { RoleSelection } from './Login/RoleSelection.jsx';
import Signup from './signupPage/Signup.jsx';
import { Login } from './Login/LoginForm.jsx';
import { LawyerRegistration } from './Login/LawyerRegistration.jsx';
import { LawyerRegistration1 } from './Login/LawyerRegistration1.jsx';
import { Homepage } from './Nyaysetu/Homepage.jsx';
import OurService from './Nyaysetu/Services.jsx';
import { Profile } from './Nyaysetu/Profile.jsx';
import { Messaging } from './Nyaysetu/Messaging.jsx';
import { useState } from 'react';
import CreateProfile from './ClientProfile/CreateProfile.jsx'
import ClientProfile from './ClientProfile/ClientProfile.jsx'
import ToDoList from './TodoList/components/ToDoList.jsx';
import LawyerCasesTable from './LawyerCaseHandling/LawyerCasesTable.jsx';
import ClientCaseDetails from './LawyerCaseHandling/CaseDetails/CaseDetailsModal.jsx';
import LandingPage from './LandingPage/LandingPage.jsx';
import { AboutUs } from './Nyaysetu/AboutUs.jsx';
import UserHome from './UserHome/UserHome.jsx';
import ReminderPage from './Reminder/ReminderPage.jsx';
import HiringPage from './Hiringpage/Hiringpage.jsx';
import { ClientRequest } from './Nyaysetu/ClientRequest.jsx';
import { ReminderProvider } from './Reminder/ReminderProvider.jsx';
import { ContactUs } from './Nyaysetu/ContactUs.jsx';
import ServicesClient from './Services (1)/Services.jsx';
import UserAboutUs from './UserAboutUs/UserAboutUs.jsx';
import ChatWrapper from './Chat/ChatWrapper.jsx';
function App() {
  return (
    <ReminderProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/disclaimer' element={<Disclaimer/>}/>
        <Route path="/choose" element={<RoleSelection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lawyer1" element={<LawyerRegistration />} />
        <Route path="/lawyer2" element={<LawyerRegistration1 />} />
        <Route path="/lawyerhome" element={<Homepage />} />
        <Route path="/services" element={<OurService />} />
        <Route path='/contactUs' element={<ContactUs/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messaging/>}/>
        <Route path='/clientRequest' element={<ClientRequest/>}/>
        <Route path="/createprofile" element={<CreateProfile/>}/>
        <Route
          path="/clientprofile"
          element={<ClientProfile />}
        />
        <Route path='/viewschedule' element={<ToDoList/>}/>
        <Route path='/activecases' element={<LawyerCasesTable/>}/>
        <Route path='/casedocs' element={<ClientCaseDetails/>}/>
        <Route path='/reminders' element={<ReminderPage/>}/>
        <Route path='/clientHome' element={<UserHome/>}/>
        <Route path='/hiringpage' element={<HiringPage/>}/>
        <Route path='/servicesclient' element={<ServicesClient/>}/>
        <Route path='/aboutusclient' element={<UserAboutUs/>}/>
        <Route path="/chat/:roomId" element={<ChatWrapper />} />
      </Routes>
    </BrowserRouter>
    </ReminderProvider>
  );
}

export default App;
