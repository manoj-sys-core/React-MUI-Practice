
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export default function Colorchange() {
    let [color,setColor] = useState("white")
    const rcolor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
        <Box sx={{
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            gap:2
        }}
        >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: 1,
            bgcolor: color,
        }}
      />
      <ButtonGroup >
        <Button onClick={()=>setColor("Red")} variant="outlined" color="error">
  REd
</Button>
<Button onClick={()=>setColor("Green")} variant="contained" color="success">
  Green
</Button>
<Button onClick={()=>setColor("Blue")} variant="contained">
  Blue
</Button>
</ButtonGroup>
<Button onClick={()=>setColor(rcolor)} >Random Color</Button>

</Box>

  );
}