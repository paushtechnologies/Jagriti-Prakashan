// src/pages/BookDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { getAssetPath } from "../utils/assetPath";

export default function BookDetails({ books = [], addToCart }) {
  const { id } = useParams();
  const book = books.find((b) => String(b.id) === String(id));
  const [qty, setQty] = useState(1);

  if (!book) {
    return (
      <Box sx={{ mt: { xs: 8, sm: 22 }, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Book not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        mt: { xs: 20, sm: 22 },
        borderRadius: 3,
        background: "linear-gradient(135deg, #fafafa, #fdfdfd)",
      }}
    >
      <Grid container spacing={4} size={6} columns={24}>

        {/* Book Image */}
        <Grid item xs={12} sm={12} md={4}>
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: 0,
              bgcolor: "#fff",
            }}
          >
            <Box
              component="img"
              src={getAssetPath(book.cover || "assets/covers/placeholder.png")}
              alt={book.title}
              loading="lazy"
              decoding="async"
              sx={{ width: '100%', height: 'auto', objectFit: 'contain', maxHeight: { xs: 220, sm: 420 } }}
            />
          </Box>
        </Grid>

        {/* Book Details */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: "primary.main", fontSize: { xs: '1.25rem', sm: '2rem' } }}
          >
            {book.title}
          </Typography>

          {book.author && (
            <Typography
              variant="subtitle1"
              sx={{ mb: 1, fontStyle: "italic", color: "text.secondary", fontSize: { xs: '0.95rem', sm: '1rem' } }}
            >
              by {book.author}
            </Typography>
          )}

          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 2, color: "success.main", fontSize: { xs: '1rem', sm: '1.5rem' } }}
          >
            ₹ {book.price}
          </Typography>

          

          {/* <Divider sx={{ my: 2 }} /> */}

          {/* Add to Cart Section */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, alignItems: { xs: 'stretch', sm: 'center' }, mb: 3 }}>
            <TextField
              type="number"
              size="small"
              label="Qty"
              value={qty}
              inputProps={{ min: 0, max: 999 }}
              onChange={(e) => {
                const val = Math.max(0, Math.min(999, parseInt(e.target.value || "0", 10)));
                setQty(val);
              }}
              sx={{ width: { xs: '100%', sm: 100 } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToCart(book.id, qty)}
              sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1, sm: 1 }, width: { xs: '100%', sm: 'auto' } }}
            >
              Add to Cart
            </Button>
          </Box>

          {/* Book Meta Info - stacked vertically */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {book.publisher && (
              <Chip
                label={`Publisher: ${book.publisher}`}
                variant="outlined"
                sx={{ width: "fit-content" }}
              />
            )}
            {book.year && (
              <Chip label={`Year: ${book.year}`} variant="outlined" sx={{ width: "fit-content" }} />
            )}
            {book.isbn && (
              <Chip label={`ISBN: ${book.isbn}`} variant="outlined" sx={{ width: "fit-content" }} />
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={16}>
          
          <Divider sx={{ my: 2 }} />
          {book.description && (
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
              {book.description}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
