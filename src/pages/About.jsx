// src/pages/About.jsx
import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";
import { SITE } from "../config";

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (!SITE.sheetsWebhookUrl) {
      alert("Contact form not configured (sheetsWebhookUrl missing).");
      return;
    }
    try {
      await fetch(SITE.sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString(),
          contactName: form.name,
          contactEmail: form.email,
          message: form.message,
          type: "contact"
        })
      });
      alert("Message sent — thank you!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Failed to send message.");
    }
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, pt: { xs: 20, sm: 0 } }}>
      <Typography variant="h4" sx={{ mb: 2, pt: { xs: 2, sm: 24 }, fontSize: { xs: '1.35rem', sm: '2rem' } }}>
        About Jagriti Prakashan
      </Typography>
      <Grid container spacing={3}>
        {/* Left side: Info & Map */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" sx={{ mb: 2, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
            Jagriti Prakashan is a leading publisher of educational and children's books.
            Our mission is to deliver high-quality, affordable educational resources across the region.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>Contact</Typography>
          <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Address: 123 Publisher Lane, City, State, PIN</Typography>
          <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Phone: +91-98765-43210</Typography>
          <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Email: {SITE.contactEmail}</Typography>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Find us</Typography>
            <Box
              component="iframe"
              title="map"
              src="https://www.google.com/maps?q=28.5901631,77.3326889&hl=es;z=14&output=embed"
              sx={{ width: '100%', height: { xs: 180, sm: 260 }, border: 0, mt: 1 }}
              loading="lazy"
              allowFullScreen
            />

          </Box>
        </Grid>

        {/* Right side: Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Send us a message</Typography>
            <Box component="form" onSubmit={submit} sx={{ mt: 1 }}>
              <TextField
                fullWidth
                label="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Email"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                sx={{ mb: 1 }}
              />
              <Button type="submit" variant="contained" sx={{ width: { xs: '100%', sm: 'auto' }, py: { xs: 1, sm: 0.75 } }}>
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
