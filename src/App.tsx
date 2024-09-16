import ServerList from './Components/ServerList/ServerList';
import { Container, Typography, Box } from '@mui/material';

function App() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Servers Website
                </Typography>
            </Box>
            <hr />
            <main>
                <ServerList />
            </main>
        </Container>
    );
}

export default App;
