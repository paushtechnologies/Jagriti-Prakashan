// src/components/CartTable.jsx
import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Button, Card, CardContent, Divider, useTheme, useMediaQuery
} from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function CartTable({ items = [], onUpdateQty, onRemove }) {
  const grandTotal = items.reduce((s, it) => s + (it.price * it.qty), 0);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  if (isXs) {
    // Mobile stacked view (tighter paddings)
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 700, color: "rgba(13, 27, 42, 0.85)", fontSize: '0.98rem' }}>
          📚 Books Order
        </Typography>
        <Typography color="error" sx={{ mb: 0.75, fontSize: '0.88rem' }}>Shipping extra</Typography>

        {items.map((row) => (
          <Card key={row.id} sx={{ mb: 0.5, p: 0.5, boxShadow: 1, backgroundColor: '#FDF7EC' }}>
            <CardContent sx={{ p: 0.1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.92rem' }}>{row.title}</Typography>
                <IconButton size="small" onClick={() => onRemove(row.id)} aria-label="remove">
                  <Delete fontSize="small" />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>₹ {Number(row.price).toFixed(2)}</Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ minWidth: 30, minHeight: 30, backgroundColor: '#f0b04f', color: '#fff', fontWeight: 'bold', '&:hover': { backgroundColor: '#FF9800' } }}
                    onClick={() => onUpdateQty(row.id, Math.max(0, row.qty - 1))}
                  >
                    -
                  </Button>
                  <Typography sx={{ width: 28, textAlign: 'center', fontWeight: 600 }}>{row.qty}</Typography>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ minWidth: 30, minHeight: 30, backgroundColor: '#f0b04f', color: '#fff', fontWeight: 'bold', '&:hover': { backgroundColor: '#FF9800' } }}
                    onClick={() => onUpdateQty(row.id, row.qty + 1)}
                  >
                    +
                  </Button>
                </Box>

                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>₹ {(row.price * row.qty).toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 0.5 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.25 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Total</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>₹ {grandTotal.toFixed(2)}</Typography>
        </Box>
      </Box>
    );
  }

  // Desktop/table view (unchanged)
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: "rgba(13, 27, 42, 0.75)" }}>
        📚 Books Order Form
      </Typography>
      <Typography color="error" sx={{ mb: 2 }}>Shipping will be extra.</Typography>

      <TableContainer component={Paper} elevation={3} sx={{ backgroundColor: '#FDF7EC' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFC107" }}>
              <TableCell sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1 }}>Book Title</TableCell>
              <TableCell align="right" sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1 }}>Price (₹)</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1 }}>Quantity</TableCell>
              <TableCell align="right" sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1 }}>Total (₹)</TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 700, py: 0.6, px: 1 }}>Remove</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ maxWidth: 380, py: 0.5, px: 1 }}>{row.title}</TableCell>
                <TableCell align="right" sx={{ py: 0.5, px: 1 }}>₹ {Number(row.price).toFixed(2)}</TableCell>
                <TableCell align="center" sx={{ py: 0.5, px: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
                    <Button
                      size="medium"
                      variant="contained"
                      sx={{ minWidth: 32, minHeight: 32, backgroundColor: "#f0b04f", color: "#fff", fontWeight: "bold", "&:hover": { backgroundColor: "#FF9800" } }}
                      onClick={() => onUpdateQty(row.id, Math.max(0, row.qty - 1))}
                    >
                      -
                    </Button>

                    <Typography sx={{ width: 32, textAlign: "center", fontWeight: 600 }}>{row.qty}</Typography>

                    <Button
                      size="medium"
                      variant="contained"
                      sx={{ minWidth: 32, minHeight: 32, backgroundColor: "#f0b04f", color: "#fff", fontWeight: "bold", "&:hover": { backgroundColor: "#FF9800" } }}
                      onClick={() => onUpdateQty(row.id, row.qty + 1)}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>

                <TableCell align="right" sx={{ py: 0.5, px: 1 }}>₹ {(row.price * row.qty).toFixed(2)}</TableCell>

                <TableCell align="center" sx={{ py: 0.5, px: 1 }}>
                  <IconButton onClick={() => onRemove(row.id)} aria-label="remove">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3} align="right" sx={{ py: 0.6, px: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>Total Amount (₹)</Typography>
              </TableCell>
              <TableCell align="right" sx={{ py: 0.6, px: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>₹ {grandTotal.toFixed(2)}</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
