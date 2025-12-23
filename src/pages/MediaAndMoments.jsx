// src/pages/MediaAndMoments.jsx
import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Card, CardMedia } from "@mui/material";
import { getAssetPath } from "../utils/assetPath";

// Demo carousel images
const carouselImages = [
  getAssetPath("assets/MnM/56.jpg"),
  getAssetPath("assets/MnM/60.jpg"),
  getAssetPath("assets/MnM/49.jpg"),
  getAssetPath("assets/MnM/61.png"),
  getAssetPath("assets/MnM/54.jpg"),
  getAssetPath("assets/MnM/59.jpg"),
  getAssetPath("assets/MnM/19.jpg"),
];

// All photos (1–60)
const allPhotos = Array.from({ length: 60 }, (_, i) =>
  getAssetPath(`assets/MnM/${i + 1}.jpg`)
);

export default function MediaAndMoments() {
  const pageRef = useRef(null);

  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [prevCarousel, setPrevCarousel] = useState(null);
  const [exploding, setExploding] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= 600;

  const COLS = isMobile ? 12 : 20;
  const ROWS = isMobile ? 7 : 12;

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

  /* ---------------- CAROUSEL TIMER ---------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarousel((prev) => {
        const next = (prev + 1) % carouselImages.length;
        setPrevCarousel(prev);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* ---------------- EXPLOSION SEQUENCE ---------------- */

  useEffect(() => {
    if (prevCarousel === null) return;

    setFadeIn(false);
    const fadeTimeout = setTimeout(() => setFadeIn(true), 10);

    setExploding(true);
    const explodeTimeout = setTimeout(() => {
      setExploding(false);
      setPrevCarousel(null);
    }, 1000);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(explodeTimeout);
    };
  }, [prevCarousel]);

  return (
    <Box
      ref={pageRef}
      sx={{
        mt: { xs: 16, sm: 20 },
        mb: { xs: 4, sm: 6 },
        px: { xs: 1, sm: 0 },
      }}
    >
      {/* CAROUSEL */}
      <Box
        className="fade-up"
        sx={{
          mb: { xs: 3, sm: 6 },
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 0.5, sm: 2 },
          aspectRatio: { xs: "160 / 100", sm: "200 / 100" },
          height: { xs: 200, sm: 160, md: 400 },
          mx: "auto",
        }}
      >
        {/* Current image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${carouselImages[currentCarousel]})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            borderRadius: { xs: 0.5, sm: 2 },
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 2800ms ease-in-out",
          }}
        />

        {/* Explosion tiles */}
        {prevCarousel !== null && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            {Array.from({ length: ROWS }).map((_, row) =>
              Array.from({ length: COLS }).map((__, col) => {
                const tileWidth = 100 / COLS;
                const tileHeight = 100 / ROWS;
                const index = row * COLS + col;
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
                        ? "translateY(-150vh)"
                        : "translate(0, 0)",
                      opacity: exploding ? 0 : 1,
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

      {/* PHOTO GRID */}
      <Box className="fade-up">
        <Grid container spacing={{ xs: 1.5, sm: 3 }}>
          {allPhotos.map((img, i) => (
            <Grid item xs={4} sm={6} md={4} key={i}>
              <Card
                className="fade-up"
                sx={{
                  borderRadius: { xs: 0.5, sm: 2 },
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "@media (max-width:600px)": {
                    transition: "none",
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
