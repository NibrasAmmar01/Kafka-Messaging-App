import Avatar from 'react-avatar';
import { Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
function ChatMessage({ message, username }) {
    return (
        // eslint-disable-next-line react/prop-types
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: message.sender === username ? 'flex-end' : 'flex-start', margin: '10px 0' }}>
            {/* eslint-disable-next-line react/prop-types */}
            <Box sx={{ display: 'flex', flexDirection: message.sender === username ? 'row-reverse' : 'row', alignItems: 'center', gap: 1 }}>
                {/* eslint-disable-next-line react/prop-types */}
                <Avatar name={message.sender} size="35" round={true} />
                {/* eslint-disable-next-line react/prop-types */}
                <h4>{message.sender}</h4>
            </Box>
            <Box sx={{
                // eslint-disable-next-line react/prop-types
                backgroundColor: message.sender === username ? 'primary.main' : 'secondary.main',
                color: 'white',
                borderRadius: '12px',
                padding: '10px',
                maxWidth: '80%',
            }}>
                {/* eslint-disable-next-line react/prop-types */}
                <p>{message.content}</p>
            </Box>
        </Box>
    );
}

export default ChatMessage;