import { Box } from '@mui/material';
import React, { SetStateAction } from 'react'
import { LevelType } from '../../Types/Types';
import MapBox from './MapBox';

type Props = {
  index:number
  row:number[]
  toggles:boolean[]
  levelObject:LevelType
  setLevelObject : (obj:LevelType) => void
}

const MapRow:React.FC<Props> = ({
  index,row,toggles,levelObject,setLevelObject
}) => {
  const rows = row.map((col: any, cellIndex: any) => {
    return (
      <MapBox
        key={cellIndex}
        toggles={toggles}
        rowIndex={index}
        cellIndex={cellIndex}
        levelObject={levelObject}
        setLevelObject={setLevelObject}
      />
    );
  });
  return <Box sx={{ display: "flex", justifyContent: "center" }}>{rows}</Box>;
}

export default MapRow