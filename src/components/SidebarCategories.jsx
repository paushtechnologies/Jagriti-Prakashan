// src/components/SidebarCategories.jsx
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  MenuBook,
  Person,
  ChildCare,
  Language,
  Science,
  Calculate,
  AutoStories,
  Book,
  EmojiObjects,
  LocalOffer,
  Brush,
  Flight,
  Kitchen,
  HealthAndSafety,
  Memory,
  SportsSoccer,
  MusicNote,
  EmojiEmotions,
  ChevronRight,
} from "@mui/icons-material";

const categories = [
  { name: "History", icon: <MenuBook /> },
  { name: "Biography", icon: <Person /> },
  { name: "Children", icon: <ChildCare /> },
  { name: "English", icon: <Language /> },
  { name: "Science", icon: <Science /> },
  { name: "Math", icon: <Calculate /> },
  { name: "Fiction", icon: <AutoStories /> },
  { name: "Non-Fiction", icon: <Book /> },
  { name: "Philosophy", icon: <EmojiObjects /> },
  { name: "Religion", icon: <LocalOffer /> },
  { name: "Poetry", icon: <Brush /> },
  { name: "Art", icon: <Brush /> },
  { name: "Travel", icon: <Flight /> },
  { name: "Cooking", icon: <Kitchen /> },
  { name: "Health", icon: <HealthAndSafety /> },
  { name: "Technology", icon: <Memory /> },
  { name: "Business", icon: <SportsSoccer /> },
  { name: "Comics", icon: <EmojiEmotions /> },
];

export default function SidebarCategories() {
  const location = useLocation();
  const currentCategory = decodeURIComponent(
    location.pathname.split("/category/")[1] || ""
  );

  return (
      <Box
        className="scrollbar-hide"
        sx={{
        width: 200,
        backdropFilter: "blur(8px)", // Glass effect
        bgcolor: "rgba(255,255,255,0.3)",
        borderRight: 1,
        borderColor: "divider",
        display: { xs: "none", md: "block" },
        height: "calc(100vh - 160px)", // Fixed height relative to viewport
        position: "sticky",
        top: 160, // Fixed top position to account for both header bars
        overflowY: "auto",
        overflowX: "hidden", // Prevent horizontal scrolling
        maxWidth: "100%", // Ensure sidebar does not exceed viewport width
        "&::-webkit-scrollbar": { display: "none" },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          px: 2,
          py: 1,
          bgcolor: "rgba(13, 27, 42, 0.6)",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Categories
      </Typography>

      <List dense>
        {categories.map((c) => {
          const isActive = c.name === currentCategory;
          return (
            <ListItemButton
              key={c.name}
              component={Link}
              to={`/category/${encodeURIComponent(c.name)}`}
              selected={isActive}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.3,
                borderBottom: "1px solid rgba(0,0,0,0.05)", // subtle divider
                "&:hover": {
                  bgcolor:
                    "linear-gradient(to right, rgba(13,27,42,0.15), rgba(13,27,42,0.05))",
                },
                "&.Mui-selected": {
                  bgcolor: "rgba(13, 27, 42, 0.25)",
                  borderLeft: "4px solid #1976d2",
                  "& .MuiListItemText-primary": {
                    fontWeight: "bold",
                    color: "#1976d2",
                  },
                  "& .MuiListItemIcon-root": { color: "#1976d2" },
                },
              }}
            >
              {/* <ListItemIcon sx={{ minWidth: 32, color: "text.secondary" }}>
                {c.icon}
              </ListItemIcon> */}
              <ListItemText
                primary={c.name}
                primaryTypographyProps={{ fontSize: 14 }}
              />
              <ListItemIcon sx={{ minWidth: 28, color: "text.secondary" }}>
                <ChevronRight fontSize="small" />
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
