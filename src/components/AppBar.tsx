import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Avatar } from "@mui/material";

export default function PrimarySearchAppBar() {


  return (
    <Box sx={{ flexGrow: 1, mx: 6 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          color: "grey.600",
          px: 6,
          borderRadius: "200px",
          mt: 2,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, color: "grey.800" }}
          >
            Logo
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={{
                background: "#7B5AFF",
                textTransform: "none",
                color: "white",
                marginRight: 4,
                borderRadius: "200px",
                py: 1,
              }}
            >
              Feedback
            </Button>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              sx={{ color: "grey.600" }}
            >
              {/* <MailIcon /> */}
              <Avatar
                sx={{ width: 24, height: 24 }}
                alt="Bell Icon"
                src="./src/assets/Bell.png"
              />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: "grey.600" }}
            >
              {/* <NotificationsIcon /> */}
              <Avatar
                sx={{ width: 24, height: 24 }}
                alt="Info Icon"
                src="./src/assets/Vector.png"
              />
            </IconButton>
            <IconButton>
              <img
            
                alt="User"
                src="/Avatar.png"
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
