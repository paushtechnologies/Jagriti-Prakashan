// src/components/Footer.jsx
import React from "react";
import { Box, Grid, Typography, Link, IconButton, TextField, Button } from "@mui/material";
import { Facebook, YouTube, Instagram, Phone } from "@mui/icons-material";
import { getAssetPath } from "../utils/assetPath";

export default function Footer({ siteTitle = "Jagriti Prakashan", contactEmail = "orders@example.com", contactPhone = "+91-98765-43210", social = {} }) {
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 1, md: 4 },
        pt: { xs: 1, md: 4 },
        pl: { xs: 2, md: 6 },
        pr: { xs: 2, md: 6 },
        pb: { xs: 4, md: 6 },
        position: "relative",
        color: "#fff", // All text white
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${getAssetPath("assets/footershell.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // textAlign: "center",
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: "100%", // Ensure footer does not exceed viewport width
        overflowX: "hidden", // Prevent horizontal scrolling
        mx: "auto" }}>
        {/* Publisher Info */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>{siteTitle}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Jagriti Prakashan — Publishers of educational & children books. Quality printing and timely delivery.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <IconButton component={Link} href={social.facebook || "#"} sx={{ color: "#fff" }}><Facebook /></IconButton>
            <IconButton component={Link} href={social.youtube || "#"} sx={{ color: "#fff" }}><YouTube /></IconButton>
            <IconButton component={Link} href={social.instagram || "#"} sx={{ color: "#fff" }}><Instagram /></IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
<Grid item xs={12} md={4}>
  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Quick Links</Typography>
  <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
    <Link
      href="/gallery"
      sx={{
        mb: 0.7,
        color: "#FFD180",        // Bright gold color
        fontWeight: 600,
        "&:hover": { color: "#FFA500", textDecoration: "underline" }, // darker on hover
      }}
    >
      Books Gallery
    </Link>
    <Link
      href="/about"
      sx={{
        mb: 0.7,
        color: "#FFD180",        // Bright gold color
        fontWeight: 600,
        "&:hover": { color: "#FFA500", textDecoration: "underline" },
      }}
    >
      About Us
    </Link>
    <Link
      href="/cart"
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
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Subscribe</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Get updates about new releases & offers
          </Typography>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} sx={{ display: "flex", mb: 1 }}>
            <TextField
              placeholder="Your email"
              size="small"
              sx={{
                mr: 1,
                input: { color: "#fff" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                flex: 1
              }}
            />
            <Button variant="contained" type="submit">Subscribe</Button>
          </Box>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Email: <Link href={`mailto:${contactEmail}`} sx={{ color: "#fff", fontWeight: 600 }}>{contactEmail}</Link>
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <Phone sx={{ fontSize: 16, mr: 0.5 }} /> {contactPhone}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="caption">
          © {new Date().getFullYear()} {siteTitle}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
