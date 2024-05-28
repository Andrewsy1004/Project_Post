import io from 'socket.io-client';
import { useEffect, useContext, useState, useRef } from 'react';
import { UserContext } from '../context';

const socket = io('http://localhost:3000');

export const Chat = () => {
    const { userInfo } = useContext(UserContext);
    const [messages, setMessages] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const groupName = 'grupo_chat_general';
    const defaultImage = "https://www.lavanguardia.com/andro4all/hero/2023/10/foto-de-perfil-whatsapp.jpg?width=1200&aspect_ratio=16:9";
    const lastMessageRef = useRef(null);
    
    
    useEffect(() => {
        socket.emit('joinGroup', { groupName });

        socket.on('allMessages', (allMessages) => {
            setChatMessages(allMessages);
        });

        socket.on('groupMessage', (msg) => {
            setChatMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('allMessages');
            socket.off('groupMessage');
            socket.emit('leaveGroup', { groupName });
        };
    }, [groupName]);

    const handleChange = (event) => {
        setMessages(event.target.value);
    };

    const sendMessage = async (event) => {
        event.preventDefault();
        if (messages.trim().length > 0) {
            const newMessage = {
                groupName,
                message: messages,
                userId: userInfo._id 
            };

            socket.emit('groupMessage', newMessage);

            setMessages('');
        }
    };

    useEffect(() => {
        // desplazarse al último mensaje
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>Chat</h3>
            </div>
             
            <div className="chat-body">
            {chatMessages.map((msg, index) => (
                <div
                    key={index}
                    className="message"
                    ref={index === chatMessages.length - 1 ? lastMessageRef : null}
                >
                    {msg.User && (
                        <>
                            <img
                                src={msg.User.UrlImg}
                                onError={(e) => {
                                    e.target.src = defaultImage;
                                    console.log("Error al cargar la imagen.");
                                  }}
                                alt="User Avatar"
                                className="user-icon"
                            />
                            <div className="message-content">
                                <strong>{msg.User.FullName}</strong>
                                <p>{msg.message}</p>
                                {/* Mostrar el timestamp */}
                                <p className="timestamp">{new Date(msg.createdAt).toLocaleString()}</p>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>


            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Escribe tu mensaje..."
                    value={messages}
                    onChange={handleChange}
                />
            </div>
            <button type="button" onClick={sendMessage}>
                Enviar
            </button>
        </div>
    );
};


