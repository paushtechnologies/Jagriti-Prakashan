// src/components/Footer.jsx
import React, { useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import {
  Facebook,
  YouTube,
  X,
  Phone,
  LocationOn,
  Email,
  MenuBook,
  HistoryEdu,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink
import { getAssetPath } from "../utils/assetPath";

export default function Footer({
  siteTitle = "जागृति प्रकाशन",
  contactEmail = "jagritiprakashan01@gmail.com",
  contactPhone = "+91-98765-43210",
  social = {},
}) {
  const footerRef = useRef(null);

  // Cinematic logic removed to ensure stability on mobile
  const base =
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";

  // ⭐ Custom popup generator for "Subscribed!" message (theme matched)
  const showSubscribePopup = () => {
    const div = document.createElement("div");
    div.innerText = "Thank you! You have successfully subscribed.";
    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.background = "#e5d6c4";
    div.style.color = "#3d2b1f";
    div.style.padding = "10px 20px";
    div.style.border = "2px solid #B8620B";
    div.style.borderRadius = "6px";
    div.style.fontWeight = "700";
    div.style.zIndex = "9999";
    div.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.3)";
    div.style.transition = "opacity 0.5s";
    document.body.appendChild(div);

    setTimeout(() => {
      div.style.opacity = "0";
      setTimeout(() => div.remove(), 500);
    }, 1500);
  };

  return (
    <Box
      component="footer"
      ref={footerRef}
      sx={{
        mt: { xs: 0, md: 0 },
        pt: { xs: 1, md: 6 },
        pl: { xs: 1, md: 6 },
        pr: { xs: 1, md: 6 },
        pb: { xs: 6, md: 4 },
        position: "relative",
        zIndex: 1100, // 👈 Fix: Ensure footer is above other overlapping layers
        color: "#fff",
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${getAssetPath(
          "assets/footershell.jpg"
        )})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        sx={{
          maxWidth: "100%",
          justifyContent: "space-between",
          overflowX: "hidden",
          mx: "auto",
        }}
      >
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            background: "rgba(0, 0, 0, 0.08)",
            borderRadius: "6px",
            order: { xs: 1, md: 1 },
            pl: { xs: 0.5, md: 1 },
            mb: { xs: 2, md: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 0,
              fontWeight: 800,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              fontFamily: '"Montserrat", sans-serif',
              letterSpacing: "-0.5px",
              background:
                "linear-gradient(135deg, #f0b04f 0%, #ffc870 50%, #d99a3d 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 10px rgba(240, 176, 79, 0.2)",
            }}
          >
            {siteTitle}
          </Typography>
          <Box sx={{ display: "flex", mt: 1, gap: 1 }}>
            <LocationOn sx={{ fontSize: 18, mt: 0.3, color: "#FFD180" }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 500,
              }}
            >
              C-142A, सेक्टर 10, नोएडा, उत्तर प्रदेश - 201301
            </Typography>
          </Box>

          <Box sx={{ display: "flex", mt: {xs: 0.5, md: 1}, gap: 1 }}>
            <Phone sx={{ fontSize: 18, mt: 0.3, color: "#FFD180" }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", md: "0.95rem" },
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 500,
              }}
            >
              +91-120-4928714, 9871143768, 9810294460
            </Typography>
          </Box>
          <Box sx={{ display: "flex", mt: {xs: 0.5, md: 1}, gap: 1 }}>
            <Email sx={{ fontSize: { xs: 18, md: 18 }, color: "#FFD180" }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                fontWeight: 500,
                fontFamily: '"Montserrat", sans-serif',
              }}
            >
              <Link
                href={`mailto:${contactEmail}`}
                sx={{ color: "#fff", textDecoration: "none" }}
              >
                jagritiprakashan1985@rediffmail.com
              </Link>
            </Typography>
          </Box>

          <Box sx={{ mt: { xs: 1, md: 2 } }}>
            <IconButton
              component="a"
              href={social.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }}
              aria-label="facebook"
            >
              <Facebook
                sx={{
                  fontSize: {
                    xs: 24, // mobile
                    sm: 30, // tablet
                    md: 30, // desktop
                  },
                }}
              />
            </IconButton>
            <IconButton
              component="a"
              href={social.youtube || "#"}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }}
              aria-label="youtube"
            >
              <YouTube
                sx={{
                  fontSize: {
                    xs: 24, // mobile
                    sm: 30, // tablet
                    md: 30, // desktop
                  },
                }}
              />
            </IconButton>
            {/* <IconButton
              component="a"
              href={social.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }}
              aria-label="x-twitter"
            >
              <X fontSize="small" />
            </IconButton> */}
          </Box>
        </Grid>

        {/* Quick Links (NOW SECOND - LEFT) */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: { xs: "none", md: "block" }, // 🔥 Hide on mobile
            background: "rgba(0, 0, 0, 0.08)",
            order: { md: 2 },
            p:1
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "#f0b04f",
              mb: 1,
              fontSize: { xs: "1rem", md: "1.5rem" },
              fontFamily: '"Montserrat", sans-serif'
            }}
          >
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <Link
              component={RouterLink}
              to="/gallery"
              sx={{
                mb: 0.3,
                color: "#FFF",
                fontWeight: 400,
                fontSize: { xs: "0.85rem", md: "1.15rem" },
                fontFamily: '"Montserrat", sans-serif',
                "&:hover": { color: "#FFA500", textDecoration: "underline" },
              }}
            >
              Books Gallery
            </Link>

            <Link
              component={RouterLink}
              to="/about"
              sx={{
                mb: 0.3,
                color: "#FFF",
                fontWeight: 400,
                fontSize: { xs: "0.85rem", md: "1.15rem" },
                fontFamily: '"Montserrat", sans-serif',
                "&:hover": { color: "#FFA500", textDecoration: "underline" },
              }}
            >
              About Us
            </Link>

            <Link
              component={RouterLink}
              to="/cart"
              sx={{
                mb: 0.3,
                color: "#FFF",
                fontWeight: 400,
                fontSize: { xs: "0.85rem", md: "1.15rem" },
                fontFamily: '"Montserrat", sans-serif',
                "&:hover": { color: "#FFA500", textDecoration: "underline" },
              }}
            >
              Order Now
            </Link>
          </Box>
        </Grid>

        {/* Subscribe & Contact (NOW THIRD - RIGHT) */}
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            background: "rgba(0, 0, 0, 0.08)",
            order: { xs: 3, md: 3 },
            p: { xs: 0.5, md: 1 },
            // pt: { md: 0 },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: {xs: 600, md: 700 },
              color: "#f0b04f",
              mb: {xs: 0, md: 1},
              fontSize: { xs: "1rem", md: "1.5rem" },
              textAlign: { md: "left" },
            }}
          >
            Subscribe
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontWeight: 400,
              // display: { xs: "none", md: "block" },
              opacity: 0.9,
              fontSize: { xs: "0.65rem", md: "0.9rem" },
              fontFamily: '"Montserrat", sans-serif',
            }}
          >
            Get updates about new releases & offers
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              showSubscribePopup();
            }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              mb: 1.5,
              maxWidth: "50vw",
              gap: 0.5,
            }}
          >
            <TextField
              placeholder="Your email"
              size="small"
              sx={{
                input: {
                  color: "#fff",
                  fontSize: { xs: "0.65rem", sm: "0.875rem" },
                  py: 0.8,
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 500,
                },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                width: { xs: "100%", md: "auto" },
                flex: { md: 1 },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: { xs: "100%", md: "auto" },
                py: { xs: 0.3, sm: 0.5 },
                px: { md: 3 },
                fontSize: { xs: "0.6rem", sm: "0.875rem" },
                fontWeight: 400,
                fontFamily: '"Montserrat", sans-serif',
                letterSpacing: "1px",
                // ⭐ Restore premium desktop style
                background: {
                  xs: "primary.main",
                  md: "linear-gradient(135deg, #f0b04f 0%, #d99a3d 100%)",
                },
                color: "#1a1a1a",
                "&:hover": {
                  background: {
                    xs: "primary.dark",
                    md: "linear-gradient(135deg, #ffc870 0%, #f0b04f 100%)",
                  },
                  boxShadow: { md: "0 0 15px rgba(240, 176, 79, 0.6)" },
                },
              }}
            >
              SUBSCRIBE
            </Button>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1, mt: 1 }}>
            <Email sx={{ fontSize: { xs: 16, md: 16 }, color: "#FFD180" }} />
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: "0.66rem", sm: "0.9rem" },
                overflowWrap: "anywhere",
                lineHeight: 1.2,
                fontWeight: 500,
                fontFamily: '"Montserrat", sans-serif',
              }}
            >
              <Link
                href={`mailto:${contactEmail}`}
                sx={{ color: "#fff", textDecoration: "none" }}
              >
                {contactEmail}
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: { xs: 0, md: 0 },
          pt: 4,
          pb: 2,
          textAlign: "center",
          perspective: "1000px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cinematic Aura behind badge */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "100px",
            background:
              "radial-gradient(circle, rgba(240, 176, 79, 0.15) 0%, transparent 70%)",
            filter: "blur(20px)",
            borderRadius: "50%",
            zIndex: 0,
            animation: "auraPulse 3s ease-in-out infinite",
          }}
        />

        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            animation: "float 4s ease-in-out infinite",
          }}
        >
          <Box
            component="a"
            href="https://paushtechnologies.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: { xs: 1, sm: 1.5 },
              px: { xs: 6, sm: 6 },
              py: { xs: 1, sm: 2 },
              borderRadius: "100px",
              background: "rgba(13, 27, 42, 0.6)",
              backdropFilter: "blur(15px)",
              border: "2px solid",
              borderColor: "rgba(240, 176, 79, 0.3)",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(240, 176, 79, 0.2)",
              overflow: "hidden",
            }}
          >
            {/* Moving Light Beam */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "-150%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transform: "skewX(-30deg)",
                animation: "shine 6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              }}
            />

            <Typography
              component="div"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontSize: { xs: "0.85rem", sm: "1.25rem" },
                letterSpacing: { xs: "1.5px", sm: "2px" },
                fontWeight: 700,
                textTransform: "uppercase",
                fontFamily: '"Montserrat", sans-serif',
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: 0.5, sm: 1 },
                flexWrap: "nowrap",
              }}
            >
              CRAFTED
              <Box
                sx={{
                  mx: { xs: 0.5, sm: 1.5 },
                  display: "flex",
                  alignItems: "center",
                  gap: 0.3,
                  position: "relative",
                }}
              >
                <MenuBook
                  sx={{
                    fontSize: { xs: 20, sm: 22 },
                    color: "#f0b04f",
                    animation: "bookOpen 3s infinite",
                    filter: "drop-shadow(0 0 5px rgba(240, 176, 79, 0.4))",
                  }}
                />
                <HistoryEdu
                  sx={{
                    fontSize: { xs: 20, sm: 20 },
                    color: "#f0b04f",
                    animation: "penWrite 3s infinite",
                    ml: -0.5,
                  }}
                />
              </Box>
              BY
            </Typography>

            <Typography
              sx={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
                fontSize: { xs: "1.4rem", sm: "1.25rem", md: "2rem" },
                letterSpacing: "1.6px",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
                background: "linear-gradient(135deg, #f7e7b4 0%, #e6c77a 45%,  #cfa44a 100%)",
                // background: "linear-gradient(135deg, #fff4dc 0%, #f0c36a 60%,  #c9962e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",

                filter: "drop-shadow(0 3px 8px rgba(240,176,79,0.4))",
              }}
            >
              PAUSH Technologies
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            mt: 2.5,
            mb: 4, 
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.65rem",
            letterSpacing: "5px",
            fontWeight: 800,
            textTransform: "uppercase",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            fontFamily: '"Montserrat", sans-serif',
          }}
        >
          © {new Date().getFullYear()} Jagriti Prakashan
        </Typography>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-4px) rotate(0.5deg); }
            }
            @keyframes shine {
              0% { left: -150%; }
              25% { left: 150%; }
              100% { left: 150%; }
            }
            @keyframes textGradient {
              to { background-position: 200% center; }
            }
            @keyframes auraPulse {
              0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
              50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.8; }
            }
            @keyframes bookOpen {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.2) rotate(-5deg); opacity: 1; }
            }
            @keyframes penWrite {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(3px, -2px) rotate(10deg); }
              50% { transform: translate(0px, 0px) rotate(0deg); }
              75% { transform: translate(-3px, -2px) rotate(-10deg); }
            }
          `}
        </style>
      </Box>
    </Box>
  );
}
