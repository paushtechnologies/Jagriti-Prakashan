// src/pages/PayPage.jsx
import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { getAssetPath } from "../utils/assetPath";

export default function PayPage() {
  return (
    <Box sx={{ mt: { xs: 20, sm: 22 }, display: "flex", justifyContent: "center", px: { xs: 1, sm: 0 } }}>
      <Paper sx={{ p: { xs: 1.5, sm: 4 }, width: { xs: '100%', sm: '70%' }, maxWidth: 1200 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Left column: heading + bank details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={600} gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.75rem' } }}>
              Bank Account Details
            </Typography>
            <Typography variant="body1" sx={{ mb: 0.5, fontSize: { xs: '0.95rem', sm: '1rem' } }}>Account Name: Jagriti Prakashan</Typography>
            <Typography variant="body1" sx={{ mb: 0.5, fontSize: { xs: '0.95rem', sm: '1rem' } }}>Account Number: 1234567890</Typography>
            <Typography variant="body1" sx={{ mb: 0.5, fontSize: { xs: '0.95rem', sm: '1rem' } }}>IFSC: JP0001234</Typography>
            <Typography variant="body1" sx={{ mb: 0.5, fontSize: { xs: '0.95rem', sm: '1rem' } }}>Bank: State Bank of India</Typography>
          </Grid>

          {/* Right column: large UPI QR image */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Box
              component="img"
              src={getAssetPath("assets/upi-qr.jpg")}
              alt="UPI QR"
              sx={{ width: { xs: 220, sm: '100%' }, maxWidth: { xs: 220, sm: 350 }, height: { xs: 220, sm: 450 }, mx: 'auto', borderRadius: 2, boxShadow: 4 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
