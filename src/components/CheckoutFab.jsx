// src/components/CheckoutFab.jsx
import React from "react";
import { Fab, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

export default function CheckoutFab({ cartCount = 0, onClick }) {
  const navigate = useNavigate();
  return (
    <Fab
      color="primary"
      variant="extended"
      sx={{
        position: "fixed",
        bottom: { xs: 16, md: 32 },
        right: { xs: 16, md: 48 },
        zIndex: 1200,
        boxShadow: 6,
        fontWeight: 700,
        letterSpacing: 1,
      }}
      onClick={onClick ? onClick : () => navigate("/cart")}
    >
      <Badge badgeContent={cartCount} color="success" sx={{ mr: 1 }}>
        <ShoppingCartIcon sx={{ fontSize: 28 }} />
      </Badge>
    </Fab>
  );
}
