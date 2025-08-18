import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './ChatRoom.css';
import { NavbarLaw } from '../Nyaysetu/Navbar';
import { Navbar } from '../Hiringpage/Hiringpage';

export function ChatRoom({ roomId, userId }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const socketRef = useRef();
    const params = new URLSearchParams(location.search);
    const role = params.get("role");

    useEffect(() => {
        // ✅ Connect only once
        socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
            transports: ["websocket", "polling"], 
            withCredentials: true,
        });

        socketRef.current.emit('joinRoom', { roomId, userId });

        socketRef.current.on('receiveMessage', (data) => {
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socketRef.current.emit('leaveRoom', { roomId, userId });
            socketRef.current.off('receiveMessage');
            socketRef.current.disconnect();
        };
    }, [roomId, userId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!message.trim()) return;
        socketRef.current.emit('sendMessage', { roomId, senderId: userId, message });
        setMessages((prev) => [...prev, { senderId: userId, message }]);
        setMessage('');
    };

    return (
        <>
            {role === 'lawyer' ? <NavbarLaw/> : <Navbar/>}
            <div className="chat-room-container">
                <div className="chat-header">
                    <h3>Chat Room</h3>
                </div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.senderId === userId ? 'message my-message' : 'message other-message'}
                        >
                            {msg.message}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend}>Send</button>
                </div>
            </div>
        </>
    );
}
