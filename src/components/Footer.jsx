// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Facebook, YouTube, Instagram, Phone } from "@mui/icons-material";
import { getAssetPath } from "../utils/assetPath";

export default function Footer({
  siteTitle = "जागृति प्रकाशन",
  contactEmail = "orders@example.com",
  contactPhone = "+91-98765-43210",
  social = {},
}) {
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
      sx={{
        mt: { xs: 1, md: 4 },
        pt: { xs: 1, md: 4 },
        pl: { xs: 1, md: 6 },
        pr: { xs: 1, md: 6 },
        pb: { xs: 3, md: 6 },
        position: "relative",
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
        {/* Publisher Info */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            background: "rgba(0, 0, 0, 0.08)",
            borderRadius: "6px",
            // p: { xs: 1, md: 2 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2.5rem" },
            }}
          >
            {siteTitle}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontSize: { xs: "0.85rem", md: "0.95rem" } }}
          >
            उच्च संपादकीय मानकों और उत्कृष्ट हार्ड-पेपर पुस्तकों के माध्यम से हम
            भारतीय ज्ञान परंपरा को पाठकों तक पहुँचाते हैं।
            <br></br>
            हमारा 60+ वर्ष पुराना प्रकाशन गृह हिंदू इतिहास और संस्कृति पर आधारित
            प्रामाणिक साहित्य के प्रकाशन के लिए समर्पित है।
          </Typography>
          <Box sx={{ mt: { xs: 0.5, md: 1 } }}>
            <IconButton
              component={Link}
              href={social.facebook || "#"}
              sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }}
              aria-label="facebook"
            >
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton
              component={Link}
              href={social.youtube || "#"}
              sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }}
              aria-label="youtube"
            >
              <YouTube fontSize="small" />
            </IconButton>
            <IconButton
              component={Link}
              href={social.instagram || "#"}
              sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }}
              aria-label="instagram"
            >
              <Instagram fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
            <Link
              href={`${base}gallery`}
              sx={{
                mb: { xs: 0.1, md: 0.7 },
                color: "#FFD180",
                fontWeight: 600,
                "&:hover": { color: "#FFA500", textDecoration: "underline" },
              }}
            >
              Books Gallery
            </Link>

            <Link
              href={`${base}about`}
              sx={{
                mb: 0.7,
                color: "#FFD180",
                fontWeight: 600,
                "&:hover": { color: "#FFA500", textDecoration: "underline" },
              }}
            >
              About Us
            </Link>

            <Link
              href={`${base}cart`}
              sx={{
                mb: 0.7,
                color: "#FFD180",
                fontWeight: 600,
                "&:hover": { color: "#FFA500", textDecoration: "underline" },
              }}
            >
              Order Now
            </Link>
          </Box>
        </Grid>

        {/* Subscribe & Contact */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Subscribe
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Get updates about new releases & offers
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              showSubscribePopup(); // ⭐ New improved popup
            }}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              mb: 1,
              gap: 1,
            }}
          >
            <TextField
              placeholder="Your email"
              size="small"
              sx={{
                mr: { sm: 1 },
                input: { color: "#fff" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                flex: 1,
                width: { xs: "100%", sm: "auto" },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: { xs: "100%", sm: "auto" },
                py: { xs: 0.6, sm: 0.5 },
              }}
            >
              Subscribe
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Email:{" "}
            <Link
              href={`mailto:${contactEmail}`}
              sx={{ color: "#fff", fontWeight: 600 }}
            >
              {contactEmail}
            </Link>
          </Typography>

          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Phone sx={{ fontSize: 16, mr: 0.5 }} /> {contactPhone}
          </Typography>
        </Grid>
      </Grid>

      {/* Full-width footer credit strip */}
      <Box
        sx={{
          position: "relative",
          left: "50%",
          right: "50%",
          width: "99vw",
          transform: "translateX(-50%)",
          mt: { xs: "16px", md: "48px" },
          py: { xs: "0.2", md: "0.4" },
          background:
            "linear-gradient(135deg, #e5d6c4 0%, #d9c3a8 40%, #c9a984 75%, #b98e64 100%)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#3d2b1f",
            fontWeight: 900,
            fontSize: { xs: "1.2rem", sm: "1.4rem" },
            letterSpacing: 1,
            fontFamily: '"Merriweather", serif',
          }}
        >
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            Designed &{" "}
          </Box>
          Developed by{" "}
          <Link
            href="https://paushtechnologies.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontWeight: 900,
              fontFamily: '"Playfair Display", serif',
              fontStyle: "italic",
              color: "#B8620B",
              textShadow: "0 1px 1px #3d2b1f",
              letterSpacing: "0.5px",
              "&:hover": {
                color: "#D9730D",
              },
            }}
          >
            PAUSH Technologies
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
