import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function FooterWave() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "40px", md: "110px" },
        lineHeight: 0,
        overflow: "hidden",
        position: "relative",
        mt: { xs: 0, md: 0 },
        transform: "rotate(180deg)", // 🌊 waves face upward
      }}
    >
      <svg
        viewBox={isMobile ? "0 0 1800 100" : "0 0 2400 100"}
        preserveAspectRatio="none"
        style={{
          display: "block",
          width: "200%", // 🔥 critical for smooth motion
          // height: {xs: "160px", md: "0px"},
          animation: "waveMove 22s linear infinite",
        }}
      >
        <defs>
          {/* ✅ Correct TOP (light) → BOTTOM (dark) gradient */}
          <linearGradient
            id="footerWaveGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            {/* Page background */}
            <stop offset="0%" stopColor="#d8c8b4" />

            {/* Soft mid blend */}
            <stop offset="40%" stopColor="#8a8c8cff" />

            {/* Footer image tone */}
            <stop offset="75%" stopColor="#6f736f" />
            <stop offset="100%" stopColor="#484e4eff" />
          </linearGradient>
        </defs>

        {/* 🌊 WAVE SHAPE */}
        <path
          d="
            M0,60
    C60,40 120,80 180,70
    C240,60 300,20 360,30
    C420,40 480,90 540,80
    C600,70 660,30 720,40
    C780,50 840,90 900,80
    C960,70 1020,30 1080,40
    C1140,50 1200,90 1260,80
    C1320,70 1380,40 1440,50
    C1500,60 1560,20 1620,30
    C1680,40 1740,80 1800,70
    L2880,0
    L0,0
    Z
          "
          fill="url(#footerWaveGradient)"
        />
      </svg>

      {/* ✅ GPU-friendly smooth motion */}
      <style>
        {`
          @keyframes waveMove {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}
      </style>
    </Box>
  );
}
