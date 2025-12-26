import React, { useState } from "react";
import { Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";
import { SITE } from "../config";

export default function About() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent("Contact from Website");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${body}`;

    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 4 }, pt: { xs: 0, sm: 0 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          mt: { xs: 2, sm: 8 },
          fontSize: { xs: "1.35rem", sm: "2rem" },
        }}
      >
        हमारे बारे में
      </Typography>

      <Grid container spacing={3}>
  {/* LEFT: CONTENT + ADDRESSES + MAP */}
  <Grid item xs={12} md={6}>
    {/* 1st paragraph – always visible */}
    <Typography
      variant="body1"
      sx={{ mb: 3, fontSize: { xs: "0.95rem", sm: "1rem" } }}
    >
      उच्च संपादकीय मानकों, गहन शोध और उत्कृष्ट हार्ड-पेपर पुस्तकों की
      परंपरा के माध्यम से हम भारतीय ज्ञान परंपरा को समृद्ध रूप में पाठकों
      तक पहुँचाने का कार्य करते हैं।
    </Typography>

    {/* 2nd paragraph – hidden on phone */}
    <Typography
      variant="body1"
      sx={{
        mb: 3,
        fontSize: "1rem",
        display: { xs: "none", sm: "block" },
      }}
    >
      हमारा उद्देश्य केवल पुस्तकें प्रकाशित करना नहीं, बल्कि भारत की
      सांस्कृतिक विरासत, आध्यात्मिक चिंतन और प्राचीन ज्ञान-स्रोतों को
      आधुनिक पाठकों के लिए प्रामाणिक, सरल एवं विश्वसनीय रूप में प्रस्तुत
      करना है।
    </Typography>

    {/* 3rd paragraph – always visible */}
    <Typography
      variant="body1"
      sx={{ mb: 3, fontSize: { xs: "0.95rem", sm: "1rem" } }}
    >
      पिछले 40 से अधिक वर्षों से हमारा प्रकाशन गृह हिंदू इतिहास, दर्शन,
      संस्कृति और धार्मिक ग्रंथों पर आधारित श्रेष्ठ साहित्य के प्रकाशन के
      लिए समर्पित रहा है। हमारी पुस्तकों में सामग्री की प्रामाणिकता, भाषा
      की शुद्धता और प्रस्तुति की उत्कृष्टता का विशेष ध्यान रखा जाता है,
      ताकि पाठकों को ज्ञान और प्रेरणा दोनों का अनुभव प्राप्त हो सके।
    </Typography>

    {/* 4th paragraph – hidden on phone */}
    <Typography
      variant="body1"
      sx={{
        mb: 4,
        fontSize: "1rem",
        display: { xs: "none", sm: "block" },
      }}
    >
      जागृति प्रकाशन अपनी हर पुस्तक के माध्यम से भारतीय सभ्यता के मूल्यों,
      विचारों और ज्ञान-संपदा को सुरक्षित रखने तथा आने वाली पीढ़ियों तक
      पहुँचाने का निरंतर प्रयास करता है। हमारे लिए यह सिर्फ एक कार्य नहीं,
      बल्कि सांस्कृतिक दायित्व है—एक ऐसी साधना जो ज्ञान को जन-जन तक
      पहुँचाने की भावना से प्रेरित है।
    </Typography>

    {/* ADDRESSES */}
    <Grid container sx={{ mt: 3, mb: 4 }} justifyContent="space-between">
      {/* मुख्य कार्यालय */}
      <Grid item xs={12} sm="auto">
        <Box sx={{ textAlign: "center", mb: { xs: 4 } }}>
          <Typography variant="h6">मुख्य कार्यालय</Typography>
          <Typography sx={{ fontSize: "0.95rem" }}>
            पता: F-109, सेक्टर 27, नोएडा, उत्तर प्रदेश - 201301
          </Typography>
          <Typography sx={{ fontSize: "0.95rem" }}>
            फ़ोन: +91-9871143768, 9810294460
          </Typography>
          <Typography sx={{ fontSize: "0.95rem" }}>
            ईमेल: jagritiprakashan1985@rediffmail.com
          </Typography>
        </Box>
      </Grid>

      {/* विक्रय केंद्र */}
      <Grid item xs={12} sm="auto">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">विक्रय केंद्र</Typography>
          <Typography sx={{ fontSize: "0.95rem" }}>
            पता: C-142A, सेक्टर 10, नोएडा, उत्तर प्रदेश - 201301
          </Typography>
          <Typography sx={{ fontSize: "0.95rem" }}>
            फ़ोन: +91-120-4928714
          </Typography>
          <Typography sx={{ fontSize: "0.95rem" }}>
            ईमेल: {SITE.contactEmail}
          </Typography>
        </Box>
      </Grid>
    </Grid>

    {/* MAP */}
    <Box sx={{ mt: 3 }}>
      <Box
        component="iframe"
        title="map"
        src="https://www.google.com/maps?q=28.5901631,77.3326889&hl=en&z=14&output=embed"
        sx={{
          width: "100%",
          height: { xs: 180, sm: 260 },
          border: 0,
        }}
        loading="lazy"
        allowFullScreen
      />
    </Box>
  </Grid>

  {/* RIGHT: CONTACT FORM */}
  <Grid item xs={12} md={6}>
    <Paper sx={{ p: { xs: 1.5, sm: 2 } }}>
      <Typography variant="h6">Send us a message</Typography>

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
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          sx={{ mb: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ width: { xs: "100%", sm: "auto" } }}
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
