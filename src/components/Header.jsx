import React, { useState, useMemo } from "react";
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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  ClickAwayListener,
} from "@mui/material";
import {
  Search as SearchIcon,
  Close as CloseIcon,
  ShoppingCart,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { getAssetPath } from "../utils/assetPath";
import { matchesBook } from "../utils/bookSearch";


/* ===================== COMPONENT ===================== */

export default function Header({ cartCount = 0, onCart, books = [] }) {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showDesktopResults, setShowDesktopResults] = useState(false); // 👈 Control desktop results
  const [menuAnchor, setMenuAnchor] = useState(null); // mobile hamburger menu
  const navigate = useNavigate();

  /* ===================== FILTERED RESULTS ===================== */

  const filteredBooks = useMemo(() => {
  return books.filter(b => matchesBook(b, query));
}, [books, query]);


  /* ===================== HANDLERS ===================== */

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
    setShowSearch(false);
    setShowDesktopResults(false);
  };

  const handleResultClick = (id) => {
    navigate(`/book/${id}`);
    setQuery("");
    setShowSearch(false);
    setShowDesktopResults(false);
  };

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  /* ===================== SEARCH DROPDOWN ===================== */

  const SearchDropdown = () => (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        mt: 1,
        zIndex: 3001,
        overflow: "hidden",
        bgcolor: "#e5d9c4ff", // 👈 Semi-transparent
        backdropFilter: "blur(6px)",
      }}
    >
      <List dense sx={{ p: 1 }}>
        {filteredBooks.map((book) => (
          <React.Fragment key={book.id}>
            <ListItem
              component="button"
              onClick={() => handleResultClick(book.id)}
              sx={{
                "&:hover": { bgcolor: "#fadaa2" },
                border: "none",
                background: "transparent",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={book.image}
                  sx={{ width: 40, height: 50 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={book.title}
                secondary={book.author}
                primaryTypographyProps={{
                  variant: "body2",
                  fontWeight: 600,
                  noWrap: true,
                }}
                secondaryTypographyProps={{ variant: "caption", noWrap: true }}
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
        <ListItem
          component="button"
          onClick={handleSearch}
          sx={{
            bgcolor: "primary.light",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
            color="primary.contrastText"
          >
            View all results
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );

  return (
    <>
      {/* MOBILE SCREEN OVERLAY (sleek, semi-transparent) */}
      {showSearch && (
        <Fade in={showSearch}>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2000,
              p: {xs: 1, md: 2},
              display: { xs: "flex", sm: "none" },
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(1px)",
            }}
            onClick={() => setShowSearch(false)} // Close when clicking backdrop
          >
            {/* Search Bar container - stopPropagation to prevent closing when clicking the bar itself */}
            <Box
              component="form"
              onSubmit={handleSearch}
              onClick={(e) => e.stopPropagation()}
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "rgba(255,255,255,0.9)",
                borderRadius: 999,
                px: 2,
                py: 0.5,
                width: "100%",
                maxWidth: 480,
                boxShadow: 3,
              }}
            >
              <InputBase
                autoFocus
                placeholder="Search books, publisher…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ flex: 1, ml: 1, fontSize: 16 }}
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

            {/* Live Search Results for Mobile */}
            {filteredBooks.length > 0 && (
              <List
                sx={{
                  mt: 1,
                  bgcolor: "rgba(255,255,255,0.85)", // 👈 Reduced opacity
                  backdropFilter: "blur(4px)",
                  borderRadius: 2,
                  boxShadow: 3,
                  width: "100%",
                  maxWidth: 480,
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {filteredBooks.map((book) => (
                  <React.Fragment key={book.id}>
                    <ListItem
                      component="button"
                      onClick={() => handleResultClick(book.id)}
                      sx={{
                        border: "none",
                        background: "transparent",
                        width: "100%",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={book.image}
                          sx={{ width: 40, height: 55 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={book.title}
                        secondary={book.author}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        </Fade>
      )}

      {/* MAIN HEADER */}
      <AppBar
        position="fixed"
        elevation={3}
        sx={{
          zIndex: 1300, // 👈 Higher zIndex to stay above subheader dropdowns if any
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
          {/* DESKTOP SEARCH BAR */}
          <Box
            sx={{ position: "relative", display: { xs: "none", sm: "block" } }}
          >
            <ClickAwayListener onClickAway={() => setShowDesktopResults(false)}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "rgba(255,255,255,0.4)",
                    borderRadius: 2,
                    px: 1,
                    width: 220,
                    "&:focus-within": {
                      bgcolor: "rgba(255,255,255,0.85)",
                    },
                  }}
                  component="form"
                  onSubmit={handleSearch}
                >
                  <InputBase
                    placeholder="Search books, publisher…"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (e.target.value.trim()) setShowDesktopResults(true);
                    }}
                    onFocus={() => {
                      if (query.trim()) setShowDesktopResults(true);
                    }}
                    sx={{ ml: 1, flex: 1, fontSize: 14, color: "#000" }}
                  />
                  <IconButton type="submit" size="small" sx={{ color: "#000" }}>
                    <SearchIcon />
                  </IconButton>
                </Box>
                {/* Desktop Live Results */}
                {showDesktopResults && filteredBooks.length > 0 && (
                  <SearchDropdown />
                )}
              </Box>
            </ClickAwayListener>
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
              zIndex: 100, // 👈 Ensure it's on top of central logo box
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* DESKTOP LOGO + TITLE */}
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
                  lineHeight: 1.15,
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
              <Box
                component="img"
                src={getAssetPath("assets/logo.png")}
                alt="Logo"
                sx={{
                  width: 50,
                  height: 70,
                  borderRadius: "50%",
                  mr: 0.5,
                }}
              />

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

          {/* DESKTOP RIGHT SIDE */}
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
          </Box>

          {/* MOBILE HAMBURGER */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              position: "absolute",
              right: 5,
              top: 30,
              zIndex: 100, // 👈 Keep it on top of central box
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
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SECONDARY NAV */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1100, // 👈 Lower than main header
          background:
            "linear-gradient(90deg, rgba(13,27,42,0.9) 0%, rgba(13,27,42,0.7) 20%, #FFB74D 50%, rgba(13,27,42,0.6) 80%, rgba(13,27,42,0.8) 100%)",
          height: { xs: 15, sm: 40 }, // Thinner on mobile
          justifyContent: "center",
          top: { xs: "100px", sm: "126px" }, // Adjusted for restored header height
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            gap: { xs: 1.5, sm: 5 },
            minHeight: "30px !important",
            display: { xs: "none", sm: "flex" }, // Buttons hidden on mobile
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
            {window.innerWidth < 600 ? "Media" : "Media & Events"}
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
