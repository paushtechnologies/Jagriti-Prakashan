// src/pages/Gallery.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getAssetPath } from "../utils/assetPath";

export default function Gallery({ books = [], addToCart }) {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleClose = () => setSelectedBook(null);

  return (
    <Box sx={{ mt: { xs: 20, sm: 22 }, mb: { xs: 4, sm: 8 } }}>
      <Typography
        color="rgba(13, 27, 42, 0.7)"
        fontWeight={700}
        gutterBottom
        sx={{ fontSize: { xs: '1.25rem', sm: '2rem' } }}
      >
        Books Gallery
      </Typography>

      {/* Responsive grid: keep desktop columns, compress on mobile */}
      <Box
          sx={{
            px: { xs: 1, sm: 0 },
            mt: { xs: 1, sm: 2 },
            display: "grid",
            gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(3,1fr)", md: "repeat(5,1fr)", lg: "repeat(7,1fr)" },
            gap: { xs: 1, sm: 2 },
          }}
      >
        {books.map((book) => (
          <Card
            key={book.id}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: {xs: 1, sm:2},
              boxShadow: 6,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={getAssetPath(book.cover || "assets/covers/placeholder.png")}
              alt={book.title}
              loading="lazy"
              decoding="async"
              sx={{
                height: { xs: 150, sm: 200, md: 250 },
                objectFit: "cover",
                backgroundColor: "#f7f7f7",
                cursor: "pointer",
              }}
              onClick={() => setSelectedBook(book)}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: { xs: 0.5, sm: 1 },
                pb: { xs: 0, sm: 0 },
                pt: { xs: 0.4, sm: 0.5 },
                gap: { xs: 0.5, sm: 1 },
              }}
            >
              {typeof book.price !== "undefined" && (
                <Typography color="text.primary" fontWeight={700} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  ₹{book.price}
                </Typography>
              )}
              <Button
                variant="contained"
                size="small"
                onClick={() => addToCart(book.id)}
                sx={{
                  fontSize: { xs: '0.90rem', sm: '0.875rem' },
                  px: { xs: 0.25, sm: 1.5 },
                  py: { xs: 0.25, sm: 0.5 },
                  minHeight: { xs: 34 },
                  minWidth: { xs: 48 },
                  boxSizing: 'border-box',
                  maxWidth: { xs: 72 }
                }}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Image Popup */}
      <Dialog open={!!selectedBook} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 10, color: "#fff" }}
          >
            <CloseIcon />
          </IconButton>
          {selectedBook && (
            <img
              src={getAssetPath(selectedBook.cover || "assets/covers/placeholder.png")}
              alt={selectedBook.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
