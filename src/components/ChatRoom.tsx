import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

interface ChatRoomProps {
  username: string;
  roomId: string;
  leaveRoomCallback: any;
}

const ChatRoom = (props: ChatRoomProps) => {
  const { username, roomId, leaveRoomCallback } = props;

  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  const { sendMessage, lastMessage, getWebSocket } = useWebSocket(
    `ws://localhost:3000?username=${username}&roomId=${roomId}`
  );

  useEffect(() => {
    if (lastMessage != undefined) {
      setMessages([...messages, lastMessage?.data]);
    }
  }, [lastMessage]);

  const leaveRoom = () => {
    getWebSocket()?.close();
    leaveRoomCallback();
  }

  const handleCurrentMessageChange = (event: any) => {
    setCurrentMessage(event.target.value);
  };

  const submitMessage = () => {
    sendMessage(currentMessage);
  };

  return (
    <div className="h-screen">
      <button onClick={leaveRoom}>Leave Room</button>
      <h1 className="text-left">Room: {roomId}</h1>
      <div>
        {messages.map((message: string, index: number) => {
          return <h3 key={index}>{message}</h3>;
        })}
      </div>
      <div className="sticky bottom-0">
        <input onChange={handleCurrentMessageChange} className=""></input>
        <button onClick={submitMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
