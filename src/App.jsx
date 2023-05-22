import "react-toastify/dist/ReactToastify.css";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home/home";
import FirstPage from "./pages/FirstPage/firstPage";
import Page from "./pages/Page/page";
import SignIn from "./pages/SignIn/signin";
import SignUp from "./pages/Signup/signiup";
import UserContext from "./context/user";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About/About";
import Loading from "./components/loading/loading";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = createTheme({
    palette: { mode: "dark" },
  });

  const login = (data) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <h1>
        <Loading />
      </h1>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page loading={loading} />} />
          <Route path="/about" element={<About loading={loading} />} />
          <Route path="/sign" element={<FirstPage loading={loading} />} />
          <Route
            path="/signin"
            element={
              <UserContext.Provider value={{ login: login }}>
                <AuthRoute>
                  <SignIn loading={loading} />
                </AuthRoute>
              </UserContext.Provider>
            }
          />
          <Route
            path="/signup"
            element={
              <UserContext.Provider value={{ login: login }}>
                <AuthRoute>
                  <SignUp loading={loading} />
                </AuthRoute>
              </UserContext.Provider>
            }
          />
          <Route
            path="/home"
            element={
              <UserContext.Provider value={{ user: user, login: login, logout: logout }}>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </UserContext.Provider>
            }
          />
          <Route path="*" element={<NotFoundPage loading={loading} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;