// src/components/BookCard.jsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { getAssetPath } from "../utils/assetPath";

export default function BookCard({ book, onAddToCart }) {
  // Use the 'image' property created in App.jsx (the fixed Drive link)
  // If 'image' is empty, we fall back to the placeholder
  const displayImage = book.image || getAssetPath("assets/covers/placeholder.png");

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: { xs: 120, sm: 200 },
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
        flexShrink: 0,
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-4px)" }
      }}
      elevation={3}
    >
      <CardMedia
        component="img"
        // IMPORTANT: We do NOT wrap the whole thing in getAssetPath 
        // because book.image is already a full URL (https://...)
        image={displayImage}
        alt={book.title}
        sx={{ 
          height: { xs: 150, sm: 240 }, 
          objectFit: "contain", 
          bgcolor: "#fafafa",
          p:0 // Optional: adds a little padding around the book cover
        }}
      />
      
      <CardContent sx={{ flex: 1, p: { xs: 0.5, sm: 0.75 } }}>
        <Typography
          noWrap
          sx={{
            fontSize: { xs: "0.7rem", sm: "1rem" },
            fontWeight: 700,
          }}
        >
          {book.title}
        </Typography>
        
        <Typography 
          noWrap
          sx={{ 
            display: "block", 
            mt: {xs: 0, sm: 0.3}, 
            fontSize: { xs: "0.65rem", sm: "0.75rem" }, 
            color: "text.secondary" 
          }}
        >
          {book.author || "Unknown Author"}
        </Typography>
        
        <Typography 
          sx={{ 
            mt: { xs: 0.1, sm: 0.3 }, 
            fontSize: { xs: "0.85rem", sm: "1.25rem" }, 
            fontWeight: 700,
            color: "primary.main"
          }}
        >
          ₹{book.price}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: { xs: 0.5, sm: 0.5 } }}>
        <Stack direction="row" spacing={0.4} sx={{ width: "100%", justifyContent: "space-between" }}>
          <Button
            size="small"
            component={Link}
            to={`/book/${book.id}`}
            variant="outlined"
            sx={{
              color: "#f0b04f",
              borderColor: "#f0b04f",
              minWidth: { xs: 0, sm: 60 },
              px: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.75rem", sm: "1.1rem" },
              textTransform: "none"
            }}
          >
            View
          </Button>
          
          <Button
            size="small"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(book.id, 1);
            }}
            sx={{
              backgroundColor: "#f0b04f",
              color: "#fff",
              minWidth: { xs: 0, sm: 60 },
              px: { xs: 1, sm: 2 },
              fontSize: { xs: "0.75rem", sm: "1.15rem" },
              textTransform: "none",
              "&:hover": { backgroundColor: "#d99a3d" }
            }}
          >
            Add
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}