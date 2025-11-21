import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Button,
  Fade,
  Paper,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  ShoppingCart,
  Brightness4,
  Brightness7,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { getAssetPath } from "../utils/assetPath";

export default function Header({ cartCount = 0, onCart, onToggleMode, mode }) {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null); // mobile hamburger menu
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      {/* MOBILE FULL-SCREEN SEARCH BAR (sleek, X on right) */}
      {showSearch && (
        <Fade in={showSearch}>
          <Paper
            elevation={0}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 2000,
              p: 1,
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(3px)",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "rgba(255,255,255,0.9)",
                borderRadius: 999,
                px: 1,
                py: 0.5,
                width: "100%",
                maxWidth: 480,
              }}
            >
              <InputBase
                autoFocus
                placeholder="Search books, publisher…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ flex: 1, ml: 1, fontSize: 14 }}
              />
              <IconButton type="submit" size="small">
                <SearchIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => setShowSearch(false)}
                sx={{ ml: 0.5 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Paper>
        </Fade>
      )}

      {/* MAIN HEADER */}
      <AppBar
        position="fixed"
        elevation={3}
        sx={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${getAssetPath(
            "assets/footershell.jpg"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          p: { xs: 0, sm: 2 },
          top: 0,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: "64px",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1.5, sm: 0 },
          }}
        >
          {/* DESKTOP SEARCH BAR — UNCHANGED */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.6)",
              borderRadius: 2,
              px: 1,
            }}
            component="form"
            onSubmit={handleSearch}
          >
            <InputBase
              placeholder="Search books, publisher…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ ml: 1, flex: 1, fontSize: 14, color: "#000" }}
            />
            <IconButton type="submit" size="small" sx={{ color: "#000" }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* MOBILE SEARCH ICON (opens full-screen search) */}
          <IconButton
            onClick={() => setShowSearch(true)}
            sx={{
              display: { xs: "flex", sm: "none" },
              color: "white",
              position: "absolute",
              left: 5,
              top: 30,
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* DESKTOP LOGO + TITLE (UNCHANGED) */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <Box
              component="img"
              src={getAssetPath("assets/logo.png")}
              alt="Logo"
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                mr: 1,
              }}
            />

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                  fontSize: { sm: "28px", md: "60px" },
                }}
              >
                जागृति प्रकाशन
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  fontStyle: "italic",
                  color: "#f0f0f0",
                  fontSize: { sm: "12px", md: "16px" },
                  textAlign: "center",
                }}
              >
                ज्ञान की धरोहर, आपके साथ
              </Typography>
            </Box>
          </Box>

          {/* MOBILE LOGO + CENTERED TEXT BLOCK */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
              mt: 1,
              pb: 0,
              minHeight: "100px",
            }}
            onClick={() => navigate("/")}
          >
            {/* Centered group: [LOGO][TEXT][INVISIBLE SPACER] */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                top: 0,
              }}
            >
              {/* LOGO – immediately left of text, zero gap */}
              <Box
                component="img"
                src={getAssetPath("assets/logo.png")}
                alt="Logo"
                sx={{
                  width: 50,
                  height: 70,
                  borderRadius: "50%",
                  mr: 0.5, // zero gap
                }}
              />

              {/* TEXT BLOCK */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  lineHeight: 1.1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#fff",
                    fontSize: "36px",
                    lineHeight: 1.2,
                  }}
                >
                  जागृति
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#fff",
                    fontSize: "32px",
                    lineHeight: 1,
                    mt: "-2px",
                  }}
                >
                  प्रकाशन
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    fontStyle: "italic",
                    color: "#f0f0f0",
                    fontSize: "10px",
                    mt: "2px",
                  }}
                >
                  ज्ञान की धरोहर, आपके साथ
                </Typography>
              </Box>

              {/* INVISIBLE SPACER same width as logo to keep TEXT centered */}
              <Box
                sx={{
                  width: 50,
                  height: 70,
                  visibility: "hidden",
                }}
              />
            </Box>
          </Box>

          {/* DESKTOP RIGHT SIDE — UNCHANGED */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: "#FFA726",
                "&:hover": { bgcolor: "#fb8c00" },
              }}
              startIcon={<ShoppingCart />}
              onClick={onCart}
            >
              Order Now ({cartCount})
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/pay")}
            >
              Pay Now
            </Button>

            <IconButton onClick={onToggleMode} color="inherit">
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>

          {/* MOBILE HAMBURGER (cart, pay, mode in dropdown) */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              position: "absolute",
              right: 5,
              top: 30,
            }}
          >
            <IconButton onClick={handleMenuOpen} color="inherit">
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{ display: { xs: "block", sm: "none" } }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  if (onCart) onCart();
                }}
              >
                🛒 Cart ({cartCount})
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/pay");
                }}
              >
                💵 Pay Now
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  if (onToggleMode) onToggleMode();
                }}
              >
                {mode === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SECONDARY NAV (unchanged except mobile labels shortened as before) */}
      <AppBar
        position="fixed"
        sx={{
          background:
            "linear-gradient(90deg, rgba(13,27,42,0.9) 0%, rgba(13,27,42,0.7) 20%, #FFB74D 50%, rgba(13,27,42,0.6) 80%, rgba(13,27,42,0.8) 100%)",
          height: 40,
          justifyContent: "center",
          top: { xs: "108px", sm: "118px" },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            gap: { xs: 1.5, sm: 5 },
            minHeight: "30px !important",
          }}
        >
          <Button sx={{ color: "#fff" }} onClick={() => navigate("/")}>
            {window.innerWidth < 600 ? "Home" : "Home"}
          </Button>
          <Button sx={{ color: "#fff" }} onClick={() => navigate("/gallery")}>
            {window.innerWidth < 600 ? "Gallery" : "Books Gallery"}
          </Button>
          <Button sx={{ color: "#fff" }} onClick={() => navigate("/cart")}>
            {window.innerWidth < 600 ? "Order" : "Book Order"}
          </Button>
          <Button sx={{ color: "#fff" }} onClick={() => navigate("/about")}>
            {window.innerWidth < 600 ? "About" : "About Us"}
          </Button>
          <Button sx={{ color: "#fff" }} onClick={() => navigate("/media")}>
            {window.innerWidth < 600 ? "Media" : "Media & Moments"}
          </Button>
        </Toolbar>
      </AppBar>

    </>
  );
}
