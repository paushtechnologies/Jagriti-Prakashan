// src/pages/Home.jsx
import React, { useRef } from "react";
import { Typography, Box, Divider, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookCarousel from "../components/BookCarousel";
import BookCard from "../components/BookCard";
import { ArrowForwardIos } from "@mui/icons-material";

export default function Home({ books = [], addToCart }) {
  const navigate = useNavigate();

  // Banner carousel items
  const banners = [
    { banner: "banner-1.svg", title: "नवीनतम पुस्तकें", subtitle: "Explore our newest releases" },
    { banner: "banner-2.svg", title: "Back to School", subtitle: "Essential books for learners" },
    { banner: "banner-3.svg", title: "Special Discounts", subtitle: "Limited time offers" }
  ];

  const featured = books.slice(0, 8);
  const categories = [...new Set(books.map((b) => b.category))];

  // Store refs for each category row
  const rowRefs = useRef({});

  const handleScrollRow = (category) => {
    const row = rowRefs.current[category];
    if (row) {
      row.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ px: { xs: 0, sm: 0 }, pt: { xs: 20, sm: 24 }, maxWidth: "1400px", mx: "auto" }}>
      {/* Banner Carousel */}
      <Box sx={{ mb: { xs: 2, sm: 4 } }}>
        <BookCarousel books={banners} bannerMode />
      </Box>

      {/* Popular books */}
      <Typography variant="h6" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 1, sm: 2 }, color: "primary.main" }}>
        Popular Books
      </Typography>
      <Box sx={{ mb: { xs: 0.5, sm: 1 } }}>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            scrollSnapType: "x mandatory",
            pb: { xs: 0.5, sm: 1 },
          }}
        >
          {featured.slice(0, 5).map((book) => (
            <Box key={book.id} sx={{ flex: { xs: "0 0 100px", sm: "0 0 180px" }, scrollSnapAlign: "start" }}>
              <BookCard book={book} onAddToCart={addToCart} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* All categories preview */}
      <Box sx={{ mt: { xs: 3, sm: 6 } }}>
        {categories.map((category, index) => {
          const booksInCategory = books.filter((b) => b.category === category);
          const previewBooks = booksInCategory.slice(0, 4);

          // Apply background only to even categories
          const bgColor = index % 2 === 0 ? "rgba(13, 27, 42, 0.05)" : "transparent";

          return (
            <Box key={category} sx={{ mb: { xs: 2, sm: 4 }, bgcolor: bgColor, p: { xs: 1, md: 2 }, borderRadius: 1 }}>
              {/* Category Title */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: { xs: 1, sm: 2 } }}>
                <Typography variant="h5" fontWeight={700}>
                  {category}
                </Typography>
              </Box>
              {/* Category Row with always-visible More button */}
              <Box sx={{ display: "flex", gap: { xs: 0, md: 0 } }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1, md: 2 },
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    scrollbarWidth: "none",
                    "&::-webkit-scrollbar": { display: "none" },
                    scrollSnapType: "x mandatory",
                  }}
                  ref={el => rowRefs.current[category] = el}
                >
                  {booksInCategory.map((book) => (
                    <Box key={book.id} sx={{ flex: { xs: "0 0 110px", md: "0 0 150px" }, scrollSnapAlign: "start" }}>
                      <BookCard book={book} onAddToCart={addToCart} />
                    </Box>
                  ))}
                </Box>
                {/* Minimalist More Card - original style */}
                <Box sx={{ flex: 1 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#f0b04f",
                      cursor: "pointer",
                      transition: "transform 0.2s, bgcolor 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        bgcolor: "#FF9800"
                      }
                    }}
                    onClick={() => handleScrollRow(category)}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 0
                      }}
                    >
                      <ArrowForwardIos
                        sx={{
                          fontSize: { xs: 20, sm: 32 },
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                          color: "rgba(255,255,255,1)",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              {/* <Divider sx={{ mt: 4 }} /> */}
            </Box>
          );
        })}
      </Box>

      {/* Gallery CTA */}
      <Box sx={{ mt: { xs: 3, sm: 6 }, textAlign: "center" }}>
        <Typography variant="h6">Want to see all books?</Typography>
        <Box
          component="button"
          onClick={() => navigate("/gallery")}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            bgcolor: "primary.main",
            color: "#fff",
            border: "none",
            borderRadius: 1,
            cursor: "pointer",
            fontWeight: 700,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Open Gallery
        </Box>
      </Box>
    </Box>
  );
}
