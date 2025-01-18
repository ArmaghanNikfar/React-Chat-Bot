import { ArrowForward } from "@mui/icons-material";
import { Avatar, Box, Button, Grid2, Typography } from "@mui/material";
import { styled } from '@mui/system';


export default function Welcome() {

    const StyledBox = styled(Box)({
        boxShadow: '0px 3px 11px 0px #9494c0, 0 3px 3px -2px #ffffff1a, 0 1px 8px 0 #d9dbe81a',
        borderRadius: '50px'
    })
    return (
        <Grid2 container justifyContent='center' sx={{ padding: '20px' }}>
            <StyledBox sx={{ width: { xs: '400px', sm: '500px' }, height: { xs: '400px', sm: '650px' } }}>
                <Grid2 container  sx={{ padding: '60px' }} justifyContent='center'>
                    <Typography sx={{ fontWeight: 'bolder' }} variant="h5" color="primary">Your AI Assistant</Typography>
                    <Typography sx={{marginTop:'20px', color:'#757575'}} >Using this software,you can ask you
                        questions and receive articles using
                        artificial intelligence assistant</Typography>
                    <Avatar variant="rounded" sx={{width:'300px' , height:'310px'}} src="/images/chatbot.png" />
                    <Button sx={{marginTop:'100px'}}
                     fullWidth variant="contained"
                     color="primary"
                     href="/Chat"
                     endIcon={<ArrowForward/>}>Continue </Button>
                </Grid2>
            </StyledBox>

        </Grid2>
    )
}