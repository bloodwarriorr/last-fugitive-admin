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

const MapBox: React.FC<Props> = ({ rowIndex, cellIndex, toggles, levelObject, setLevelObject }) => {
  const [isCollider, setIsCollider] = useState(false);
  const enemiesImages = [enemy0, enemy1, enemy2];
  const { map, player, enemies, end_point } = levelObject;

  const background = `url(${tile})`;

  const isPlayer = player.start_position[0] === rowIndex && player.start_position[1] === cellIndex;
  const isExit = end_point[0] === rowIndex && end_point[1] === cellIndex;
  const enemyIndex = enemies.findIndex(
    (pos: any) => pos.start_position[0] === rowIndex && pos.start_position[1] === cellIndex
  );

  const handlePlayer = () => {
    //אם לוחצים על משבצת שמכילה כבר שחקן נסובב אותו
    if (isPlayer) {
      setLevelObject({
        ...levelObject,
        player: {
          ...player,
          startDirection: player.startDirection === "LEFT" ? "RIGHT" : "LEFT",
        },
      });
    } else {
      //זו אינה משבצת של שחקן לכן נמקמם אותו שם
      setLevelObject({
        ...levelObject,
        player: {
          ...player,
          start_position: [rowIndex, cellIndex],
        },
      });
    }
  };
  const handleExit = () => {
    setLevelObject({ ...levelObject, end_point: [rowIndex, cellIndex] });
  };
  const handleEnemies = (index: number) => {
    const updated = enemies;
    //בדיקה שלוחצים על אויב קיים וגם זה האויב הזה - שינוי כיוון
    if (enemyIndex !== -1 && enemyIndex === index) {
      updated[index].startDirection = updated[index].startDirection === "LEFT" ? "RIGHT" : "LEFT";
      setLevelObject({
        ...levelObject,
        enemies: updated,
      });
    } else {
      updated[index].start_position = [rowIndex, cellIndex];
      setLevelObject({
        ...levelObject,
        enemies: updated,
      });
    }
  };
  const handleCollider = () => {
    const collider = !isCollider;
    const newMap = JSON.parse(JSON.stringify(map));
    newMap[rowIndex][cellIndex] = collider ? 1 : 0;
    setIsCollider(collider);
    setLevelObject({ ...levelObject, map: newMap });
  };
  const handleCellClick = () => {
    //בדיקה איזה איזה אובייקט מזזים במפה ושאין בתא הזה כבר אובייקט אחר
    if (toggles[TOGGLES.PLAYER] && !isExit && !isCollider && enemyIndex === -1) {
      handlePlayer();
    } else if (toggles[TOGGLES.EXIT] && !isPlayer && !isCollider) {
      handleExit();
      //בנוסף בדיקה שאי אוייב אחר במשבצת כבר
    } else if (toggles[TOGGLES.ENEMY1] && !isPlayer && enemyIndex <= 0 && !isCollider) {
      handleEnemies(0);
    } else if (toggles[TOGGLES.ENEMY2] && !isPlayer && (enemyIndex === -1 || enemyIndex === 1) && !isCollider) {
      handleEnemies(1);
    } else if (toggles[TOGGLES.ENEMY3] && !isPlayer && (enemyIndex === -1 || enemyIndex === 2) && !isCollider) {
      handleEnemies(2);
    } else if (!isPlayer && !isExit && enemyIndex === -1) {
      handleCollider();
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
            transform: enemies[enemyIndex].startDirection === "LEFT" ? "scaleX(-1)" : "scaleX(1)",
          }}
        />
      )}
      {isPlayer && (
        <img
          width={"100%"}
          src={playerImg}
          alt="player"
          style={{
            transform: player.startDirection === "LEFT" ? "scaleX(-1)" : "scaleX(1)",
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
