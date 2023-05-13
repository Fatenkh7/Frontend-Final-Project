import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/user";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);
  useEffect(() => {
    if (!user) navigate("/signup");
  }, [navigate,user]);

  return user?(<Box sx={{ height: "100vh" }}>{props.children}</Box>):<div></div>;
};

export default ProtectedRoute;
