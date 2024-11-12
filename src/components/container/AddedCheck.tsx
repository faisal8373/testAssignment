import { Box, Typography } from "@mui/material";

function AddedCheckins() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", 
        alignItems: "center", 
        p: 2, 
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", color:'black', fontSize: '30px' }}>
        Added Checkins
      </Typography>
      <img alt="Category" src="./src/assets/category.png" /> 
    </Box>
  );
}

export default AddedCheckins;
