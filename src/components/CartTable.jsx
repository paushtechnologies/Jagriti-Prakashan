// src/components/CartTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
  InputBase,
} from "@mui/material";
import { Delete, Add, Remove, Search as SearchIcon, Close as CloseIcon  } from "@mui/icons-material";
import { matchesBook } from "../utils/bookSearch";

/* ===================== Editable Quantity ===================== */

const EditableQty = ({ value, onChange, width = 32 }) => {
  const [tempValue, setTempValue] = React.useState(value);

  React.useEffect(() => setTempValue(value), [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[0-9]+$/.test(val)) {
      setTempValue(val);
      onChange(val === "" ? 0 : parseInt(val, 10));
    }
  };

  const handleBlur = () => {
    const num = parseInt(tempValue, 10);
    onChange(isNaN(num) ? 0 : num);
    setTempValue(isNaN(num) ? 0 : num);
  };

  return (
    <InputBase
      value={tempValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
      sx={{
        width,
        mx: 0.5,
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: 1,
        bgcolor: "#fff",
        input: {
          textAlign: "center",
          fontWeight: 600,
          p: 0.5,
          fontSize: "0.9rem",
        },
      }}
    />
  );
};

/* ===================== CartTable ===================== */

export default function CartTable({ items = [], onUpdateQty, onRemove }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [query, setQuery] = React.useState("");

  /* 🔍 SAME SEARCH LOGIC AS HEADER */
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) => matchesBook(item, query));
  }, [items, query]);

  const grandTotal = filteredItems.reduce((s, it) => s + it.price * it.qty, 0);

  /* ===================== Search Bar ===================== */

  const SearchBar = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: { xs: 0.5, sm: 1 },
        py: { xs: 0, sm: 0.2},
        mb: 1.2,
        width: "100%",
        maxWidth: { xs: "100%", sm: 380 },

        /* GOLD GLASS */
        background:
          "linear-gradient(135deg, rgba(255,248,235,0.98), rgba(240,176,79,0.18))",
        borderRadius: "999px",
        border: "1.5px solid rgba(240,176,79,0.6)",

        transition: "border-color 0.2s ease, background 0.2s ease",

        "&:focus-within": {
          background: "#fff",
          borderColor: "#f0b04f",
        },
      }}
    >
      {/* SEARCH ICON */}
      <SearchIcon
        sx={{
          color: "#f0b04f",
          fontSize: 22,
          ml: 0.5,
        }}
      />

      {/* INPUT */}
      <InputBase
        placeholder="Search book, author, publisher…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          flex: 1,
          fontSize: "0.95rem",
          fontWeight: 500,
          color: "#0d1b2a",

          "& input::placeholder": {
            color: "rgba(13,27,42,0.5)",
            fontWeight: 400,
          },
        }}
      />

      {/* CLEAR BUTTON */}
      {query && (
        <IconButton
          size="small"
          onClick={() => setQuery("")}
          sx={{
            color: "#f0b04f",
            "&:hover": {
              bgcolor: "rgba(240,176,79,0.12)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );

  /* ===================== MOBILE VIEW ===================== */

  if (isXs) {
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{ mb: 0.5, fontWeight: 700, fontSize: "0.95rem" }}
        >
          📚 Books Order
        </Typography>

        <Typography color="error" sx={{ mb: 0.65, fontSize: "0.85rem" }}>
          Shipping will be extra
        </Typography>

        {SearchBar}

        {filteredItems.map((row) => (
          <Card
            key={row.id}
            sx={{
              mt: 1.5,
              p: 1,
              boxShadow: 1,
              backgroundColor: "#FDF7EC",
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ p: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                  {row.title}
                </Typography>
                <IconButton size="small" onClick={() => onRemove(row.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "0.85rem" }}>
                  ₹ {row.price.toFixed(2)}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      onUpdateQty(row.id, Math.max(0, row.qty - 1))
                    }
                    sx={{
                      width: { xs: 26, sm: 32 },
                      height: { xs: 26, sm: 32 },
                      bgcolor: "#f0b04f",
                      color: "rgb(0,0.0,0.25)",
                      fontWeight: 700,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                      "&:hover": {
                        bgcolor: "#e6a03d",
                        transform: "scale(1.08)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>

                  <EditableQty
                    value={row.qty}
                    onChange={(val) => onUpdateQty(row.id, val)}
                  />

                  <IconButton
                    size="small"
                    onClick={() => onUpdateQty(row.id, row.qty + 1)}
                    sx={{
                      width: { xs: 26, sm: 32 },
                      height: { xs: 26, sm: 32 },
                      bgcolor: "#f0b04f",
                      color: "rgba(0,0,0,1)",
                      fontWeight: 700,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                      "&:hover": {
                        bgcolor: "#e6a03d",
                        transform: "scale(1.08)",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>

                <Typography sx={{ fontWeight: 700 }}>
                  ₹ {(row.price * row.qty).toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={700}>Total</Typography>
          <Typography fontWeight={700}>₹ {grandTotal.toFixed(2)}</Typography>
        </Box>
      </Box>
    );
  }

  /* ===================== DESKTOP VIEW ===================== */

  return (
    <Box>
      {/* HEADER ROW WITH SEARCH */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "rgba(13,27,42,0.75)" }}
          >
            📚 Books Order Form
          </Typography>
          <Typography color="error" sx={{ fontSize: "0.9rem" }}>
            Shipping will be extra
          </Typography>
        </Box>

        {SearchBar}
      </Box>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ backgroundColor: "#FDF7EC" }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFC107" }}>
              <TableCell sx={{ color: "#1b1818ff", fontWeight: 700 }}>
                Book Title
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#141313ff", fontWeight: 700 }}
              >
                Price (₹)
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#181616ff", fontWeight: 700 }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#181616ff", fontWeight: 700 }}
              >
                Total (₹)
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#171313ff", fontWeight: 700 }}
              >
                Remove
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredItems.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ fontSize: 16, fontWeight: 400 }}>
                  {row.title}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: 16, fontWeight: 400 }}>₹ {row.price.toFixed(0)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        onUpdateQty(row.id, Math.max(0, row.qty - 1))
                      }
                      sx={{
                        width: { xs: 26, sm: 32 },
                        height: { xs: 26, sm: 32 },
                        bgcolor: "#f0b04f",
                        color: "rgb(0,0,0,1)",
                        fontWeight: 700,
                        boxShadow: "0 2px 6px rgba(0,0,0,1)",
                        "&:hover": {
                          bgcolor: "#e6a03d",
                          transform: "scale(1.08)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                    <EditableQty
                      value={row.qty}
                      onChange={(val) => onUpdateQty(row.id, val)}
                      width={45}
                    />
                    <IconButton
                      size="small"
                      onClick={() => onUpdateQty(row.id, row.qty + 1)}
                      sx={{
                        width: { xs: 26, sm: 32 },
                        height: { xs: 26, sm: 32 },
                        bgcolor: "#f0b04f",
                        color: "rgb(0,0,0,1)",
                        fontWeight: 700,
                        boxShadow: "0 2px 6px rgba(0,0,0,0,1)",
                        "&:hover": {
                          bgcolor: "#e6a03d",
                          transform: "scale(1.08)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontSize: 16, fontWeight: 400 }}>
                  ₹ {(row.price * row.qty).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onRemove(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography fontWeight={700}>Total Amount (₹)</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight={700}>
                  ₹ {grandTotal.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
