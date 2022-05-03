import React from "react";
import { Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { useAppSelector } from "../../redux/store";
import { ws } from "../../services/ws_service";

export default function GameBoard() {
  const isStarted = useAppSelector((state) => state.service.isStarted);
  const boardMap = useAppSelector((state) => state.service.boardMap);
  console.log(boardMap);

  const onOpen = (x: number, y: number) => {
    const command = `open ${y} ${x}`;
    ws.send(command);
    console.log(command);
  };
  if (!isStarted) return <div />;
  return (
    <Paper elevation={0} className="mt-4">
      {boardMap.map((e: Array<string>, index1) => (
        <div>
          {e.map((item: string, index2) => (
            <div
              key={index1 + "-" + index2}
              className={item === "□" ? "cell" : "opened-cell"}
              onClick={() => onOpen(index1, index2)}
            >
              {item === "□" ? "" : item}
            </div>
          ))}
        </div>
      ))}
    </Paper>
  );
}
