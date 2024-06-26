import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

import Container from "@mui/material/Container";

import Weather from "./weather";

const thems = createTheme({
  typography: {
    fontFamily: ["ALMR"],
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={thems}>
        <Container maxWidth="sm">
          <Weather />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
