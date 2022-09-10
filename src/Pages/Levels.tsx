import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LevelSelect from "../Components/Levels/LevelSelect";
import { getAllLevels } from "../Database/database";
import { useAuth } from "../Context/AdminContext";
import { emptyLevel, EnimiesType, LevelType, PlayerType } from "../Types/Types";

import LevelNumberInput from "../Components/Levels/LevelNumberInput";
import PositionButton from "../Components/Levels/PositionButton";
import { TOGGLES } from "../Components/Utils/constants";
import MapBox from "../Components/Levels/MapBox";
import MapRow from "../Components/Levels/MapRow";

type Props = {};

const Levels:React.FC<Props> = (props) => {
  const auth = useAuth();
  const [levelObject, setLevelObject] = useState<LevelType>(emptyLevel);
  const [allLevels, setAllLevels] = useState();
  const [levelCode, setLevelCode] = useState();
  const [levelSize, setLevelSize] = useState({ x: 8, y: 4 });
  const [numberOfEnemies, setNumberOfEnemies] = useState(1);
  const [gameMap, setGameMap] = useState([
    ...Array(4).fill([...Array(8).fill(0)]),
  ]);

  // const [playerToggle, setPlayerToggle] = useState(false)
  const [toggles, setToggles] = useState([false, false, false, false, false]);
  useEffect(() => {
    const getLevels = async () => {
      const levels = await getAllLevels(auth?.token!);
      setAllLevels(levels);
      setLevelCode(levels.length + 1);
    };
    getLevels();
  }, []);

  useEffect(() => {
    handleToggles();
    const newMap = JSON.parse(JSON.stringify(gameMap));
    const rowDiff = levelSize.y - gameMap.length;
    const cellDiff = levelSize.x - gameMap[0].length;
    if (rowDiff > 0 || cellDiff > 0) {
      for (let i = 0; i < rowDiff; i++) {
        newMap.push([...Array(levelSize.x).fill(0)]);
      }
      for (let row of newMap) {
        for (let i = 0; i < cellDiff; i++) {
          row.push(0);
        }
      }
    } else if (rowDiff < 0 || cellDiff < 0) {
      for (let i = 0; i < Math.abs(rowDiff); i++) {
        newMap.pop();
      }
      for (let row of newMap) {
        for (let i = 0; i < Math.abs(cellDiff); i++) {
          row.pop();
        }
      }
    }
    setLevelObject({ ...levelObject, map: newMap });
  }, [levelSize]);

  useEffect(() => {
    const enemiesDiff = numberOfEnemies - levelObject.enemies.length;
    if (enemiesDiff > 0) {
      for (let i = 0; i < enemiesDiff; i++) {
        levelObject.enemies.push({
          code: i + 1,
          start_position: [5, 1],
          startDirection: "RIGHT",
        });
      }
    } else if (enemiesDiff < 0) {
      for (let i = 0; i < Math.abs(enemiesDiff); i++) {
        levelObject.enemies.pop();
      }
    }
  }, [numberOfEnemies]);

  const handleToggles = (index = -1) => {
    let updated = toggles.map((val, i) => {
      if (index === i) return !val;
      return false;
    });
    setToggles(updated);
  };
  const handleStepCapChange = (val: string, id: string) => {
    const index = parseInt(id[1]);
    const steps = levelObject.step_cap;

    steps[index].step = parseInt(val);
    setLevelObject({ ...levelObject, step_cap: [...steps] });
  };

  return (
    <Box>
      <div
        style={{
          height: "calc(100vh - 231px)",
          display: "grid",
          gridTemplateRows: "2fr auto 5fr auto 2fr auto",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Box>
          <Typography>Settings</Typography>
          <Paper>
            <Box
              p={1}
              display={"flex"}
              alignItems="center"
              flexWrap={"wrap"}
              justifyContent={"space-around"}
            >
              <Box>
                <Typography variant="subtitle2">Level Code</Typography>
                <Typography variant="h6">{levelCode}</Typography>
              </Box>
              <LevelSelect
                name={"Rows"}
                value={levelSize.y}
                options={[4, 5, 6]}
                changeHandler={(val) =>
                  setLevelSize({ ...levelSize, y: val as number })
                }
              />
              <LevelSelect
                name={"Cols"}
                value={levelSize.x}
                options={[8, 9, 10, 11, 12, 13]}
                changeHandler={(val) =>
                  setLevelSize({ ...levelSize, x: val as number })
                }
              />
              <LevelSelect
                name={"Difficulty"}
                value={levelObject.diffculty}
                options={[1, 2, 3]}
                changeHandler={(val) =>
                  setLevelObject({ ...levelObject, diffculty: val as number })
                }
              />

              <LevelSelect
                name={"Enemies"}
                value={numberOfEnemies}
                options={[1, 2, 3]}
                changeHandler={(val) => setNumberOfEnemies(val as number)}
              />
              <LevelNumberInput
                id={"s0"}
                name={"★ ★ ★"}
                label={"number"}
                // min = {levelObject.step_cap[0].step}
                changeHandler={(val, id) => handleStepCapChange(val, id)}
                value={levelObject.step_cap[0].step}
              />
              <LevelNumberInput
                id={"s1"}
                name={"★ ★ "}
                label={"number"}
                min={levelObject.step_cap[0].step + 1}
                changeHandler={(val, id) => handleStepCapChange(val, id)}
                value={levelObject.step_cap[1].step}
              />
            </Box>
          </Paper>
        </Box>
        <Divider />
        <Box>
          {levelObject.map.map((row, index) => {
            return (
              <MapRow
                key={index}
                index={index}
                row={row}
                toggles={toggles}
                levelObject={levelObject}
                setLevelObject={(obj: LevelType) => setLevelObject(obj)}
              />
            );
          })}
        </Box>
        <Divider />

        <Box>
          <Typography>Positions</Typography>
          <Paper>
            <Box
              p={1}
              display={"flex"}
              alignItems="center"
              flexWrap={"wrap"}
              justifyContent={"space-around"}
            >
              <PositionButton
                label="Player"
                isPressed={toggles[TOGGLES.player]}
                setIsPressed={() => handleToggles(TOGGLES.player)}
              />
              <PositionButton
                label="Exit"
                isPressed={toggles[TOGGLES.exit]}
                setIsPressed={() => handleToggles(TOGGLES.exit)}
              />
              <PositionButton
                label="Enemy 1"
                isPressed={toggles[TOGGLES.enemy1]}
                setIsPressed={() => handleToggles(TOGGLES.enemy1)}
              />
              <PositionButton
                label="Enemy 2"
                isPressed={toggles[TOGGLES.enemy2]}
                isDisabled={numberOfEnemies < 2}
                setIsPressed={() => handleToggles(TOGGLES.enemy2)}
              />
              <PositionButton
                label="Enemy 3"
                isPressed={toggles[TOGGLES.enemy3]}
                isDisabled={numberOfEnemies < 3}
                setIsPressed={() => handleToggles(TOGGLES.enemy3)}
              />
            </Box>
          </Paper>
        </Box>
        <Box textAlign={"center"} marginTop={1}>
          <Button variant="contained">Create Level</Button>
        </Box>
      </div>
    </Box>
  );
};

export default Levels;

// const EnemiesSettings = ({
//   numberOfEnemies,
//   enemies,
//   handleEnemiesChange,
// }: any) => {
//   return (
//     <>
//       {[...Array(3)].map((el, index) => {
//         return (
//           <Box key={index} display={"flex"} alignItems="center">
//             <Divider orientation="vertical" flexItem>
//               Enemy {index + 1}
//             </Divider>
//             <Box>
//               <LevelArrayInput
//                 id={`e${index}`}
//                 name={"Position"}
//                 label={"y,x"}
//                 changeHandler={(val, id) => handleEnemiesChange(val, id!)}
//                 isDisabled={index >= numberOfEnemies}
//               />
//               <LevelSelect
//                 id={`e${index}`}
//                 name={"Direction"}
//                 value={enemies[0].startDirection}
//                 options={["LEFT", "RIGHT"]}
//                 changeHandler={(val, id) =>
//                   handleEnemiesChange(val as string, id!, true)
//                 }
//                 isDisabled={index >= numberOfEnemies}
//               />
//             </Box>
//             <Divider orientation="vertical" flexItem />
//           </Box>
//         );
//       })}
//     </>
//   );
// };
