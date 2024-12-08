"use client";

import { useState } from "react";
import { CATEGORIES, LEVELS } from "./utils/constants";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("easy");

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const handleSelectedLevel = (level: string) => {
    setSelectedLevel(level);
  };

  return (
    <Box sx={{ padding: 4, color: "white" }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: "bold" }}>
        Choose a category and preferred difficulty to start the quiz
      </Typography>

      {/* Categories Section */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Categories
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {CATEGORIES.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => handleSelectedCategory(category)}
              color={selectedCategory === category ? "secondary" : "default"}
              sx={{
                backgroundColor:
                  selectedCategory === category ? "purple" : "gray",
                color: "white",
                p: 2,
                fontSize: 16,
                borderRadius: 6,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    selectedCategory === category ? "darkviolet" : "lightgray",
                },
                minWidth: 150,
              }}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 4, backgroundColor: "gray" }} />

      {/* Levels Section */}
      <Box>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Levels
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {LEVELS.map((level) => (
            <Button
              key={level}
              variant={selectedLevel === level ? "contained" : "outlined"}
              onClick={() => handleSelectedLevel(level)}
              sx={{
                textTransform: "capitalize",
                backgroundColor:
                  selectedLevel === level ? "purple" : "transparent",
                color: selectedLevel === level ? "white" : "gray",
                border: "1px solid",
                borderColor: selectedLevel === level ? "purple" : "gray",
                p: 2,
                borderRadius: 6,
                fontSize: 16,
                minWidth: 120,
                "&:hover": {
                  backgroundColor:
                    selectedLevel === level ? "darkgreen" : "lightgray",
                },
              }}
            >
              {level}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Play Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
        <Link
          href={{
            pathname: "/question",
          }}
          passHref
        >
          <Button
            sx={{
              backgroundColor: "green",
              borderRadius: 6,
              p: 2,
              width: 150,
              "&:hover": { backgroundColor: "darkblue" },
              "&.Mui-disabled": {
                backgroundColor: "gray",
                color: "white",
              },
            }}
            variant="contained"
            disabled={!selectedCategory}
            endIcon={<HourglassEmptyIcon />}
          >
            Play
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
