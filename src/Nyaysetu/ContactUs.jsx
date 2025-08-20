import { useState } from 'react';
import './ContactUs.css';
import { baseBookURL } from '../axios';
import { NavbarLaw } from './Navbar';
import { Footer } from './Footer';

export function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');

    async function handleSubmit() {
        const details = {
            Name: name,
            Email: email,
            Message: msg
        };
        if(!name || !email || !msg){
            alert('Please fill everything')
            return
        }
        try {
            const { data } = await baseBookURL.post('/contactRequest/addRequest', details);
            alert(data?.Message);
        } catch (error) {
            alert('Something went wrong. Check console.');
            console.log(error);
        }
    }

    return (
        <>
        <NavbarLaw/>
        <div className="contactus-body">
            <div className="contactus-container">
                <h1>Contact Us</h1>
                <div className="contactus-form">
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter your Name"
                        onChange={(e) => setName(e.target.value)}
                        className="contactus-input"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="contactus-input"
                        required
                    />
                    <textarea
                        value={msg}
                        placeholder="Enter your Message"
                        onChange={(e) => setMsg(e.target.value)}
                        className="contactus-textarea"
                        required
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="contactus-button"
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}
