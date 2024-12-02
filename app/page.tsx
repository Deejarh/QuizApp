"use client";
import { useState } from "react";
import { CATEGORIES, LEVELS } from "./utils/constants";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Link from 'next/link';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('easy');
  const categories = CATEGORIES;
  const levels = LEVELS;

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(category);
  };
  const handleSelectedLevel = (level: string) => {
    setSelectedLevel(level);
  };

  return (
    <div>
      <main className="text-white ">
        <h1 className=" my-2">
          Choose a category and preffered difficulty to start the quiz.
        </h1>

        {/* categories */}
        <ul className=" flex flex-row  gap-4 py-2  cursor-pointer">
          {categories.map((category) => (
            <li key={category} onClick={() => handleSelectedCategory(category)}>
              {" "}
              <Chip
              sx={{
                color: 'white',
                p: 3,
                minWidth: 150,
                borderRadius: 6,
                fontSize: 20
              }}
              className=" hover:opacity-70"
                label={category}
                color={selectedCategory === category ? "secondary" : "default"}
              />
            </li>
          ))}
        </ul>

        {/* quiz level */}

        <ul className=" flex flex-row  gap-4 py-2 mt-6 text-white cursor-pointer">
          {levels.map((level) => (
            <li key={level} onClick={() => handleSelectedLevel(level)}>
              {" "}
              <Chip
              sx={{
                color: 'white',
                p: 3,
                borderRadius: 6,
                minWidth: 150,
                fontSize: 20
              }}
              className=" hover:opacity-70"
                label={level}
                color={selectedLevel === level ? "secondary" : "default"}
              />
            </li>
          ))}
        </ul>

        <div className=" flex w-full justify-end py-6">
          <Link
            href={{
              pathname: "/question",
            }}
            passHref
          >
            <Button
            sx={{
              background: 'green',
              borderRadius: 6,
              p:2,
              width: 150
            }}
              variant="contained"
              disabled={!selectedCategory}
              endIcon={<HourglassEmptyIcon />}
            >
              Play
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
