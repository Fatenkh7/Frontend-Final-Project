import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Box, Typography, IconButton, FormControl, OutlinedInput } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import Header from "../../components/Header";
import UserContext from "../../context/user";
import { addQuestion } from "../../api/asnwering";
import { doSpeechSynthesis, cancelSpeechSynthesis } from "../../utils/text-speack";
import Logo from "../../logo.svg";
import "./home.css";

const HomePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1); // Track the index of the currently playing message

  const handleQuestionSubmit = async () => {
    if (question.trim() !== "") {
      setChatMessages((prevMessages) => [...prevMessages, { type: "question", content: question }]);
      setQuestion("");

      try {
        const { response, error } = await addQuestion({ question });
        if (response) {
          const { answer } = response.data; // Extract the 'answer' property from the response object
          setChatMessages((prevMessages) => [...prevMessages, { type: "answer", content: answer }]);
          setCurrentPlayingIndex(prevIndex => prevIndex + 1);
          setAudioPlaying(true);
          doSpeechSynthesis(answer, () => {
            setAudioPlaying(false);
            setCurrentPlayingIndex(-1);
          });
        } else if (error) {
          console.log(error);
          if (error instanceof SyntaxError) {
            console.log("Invalid response format");
          } else {
            // Handle other errors
          }
        }
      } catch (error) {
        console.log(error);
        // Handle other errors
      }
    }
  };

  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <Stack alignItems="center" justifyContent="space-between" sx={{ height: "100%" }}>
      <Header bg borderBottom>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingX: 2, maxWidth: "md" }}>
          <Typography variant="h6" fontWeight="700" sx={{ opacity: 0.6 }} color="red">
            {user && user.email}
          </Typography>
          <img src={Logo} alt="Logo" style={{ height: "30px", left: "30px" }} />
        </Box>
        <IconButton onClick={handleSignOut}>
          <LogoutOutlinedIcon />
        </IconButton>
      </Header>

      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: "md", width: "100%" }}>
        {chatMessages.map((message, index) => (
          <Box key={index} padding={2}>
            <Typography variant="body1">{message.content}</Typography>
            {currentPlayingIndex === index && audioPlaying ? (
              <PauseCircleIcon
                onClick={() => {
                  cancelSpeechSynthesis();
                  setAudioPlaying(false);
                  setCurrentPlayingIndex(-1);
                }}
              />
            ) : (
              <PlayArrowIcon
                onClick={() => {
                  setCurrentPlayingIndex(index);
                  setAudioPlaying(true);
                  doSpeechSynthesis(message.content, () => {
                    setAudioPlaying(false);
                    setCurrentPlayingIndex(-1);
                  });
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Stack width="100%" alignItems="center" justifyContent="center" borderTop="1px solid #39f6ff" bgcolor="#000" zIndex={3}>
        <Box padding={2} width="100%" maxWidth="md">
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              placeholder="Ask something..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleQuestionSubmit();
                }
              }}
              endAdornment={
                <IconButton
                  color="#39f6ff"
                  onClick={handleQuestionSubmit}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <SendOutlinedIcon />
                </IconButton>
              }
            />
          </FormControl>
        </Box>
      </Stack>
    </Stack>
  );
};

export default HomePage;
