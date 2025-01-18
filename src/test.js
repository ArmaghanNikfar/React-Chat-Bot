import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid2, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [currentFeature, setCurrentFeature] = useState('');

    const fetchQuestion = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get-question');
            setQuestion(response.data.question);
            setOptions(response.data.options || []);
            setCurrentFeature(response.data.feature);
        } catch (error) {
            console.error('Error fetching question:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                { text: 'خطا در دریافت سوال', sender: 'expert' }
            ]);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, []);

    const handleSend = async () => {
        if (message.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: message, sender: 'customer' },
            ]);
            try {
                await axios.post('http://localhost:5000/submit-answer', {
                    feature: currentFeature,
                    value: message,
                });
                setMessage('');
                fetchQuestion();
            } catch (error) {
                console.error('Error submitting answer:', error);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: 'خطا در ارسال پاسخ', sender: 'expert' }
                ]);
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
            event.preventDefault();
        }
    };

    const StyledBox = styled(Box)( {
        boxShadow: '0px 3px 11px 0px #9494c0, 0 3px 3px -2px #ffffff1a, 0 1px 8px 0 #d9dbe81a',
        borderRadius: '50px',
        overflow: 'hidden',
    });

    return (
        <Grid2 container justifyContent='center' sx={{ padding: '20px' }}>
            <StyledBox sx={{ width: { xs: '400px', sm: '450px' }, height: { xs: '400px', sm: '610px' }, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <Grid2 container>
                    <Grid2 container justifyContent='flex-start'>
                        <Grid2 item sx={{ marginTop: '10px' }}>
                            <Link to='/'>
                            <ArrowBack />
                            </Link>
                        </Grid2>
                        <Grid2 item>
                            <Avatar sx={{ textAlign: 'left', width: '40px', height: '40px' }} src="/images/robot.png" />
                        </Grid2>
                        <Grid2 item sx={{ marginLeft: "10px", marginTop: '4px' }}>
                            <Typography sx={{ fontWeight: 'bolder', fontSize: '14px' }} color="primary">Chat Bot</Typography>
                            <Typography sx={{ color: 'green', fontSize: '12px' }}>Online</Typography>
                        </Grid2>
                    </Grid2>

                    <Divider sx={{ width: '100%', my: 2 }} />
                </Grid2>

                <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
                    {messages.map((msg, index) => (
                        <Box key={index} sx={{ mb: 1, textAlign: msg.sender === 'customer' ? 'right' : 'left' }}>
                            <Typography variant="body1" sx={{ bgcolor: msg.sender === 'customer' ? '#1976d2' : '#f1f1f1',
                                color: msg.sender === 'customer' ? 'white' : 'black',
                                borderRadius: '20px', padding: '18px', fontFamily:'Vazir'}}>
                                {msg.text}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <Grid2 container>
                    <Grid2 item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            placeholder={question || "write your message..."}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            autoFocus 
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={handleSend} sx={{cursor:'pointer'}}>
                                        <SendIcon color="primary" /> 
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid2>
                </Grid2>
            </StyledBox>
        </Grid2>
    );
}
