import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StreamerList from "./components/StreamerList";
import StreamerDetails from "./components/StreamerDetails";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#303030",
    },
    primary: {
      main: "#00bcd4",
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link> {/* Link to your home page */}
                  </li>
                  <li>
                    <Link to="/streamers">Streamers</Link>
                  </li>
                </ul>
              </nav>
            </header>
            <main>
              <Routes>
                <Route path="/" element={<h1>Home Page</h1>} /> {/* Route for your home page */}
                <Route path="/streamers" element={<StreamerList />} />
                <Route path="/streamers/:streamerId" element={<StreamerDetails />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
