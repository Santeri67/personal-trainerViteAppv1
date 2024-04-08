import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Carlist from './components/Carlist';

function App() {
  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6'>Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </Container>
  )
}

export default App
