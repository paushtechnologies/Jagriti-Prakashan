// src/components/BookCarousel.jsx
import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

/**
 * If bannerMode is true, we expect items to have `banner` property (filename under /assets/banners/)
 * If bannerMode is false, it behaves like previous carousel for book cards.
 */
export default function BookCarousel({
  books = [],
  onAddToCart,
  bannerMode = false,
}) {
  const [index, setIndex] = useState(0);
  const visible = bannerMode ? 1 : 4;
  const maxIndex = Math.max(0, Math.ceil(books.length / visible) - 1);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i < maxIndex ? i + 1 : 0));
    }, 10000);
    return () => clearInterval(t);
  }, [maxIndex]);

  const handlePrev = () => setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const start = index * visible;
  const slice = books.slice(start, start + visible);

  // Detect mobile screen
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width:600px)").matches;

  // --------------- AUTO TEXT COLOR START ---------------

  // Helper: pick black/white depending on brightness
  const getReadableTextColor = (r, g, b) => {
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
    return luminance > 186 ? "#000000" : "#FFFFFF";
  };

  const [textColor, setTextColor] = useState("#FFFFFF");

  useEffect(() => {
    if (!slice.length) return;

    const bannerSrc = `${import.meta.env.BASE_URL}banners/${
      isMobile ? slice[0]?.bannerMobile || slice[0]?.banner : slice[0]?.banner
    }`;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = bannerSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 10;
      canvas.height = 10;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, 10, 10);
      const data = ctx.getImageData(0, 0, 10, 10).data;

      let r = 0,
        g = 0,
        b = 0;
      const totalPixels = data.length / 4;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }

      r /= totalPixels;
      g /= totalPixels;
      b /= totalPixels;

      const color = getReadableTextColor(r, g, b);
      setTextColor(color);
    };
  }, [index, slice, isMobile]);

  // --------------- AUTO TEXT COLOR END ---------------

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: { xs: 2, md: 3 },
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: { xs: 2, md: 8 },
          top: "45%",
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0)",
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 2 },
          transition: "transform 400ms ease",
        }}
      >
        {slice.map((b, idx) =>
          bannerMode ? (
            <Paper
              key={idx}
              elevation={4}
              sx={{
                width: "100%",
                aspectRatio: { xs: "2.5 / 1", md: "1400 / 360" },
                minHeight: { md: 300 },
                backgroundImage: `url(${import.meta.env.BASE_URL}banners/${
                  isMobile ? b.bannerMobile || b.banner : b.banner || "1.png"
                })`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                borderRadius: { xs: 2, md: 3 },
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Box
                sx={{
                  p: { xs: 1, sm: 1.5 },
                  width: "100%",
                  background: `linear-gradient(
                    45deg,
                    rgba(45, 60, 80, 0),  
                    rgba(240, 176, 79, 0), 
                    rgba(255, 209, 128, 0)
                  )`,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom={false}
                  sx={{
                    color: textColor,
                    fontWeight: { xs: 600, md: 800 },
                    fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.5rem" },
                    lineHeight: { xs: 0.75, md: 1.1 },
                    marginLeft: { xs: 1, md: 1 },
                    mb: "0 !important",
                  }}
                >
                  {b.title || ""}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: textColor,
                    mt: "0 !important",
                    marginLeft: { xs: 1, md: 1 },
                  }}
                >
                  {b.subtitle || ""}
                </Typography>
              </Box>
            </Paper>
          ) : (
            <Box key={b.id} sx={{ width: "100%" }}>
              {b.title}
            </Box>
          )
        )}
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: { xs: 2, md: 8 },
          top: "45%",
          zIndex: 10,
          bgcolor: "rgba(255,255,255,0)",
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
}
