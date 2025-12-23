// src/pages/Gallery.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
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
  const pageRef = useRef(null);

  const handleClose = () => setSelectedBook(null);

  /* ---------------- SCROLL REVEAL ---------------- */

  useEffect(() => {
    if (!pageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    pageRef.current
      .querySelectorAll(".fade-up")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={pageRef}
      sx={{ mt: { xs: 16, sm: 20 }, mb: { xs: 4, sm: 8 } }}
    >
      {/* TITLE */}
      <Typography
        className="fade-up"
        color="rgba(13, 27, 42, 0.7)"
        fontWeight={700}
        gutterBottom
        sx={{ fontSize: { xs: "1.25rem", sm: "2rem" } }}
      >
        Books Gallery
      </Typography>

      {/* GRID */}
      <Box
        className="fade-up"
        sx={{
          px: { xs: 1, sm: 0 },
          mt: { xs: 1, sm: 2 },
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(3, 1fr)",
            sm: "repeat(3,1fr)",
            md: "repeat(5,1fr)",
            lg: "repeat(7,1fr)",
          },
          gap: { xs: 1, sm: 2 },
        }}
      >
        {books.map((book) => {
          const displayImage =
            book.image || getAssetPath("assets/covers/placeholder.png");

          return (
            <Card
              key={book.id}
              className="fade-up"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: { xs: 1, sm: 2 },
                boxShadow: 6,
                height: "100%",
                overflow: "hidden",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                component="img"
                image={displayImage}
                alt={book.title}
                loading="lazy"
                decoding="async"
                sx={{
                  height: { xs: 150, sm: 200, md: 230 },
                  objectFit: "contain",
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
                  gap: { xs: 0.5, sm: 1 },
                }}
              >
                {typeof book.price !== "undefined" && (
                  <Typography
                    color="text.primary"
                    fontWeight={700}
                    sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                  >
                    ₹{book.price}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  size="small"
                  onClick={() => addToCart(book.id)}
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    px: { xs: 0.5, sm: 1.5 },
                    py: { xs: 0.25, sm: 0.5 },
                    minWidth: { xs: 40, sm: 60 },
                    backgroundColor: "#f0b04f",
                    "&:hover": { backgroundColor: "#d99a3d" },
                  }}
                >
                  Add
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* IMAGE POPUP */}
      <Dialog open={!!selectedBook} onClose={handleClose} maxWidth="sm">
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            bgcolor: "#000",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedBook && (
            <img
              src={
                selectedBook.image ||
                getAssetPath("assets/covers/placeholder.png")
              }
              alt={selectedBook.title}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                display: "block",
                objectFit: "contain",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
