import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Zoom,
  Fade,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { SITE } from "../config";
import QRCode from "qrcode";

const numberToWords = (num) => {
  const a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const format = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
    if (n < 1000)
      return format(Math.floor(n / 100)) + "Hundred " + format(n % 100);
    if (n < 100000)
      return format(Math.floor(n / 1000)) + "Thousand " + format(n % 1000);
    if (n < 10000000)
      return format(Math.floor(n / 100000)) + "Lakh " + format(n % 100000);
    return format(Math.floor(n / 10000000)) + "Crore " + format(n % 10000000);
  };
  return num > 0 ? format(Math.floor(num)) + "Rupees Only" : "";
};

const indianCurrency = (num) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(num);

export default function CheckoutForm({
  cartItems = [],
  cartTotal = 0,
  onClearCart,
  onUpdateQty,
}) {
  const [form, setForm] = useState({
    firmName: "",
    address: "",
    email: "",
    phone: "",
    pincode: "",
    transactionId: "",
  });

  const [payOpen, setPayOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [clearOpen, setClearOpen] = useState(false);
  const [status, setStatus] = useState({
    open: false,
    type: "success",
    title: "",
    msg: "",
  });
  const upiPaymentUrl = useMemo(() => {
    if (!cartTotal) return "";

    const params = new URLSearchParams({
      pa: SITE.payment.upiVPA,
      pn: "Jagriti Prakashan",
      am: cartTotal.toFixed(2),
      cu: "INR",
      tn: `Order Payment - ${form.firmName || "Customer"}`,
    });

    return `upi://pay?${params.toString()}`;
  }, [cartTotal, form.firmName]);

  const [qrSrc, setQrSrc] = useState("");

  useEffect(() => {
    if (!upiPaymentUrl) return;

    QRCode.toDataURL(upiPaymentUrl, { width: 220, margin: 1 })
      .then(setQrSrc)
      .catch(console.error);
  }, [upiPaymentUrl]);

  const errors = useMemo(
    () => ({
      firmName: form.firmName.length > 0 && form.firmName.length < 3,
      email: form.email.length > 0 && !/^\S+@\S+\.\S+$/.test(form.email),
      phone: form.phone.length > 0 && !/^[0-9]{10}$/.test(form.phone),
      pincode: form.pincode.length > 0 && !/^[0-9]{6}$/.test(form.pincode),
    }),
    [form]
  );

  const handleChange = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // const submitToSheet = async () => {
  //   if (
  //     Object.values(errors).some((v) => v === true) ||
  //     !form.phone ||
  //     !form.firmName
  //   ) {
  //     setStatus({
  //       open: true,
  //       type: "error",
  //       title: "Check Form",
  //       msg: "Please correct the errors before submitting.",
  //     });
  //     return;
  //   }

  //   setSubmitting(true);
  //   try {
  //     const orderLines = cartItems
  //       .map((i) => `${i.title} (Qty: ${i.qty})`)
  //       .join("\n");
  //     const payload = {
  //       date: new Date().toLocaleString("en-IN"),
  //       orderSummary: orderLines,
  //       total: cartTotal.toFixed(2),
  //       ...form,
  //     };

  //     await fetch(SITE.sheetsWebhookUrl, {
  //       method: "POST",
  //       mode: "no-cors",
  //       body: JSON.stringify(payload),
  //     });

  //     // SUCCESS: Clear cart immediately so user doesn't double-order
  //     onClearCart();

  //     setStatus({
  //       open: true,
  //       type: "success",
  //       title: "Order Sent!",
  //       fontSize: "48px",
  //       msg:
  //         "Your order details have been saved successfully.We've sent a confirmation email to " +
  //         form.email,
  //     });
  //   } catch (err) {
  //     setStatus({
  //       open: true,
  //       type: "error",
  //       title: "Network Error",
  //       msg: "Failed to connect. Try again.",
  //     });
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const submitToSheet = async () => {
    if (
      Object.values(errors).some((v) => v === true) ||
      !form.phone ||
      !form.firmName
    ) {
      setStatus({
        open: true,
        type: "error",
        title: "Check Form",
        msg: "Please correct the errors before submitting.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const orderSnapshot = {
        firmName: form.firmName,
        email: form.email,
        transactionId: form.transactionId,
        total: cartTotal,
        items: cartItems.map((i) => ({
          title: i.title,
          qty: i.qty,
          price: i.price,
        })),
      };

      setLastOrder(orderSnapshot); // ✅ SAVE COPY

      const orderLines = cartItems
        .map((i) => `${i.title} (Qty: ${i.qty})`)
        .join("\n");

      const payload = {
        date: new Date().toLocaleString("en-IN"),
        orderSummary: orderLines,
        total: cartTotal.toFixed(2),
        ...form,
      };

      await fetch(SITE.sheetsWebhookUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      onClearCart(); // ✅ now safe

      setStatus({
        open: true,
        type: "success",
        title: "Order Sent!",
        msg: "Your order details have been saved successfully.",
      });
    } catch (err) {
      setStatus({
        open: true,
        type: "error",
        title: "Network Error",
        msg: "Failed to connect. Try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    if (!lastOrder) return;

    const text = `*New Order: Jagriti Prakashan*
--------------------------
*Name:* ${lastOrder.firmName}
*Email:* ${lastOrder.email}
*Total:* ${indianCurrency(lastOrder.total)}
*Items:*
${lastOrder.items.map((i) => `- ${i.title} (x${i.qty})`).join("\n")}
*UTR:* ${lastOrder.transactionId || "Pending"}`;

    window.open(
      `https://wa.me/919810294460?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setStatus({ ...status, open: false });
  };

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <style>{`
        @keyframes ultra-glow {
          0% { box-shadow: 0 0 5px #43A047, 0 0 10px #43A047; transform: scale(1); }
          50% { box-shadow: 0 0 20px #66BB6A, 0 0 30px #66BB6A; transform: scale(1.03); }
          100% { box-shadow: 0 0 5px #43A047, 0 0 10px #43A047; transform: scale(1); }
        }
      `}</style>

      {cartItems.length > 0 && (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "2fr 1fr 1fr 1fr" },
              backgroundColor: "#FFA726",
              color: "#fff",
              p: 1,
              borderRadius: 1,
              fontWeight: "bold",
              mb: 1,
            }}
          >
            <Typography>Book Title</Typography>
            <Typography>Price</Typography>
            <Typography
              align="center"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Qty
            </Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              Subtotal
            </Typography>
          </Box>
          {cartItems.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", sm: "2fr 1fr 1fr 1fr" },
                p: 1,
                borderBottom: "1px solid #ddd",
                backgroundColor: "#FDF7EC",
              }}
            >
              <Typography variant="body2">{item.title}</Typography>
              <Typography variant="body2">₹{item.price}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  sx={{ minWidth: 28, bgcolor: "#f0b04f" }}
                  onClick={() =>
                    onUpdateQty(item.id, Math.max(0, item.qty - 1))
                  }
                >
                  -
                </Button>
                <Typography variant="body2" fontWeight="bold">
                  {item.qty}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ minWidth: 28, bgcolor: "#f0b04f" }}
                  onClick={() => onUpdateQty(item.id, item.qty + 1)}
                >
                  +
                </Button>
              </Box>
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {indianCurrency(item.qty * item.price)}
              </Typography>
            </Box>
          ))}

          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              border: "1.5px solid #FFA726",
              backgroundColor: "#FFFBE6",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Total Amount:
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="900">
                {indianCurrency(cartTotal)}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 0.5, color: "#444" }}>
              In Words: <b>{numberToWords(cartTotal)}</b>
            </Typography>
          </Box>
        </>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Full Name"
            fullWidth
            size="small"
            value={form.firmName}
            onChange={handleChange("firmName")}
            error={errors.firmName}
            helperText={errors.firmName && "Required"}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            size="small"
            value={form.email}
            onChange={handleChange("email")}
            error={errors.email}
            helperText={errors.email && "Invalid Email"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Shipping Address"
            fullWidth
            size="small"
            multiline
            minRows={1}
            value={form.address}
            onChange={handleChange("address")}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Phone"
            fullWidth
            size="small"
            value={form.phone}
            onChange={handleChange("phone")}
            error={errors.phone}
            helperText={errors.phone && "10 digits required"}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="PIN Code"
            fullWidth
            size="small"
            value={form.pincode}
            onChange={handleChange("pincode")}
            error={errors.pincode}
            helperText={errors.pincode && "6 digits required"}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Transaction ID (UTR)"
            fullWidth
            size="small"
            value={form.transactionId}
            onChange={handleChange("transactionId")}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => setPayOpen(true)}
            sx={{
              background: "linear-gradient(45deg, #43A047 30%, #66BB6A 90%)",
              fontWeight: "bold",
              borderRadius: "50px",
              px: 4,
              py: 1,
              textTransform: "none",
              color: "#fff",
              animation: "ultra-glow 2.5s infinite ease-in-out",
            }}
          >
            Pay Now {indianCurrency(cartTotal)}
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mt: 3, alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={submitToSheet}
          disabled={submitting || cartItems.length === 0}
          sx={{ py: 1.5, px: 4, fontWeight: "bold" }}
        >
          {submitting ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Order"
          )}
        </Button>
        <Button
          color="error"
          variant="text"
          size="small"
          onClick={() => setClearOpen(true)}
        >
          Clear Cart
        </Button>
      </Box>

      {/* Payment Modal */}
      <Dialog
        open={payOpen}
        onClose={() => setPayOpen(false)}
        TransitionComponent={Fade}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", color: "#3D2508", textAlign: "center" }}
        >
          Scan to Pay
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", minWidth: 300 }}>
          <Box
            component="img"
            src={qrSrc}
            sx={{ width: 220, borderRadius: 1, my: 2, boxShadow: 3 }}
          />
          {/* <Box component="img" src={SITE.upiQRImage} sx={{ width: 220, borderRadius: 1, my: 2, boxShadow: 3 }} /> */}
          <Typography variant="h6" color="primary" fontWeight="bold">
            {SITE.upiVPA}
          </Typography>
          <Button
            startIcon={<ContentCopyIcon />}
            size="small"
            onClick={() => navigator.clipboard.writeText(SITE.payment.upiVPA)}
          >
            Copy UPI ID
          </Button>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ borderRadius: 2 }}
            onClick={() => setPayOpen(false)}
          >
            I Have Paid
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={status.open}
        TransitionComponent={Zoom}
        PaperProps={{ sx: { borderRadius: 5, p: 3, textAlign: "center" } }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          {status.type === "success" ? (
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "#4caf50" }} />
          ) : (
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "#f44336" }} />
          )}
        </Box>

        <DialogTitle
          sx={{
            fontSize: 48,
            fontWeight: 900,
            fontFamily: '"Playfair Display", serif',
            color: status.type === "success" ? "#2e7d32" : "#c62828",
          }}
        >
          {status.title}
        </DialogTitle>

        {status.type === "success" ? (
          <Typography variant="body1" sx={{ fontSize: 16 }}>
            Your order details have been saved successfully. We've sent a
            confirmation email to{" "}
            <Typography component="span" sx={{ fontWeight: 700 }}>
              {form.email}
            </Typography>
          </Typography>
        ) : (
          <Typography variant="body1">{status.msg}</Typography>
        )}

        <DialogActions sx={{ flexDirection: "column", gap: 1 }}>
          {status.type === "success" && (
            <Button
              fullWidth
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={openWhatsApp}
              sx={{
                bgcolor: "#25D366",
                color: "#fff",
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 3,
                "&:hover": { bgcolor: "#128C7E" },
              }}
            >
              WhatsApp
            </Button>
          )}
          <Button
            fullWidth
            onClick={() => setStatus({ ...status, open: false })}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        TransitionComponent={Zoom}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 3,
            textAlign: "center",
            background: "#FFF8E1",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 900,
            fontSize: 32,
            color: "#E65100",
            fontFamily: '"Playfair Display", serif',
          }}
        >
          Clear Cart?
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ fontSize: 16, color: "#5D4037" }}>
            This will remove all items from your cart.
            <br />
            Are you sure you want to continue?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setClearOpen(false)}
            sx={{
              borderRadius: 3,
              px: 4,
              backgroundColor: "#ffb74d",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              onClearCart();
              setClearOpen(false);
            }}
            sx={{
              borderRadius: 3,
              px: 4,
              backgroundColor: "#ffb74d",
              fontWeight: "bold",
            }}
          >
            Yes, Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
