// src/components/CheckoutForm.jsx
import React, { useState } from "react";
import {
  Box, TextField, Grid, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { SITE } from "../config";

export default function CheckoutForm({ cartItems = [], cartTotal = 0, onClearCart, onUpdateQty }) {
  const [form, setForm] = useState({
    firmName: "",
    address: "",
    email: "",
    phone: "",
    pincode: "",
    transactionId: ""
  });

  const [payOpen, setPayOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validateForm = () => {
    if (!form.firmName || !form.address || !form.email || !form.phone || !form.pincode) {
      alert("Please fill all required fields.");
      return false;
    }
    if (!/^[0-9]{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit Indian PIN code.");
      return false;
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const submitToSheet = async () => {
    if (!validateForm()) return;

    const orderLines = cartItems
      .map(i => `${i.title} — ${i.qty} × ₹${i.price} = ₹${(i.qty * i.price).toFixed(2)}`)
      .join("\n");

    const payload = {
      date: new Date().toISOString(),
      orderSummary: orderLines,
      total: cartTotal,
      ...form
    };

    if (!SITE.sheetsWebhookUrl) {
      alert("Orders cannot be saved: sheetsWebhookUrl missing in config.js.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(SITE.sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("Order submitted successfully! We'll verify payment and contact you soon.");
        onClearCart();
      } else {
        alert("Failed to submit order. Try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while submitting order.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyVPA = async () => {
    try {
      await navigator.clipboard.writeText(SITE.upiVPA || "");
      alert("UPI VPA copied to clipboard");
    } catch {
      alert("Cannot copy automatically. Please copy: " + (SITE.upiVPA || ""));
    }
  };

  return (

    <Box component="form" sx={{ mt: { xs: 0, sm: 3 }, px: { xs: 0.5, sm: 0 } }}>
      <Typography variant="h6" sx={{ mb: { xs: 0, sm: 2 }, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Customer Details</Typography>

      {/* Cart Table Header */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: '2fr 1fr 1fr 1fr' },
            backgroundColor: '#FFA726',
            color: '#fff',
            p: { xs: 0.5, sm: 1 },
            borderRadius: 1,
            fontWeight: 'bold',
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: '0.98rem', sm: '1rem' },
            gap: { xs: 0.1, sm: 0 }
          }}
        >
          <Typography>Book</Typography>
          <Typography>Price</Typography>
          {/** Only show Qty/Subtotal on sm+ or as new rows on xs */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}><Typography align="center">Qty</Typography></Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}><Typography>Subtotal</Typography></Box>
        </Box>
      )}

      {/* Cart Items */}
      {cartItems.map(item => (
        <Box
          key={item.id}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: '2fr 1fr 1fr 1fr' },
            alignItems: 'center',
            p: { xs: 0.5, sm: 1 },
            borderBottom: '1px solid #ddd',
            fontSize: { xs: '0.97rem', sm: '1rem' },
            gap: { xs: 0.1, sm: 0 },
            backgroundColor: '#FDF7EC',
          }}
        >
          <Typography sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }}>{item.title}</Typography>
          <Typography sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }}>₹{item.price}</Typography>
          {/* xs: stack qty/buttons and subtotal below */}
          {/** sm+: inline, xs: new row */}
          {/** Qty row for xs */}
          <Box sx={{ gridColumn: { xs: '1 / span 2', sm: 'auto' }, display: { xs: 'flex', sm: 'none' }, alignItems: 'center', justifyContent: 'space-between', mt: { xs: 0.5, sm: 0 } }}>
            <Typography sx={{ fontWeight: 500, fontSize: '0.93rem' }}>Qty</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Button
                size="small"
                variant="contained"
                sx={{ minWidth: 28, minHeight: 28, backgroundColor: '#f0b04f', color: '#fff', fontWeight: 'bold', fontSize: '1rem', '&:hover': { backgroundColor: '#FF9800' }, p: 0 }}
                onClick={() => onUpdateQty(item.id, Math.max(0, item.qty - 1))}
              >-</Button>
              <Typography sx={{ width: 22, textAlign: 'center', fontWeight: 600 }}>{item.qty}</Typography>
              <Button
                size="small"
                variant="contained"
                sx={{ minWidth: 28, minHeight: 28, backgroundColor: '#f0b04f', color: '#fff', fontWeight: 'bold', fontSize: '1rem', '&:hover': { backgroundColor: '#FF9800' }, p: 0 }}
                onClick={() => onUpdateQty(item.id, item.qty + 1)}
              >+</Button>
            </Box>
          </Box>
          {/* Subtotal row for xs */}
          <Box sx={{ gridColumn: { xs: '1 / span 2', sm: 'auto' }, display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end', fontWeight: 600, fontSize: '0.95rem', color: 'text.secondary', mb: { xs: 0.5, sm: 0 } }}>
            Subtotal: ₹{(item.qty * item.price).toFixed(2)}
          </Box>
          {/* sm+ only: inline qty and subtotal */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              sx={{ minWidth: 32, minHeight: 32, backgroundColor: '#f0b04f', color: '#fff', fontWeight: 'bold', '&:hover': { backgroundColor: '#FF9800' } }}
              onClick={() => onUpdateQty(item.id, Math.max(0, item.qty - 1))}
            >-</Button>
            <Typography sx={{ width: 25, textAlign: 'center', fontWeight: 600 }}>{item.qty}</Typography>
            <Button
              size="small"
              variant="contained"
              sx={{ minWidth: 32, minHeight: 32, backgroundColor: '#f0b04f', color: '#fff', fontWeight: 'bold', '&:hover': { backgroundColor: '#FF9800' } }}
              onClick={() => onUpdateQty(item.id, item.qty + 1)}
            >+</Button>
          </Box>
          <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>₹{(item.qty * item.price).toFixed(2)}</Typography>
        </Box>
      ))}

      {/* Total aligned */}
      {cartItems.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: '2fr 1fr 1fr 1fr' },
            pt: { xs: 0.5, sm: 1 },
            mt: { xs: 0.5, sm: 1 },
            borderTop: '2px solid #FFA726',
            fontWeight: 700,
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}
        >
          <Box />
          <Box />
          <Typography align="right">Total:&nbsp;</Typography>
          <Typography align="left"> ₹{cartTotal.toFixed(2)}</Typography>
        </Box>
      )}

      {/* Customer Info */}
      <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mt: { xs: 1, sm: 2 } }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Firm Name" required fullWidth size="small" value={form.firmName} onChange={handleChange("firmName")} sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Email" type="email" required fullWidth size="small" value={form.email} onChange={handleChange("email")} sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" required fullWidth size="small" value={form.address} onChange={handleChange("address")} sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Phone" required fullWidth size="small" value={form.phone} onChange={handleChange("phone")} sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Pin Code"
            required
            fullWidth
            size="small"
            value={form.pincode}
            onChange={handleChange("pincode")}
            inputProps={{ pattern: "[0-9]{6}" }}
            helperText="Enter 6-digit Indian PIN code"
            sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Transaction ID (after payment)"
            fullWidth
            size="small"
            value={form.transactionId}
            onChange={handleChange("transactionId")}
            sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, mt: { xs: 1, sm: 0 } }}>
          <Button
            variant="contained"
            onClick={() => setPayOpen(true)}
            sx={{
              background: 'linear-gradient(45deg, #66BB6A, #43A047, #388E3C)',
              fontWeight: 'bold',
              color: '#fff',
              borderRadius: '50px',
              px: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.98rem', sm: '1rem' },
              width: { xs: '100%', sm: 'auto' },
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.08)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          >
            Pay Now ₹{cartTotal.toFixed(2)}
          </Button>
        </Grid>
      </Grid>

      {/* Submit & Clear */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: { xs: 2, sm: 3 } }}>
        <Button
          variant="contained"
          color="primary"
          onClick={submitToSheet}
          disabled={submitting || cartItems.length === 0}
          sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: '1rem', sm: '1.05rem' }, py: { xs: 1, sm: 1.5 } }}
        >
          {submitting ? 'Submitting...' : 'Submit Order'}
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={() => { if (confirm('Clear cart?')) onClearCart(); }}
          sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: '1rem', sm: '1.05rem' }, py: { xs: 1, sm: 1.5 } }}
        >
          Clear Cart
        </Button>
      </Box>

      {/* Pay modal */}
      <Dialog open={payOpen} onClose={() => setPayOpen(false)} maxWidth="md">
        <DialogTitle sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, px: { xs: 1, sm: 3 }, py: { xs: 1, sm: 2 } }}>Pay via UPI / Bank Transfer</DialogTitle>
        <DialogContent sx={{ px: { xs: 1, sm: 3 }, py: { xs: 1, sm: 2 } }}>
          <Grid container spacing={{ xs: 2, sm: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>Bank Account Details</Typography>
              <Typography sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }}>Account Name: {SITE.bankDetails.accountName}</Typography>
              <Typography sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }}>Account No: {SITE.bankDetails.accountNumber}</Typography>
              <Typography sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }}>IFSC: {SITE.bankDetails.ifsc}</Typography>
              <Typography sx={{ fontSize: { xs: '0.97rem', sm: '1rem' } }}>Bank: {SITE.bankDetails.bankName}</Typography>
              <Button startIcon={<ContentCopyIcon />} onClick={copyVPA} sx={{ mt: 2, width: { xs: '100%', sm: 'auto' }, fontSize: { xs: '0.97rem', sm: '1rem' } }}>Copy UPI</Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <img src={SITE.upiQRImage} alt="UPI QR" style={{ width: '100%', maxWidth: 220, borderRadius: 8, boxShadow: 4 }} />
              <Typography sx={{ mt: 1, fontSize: { xs: '0.97rem', sm: '1rem' } }}>{SITE.upiVPA}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: { xs: 1, sm: 3 }, py: { xs: 1, sm: 2 } }}>
          <Button onClick={() => setPayOpen(false)} sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: '1rem', sm: '1.05rem' } }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
