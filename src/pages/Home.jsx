import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import BookCarousel from "../components/BookCarousel";
import BookCard from "../components/BookCard";

export default function Home({ books = [], addToCart }) {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const rowRefs = useRef({});
  const [overflowing, setOverflowing] = useState({});

  /* ---------------- DATA ---------------- */

  const featured = useMemo(() => books.slice(0, 8), [books]);

  const categories = useMemo(() => {
    const set = new Set();
    books.forEach((b) => set.add(b.category));
    return Array.from(set);
  }, [books]);

  const booksByCategory = useMemo(() => {
    const map = {};
    books.forEach((b) => {
      if (!map[b.category]) map[b.category] = [];
      map[b.category].push(b);
    });
    return map;
  }, [books]);

  const banners = useMemo(
    () => [
      { banner: "1.png", bannerMobile: "1-mobile.png" },
      { banner: "2.png", bannerMobile: "2-mobile.png" },
      { banner: "3.png", bannerMobile: "3-mobile.png" },
      { banner: "4.png", bannerMobile: "4-mobile.png" },
      { banner: "5.png", bannerMobile: "5-mobile.png" },
    ],
    []
  );

  /* ---------------- OVERFLOW ---------------- */

  const checkOverflow = useCallback((category) => {
    const row = rowRefs.current[category];
    if (!row) return;

    setOverflowing((prev) => {
      const hasOverflow = row.scrollWidth > row.clientWidth + 4;
      if (prev[category] === hasOverflow) return prev;
      return { ...prev, [category]: hasOverflow };
    });
  }, []);

  const handleScrollRow = useCallback((category) => {
    rowRefs.current[category]?.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  }, []);

  /* ---------------- SCROLL REVEAL (SCOPED & FAST) ---------------- */

  useEffect(() => {
    if (!pageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    pageRef.current
      .querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={pageRef}
      sx={{
        mt: { xs: 16, sm: 20 },
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      {/* BANNER */}
      <Box className="reveal" sx={{ mb: { xs: 2, sm: 4 } }}>
        <BookCarousel books={banners} bannerMode />
      </Box>

      {/* POPULAR BOOKS */}
      <Box
        className="reveal animated-border"
        sx={{
          position: "relative",
          borderRadius: { xs: "14px", sm: "32px" },
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
          <Typography
            sx={{
              mb: { xs: 1, sm: 2 },
              fontWeight: 600,
              color: "#56524cff",
              fontSize: { xs: 16, sm: 28 },
            }}
          >
            Popular Books
          </Typography>

          <Box
            className="scroll-row"
            sx={{ display: "flex", gap: 2, overflowX: "auto" }}
          >
            {featured.map((book) => (
              <Box
                key={book.id}
                sx={{ flex: { xs: "0 0 100px", sm: "0 0 150px" } }}
              >
                <BookCard book={book} onAddToCart={addToCart} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* CATEGORIES */}
      <Box sx={{ mt: { xs: 3, sm: 6 } }}>
        {categories.map((category, index) => {
          const list = booksByCategory[category] || [];

          return (
            <Box
              key={category}
              className="reveal"
              sx={{
                mb: { xs: 2, md: 4 },
                bgcolor:
                  index % 2 === 0 ? "rgba(13,27,42,0.05)" : "transparent",
                p: { xs: 1, md: 2 },
                borderRadius: 1,
              }}
            >
              <Typography
                fontSize={{ xs: 20, md: 32 }}
                fontWeight={700}
                color="#FF9800"
                mb={1}
              >
                {category}
              </Typography>

              <Box sx={{ display: "flex" }}>
                <Box
                  className="scroll-row"
                  ref={(el) => {
                    rowRefs.current[category] = el;
                    el && requestAnimationFrame(() => checkOverflow(category));
                  }}
                  sx={{
                    display: "flex",
                    gap: { xs: 0, md: 4 },
                    overflowX: "auto",
                  }}
                >
                  {list.map((book) => (
                    <Box key={book.id} sx={{ flex: "0 0 150px" }}>
                      <BookCard book={book} onAddToCart={addToCart} />
                    </Box>
                  ))}
                </Box>

                {overflowing[category] && (
                  <Card
                    sx={{
                      ml: 1,
                      minWidth: { xs: 20, md: 30 },
                      bgcolor: "#f0b04f",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => handleScrollRow(category)}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <ArrowForwardIos sx={{ color: "#fff" }} />
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* CTA */}
      <Box className="reveal" sx={{ mt: 6, textAlign: "center" }}>
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
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Open Gallery
        </Box>
      </Box>

      {/* CSS */}
      <style>
  {`
    /* Reveal animation */
          .reveal {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
            transition:
              opacity 700ms cubic-bezier(.2,.6,.2,1),
              transform 700ms cubic-bezier(.2,.6,.2,1);
            will-change: transform, opacity;
          }

          .reveal.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          /* Smooth continuous animated border */
          .animated-border::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            background: conic-gradient(
              from 0deg,
              transparent 0deg,
              #f1950aff 90deg,
              transparent 180deg,
              #f0b04f 270deg,
              transparent 360deg
            );
            animation: rotateBorder 22s linear infinite;
            z-index: 0;
          }

          .animated-border::after {
            content: "";
            position: absolute;
            inset: 3px;
            background: linear-gradient(
  90deg,
  #f8c978 0%,
  #fde9c3 30%,
  #fdf6e6 60%,
  #edc27dff 100%
);

            border-radius: inherit;
            z-index: 1;
          }

          .animated-border > * {
            position: relative;
            z-index: 2;
          }

          @keyframes rotateBorder {
            to { transform: rotate(360deg); }
          }

    /* ✅ FIXED MINIMAL SCROLLBAR */
    // .scroll-row {
    //   overflow-x: auto;
    //   overflow-y: hidden;
    //   scrollbar-width: thin;
    //   scrollbar-color: rgba(0,0,0,0.35) transparent;
    //   -webkit-overflow-scrolling: touch;
    // }

    /* 🔑 THIS WAS MISSING */
    .scroll-row::-webkit-scrollbar {
      height: 5px;
    }

    .scroll-row::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.35);
      border-radius: 10px;
    }

    @media (max-width: 768px) {
      .scroll-row::-webkit-scrollbar {
        height: 3px;
      }

      .scroll-row::-webkit-scrollbar-thumb {
        background-color: rgba(0,0,0,0.15);
      }
    }
  `}
</style>

    </Box>
  );
}
