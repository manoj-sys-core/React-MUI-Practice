import Box from "@mui/material/Box";
export default function Clockface({ time }) {
  return (
    <Box
      sx={{
        width: 200,
        height: 150,
        borderRadius: 2,
        bgcolor: "primary.main",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          bgcolor: "primary.dark",
        },
        margin: "auto",
      }}
    >
      <h1>Live CLock</h1>
      <h2>{time.toLocaleTimeString()}</h2>
    </Box>
  );
}
