// src/components/BookCarousel.jsx
import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Paper } from "@mui/material";
import { ArrowForwardIos, PlayArrow, Pause } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

/**
 * If bannerMode is true, we expect items to have `banner` property (filename under /assets/banners/)
 * If bannerMode is false, it behaves like previous carousel for book cards.
 */
export default function BookCarousel({
  books = [],
  onAddToCart,
  bannerMode = false,
  autoPlay = true,
  autoPlayInterval = 3000,
}) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const visible = bannerMode ? 1 : 4;
  const maxIndex = Math.max(0, Math.ceil(books.length / visible) - 1);

  useEffect(() => {
    if (!isPlaying || maxIndex === 0) return;

    const t = setInterval(() => {
      setIndex((i) => (i < maxIndex ? i + 1 : 0));
    }, autoPlayInterval);

    return () => clearInterval(t);
  }, [isPlaying, autoPlayInterval, maxIndex]);

  const handlePrev = () => setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const start = index * visible;
  const slice = books.slice(start, start + visible);

  // Detect mobile screen
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width:600px)").matches;

  // --------------- AUTO TEXT COLOR START ---------------

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

      setTextColor(getReadableTextColor(r, g, b));
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
      {/* LEFT ARROW */}
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: { xs: 2, md: 8 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: { xs: 16, sm: 40, md: 48 },
          height: { xs: 16, sm: 40, md: 48 },
          p: 0,
          bgcolor: { xs: "rgba(255,255,255,0)", md: "rgba(255,255,255,0.25)" },
          "&:hover": {
            bgcolor: {
              xs: "rgba(255,255,255,0)",
              md: "#ffb74d",
            },
          },
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: {xs:20, md:28}, color: "rgba(255,255,255,1)" }} />
      </IconButton>

      {/* PLAY / PAUSE BUTTON (CENTER) */}
      <IconButton
        onClick={() => setIsPlaying((p) => !p)}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 12,
          width: {xs:34, md:44},
          height: {xs:34, md:44},
          bgcolor: "rgba(255,255,255,0.25)",
          "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
        }}
      >
        {isPlaying ? (
          <Pause sx={{ color: "rgba(255,255,255,0.9)" }} />
        ) : (
          <PlayArrow sx={{ color: "rgba(255,255,255,0.9)" }} />
        )}
      </IconButton>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 2 },
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
              <Box sx={{ p: 1.5 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: textColor,
                    fontWeight: 800,
                    mb: 0,
                  }}
                >
                  {b.title || ""}
                </Typography>
                <Typography sx={{ color: textColor }}>
                  {b.subtitle || ""}
                </Typography>
              </Box>
            </Paper>
          ) : (
            <Box key={b.id}>{b.title}</Box>
          )
        )}
      </Box>

      {/* RIGHT ARROW */}
      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: { xs: 2, md: 8 },
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: { xs: 16, sm: 36, md: 44 },
          height: { xs: 16, sm: 36, md: 44 },
          p: 0,
          bgcolor: { xs: "rgba(255,255,255,0)", md: "rgba(255,255,255,0.4)" },
          "&:hover": {
            bgcolor: { xs: "rgba(255,255,255,0)", md: "#ffb74d" },
          },
        }}
      >
        <ArrowForwardIos sx={{ fontSize: {xs:20, md:28}, color: "rgba(255,255,255,1)", mr: "2px" }} />
      </IconButton>
    </Box>
  );
}
