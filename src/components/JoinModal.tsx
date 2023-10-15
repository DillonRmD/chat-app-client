import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import "@fontsource/roboto";

interface JoinModalProps {
  submissionCallback: any;
}

const JoinModal = (props: JoinModalProps) => {
  const { submissionCallback } = props;
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  
  const [usernameFieldHasError, setUsernameFieldHasError] = useState<boolean>(true);
  const [usernameFieldErrorText, setUsernameFieldErrorText] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [roomIdFieldHasError, setRoomIdFieldHasError] = useState<boolean>(true);
  const [roomIdFieldErrorText, setRoomIdFieldErrorText] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');

  const modalSubmit = () => {
    if (!roomIdFieldHasError && !usernameFieldHasError) {
      submissionCallback(username, roomId);
      setModalIsOpen(false);
    }
  };

  const handleRoomIDChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '') {
      setRoomIdFieldHasError(true);
      setRoomIdFieldErrorText('Must Enter A Room ID');
    } else {
      setRoomIdFieldHasError(false);
      setRoomIdFieldErrorText('');
    }

    setRoomId(newValue);
  }

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === '') {
      setUsernameFieldHasError(true);
      setUsernameFieldErrorText('Must Enter A Username');
    } else {
      setUsernameFieldHasError(false);
      setUsernameFieldErrorText('');
    }

    setUsername(newValue);
  }

  return (
    <Dialog open={modalIsOpen} onClose={() => {}}>
      <DialogTitle id="alert-dialog-title">{"Enter Username and Room ID to Join"}</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField error={roomIdFieldHasError} required autoFocus label="Room ID" variant="filled" onChange={handleRoomIDChange} helperText={roomIdFieldErrorText}/>
          <TextField error={usernameFieldHasError} required label="Username" variant="filled" onChange={handleUsernameChange} helperText={usernameFieldErrorText}/>
          <Button onClick={modalSubmit} variant="contained" disabled={roomIdFieldHasError || usernameFieldHasError}>
            Enter Chat Room
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default JoinModal;
