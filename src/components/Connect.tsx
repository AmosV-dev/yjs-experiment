import { Button, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

interface ConnectProps {
  onSubmit: (roomName: string, nickname: string) => void;
}

export const Connect = ({ onSubmit }: ConnectProps) => {
  const [roomName, setRoomName] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(roomName, nickname);
  };
  return (
    <>
      <h1>Welcome</h1>
      <h2>Enter an existing room, or create a new one.</h2>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          <TextField
            label="Room name"
            value={roomName}
            onChange={(event) => setRoomName(event.target.value)}
          />
          <TextField
            label="Nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
};
