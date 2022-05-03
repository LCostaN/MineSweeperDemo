import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ws } from "../../services/ws_service";

interface LevelModalProps {
  isOpen: boolean;
  onClose: Function;
}

export default function AppLevelModal(props: LevelModalProps) {
  const [level, setLevel] = useState("1");
  const onStart = () => {
    ws.send("new " + level);
    props.onClose();
  };
  return (
    <Modal open={props.isOpen} onClose={() => props.onClose()}>
      <Box className="bg-white level-modal p-3">
        <h2>Select a Level</h2>
        <FormControl>
          <FormLabel>Level</FormLabel>
          <RadioGroup
            defaultValue="1"
            className="d-flex flex-row"
            onChange={(value) => setLevel(value.target.value)}
          >
            <FormControlLabel value="1" control={<Radio />} label="Level 1" />
            <FormControlLabel value="2" control={<Radio />} label="Level 2" />
            <FormControlLabel value="3" control={<Radio />} label="Level 3" />
            <FormControlLabel value="4" control={<Radio />} label="Level 4" />
          </RadioGroup>
          <div className="d-flex flex-row justify-content-end">
            <Button variant="contained" onClick={() => onStart()}>
              Start
            </Button>
            <Button
              variant="contained"
              className="ms-3"
              color="error"
              onClick={() => props.onClose()}
            >
              Cancel
            </Button>
          </div>
        </FormControl>
      </Box>
    </Modal>
  );
}
