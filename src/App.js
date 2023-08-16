import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import Home from './Home'
import { baselightTheme } from "./theme/DefaultColors";
import Login from './Login';

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      {routing}
{/* <Home/> */}

    </ThemeProvider>
  );
}

export default App;
