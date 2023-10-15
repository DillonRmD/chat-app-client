import { useState } from "react";
import "./App.css";

import ChatRoom from "./components/ChatRoom";
import JoinModal from "./components/JoinModal";

const App = () => {
  const [enterRoom, setEnterRoom] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");

  const handleModalSubmission = (username: string, roomId: string) => {
    setUsername(username);
    setRoomId(roomId);
    setEnterRoom(true);
  };

  return (
    <div>
      {enterRoom ? (
        <ChatRoom username={username} roomId={roomId} />
      ) : (
        <JoinModal submissionCallback={handleModalSubmission} />
      )}
    </div>
  );
};

export default App;
