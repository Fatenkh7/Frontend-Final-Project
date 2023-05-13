import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from "../src/pages/SignIn/signin.jsx";
import Home from "../src/pages/Home/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
