import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

interface ChatRoomProps {
  username: string;
  roomId: string;
}

const ChatRoom = (props: ChatRoomProps) => {
  const { username, roomId } = props;

  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const { sendMessage, lastMessage } = useWebSocket(
    `ws://localhost:3000?username=${username}&roomId=${roomId}`
  );

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
    <Grid container spacing={2} direction="column">
      Room: {roomId}
      <Grid item direction="column">
        <Grid item>
          Messages
          {messages.map((message: string, index: number) => {
            return <h3 key={index}>{message}</h3>;
          })}
        </Grid>

      </Grid>
        <TextField onChange={handleCurrentMessageChange}></TextField>
        <Button variant="contained" onClick={submitMessage}>
          Submit
        </Button>
    </Grid>
  );
};

export default ChatRoom;
