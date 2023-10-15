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
  const [displayName, setDisplayName] = useState<string>('');

  const modalSubmit = () => {
    submissionCallback(displayName);
    setModalIsOpen(false);
  };

  const handleDisplayNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
  }

  return (
    <Dialog open={modalIsOpen} onClose={() => {}}>
      <DialogTitle id="alert-dialog-title">{"Enter Display Name:"}</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField required label="Display Name" variant="filled" onChange={handleDisplayNameChange}/>
          <Button onClick={modalSubmit} variant="contained">
            Enter Chat Room
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default JoinModal;
