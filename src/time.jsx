import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


export default function Clock(){
    let[time,setime] = useState(new Date());
    let[start,setstart] = useState(false)

     useEffect(()=>{
        if(start) return;
        let val = setInterval(() => {
            setime(new Date())
        }, 1000); 
        return ()=> clearInterval(val)
    },[start])
    return(
        <>
        <h1>Live Clock</h1>
        <h2>{time.toLocaleTimeString()}</h2>
            <Stack direction="row" spacing={2}>
      <Button onClick={()=>setstart(!start)} variant="outlined">
        Start
      </Button>
      <Button onClick={()=>setstart(!start)} variant="contained">
        Stop
      </Button>
    </Stack>
        </>
    )

}