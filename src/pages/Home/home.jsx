import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Stack, Box, Typography, IconButton, FormControl, OutlinedInput } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import Header from "../../components/Header";
import UserContext from "../../context/user";
import { addQuestion } from "../../api/asnwering";
import { doSpeechSynthesis, cancelSpeechSynthesis } from "../../utils/text-speack";
import Typewriter from "typewriter-effect";
import Logo from "../../logo.svg";
import "./home.css";
import Loading from '../../components/loading/loading';

const HomePage = ({ loading }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);
  const [latestAnswer, setLatestAnswer] = useState("");
  const [sendingQuestion, setSendingQuestion] = useState(false); // Added state for tracking question sending

  const location = useLocation();
  const email = location?.state?.email;

  const handleQuestionSubmit = async () => {
    if (!sendingQuestion && question.trim() !== "") {
      setSendingQuestion(true); // Disable question sending until response is received
      setChatMessages((prevMessages) => [...prevMessages, { type: "question", content: question }]);
      setQuestion("");

      try {
        const { response, error } = await addQuestion({ question });
        if (response) {
          const { answer } = response.data; // Extract the 'answer' property from the response object
          setLatestAnswer(answer); // Update the latest answer
          setChatMessages((prevMessages) => [...prevMessages, { type: "answer", content: answer }]);
          setCurrentPlayingIndex(prevIndex => prevIndex + 1);
          setAudioPlaying(true);
          doSpeechSynthesis(answer, () => {
            setAudioPlaying(false);
            setCurrentPlayingIndex(-1);
            setSendingQuestion(false); // Enable question sending after receiving the answer
          });
        } else if (error) {
          console.log(error);
          if (error instanceof SyntaxError) {
            console.log("Invalid response format");
          } else {
            // Handle other errors
          }
          setSendingQuestion(false); // Enable question sending in case of error
        }
      } catch (error) {
        console.log(error);
        // Handle other errors
        setSendingQuestion(false); // Enable question sending in case of error
      }
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (latestAnswer) {
      setAudioPlaying(true);
      doSpeechSynthesis(latestAnswer, () => {
        setAudioPlaying(false);
      });
    }
  }, [latestAnswer]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack alignItems="center" justifyContent="space-between" sx={{ height: "100%" }}>
      <Header bg borderBottom>
        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "5px 10px", alignItems: "center" }}>
          <Typography color="#fff">
            {email.split("@")[0]}
          </Typography>

          <img alt="mashed logo" src={Logo} width="45" />
          <IconButton onClick={handleSignOut}>
            <LogoutOutlinedIcon />
          </IconButton>
        </div>
      </Header>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: "md", width: "100%" }}>
        {chatMessages.map((message, index) => (
          <Box key={index} padding={2} style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1">
              {message.type === "answer" && index === chatMessages.length - 1 ? (
                <Typewriter
                  options={{
                    delay: 50,
                  }}
                  onInit={(typewriter) => {
                    typewriter.typeString(message.content).start();
                  }}
                />
              ) : (
                message.content
              )}
            </Typography>
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
                  disabled={sendingQuestion} // Disable the send button while sending a question
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