// src/components/Footer.jsx
import React from "react";
import { Box, Grid, Typography, Link, IconButton, TextField, Button } from "@mui/material";
import { Facebook, YouTube, Instagram, Phone } from "@mui/icons-material";
import { getAssetPath } from "../utils/assetPath";

export default function Footer({ siteTitle = "Jagriti Prakashan", contactEmail = "orders@example.com", contactPhone = "+91-98765-43210", social = {} }) {
  const base = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : '/';

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
        color: "#fff", // All text white
        background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${getAssetPath("assets/footershell.jpg")})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Grid container spacing={{ xs: 2, md: 4 }} sx={{ maxWidth: "100%", justifyContent: "space-between", // Ensure footer does not exceed viewport width
        overflowX: "hidden", // Prevent horizontal scrolling
        mx: "auto" }}>
        {/* Publisher Info */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, fontSize: { xs: '1.5rem', md: '1.75rem' } }}>{siteTitle}</Typography>
          <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.85rem', md: '0.95rem' } }}>
            Publishers of educational & children books. Quality printing and timely delivery.
          </Typography>
          <Box sx={{ mt: { xs: 0.5, md: 1 } }}>
            <IconButton component={Link} href={social.facebook || "#"} sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }} aria-label="facebook"><Facebook fontSize="small"/></IconButton>
            <IconButton component={Link} href={social.youtube || "#"} sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }} aria-label="youtube"><YouTube fontSize="small"/></IconButton>
            <IconButton component={Link} href={social.instagram || "#"} sx={{ color: "#fff", p: { xs: 0.5, md: 1 } }} aria-label="instagram"><Instagram fontSize="small"/></IconButton>
          </Box>
        </Grid>

        {/* Quick Links */}
<Grid item xs={12} md={4}>
  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Quick Links</Typography>
  <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
    <Link
      href={`${base}gallery`}
      sx={{
        mb: { xs: 0.1, md: 0.7 },
        color: "#FFD180",        // Bright gold color
        fontWeight: 600,
        "&:hover": { color: "#FFA500", textDecoration: "underline" }, // darker on hover
      }}
    >
      Books Gallery
    </Link>
    <Link
      href={`${base}about`}
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
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Subscribe</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Get updates about new releases & offers
          </Typography>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 1, gap: 1 }}>
            <TextField
              placeholder="Your email"
              size="small"
              sx={{
                mr: { sm: 1 },
                input: { color: "#fff" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                flex: 1,
                width: { xs: '100%', sm: 'auto' }
              }}
            />
            <Button variant="contained" type="submit" sx={{ width: { xs: '100%', sm: 'auto' }, py: { xs: 0.6, sm: 0.5 } }}>Subscribe</Button>
          </Box>
          <Typography variant="body2" sx={{ mb: 0.5 }}>
            Email: <Link href={`mailto:${contactEmail}`} sx={{ color: "#fff", fontWeight: 600 }}>{contactEmail}</Link>
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <Phone sx={{ fontSize: 16, mr: 0.5 }} /> {contactPhone}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", mt: { xs: 2, sm: 4 } }}>
        <Typography variant="caption">
          © {new Date().getFullYear()} {siteTitle}. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
