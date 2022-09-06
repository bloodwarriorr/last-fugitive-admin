import {
  Box,
  Container,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SizeSelect from "../Components/SizeSelect";

type Props = {};

const Levels = (props: Props) => {
  const [levelSize, setLevelSize] = useState({ x: 8, y: 4 });
  const [tileSize, setTileSize] = useState(window.innerWidth / levelSize.x);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [numberOfEnemies, setNumberOfEnemies] = useState(1);
  const [enemiesPositions, setEnemiesPositions] = useState([
    { code: 0, start_position: [5, 1], startDirection: "UP" },
  ]);
  const [endPoint, setEndPoint] = useState([2, 7]);
  const [gameMap, setGameMap] = useState([
    ...Array(4).fill([...Array(8).fill(0)]),
  ]);

  useEffect(() => {
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
    setGameMap(newMap);
    setTileSize(window.innerWidth / (levelSize.x * 2));
  }, [levelSize]);

  useEffect(() => {
    const enemiesDiff = numberOfEnemies - enemiesPositions.length;
    if (enemiesDiff > 0) {
      for (let i = 0; i < enemiesDiff; i++) {
        enemiesPositions.push({
          code: i + 1,
          start_position: [5, 1],
          startDirection: "UP",
        });
      }
    } else if (enemiesDiff < 0) {
      for (let i = 0; i < Math.abs(enemiesDiff); i++) {
        enemiesPositions.pop();
      }
    }
  }, [numberOfEnemies]);

  // const handlePlayerError = (): boolean | undefined => {
  //   const y = playerPosition[0];
  //   const x = playerPosition[1];
  //   return !validateSprites(y,x);
  // };
  // const handleEnemiesError = (): boolean | undefined => {
  //   const pos = JSON.parse(
  //     JSON.stringify([enemiesPositions]).replaceAll('"', " ").toString()
  //   );
  //   return pos.some((p: any) => {
  //     const y = parseInt(p[0]);
  //     const x = parseInt(p[1]);
  //     return y < 0 || x < 0 || y > levelSize.y || x > levelSize.x;
  //   });
  // };
  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pos = e.target.value.split(",");
    if (pos[0] && pos[1] && validateSprites(pos[0], pos[1])) {
      setPlayerPosition([parseInt(pos[0]), parseInt(pos[1])]);
    }
  };
  const handleEnemiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pos = e.target.value.split(",");
    if (pos[0] && pos[1] && validateSprites(pos[0], pos[1])) {
      const id = parseInt(e.target.id[1]);
      const enemies = enemiesPositions;
      enemies[id].start_position = [parseInt(pos[0]), parseInt(pos[1])];
      setEnemiesPositions([...enemies]);
    }
  };
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pos = e.target.value.split(",");
    if (pos[0] && pos[1] && validateSprites(pos[0], pos[1])) {
      const y = parseInt(pos[0]);
      const x = parseInt(pos[1]);
      setEndPoint([y, x]);
      gameMap[y][x] = -1;
    }
  };
  const validateSprites = (y: number | string, x: number | string) => {
    return y > 0 || x > 0 || y < levelSize.y || x < levelSize.x;
  };
  return (
    <Container maxWidth={"xl"}>
      <Stack spacing={2}>
        <Container maxWidth={"md"}>
          <Grid container>
            <Grid item>
              <FormControl sx={{ m: 1, width:90 }}>
                <Typography>Rows</Typography>
                <SizeSelect
                  val={levelSize.y}
                  setLevelSize={(val) => setLevelSize({ ...levelSize, y: val })}
                  options={[4, 5, 6]}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl sx={{ m: 1, width:90 }}>
                <Typography>Cells</Typography>
                <SizeSelect
                  val={levelSize.x}
                  setLevelSize={(val) => setLevelSize({ ...levelSize, x: val })}
                  options={[8, 9, 10, 11, 12, 13]}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl sx={{ m: 1, width:90 }}>
                <Typography>Start</Typography>
                <TextField
                  label="y,x"
                  variant="outlined"
                  // error={handlePlayerError()}
                  onChange={handlePlayerChange}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl sx={{ m: 1, width:90 }}>
                <Typography>End</Typography>
                <TextField
                  label="y,x"
                  variant="outlined"
                  onChange={handleEndChange}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl sx={{ m: 1, width:90 }}>
                <Typography>Enemies</Typography>
                <SizeSelect
                  val={numberOfEnemies}
                  setLevelSize={(val) => setNumberOfEnemies(val)}
                  options={[1, 2, 3]}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl sx={{ m: 1, width:90 }}>
                <Typography>Enemy 1</Typography>
                <TextField
                  id={"e0"}
                  label="y,x"
                  variant="outlined"
                  onChange={handleEnemiesChange}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl sx={{ m: 1, width:90 }}>
                <Typography>Enemy 2</Typography>
                <TextField
                  id={"e1"}
                  label="y,x"
                  variant="outlined"
                  disabled={numberOfEnemies < 2}
                  onChange={handleEnemiesChange}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl sx={{ m: 1, width:90 }}>
                <Typography>Enemy 3</Typography>
                <TextField
                  id={"e2"}
                  label="y,x"
                  variant="outlined"
                  disabled={numberOfEnemies < 3}
                  onChange={handleEnemiesChange}
                />
              </FormControl>
            </Grid>


          </Grid>
        </Container>

        <Container maxWidth={"xl"}>
          {gameMap.map((row, index) => {
            return (
              <MapRow
                key={index}
                index={index}
                row={row}
                tileSize={tileSize}
                player={playerPosition}
                enemies={enemiesPositions.map((enemy) => enemy.start_position)}
                end={endPoint}
                map={gameMap}
                setMap = {setGameMap}
              />
            );
          })}
        </Container>
      </Stack>
    </Container>
  );
};

export default Levels;

export const MapRow = (props: any) => {
  const rows = props.row.map((col: any, index: any) => {
    return (
      <MapBox
      setMap = {props.setMap}
        map={props.map}
        player={props.player}
        enemies={props.enemies}
        end={props.end}
        col={col}
        tileSize={props.tileSize}
        cellIndex={index}
        rowIndex={props.index}
        key={index}
      />
    );
  });
  return <Box sx={{ display: "flex", justifyContent: "center" }}>{rows}</Box>;
};

export const MapBox = (props: any) => {
  const { tileSize, rowIndex, cellIndex, player, enemies, end,map,setMap } = props;
  const [isCollider, setIsCollider] = useState(false);
  const isEnemy = enemies.find(
    (pos: any) => pos[0] === rowIndex && pos[1] === cellIndex
  );

  let color;
  if (player[0] === rowIndex && player[1] === cellIndex) {
    color = "green";
  } else if (isEnemy) {
    color = "red";
  } else if (end[0] === rowIndex && end[1] === cellIndex) {
    color = "purple";
  } else {
    color = "#aaa";
  }
  const handleCellClick = ()=>{
    const collider = !isCollider
    const newMap = JSON.parse(JSON.stringify(map))
    newMap[rowIndex][cellIndex] = collider ? 1 : 0
    setIsCollider(collider)
    setMap(newMap)
  }
  return (
    <div
      style={{
        backgroundColor: color,
        width: tileSize,
        height: tileSize,
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
      }}
      onClick={handleCellClick}
    >
      {rowIndex},{cellIndex}
      {isCollider && (
        <small style={{ position: "absolute", bottom: 1 }}>[COLLIDER]</small>
      )}
    </div>
  );
};
