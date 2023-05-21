import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token"))
      navigate("/signin");
  }, [navigate]);

  return <Box sx={{ height: "100vh" }}>{props.children}</Box>;
};

export default ProtectedRoute;
