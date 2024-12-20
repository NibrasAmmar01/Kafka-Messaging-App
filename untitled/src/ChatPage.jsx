import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import ChatMessage from "./ChatMessage.jsx";
import { Button, TextField, Container, Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
function ChatPage({ username }) {
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);
    const messageInputRef = useRef();

    useEffect(() => {
        const newClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:9090/ws'),
            onConnect: () => {
                const joinMessage = {
                    sender: username,
                    type: 'CONNECT',
                };
                newClient.publish({ destination: '/app/chat.addUser', body: JSON.stringify(joinMessage) });
                newClient.subscribe('/topic/public', message => {
                    const newMessage = JSON.parse(message.body);
                    setMessages(prevMessages => [...prevMessages, newMessage]);
                });
            },
            onDisconnect: () => {
                if (newClient.connected) {
                    const leaveMessage = {
                        sender: username,
                        type: 'DISCONNECT',
                    };
                    newClient.publish({ destination: '/app/chat.addUser', body: JSON.stringify(leaveMessage) });
                }
            },
        });

        newClient.activate();
        setClient(newClient);

        return () => {
            newClient.deactivate();
        };
    }, [username]);

    const sendMessage = () => {
        if (messageInputRef.current.value && client) {
            const chatMessage = {
                sender: username,
                content: messageInputRef.current.value,
                type: 'CHAT',
            };
            client.publish({ destination: '/app/chat.sendMessage', body: JSON.stringify(chatMessage) });
            messageInputRef.current.value = '';
        }
    };

    return (
        <Container>
            <Box>
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} username={username} />
                ))}
            </Box>
            <form onSubmit={sendMessage}>
                <TextField inputRef={messageInputRef} placeholder="Type a message..." />
                <Button type="submit">Send</Button>
            </form>
        </Container>
    );
}

export default ChatPage;