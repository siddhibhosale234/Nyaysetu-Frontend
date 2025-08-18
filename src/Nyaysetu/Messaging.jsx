import { useState } from 'react';
import './Messaging.css';
import { NavbarLaw } from './Navbar';
import { Footer } from './Footer';
export function Messaging() {
    const[sent,setSent] = useState(false)
    const[msg,setMsg] = useState('')
    const[reply,setReply] = useState('')
    function handleSend(){
        if(msg!==""){
        setSent(true);
        setReply(msg)
        setMsg('')
        }
        else{
            alert('Type a message')
            return
        }
    }
    return(
        <>
        <NavbarLaw/>
        <div className='messaging-page'>
        <div className='messaging-container'>
            <div className='protocols'>
                <p>
                    💡 <strong>Chat Protocol:</strong><br />
                    • Be respectful and professional at all times.<br />
                    • No abusive, offensive, or inappropriate messages.<br />
                    • Lawyers cannot request fees beyond the agreed booking amount in chat.<br />
                    • Clients must not demand free legal advice or personal contact details.<br />
                    • Chat is for legal discussion only — please maintain confidentiality.<br />
                </p>
            </div>
            <div className='from-client'>
                Hello! Thankyou for accepting my request, I am urgently in need of Legal help. When should we discuss my case?
            </div>
            
            {sent && <div className='from-lawyer'>{reply}</div>}
            <div className='messageType'>
                <input type="text" placeholder='Type your message' value={msg} onChange={(e)=>{setMsg(e.target.value)}}/>
                <button type="submit" onClick={handleSend}>Send</button>
            </div> 
        </div>
        </div>
        <Footer/>
        </>
    );
}