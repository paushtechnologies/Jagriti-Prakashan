// src/pages/MediaAndMoments.jsx
import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Card, CardMedia, Typography, Dialog, IconButton } from "@mui/material";
import { Close, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { getAssetPath } from "../utils/assetPath";

// Demo carousel images
const carouselImages = [
  getAssetPath("assets/media/56.jpg"),
  getAssetPath("assets/media/60.jpg"),
  getAssetPath("assets/media/46.jpg"),
  getAssetPath("assets/media/28.jpg"),
  getAssetPath("assets/media/54.jpg"),
  getAssetPath("assets/media/59.jpg"),
  getAssetPath("assets/media/19.jpg"),
  getAssetPath("assets/media/49.png"),
];

const carouselImagesTop = carouselImages.slice(0, 4);
const carouselImagesBottom = carouselImages.slice(4, 8);

// Helper to get the correct image extension
const getMediaExtension = (index) => {
  // List of known PNG images (add more as needed)
  const pngImages = [49]; // Image 49 is PNG
  return pngImages.includes(index) ? 'png' : 'jpg';
};

// Full list of 60 photos with proper extensions
const allPhotos = Array.from({ length: 60 }, (_, i) => {
  const imageNumber = i + 1;
  const extension = getMediaExtension(imageNumber);
  return {
    id: i,
    url: getAssetPath(`assets/media/${imageNumber}.${extension}`),
    title: `Moment ${imageNumber}`,
    // date: "2024 Events"
  };
});

// CSS for the "Wow" effects
const styleSheet = `
@keyframes marqueeLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marqueeRight {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
@keyframes floatIn {
  from { opacity: 0; transform: translateY(50px) scale(0.9); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
`;

export default function MediaAndMoments() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const head = document.head;
    const style = document.createElement("style");
    style.innerHTML = styleSheet;
    head.appendChild(style);
    return () => head.removeChild(style);
  }, []);

  // Navigation functions
  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % allPhotos.length);
    }
  };

  const handlePrevious = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + allPhotos.length) % allPhotos.length);
    }
  };

  const handleClose = () => {
    setSelectedPhotoIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;

      if (e.key === "ArrowRight") handleNext();
      else if (e.key === "ArrowLeft") handlePrevious();
      else if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex]);

  // Swipe detection for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrevious();

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <Box
      sx={{
        mt: { xs: 1, sm: 6 },
        mb: { xs: 8, sm: 12 },
        px: { xs: 2, sm: 4, md: 8 },
        overflowX: "hidden",
        overflowY: "hidden"
      }}
    >
      {/* 🏛️ THE GALLERY WALL (INFINITE MARQUEE) */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontFamily: '"Montserrat", sans-serif',
            background: "linear-gradient(135deg, #f0b04f 0%, #9a5a1bff 50%, #d99a3d 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // mb: 1,
            fontSize: { xs: "2rem", md: "3rem" },
            letterSpacing: "8px",
            textTransform: "uppercase"
          }}
        >
          Our moments
        </Typography>
        <Box sx={{ width: "120px", height: "5px", background: "#a08d70ff", mx: "auto", borderRadius: "10px", mb: 4 }} />

        {/* EDGE-TO-EDGE MARQUEE CONTAINER */}
        <Box sx={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",

        }}>
          {/* Top Track */}
          <Box sx={{ whiteSpace: "nowrap", mb: 1.5 }}>
            <Box
              sx={{
                display: "inline-block",
                animation: "marqueeLeft 40s linear infinite",
                "&:hover": { animationPlayState: "paused" }
              }}
            >
              {[...carouselImagesTop, ...carouselImagesTop, ...carouselImagesTop].map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  sx={{
                    width: { xs: "180px", md: "350px" },
                    height: { xs: "110px", md: "220px" },
                    objectFit: "cover",
                    mx: 0.75,
                    borderRadius: 2,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    transition: "transform 0.5s cubic-bezier(.19,1,.22,1)",
                    "&:hover": { transform: "scale(1.05) rotate(1deg)", zIndex: 10 }
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Bottom Track */}
          <Box sx={{ whiteSpace: "nowrap" }}>
            <Box
              sx={{
                display: "inline-block",
                animation: "marqueeRight 35s linear infinite",
                "&:hover": { animationPlayState: "paused" }
              }}
            >
              {[...carouselImagesBottom, ...carouselImagesBottom, ...carouselImagesBottom].map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  sx={{
                    width: { xs: "180px", md: "350px" },
                    height: { xs: "110px", md: "220px" },
                    objectFit: "cover",
                    mx: 0.75,
                    borderRadius: 2,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    transition: "transform 0.5s cubic-bezier(.19,1,.22,1)",
                    "&:hover": { transform: "scale(1.05) rotate(-1deg)", zIndex: 10 }
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 🖼️ THE MAGNETIC GRID */}
      <Grid container spacing={{ xs: 1.5, sm: 3 }}>
        {allPhotos.map((photo, i) => (
          <Grid size={{ xs: 4, sm: 6, md: 4 }} key={photo.id}>
            <Box
              onClick={() => setSelectedPhotoIndex(i)}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
              sx={{
                position: "relative",
                height: { xs: 110, sm: 200, md: 300 },
                borderRadius: { xs: 1, sm: 4 },
                overflow: "hidden",
                cursor: "pointer",
                backgroundImage: `url(${photo.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                animation: `floatIn 0.8s cubic-bezier(.19,1,.22,1) both`,
                animationDelay: `${(i % 12) * 0.1}s`,
                transition: "all 0.6s cubic-bezier(.19,1,.22,1)",
                opacity: hoveredId !== null && hoveredId !== photo.id ? 0.6 : 1,
                transform: hoveredId === photo.id ? "scale(1.03) translateY(-10px)" : "scale(1)",
                boxShadow: hoveredId === photo.id
                  ? "0 30px 60px rgba(0,0,0,0.5), 0 0 20px rgba(240, 176, 79, 0.3)"
                  : "0 10px 20px rgba(0,0,0,0.2)",
                "&:hover .overlay": { opacity: 1, transform: "translateY(0)" },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${photo.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(20px)",
                  transform: "scale(1.1)",
                  zIndex: 0
                }
              }}
            >
              <Box
                component="img"
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                sx={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transition: "all 1s cubic-bezier(.19,1,.22,1)"
                }}
              />

              {/* Cinematic Overlay */}
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  p: { xs: 1.5, md: 3 },
                  opacity: 0,
                  transform: "translateY(10px)",
                  transition: "all 0.5s cubic-bezier(.19,1,.22,1)",
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 80%)"
                }}
              >
                <Typography
                  sx={{
                    color: "#f0b04f",
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: "0.6rem", md: "1.2rem" },
                    textTransform: "uppercase",
                    letterSpacing: { xs: "1px", md: "2px" }
                  }}
                >
                  {photo.title}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: { xs: "0.5rem", md: "0.8rem" },
                    fontWeight: 500
                  }}
                >
                  {photo.date}
                </Typography>

                {/* Decorative line */}
                <Box sx={{ width: "20%", height: "2px", background: "#f0b04f", mt: 0.5 }} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* 🖼️ LIGHTBOX MODAL */}
      <Dialog
        open={selectedPhotoIndex !== null}
        onClose={handleClose}
        maxWidth={false}
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            maxWidth: "100vw",
            maxHeight: "100vh",
            m: 0
          }
        }}
        sx={{
          "& .MuiBackdrop-root": {
            bgcolor: "rgba(0, 0, 0, 0.95)"
          }
        }}
      >
        <Box
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, md: 4 }
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: { xs: 10, md: 20 },
              right: { xs: 10, md: 20 },
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 10,
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" }
            }}
          >
            <Close />
          </IconButton>

          {/* Previous Button */}
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: "absolute",
              left: { xs: 10, md: 40 },
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 10,
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" }
            }}
          >
            <ArrowBackIos sx={{ ml: 0.5 }} />
          </IconButton>

          {/* Next Button */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: { xs: 10, md: 40 },
              color: "#fff",
              bgcolor: "rgba(0,0,0,0.5)",
              zIndex: 10,
              "&:hover": { bgcolor: "rgba(0,0,0,0.8)" }
            }}
          >
            <ArrowForwardIos />
          </IconButton>

          {/* Image Container */}
          {selectedPhotoIndex !== null && (
            <Box
              sx={{
                position: "relative",
                maxWidth: "90vw",
                maxHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Box
                component="img"
                src={allPhotos[selectedPhotoIndex].url}
                alt={allPhotos[selectedPhotoIndex].title}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
                }}
              />

              {/* Photo Counter */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: -40,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#fff",
                  bgcolor: "rgba(0,0,0,0.7)",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  fontSize: "0.9rem",
                  fontFamily: '"Montserrat", sans-serif',
                  whiteSpace: "nowrap"
                }}
              >
                {selectedPhotoIndex + 1} / {allPhotos.length}
              </Box>
            </Box>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
