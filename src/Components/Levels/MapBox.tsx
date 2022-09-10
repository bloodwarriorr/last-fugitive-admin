import React, { SetStateAction, useState } from "react";
import tile from "../../Assets/tile.png";
import collider from "../../Assets/colider.png";
import playerImg from "../../Assets/playerImg.png";
import enemy0 from "../../Assets/enemy0.png";
import enemy1 from "../../Assets/enemy1.png";
import enemy2 from "../../Assets//enemy2.png";
import { TOGGLES } from "../Utils/constants";
import { Box } from "@mui/material";
import { LevelType } from "../../Types/Types";

type Props = {
  rowIndex: number;
  cellIndex: number;
  toggles: boolean[];
  levelObject: LevelType;
  setLevelObject: (obj: LevelType) => void;
};

const MapBox: React.FC<Props> = ({
  rowIndex,
  cellIndex,
  toggles,
  levelObject,
  setLevelObject,
}) => {
  const [isCollider, setIsCollider] = useState(false);
  const enemiesImages = [enemy0, enemy1, enemy2];
  const { map, player, enemies, end_point } = levelObject;

  const background = `url(${tile})`;
  let isPlayer =
    player.start_position[0] === rowIndex &&
    player.start_position[1] === cellIndex;
  let isExit = end_point[0] === rowIndex && end_point[1] === cellIndex;
  const enemyIndex = enemies.findIndex(
    (pos: any) =>
      pos.start_position[0] === rowIndex && pos.start_position[1] === cellIndex
  );
  const handleCellClick = () => {
    if (toggles[TOGGLES.player]) {
      if (isPlayer) {
        setLevelObject({
          ...levelObject,
          player: {
            ...player,
            startDirection: player.startDirection === "LEFT" ? "RIGHT" : "LEFT",
          },
        });
      } else {
        setLevelObject({
          ...levelObject,
          player: {
            ...player,
            start_position: [rowIndex, cellIndex],
          },
        });
      }
    } else if (toggles[TOGGLES.exit]) {
      setLevelObject({ ...levelObject, end_point: [rowIndex, cellIndex] });
    } else if (toggles[TOGGLES.enemy1]) {
      const updated = enemies;
      //בדיקה שלוחצים על אויב קיים וםם זה האויב הזה - שינוי כיוון
      if (enemyIndex !== -1 && enemyIndex === 0) {
        updated[0].startDirection =
          updated[0].startDirection === "LEFT" ? "RIGHT" : "LEFT";
        setLevelObject({
          ...levelObject,
          enemies: updated,
        });
      } else {
        updated[0].start_position = [rowIndex, cellIndex];
        setLevelObject({
          ...levelObject,
          enemies: updated,
        });
      }
    } else if (toggles[TOGGLES.enemy2]) {
      const updated = enemies;
      if (enemyIndex !== -1 && enemyIndex === 1) {
        updated[1].startDirection =
          updated[1].startDirection === "LEFT" ? "RIGHT" : "LEFT";
        setLevelObject({
          ...levelObject,
          enemies: updated,
        });
      } else {
        updated[1].start_position = [rowIndex, cellIndex];
        setLevelObject({
          ...levelObject,
          enemies: updated,
        });
      }
    } else if (toggles[TOGGLES.enemy3]) {
      const updated = enemies;
      if (enemyIndex !== -1 && enemyIndex === 2) {
        updated[2].startDirection =
          updated[2].startDirection === "LEFT" ? "RIGHT" : "LEFT";
        setLevelObject({
          ...levelObject,
          enemies: updated,
        });
      } else {
        updated[2].start_position = [rowIndex, cellIndex];
        setLevelObject({
          ...levelObject,
          enemies: updated,
        });
      }
    } else {
      const collider = !isCollider;
      const newMap = JSON.parse(JSON.stringify(map));
      newMap[rowIndex][cellIndex] = collider ? 1 : 0;
      setIsCollider(collider);
      setLevelObject({ ...levelObject, map: newMap });
    }
  };
  return (
    <div
      style={{
        background: background,
        width: "6.5vmin",
        height: "6.5vmin",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleCellClick}
    >
      {!isPlayer && !isExit && !isCollider && enemyIndex === -1 && (
        <span>
          {rowIndex},{cellIndex}
        </span>
      )}
      {enemyIndex !== -1 && (
        <img
          width={"100%"}
          src={enemiesImages[enemyIndex]}
          alt="player"
          style={{
            transform:
              enemies[enemyIndex].startDirection === "LEFT"
                ? "scaleX(-1)"
                : "scaleX(1)",
          }}
        />
      )}
      {isPlayer && (
        <img
          width={"100%"}
          src={playerImg}
          alt="player"
          style={{
            transform:
              player.startDirection === "LEFT" ? "scaleX(-1)" : "scaleX(1)",
          }}
        />
      )}
      {isCollider && <img width={"80%"} src={collider} alt="collider" />}

      {isExit && (
        <Box
          width="100%"
          height={"100%"}
          position="absolute"
          boxShadow={"inset 2px 2px 10px 3px purple"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          EXIT
        </Box>
      )}
    </div>
  );
};

export default MapBox;
