
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Stack,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import  db  from "../../config/firebase"; // Import the Firestore instance
import { addDoc, collection } from "firebase/firestore";
import AddedCheckins from "./AddedCheck";
import CheckinCards from "../collection/CheckinCards";
// import { getStorage } from "firebase/storage";

// const storage = getStorage();

function WelcomeCard() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  // const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };
 const handleAddCheckin = async () => {
   if (!title || !image) {
     alert("Please fill in the title and select an image.");
     return;
   }
setUploading(true)
   try {
     await addDoc(collection(db, "checkIn"), {
       title,
       fileName: image.name, // Storing only the file name
       timestamp: new Date(),
     });
     alert("Check-in added successfully!");
     setOpen(false);
     
   } catch (error) {
     console.error("Error saving to Firestore:", error);
     alert("Failed to save check-in. Please try again.");
   }finally{
    setUploading(false)
    setImage(null)
    setTitle('')
   }
 };

  return (
    <>
      <Card
        sx={{
          position: "relative",
          height: "auto",
          my: 2,
          alignSelf: "center",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          mx: "3%",
          width: "94%",
        }}
      >
        <Box
          component="img"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
            boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 0,
          }}
          alt="welcome"
          src="./src/assets/Rectangle.png"
        />

        <CardContent
          sx={{
            position: "absolute",
            zIndex: 1,
            height: 300,
            borderRadius: "20px",
            p: 4,
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "white", mt: 4 }}
          >
            Hi! 👋 James Doe
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, mb: 2, color: "white" }}>
            Lorem ipsum dolor sit amet, something important to say here.
          </Typography>

          <Button
            variant="contained"
            sx={{
              my: 5,
              background: "#7B5AFF",
              color: "white",
              marginRight: 4,
              borderRadius: "200px",
              py: 1,
            }}
            onClick={handleOpen}
          >
            Add check in
          </Button>
        </CardContent>
      </Card>
      <Box sx={{ mx: "3%", width: "94%" }}>
        <AddedCheckins />
      </Box>
      <CheckinCards loading={uploading} />
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            bgcolor: "#F8F8F8",
            height: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            Add check in
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <label>Title</label>
            <TextField
              sx={{ bgcolor: "white" }}
              label="Enter title"
              variant="outlined"
              fullWidth
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
              Upload Image
            </Typography>

            <Box
              sx={{
                border: "1px dashed grey",
                borderRadius: 1,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                flexDirection: "column",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                style={{ display: "none" }}
                id="upload-file-input"
              />
              <label htmlFor="upload-file-input">
                <Button variant="outlined" component="span" sx={{ mb: 2 }}>
                  Choose File
                </Button>
              </label>
              {image && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Selected: {image.name}
                </Typography>
              )}
              <Typography sx={{ mt: "26px" }}>
                Click or drag file to this area to upload
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleClose}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={handleAddCheckin}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default WelcomeCard;

