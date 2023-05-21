import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import Header from "./Header";

const AuthRoute = (props) => {
  useEffect(() => {

  }, []);

  return  (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Header>
        <Typography variant="h5" fontWeight="600" fontFamily={"emoji"}>
          MASHED-BOT
        </Typography>
      </Header>

      <Box width="100%">{props.children}</Box>

      <Box padding={2}>
        <Typography variant="caption" color="primary">
          Faten Khoder
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthRoute;
