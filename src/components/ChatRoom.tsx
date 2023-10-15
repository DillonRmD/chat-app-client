import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const ChatRoom = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const username = "IAmDillon";

  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:3000?username=" + username);

  useEffect(() => {
    if (lastMessage != undefined) {
      setMessages([...messages, lastMessage?.data]);  
    }
  }, [lastMessage]);

  const handleCurrentMessageChange = (event: any) => {
    setCurrentMessage(event.target.value);
  };

  const submitMessage = () => {
    sendMessage(currentMessage);
  };

  return (
    <div>
      <div>
        {messages.map((message: string, index: number) => {
          return <h3 key={index}>{message}</h3>;
        })}
      </div>
      <div>
        <TextField onChange={handleCurrentMessageChange}></TextField>
        <Button variant="contained" onClick={submitMessage}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ChatRoom;
