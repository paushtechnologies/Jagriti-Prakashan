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

export default function MediaAndMoments() {
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [prevCarousel, setPrevCarousel] = useState(null);
  const [exploding, setExploding] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  // Simple viewport check (used for grid density)
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= 600;

  // Grid configuration: mobile lighter, desktop denser
  const COLS = isMobile ? 12 : 20;
  const ROWS = isMobile ? 7 : 12;

  // Carousel auto-switch every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarousel((prev) => {
        const next = (prev + 1) % carouselImages.length;
        setPrevCarousel(prev); // track old slide for tiles
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Explosion + fade sequence when prevCarousel is set
  useEffect(() => {
    if (prevCarousel === null) return;

    // Trigger fade-in of new image
    setFadeIn(false);
    const fadeTimeout = setTimeout(() => {
      setFadeIn(true);
    }, 50); // tiny delay so CSS opacity transition kicks in

    // Trigger explosion of old image tiles
    setExploding(true);
    const explodeTimeout = setTimeout(() => {
      setExploding(false);
      setPrevCarousel(null); // cleanup tiles
    }, 1000); // duration of explosion

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(explodeTimeout);
    };
  }, [prevCarousel]);

  return (
    <Box sx={{ mt: { xs: 20, sm: 22 }, mb: { xs: 4, sm: 6 }, px: { xs: 1, sm: 0 } }}>
      {/* Carousel */}
      <Box
        sx={{
          mb: { xs: 3, sm: 6 },
          position: "relative",
          overflow: "hidden",
          borderRadius: {xs: 0.5, sm: 2},
          // SAME aspect ratio for mobile & desktop
          aspectRatio: {xs: "160 / 100", sm: "175 / 100"},
          height: { xs: 200, sm: 160, md: 400 },
          mx: "auto",
        }}
      >
        {/* Current image (background, fading in) */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${carouselImages[currentCarousel]})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            borderRadius: {xs: 0.5, sm: 2},
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 2800ms ease-in-out",
          }}
        />

        {/* Explosion tiles overlay (old image) */}
        {prevCarousel !== null && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "visible", // let tiles fly out of carousel area
            }}
          >
            {Array.from({ length: ROWS }).map((_, row) =>
              Array.from({ length: COLS }).map((__, col) => {
                const tileWidth = 100 / COLS;
                const tileHeight = 100 / ROWS;

                // Strong UPWARD motion: tiles shoot towards top of viewport
                // base vertical distance (desktop > mobile)
                const baseUp = isMobile ? 120 : 220; // px-ish
                const rowFactor = row / (ROWS - 1 || 1); // 0 (top) → 1 (bottom)
                const extraUp = rowFactor * (isMobile ? 120 : 200);
                const offsetY = -(baseUp + extraUp); // negative = upwards

                // Horizontal jitter so tiles don't go in a straight line
                const index = row * COLS + col;
                const jitterSide =
                  ((index % 7) - 3) * (isMobile ? 8 : 12); // small sideways wobble
                const offsetX = jitterSide;

                // Stagger delay for waterfall effect
                const delay = (row + col) * 15;

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
                        (col / (COLS - 1 || 1)) * 100
                      }% ${(row / (ROWS - 1 || 1)) * 100}%`,
                      transform: exploding
                        ? `translate(${offsetX}px, -150vh)` // fly far beyond top of screen
                        : "translate(0, 0)",
                      opacity: exploding ? 0 : 1, // fade out as they move
                      transition:
                        "transform 2800ms ease-out, opacity 2800ms ease-out",
                      transitionDelay: `${delay}ms`,
                    }}
                  />
                );
              })
            )}
          </Box>
        )}
      </Box>

      {/* Photos in responsive grid (UNCHANGED) */}
      <Box>
        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
          {allPhotos.map((img, i) => (
            <Grid item xs={4} sm={6} md={4} key={i}>
              <Card
                sx={{
                  borderRadius: {xs: 0.5, sm: 2},
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
