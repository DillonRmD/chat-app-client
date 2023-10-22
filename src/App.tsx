import { useState } from "react";

import ChatRoom from "./components/ChatRoom";
import JoinPage from "./components/JoinPage";

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
    <>
      {enterRoom ? (
        <ChatRoom username={username} roomId={roomId} />
      ) : (
        <JoinPage submissionCallback={handleModalSubmission} />
      )}
    </>
  );
};

export default App;
