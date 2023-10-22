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
    <div className="h-screen">
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
