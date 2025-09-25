import { useEffect, useState } from "react";
import Clockface from "./clockface";
import Startstop from "./startstop";

export default function MainClock() {
  let [time, settime] = useState(new Date());
  let [running, setrunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    let val = setInterval(() => {
       settime(new Date());
    }, 1000);
    return  ()=> clearInterval(val)
  }, [running]);
  let Toggle = ()=> setrunning(!running) 
  return(
    <>
    <Clockface time={time}/>
    <Startstop run={running} toggle={Toggle}/>
    </>
  )
}
