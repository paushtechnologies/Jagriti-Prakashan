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
          type: "contact",
        }),
      });
      alert("Message sent — thank you!");
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Failed to send message.");
    }
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 4 }, pt: { xs: 16, sm: 0 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          pt: { xs: 2, sm: 24 },
          fontSize: { xs: "1.35rem", sm: "2rem" },
        }}
      >
        हमारे बारे में
      </Typography>
      <Grid container spacing={3}>
        {/* Left side: Info & Map */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            sx={{ mb: 2, fontSize: { xs: "0.95rem", sm: "1rem" } }}
          >
            उच्च संपादकीय मानकों, गहन शोध और उत्कृष्ट हार्ड-पेपर पुस्तकों की
            परंपरा के माध्यम से हम भारतीय ज्ञान परंपरा को समृद्ध रूप में पाठकों
            तक पहुँचाने का कार्य करते हैं। <br />
            <br />
            हमारा उद्देश्य केवल पुस्तकें प्रकाशित करना नहीं, बल्कि भारत की
            सांस्कृतिक विरासत, आध्यात्मिक चिंतन और प्राचीन ज्ञान-स्रोतों को
            आधुनिक पाठकों के लिए प्रामाणिक, सरल एवं विश्वसनीय रूप में प्रस्तुत
            करना है। <br />
            <br />
            पिछले 60 से अधिक वर्षों से हमारा प्रकाशन गृह हिंदू इतिहास, दर्शन,
            संस्कृति और धार्मिक ग्रंथों पर आधारित श्रेष्ठ साहित्य के प्रकाशन के
            लिए समर्पित रहा है। हमारी पुस्तकों में सामग्री की प्रामाणिकता, भाषा
            की शुद्धता और प्रस्तुति की उत्कृष्टता का विशेष ध्यान रखा जाता है,
            ताकि पाठकों को ज्ञान और प्रेरणा दोनों का अनुभव प्राप्त हो सके।{" "}
            <br />
            <br />
            जागृति प्रकाशन अपनी हर पुस्तक के माध्यम से भारतीय सभ्यता के मूल्यों,
            विचारों और ज्ञान-संपदा को सुरक्षित रखने तथा आने वाली पीढ़ियों तक
            पहुँचाने का निरंतर प्रयास करता है। हमारे लिए यह सिर्फ एक कार्य नहीं,
            बल्कि सांस्कृतिक दायित्व है—एक ऐसी साधना जो ज्ञान को जन-जन तक
            पहुँचाने की भावना से प्रेरित है।
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            संपर्क
          </Typography>

          <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            पता: C-142, सेक्टर 10, नोएडा, उत्तर प्रदेश 201301
          </Typography>
          <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            फ़ोन: +91-8287049393
          </Typography>
          <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            ईमेल: {SITE.contactEmail}
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              हमारा अवस्थित स्थल
            </Typography>

            <Box
              component="iframe"
              title="map"
              src="https://www.google.com/maps?q=28.5901631,77.3326889&hl=es;z=14&output=embed"
              sx={{
                width: "100%",
                height: { xs: 180, sm: 260 },
                border: 0,
                mt: 1,
              }}
              loading="lazy"
              allowFullScreen
            />
          </Box>
        </Grid>

        {/* Right side: Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography
              variant="h6"
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Send us a message
            </Typography>
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
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  py: { xs: 1, sm: 0.75 },
                }}
              >
                Send
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
