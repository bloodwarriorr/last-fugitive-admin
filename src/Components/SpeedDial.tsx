import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import { Refresh } from "@mui/icons-material";

type Props = {
  refreshData:()=>void
}
const SpeedDail: React.FC<Props> = ({refreshData}) => {
  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "fixed",
        bottom: 15,
        right: 15,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<Refresh />}
        onClick={() => refreshData()}
      >
      </SpeedDial>
    </Box>
  );
};
export default SpeedDail;
