// src/components/BookCard.jsx
import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { getAssetPath } from "../utils/assetPath";

export default function BookCard({ book, onAddToCart }) {
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
      }}
      elevation={3}
    >
      <CardMedia
        component="img"
        image={getAssetPath(book.cover || "assets/covers/placeholder.png")}
        alt={book.title}
        sx={{ height: { xs: 100, sm: 200 }, objectFit: "contain", bgcolor: "#fafafa" }}
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
        <Typography sx={{ display: "block", mt: {xs: 0, sm:0.3}, fontSize: "0.65rem", color: "text.secondary" }}>
          {book.author || ""}
        </Typography>
        <Typography sx={{ mt: { xs: 0.1, sm: 0.3 }, fontSize: { xs: "0.78rem", sm: "1rem" }, fontWeight: 700 }}>
          ₹ {book.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ p:{ xs: 0.5, sm: 1 } }}>
        <Stack direction="row" spacing={0.5} sx={{ width: "100%", justifyContent: "space-between" }}>
          <Button
            size="small"
            component={Link}
            to={`/book/${book.id}`}
            variant="outlined"
            sx={{
              color: "#f0b04f",
              borderColor: "#f0b04f",
              minWidth: { xs: 0, sm: 64 },
              px: { xs: 2, sm: 2 },
              fontSize: { xs: "0.85rem", sm: "0.875rem" },
            }}
          >
            View
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => onAddToCart(book.id, 1)}
            sx={{
              backgroundColor: "#f0b04f",
              color: "#fff",
              minWidth: { xs: 0, sm: 64 },
              px: { xs: 2, sm: 2 },
              fontSize: { xs: "0.85rem", sm: "0.875rem" },
            }}
          >
            Add
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
