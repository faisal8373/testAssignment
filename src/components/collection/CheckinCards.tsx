import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors"; // For user avatar color
import { CardMedia } from "@mui/material"; // For displaying image thumbnail
import db from "../../config/firebase";
import { collection, getDocs, DocumentData } from "firebase/firestore";

interface CheckinCardsProps {
  loading: boolean;
}

const CheckinCards: React.FC<CheckinCardsProps> = ({ loading }) => {
  const [checkIns, setCheckins] = useState<DocumentData[]>([]);

  function formatDate(seconds: number) {
    const date = new Date(seconds * 1000);

    // Get day, month, and year
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // e.g., Nov
    const year = date.getFullYear();

    // Determine the suffix for the day (st, nd, rd, th)
    const daySuffix = (day: number) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Format and return the date
    return `${day}${daySuffix(day)} ${month}, ${year}`;
  }

  useEffect(() => {
    // Initialize Firestore

    // Fetch data from the 'checkin' collection
    const fetchCheckins = async () => {
      try {
        const checkinCollection = collection(db, "checkIn");
        const checkinSnapshot = await getDocs(checkinCollection);
        const checkinList = checkinSnapshot.docs.map((doc) => doc.data());
        console.log(checkinList);
        setCheckins(checkinList);
      } catch (error) {
        console.error("Error fetching check-ins:", error);
      }
    };

    fetchCheckins();
  }, [loading]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 6,
        mx: "3%",
        width: "94%",
      }}
    >
      {checkIns.map((card, index) => (
        <Card
          key={index}
          sx={{
            width: 310,
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            boxShadow: 3,
            mb: 4,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              alt="Thumbnail"
              image={"./src/assets/Image.png"}
              sx={{
                m: "5%",
                width: "90%",
                height: "auto",
                objectFit: "fill",
                borderRadius: 2,
              }}
            />
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                right: '1px',
                top: '25px',
                background: "#7B5AFF",
                textTransform: "none",
                color: "white",
                marginRight: 4,
                borderRadius: "200px",
                py: .5,
              }}
            >
              Checked in
            </Button>
          </Box>

          <CardContent sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {card.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {formatDate(card.timestamp.seconds)}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: deepOrange[500],
                  mr: 1,
                }}
              >
                {card.title.charAt(0)}
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Owner: {card.title}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CheckinCards;
