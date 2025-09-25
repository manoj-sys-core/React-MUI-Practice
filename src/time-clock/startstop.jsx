import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Startstop({ run, toggle }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={toggle}>
        {run ? "Stop" : "Start"}
      </Button>
    </Stack>
  );
}
