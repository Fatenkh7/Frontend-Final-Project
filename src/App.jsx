import "react-toastify/dist/ReactToastify.css";
import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/home";
import FirstPage from "./pages/FirstPage/firstPage";
import SignIn from "./pages/SignIn/signin";
import SignUp from "./pages/Signup/signiup";
import UserContext from "./context/user";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const theme = createTheme({
    palette: { mode: "dark" },
  });

  const login = (data) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {}, []);

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
          <Route
            path="/"
            element={
              <UserContext.Provider
                value={{ user: user, login: login, logout: logout }}
              >
                <FirstPage />
              </UserContext.Provider>
            }
          />
          <Route
            path="/home"
            element={
              <UserContext.Provider
                value={{ user: user, login: login, logout: logout }}
              >
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </UserContext.Provider>
            }
          />
          <Route
            path="/signin"
            element={
              <UserContext.Provider value={{ login: login }}>
                <AuthRoute>
                  <SignIn />
                </AuthRoute>
              </UserContext.Provider>
            }
          />
          <Route
            path="/signup"
            element={
              <UserContext.Provider value={{ login: login }}>
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              </UserContext.Provider>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
