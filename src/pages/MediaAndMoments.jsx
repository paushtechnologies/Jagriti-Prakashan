// src/pages/MediaAndMoments.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia } from "@mui/material";

// Demo carousel images
const carouselImages = [
  "/assets/program1.jpg",
  "/assets/program2.jpg",
  "/assets/program3.jpg",
  "/assets/program4.jpg",
  "/assets/program5.jpg",
];

// All photos (flattened, no year grouping)
const years = Array.from({ length: 10 }, (_, i) => 2025 - i);
const allPhotos = years.flatMap((year, idx) =>
  Array.from({ length: 3 }, (_, i) => `/assets/program${((idx + i) % 5) + 1}.jpg`)
);

export default function MediaAndMoments() {
  const [currentCarousel, setCurrentCarousel] = useState(0);

  // Carousel auto-switch
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarousel((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ mt: { xs: 20, sm: 22 }, mb: { xs: 4, sm: 6 }, px: { xs: 1, sm: 0 } }}>
      {/* Carousel */}
      <Box sx={{ mb: { xs: 3, sm: 6 }, position: "relative", overflow: "hidden", borderRadius: 2, height: { xs: 160, sm: 300 } }}>
        {carouselImages.map((img, idx) => (
          <Box
            key={idx}
            component="img"
            src={img}
            alt={`Carousel ${idx}`}
            loading="lazy"
            decoding="async"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: `${(idx - currentCarousel) * 100}%`,
              transition: "left 0.8s ease-in-out",
            }}
          />
        ))}
      </Box>

      {/* Photos in responsive grid */}
      <Box>
        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
          {allPhotos.map((img, i) => (
            <Grid item xs={4} sm={6} md={4} key={i}>
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "transform 0.3s ease, boxShadow 0.3s ease",
                  "@media (max-width:600px)": {
                    transition: 'none',
                    '&:hover': { transform: 'none', boxShadow: 3 }
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={img}
                  alt={`Photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  sx={{ objectFit: "cover", height: { xs: 110, sm: 200, md: 300 }, width: '100%' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
