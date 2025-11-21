// src/pages/MediaAndMoments.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia } from "@mui/material";
import { getAssetPath } from "../utils/assetPath";

// Demo carousel images
const carouselImages = [
  getAssetPath("assets/MnM/53.jpg"),
  getAssetPath("assets/MnM/18.jpg"),
  getAssetPath("assets/MnM/15.jpg"),
  getAssetPath("assets/MnM/54.jpg"),
  getAssetPath("assets/MnM/59.jpg"),
];

// All photos (1–60)
const allPhotos = Array.from({ length: 60 }, (_, i) =>
  getAssetPath(`assets/MnM/${i + 1}.jpg`)
);

// Explosion grid config
const COLS = 10;
const ROWS = 6;

export default function MediaAndMoments() {
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [prevCarousel, setPrevCarousel] = useState(null);
  const [exploding, setExploding] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  // Carousel auto-switch (6 seconds), with explosion + fade on ALL (mobile + desktop)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarousel((prev) => {
        const next = (prev + 1) % carouselImages.length;
        setPrevCarousel(prev); // previous image index for tiles
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Trigger explosion animation when prevCarousel is set
  useEffect(() => {
    if (prevCarousel === null) return;

    // Reset fade & trigger fade-in of new image
    setFadeIn(false);
    const fadeTimeout = setTimeout(() => {
      setFadeIn(true);
    }, 10); // tiny delay to trigger CSS transition

    // Start explosion
    setExploding(true);
    const explodeTimeout = setTimeout(() => {
      setExploding(false);
      setPrevCarousel(null); // cleanup tiles overlay
    }, 700); // explosion duration

    return () => {
      clearTimeout(explodeTimeout);
      clearTimeout(fadeTimeout);
    };
  }, [prevCarousel, currentCarousel]);

  return (
    <Box sx={{ mt: { xs: 20, sm: 22 }, mb: { xs: 4, sm: 6 }, px: { xs: 1, sm: 0 } }}>
      {/* Carousel */}
      <Box
        sx={{
          mb: { xs: 3, sm: 6 },
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          // SAME ASPECT RATIO FOR MOBILE & DESKTOP
          aspectRatio: "1400 / 360",
        }}
      >
        {/* Current image (background, with fade) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${carouselImages[currentCarousel]})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            borderRadius: 2,
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 600ms ease-in-out",
          }}
        />

        {/* Explosion tiles overlay (for both mobile and desktop now) */}
        {prevCarousel !== null && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "visible", // let tiles fly out of the area
            }}
          >
            {Array.from({ length: ROWS }).map((_, row) =>
              Array.from({ length: COLS }).map((__, col) => {
                const tileWidth = 100 / COLS;
                const tileHeight = 100 / ROWS;

                // Movement: mainly UP, with slight horizontal jitter
                const baseUp = 180; // how far up (px-ish)
                const jitterUp = Math.random() * 80; // random extra upwards
                const offsetY = -(baseUp + jitterUp);

                const jitterSide = (Math.random() - 0.5) * 60; // side wobble
                const offsetX = jitterSide;

                const delay = (row + col) * 18; // slight stagger

                return (
                  <Box
                    key={`${row}-${col}`}
                    sx={{
                      position: "absolute",
                      width: `${tileWidth}%`,
                      height: `${tileHeight}%`,
                      left: `${col * tileWidth}%`,
                      top: `${row * tileHeight}%`,
                      backgroundImage: `url(${carouselImages[prevCarousel]})`,
                      backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                      backgroundPosition: `${
                        (col / (COLS - 1)) * 100
                      }% ${(row / (ROWS - 1)) * 100}%`,
                      transform: exploding
                        ? `translate(${offsetX}px, ${offsetY}px)`
                        : "translate(0, 0)",
                      opacity: exploding ? 0 : 1,
                      transition:
                        "transform 600ms ease-out, opacity 600ms ease-out",
                      transitionDelay: `${delay}ms`,
                    }}
                  />
                );
              })
            )}
          </Box>
        )}
      </Box>

      {/* Photos in responsive grid (unchanged) */}
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
                    transition: "none",
                    "&:hover": { transform: "none", boxShadow: 3 },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={img}
                  alt={`Photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    objectFit: "cover",
                    height: { xs: 110, sm: 200, md: 300 },
                    width: "100%",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
