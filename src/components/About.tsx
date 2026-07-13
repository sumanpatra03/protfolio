"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaLanguage, FaDiceD6, FaCodeBranch, FaTachometerAlt, FaGithub, FaStar, FaUsers, FaFolder } from "react-icons/fa";
import { aboutSchema } from "@/utils/schemas";
import SpotlightCard from "@/components/SpotlightCard";

interface ContributionDay {
  date: string;
  count: number;
  color: string;
  level: number;
}

interface GithubStats {
  repos: number;
  followers: number;
  stars: number;
  following: number;
  contributions: number;
  loading: boolean;
}

const AboutMe = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [gitStats, setGitStats] = useState<GithubStats>({
    repos: 18,
    followers: 8,
    stars: 2,
    following: 11,
    contributions: 850,
    loading: true,
  });
  const [allContributions, setAllContributions] = useState<ContributionDay[]>([]);

  // Parse and aggregate days dynamically for selected year
  const activeDays = React.useMemo(() => {
    if (allContributions.length === 0) {
      // Fallback mock year calendar
      return [...Array(365)].map((_, i) => {
        const date = new Date(Number(selectedYear), 0, i + 1);
        const dateStr = date.toISOString().split("T")[0];
        return {
          date: dateStr,
          count: (i * 7 + 13) % 5 === 0 ? 0 : (i % 4),
          color: "#ebedf0",
          level: (i * 7 + 13) % 5 === 0 ? 0 : (i % 4),
          isSpacer: false,
        };
      });
    }

    // Filter by selected year
    const filtered = allContributions.filter((day) => day.date.startsWith(selectedYear));
    
    // Sort chronologically
    return filtered.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [allContributions, selectedYear]);

  // Prepend spacers so the top row is Sunday and the bottom is Saturday
  const calendarDays = React.useMemo(() => {
    if (activeDays.length === 0) return [];
    
    const firstDate = new Date(activeDays[0].date);
    // getDay(): 0 = Sun, 1 = Mon, ..., 6 = Sat
    const firstDayOfWeek = firstDate.getDay();
    
    const spacers: any[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      spacers.push({
        date: `spacer-${i}`,
        count: 0,
        level: -1,
        isSpacer: true,
      });
    }
    
    return [...spacers, ...activeDays.map(d => ({ ...d, isSpacer: false }))];
  }, [activeDays]);

  // Snake Game states
  const [isPlaying, setIsPlaying] = useState(false);
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([]);
  const [direction, setDirection] = useState<{ x: number; y: number }>({ x: 1, y: 0 });
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 15, y: 4 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = (currentSnake: { x: number; y: number }[], colsCount: number) => {
    let newFood = { x: 0, y: 0 };
    let onSnake = true;
    let attempts = 0;
    while (onSnake && attempts < 100) {
      newFood = {
        x: Math.floor(Math.random() * colsCount),
        y: Math.floor(Math.random() * 7),
      };
      // Skip if it is a spacer cell
      const weekIndex = newFood.x;
      const dayIndex = newFood.y;
      const spacerDay = calendarDays[weekIndex * 7 + dayIndex];
      const isSpacerCell = spacerDay ? spacerDay.isSpacer : false;

      onSnake = isSpacerCell || currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      );
      attempts++;
    }
    setFood(newFood);
  };

  const startGame = () => {
    const initialSnake = [
      { x: 5, y: 3 },
      { x: 4, y: 3 },
      { x: 3, y: 3 },
    ];
    const colsCount = getWeeks().length || 52;
    setSnake(initialSnake);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    
    setTimeout(() => {
      generateFood(initialSnake, colsCount);
    }, 50);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          setDirection((d) => (d.y === 1 ? d : { x: 0, y: -1 }));
          break;
        case "ArrowDown":
        case "s":
        case "S":
          setDirection((d) => (d.y === -1 ? d : { x: 0, y: 1 }));
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          setDirection((d) => (d.x === 1 ? d : { x: -1, y: 0 }));
          break;
        case "ArrowRight":
        case "d":
        case "D":
          setDirection((d) => (d.x === -1 ? d : { x: 1, y: 0 }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // Game loop tick
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameTick = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        if (!head) return prevSnake;

        const colsCount = getWeeks().length;
        let newX = head.x + direction.x;
        let newY = head.y + direction.y;

        // Wall collisions
        if (newX < 0 || newX >= colsCount || newY < 0 || newY >= 7) {
          setGameOver(true);
          return prevSnake;
        }

        // Spacer cells behave as walls
        const spacerDay = calendarDays[newX * 7 + newY];
        if (spacerDay && spacerDay.isSpacer) {
          setGameOver(true);
          return prevSnake;
        }

        // Body collisions
        const hitSelf = prevSnake.some((segment) => segment.x === newX && segment.y === newY);
        if (hitSelf) {
          setGameOver(true);
          return prevSnake;
        }

        const newHead = { x: newX, y: newY };
        const newSnake = [newHead, ...prevSnake];

        // Eat check
        if (newX === food.x && newY === food.y) {
          setScore((s) => s + 1);
          generateFood(newSnake, colsCount);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(gameTick, 130);
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, direction, food]);

  const getWeeks = () => {
    const weeksList: any[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeksList.push(calendarDays.slice(i, i + 7));
    }
    return weeksList;
  };

  const getMonthLabels = () => {
    const weeksList = getWeeks();
    const labels: { text: string; colSpan: number }[] = [];
    if (weeksList.length === 0) return [];

    let currentMonth = "";
    let colSpan = 0;

    weeksList.forEach((week, index) => {
      const realDay = week.find((day) => !day.isSpacer);
      if (!realDay) {
        colSpan++;
        return;
      }
      const dateObj = new Date(realDay.date);
      const monthName = dateObj.toLocaleString("en-US", { month: "short" });

      if (monthName !== currentMonth) {
        if (currentMonth !== "") {
          labels.push({ text: currentMonth, colSpan });
        }
        currentMonth = monthName;
        colSpan = 1;
      } else {
        colSpan++;
      }

      if (index === weeksList.length - 1) {
        labels.push({ text: currentMonth, colSpan });
      }
    });

    return labels;
  };

  const infoItems = [
    { label: "Name", value: "Suman Patra", icon: <FaUser className="text-violet-400" /> },
    { label: "Location", value: "India", icon: <FaMapMarkerAlt className="text-cyan-400" /> },
    { label: "Experience", value: "1.5 Years", icon: <FaBriefcase className="text-fuchsia-400" /> },
    { label: "Full-time", value: "Available", icon: <FaGraduationCap className="text-green-400" /> },
    { label: "Language", value: "English, Hindi", icon: <FaLanguage className="text-yellow-400" /> },
  ];

  const competencies = [
    {
      title: "Modular Component Architecture",
      desc: "Architecting clean, highly-reusable UI modules in React/Next.js to streamline development and maintain design consistency.",
      icon: <FaDiceD6 className="text-violet-400" />,
    },
    {
      title: "Figma to Pixel-Perfect UI",
      desc: "Translating sophisticated designer specs into responsive, interactive layouts using Tailwind CSS and Framer Motion animations.",
      icon: <FaCodeBranch className="text-cyan-400" />,
    },
    {
      title: "Optimized State Coordination",
      desc: "Handling complex data structures cleanly using lifting systems, props drilling paths, Context APIs, and Redux Toolkit stores.",
      icon: <FaTachometerAlt className="text-fuchsia-400" />,
    },
  ];

  // Fetch real-time GitHub Stats
  async function fetchGithubStats() {
    try {
      // Fetch user profile
      const userRes = await fetch("https://api.github.com/users/sumanpatra03");
      if (!userRes.ok) throw new Error("Rate limit or connection error");
      const userData = await userRes.ok ? await userRes.json() : null;

      // Fetch user repos to sum stars
      const reposRes = await fetch("https://api.github.com/users/sumanpatra03/repos?per_page=100");
      let totalStars = 0;
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        if (Array.isArray(reposData)) {
          totalStars = reposData.reduce((acc, repo: any) => acc + (repo.stargazers_count || 0), 0);
        }
      }

      // Fetch live contribution count
      let totalContributions = 850;
      let rawContribs: ContributionDay[] = [];
      try {
        const contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/sumanpatra03");
        if (contribRes.ok) {
          const contribData = await contribRes.json();
          if (contribData && contribData.total) {
            totalContributions = Object.values(contribData.total).reduce(
              (acc: number, curr: any) => acc + (Number(curr) || 0),
              0
            ) as number;
          }
          if (contribData && Array.isArray(contribData.contributions)) {
            rawContribs = contribData.contributions;
          }
        }
      } catch (err) {
        console.warn("Error fetching contributions api:", err);
      }

      setAllContributions(rawContribs);

      if (userData) {
        setGitStats({
          repos: userData.public_repos ?? 18,
          followers: userData.followers ?? 8,
          stars: totalStars,
          following: userData.following ?? 11,
          contributions: totalContributions,
          loading: false,
        });
      }
    } catch (err) {
      console.warn("Using fallbacks for GitHub stats:", err);
      setGitStats((prev) => ({ ...prev, loading: false }));
    }
  }

  useEffect(() => {
    fetchGithubStats();
  }, []);

  return (
    <>
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <section 
        className="bg-[#030303] text-white py-20 px-6 md:px-20 relative overflow-hidden" 
        id="about"
      >
        {/* Subtle Decorative Gradient Glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-violet-600/5 filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              About Me<span className="text-violet-500">.</span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[3px] bg-gradient-to-r from-violet-500 to-cyan-500 mt-3"
            />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Description Text Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-5"
            >
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                Hi, my name is{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  Suman Patra.
                </span>{" "}
                I am a passionate <span className="text-zinc-100 font-semibold">Frontend & Mobile Developer</span> with <span className="text-zinc-100 font-semibold">1.5 years</span> of professional experience building modern web and mobile applications.
              </p>
              
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-light">
                With a strong command over <span className="text-zinc-200 font-semibold">React.js, Next.js, React Native, TypeScript, and Tailwind CSS</span>, my primary focus is to deliver pixel-perfect designs integrated with optimized code architecture. I specialize in developing role-based vendor dashboards, interactive commerce applications, and cross-platform mobile apps.
              </p>

              <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-light">
                From launching vendor relationship portals to engineering POS mobile systems featuring Role-Based Access Control (RBAC), I collaborate with teams to solve complex state management and performance challenges. I strive to write highly maintainable code that offers outstanding visual excellence.
              </p>
            </motion.div>

            {/* Metrics Info Grid Column */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
              {infoItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80 shadow-md hover:border-violet-500/30 hover:bg-zinc-900/60 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center border border-zinc-800/80 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 leading-none">
                      {item.label}
                    </span>
                    <p className="text-sm font-semibold text-zinc-200 mt-0.5 leading-tight">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* Core Competencies Header */}
          <div className="mt-20 mb-10">
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-bold text-zinc-200 flex items-center gap-2 border-t border-zinc-900 pt-10"
            >
              🛠️ Core Competencies & Values
            </motion.h3>
          </div>

          {/* Competency Cards Grid with SpotlightCard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competencies.map((comp, idx) => (
              <SpotlightCard
                key={comp.title}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xl mb-4">
                    {comp.icon}
                  </div>
                  <h4 className="text-base font-bold text-zinc-100 mb-2">
                    {comp.title}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* GitHub Ecosystem Stats Card */}
          <div className="mt-16">
            <SpotlightCard className="p-6 md:p-8 bg-zinc-900/10 backdrop-blur-md border border-zinc-800/80 relative overflow-hidden group">
              {/* Subtle background glows */}
              <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-violet-500/5 filter blur-2xl pointer-events-none group-hover:bg-violet-500/10 transition-all duration-700" />
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-emerald-500/5 filter blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700" />

              <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 relative z-10">
                {/* GitHub text metrics */}
                <div className="space-y-6 lg:max-w-[260px] xl:max-w-[280px] w-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-2xl text-zinc-100 shadow-inner group-hover:border-violet-500/30 group-hover:text-violet-400 transition-all duration-500">
                        <FaGithub />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-zinc-50 leading-tight tracking-tight">
                          GitHub Stats
                        </h4>
                        <a
                          href="https://github.com/sumanpatra03"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-extrabold hover:underline tracking-wide"
                        >
                          @sumanpatra03
                        </a>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                      Real-time stats synced directly with Suman's public GitHub repositories showing repository index and active developer engagement.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {/* Stars */}
                    <div className="bg-gradient-to-br from-zinc-950/80 to-zinc-900/40 border border-zinc-900 rounded-xl p-3 text-center hover:border-yellow-500/20 hover:bg-zinc-900/60 transition-all duration-300 shadow-md group/card">
                      <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-yellow-400 font-black">
                        <FaStar className="text-xs group-hover/card:scale-110 transition-transform duration-300" /> {gitStats.stars}
                      </div>
                      <p className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mt-1.5">Stars</p>
                    </div>

                    {/* Repos */}
                    <div className="bg-gradient-to-br from-zinc-950/80 to-zinc-900/40 border border-zinc-900 rounded-xl p-3 text-center hover:border-violet-500/20 hover:bg-zinc-900/60 transition-all duration-300 shadow-md group/card">
                      <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-violet-400 font-black">
                        <FaFolder className="text-xs group-hover/card:scale-110 transition-transform duration-300" /> {gitStats.repos}
                      </div>
                      <p className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mt-1.5">Repos</p>
                    </div>

                    {/* Followers */}
                    <div className="bg-gradient-to-br from-zinc-950/80 to-zinc-900/40 border border-zinc-900 rounded-xl p-3 text-center hover:border-cyan-500/20 hover:bg-zinc-900/60 transition-all duration-300 shadow-md group/card">
                      <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-cyan-400 font-black">
                        <FaUsers className="text-xs group-hover/card:scale-110 transition-transform duration-300" /> {gitStats.followers}
                      </div>
                      <p className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mt-1.5">Followers</p>
                    </div>

                    {/* Contributions */}
                    <div className="bg-gradient-to-br from-zinc-950/80 to-zinc-900/40 border border-zinc-900 rounded-xl p-3 text-center hover:border-emerald-500/20 hover:bg-zinc-900/60 transition-all duration-300 shadow-md group/card">
                      <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-emerald-400 font-black">
                        <FaCodeBranch className="text-xs group-hover/card:scale-110 transition-transform duration-300" /> {gitStats.contributions}
                      </div>
                      <p className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mt-1.5">Contributions</p>
                    </div>
                  </div>
                </div>

                {/* Animated Green Contributions Matrix Grid */}
                <div className="flex-1 w-full bg-zinc-950/70 backdrop-blur-sm border border-zinc-900/90 rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group/board">
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mb-4 border-b border-zinc-900 pb-3 w-full">
                    <div className="flex items-center gap-2.5">
                      {/* Mac dots */}
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                      </div>
                      <span className="text-zinc-400 font-bold ml-1">Activity Log</span>
                      <span className="text-zinc-700 hidden sm:inline">|</span>
                      <span className="text-violet-400/90 font-extrabold normal-case">
                        {isPlaying ? `Score: ${score} commits` : `${gitStats.contributions} total contributions`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      {/* Game Button */}
                      <button
                        onClick={isPlaying ? () => setIsPlaying(false) : startGame}
                        className={`px-3 py-1 text-[10px] rounded-md font-extrabold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                          isPlaying
                            ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                            : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                        }`}
                      >
                        {isPlaying ? "Exit Game ❌" : "Play Snake 🐍"}
                      </button>

                      {/* Year selection tabs */}
                      {!isPlaying && (
                        <div className="flex gap-1 bg-zinc-900/80 p-0.5 border border-zinc-800 rounded-lg shrink-0">
                          {["2026", "2025", "2024", "2023"].map((year) => (
                            <button
                              key={year}
                              onClick={() => setSelectedYear(year)}
                              className={`px-3 py-1 text-[10px] rounded-md font-extrabold transition-all duration-200 ${
                                selectedYear === year
                                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20"
                                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-950/40"
                              }`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2.5 min-w-0 relative">
                    {/* Game Over Screen Overlay */}
                    {gameOver && (
                      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center rounded-xl border border-rose-500/20 space-y-3">
                        <h5 className="text-sm font-black text-rose-500 uppercase tracking-widest animate-pulse">Game Over</h5>
                        <p className="text-xs text-zinc-400 font-bold">Commits Eaten: <span className="text-emerald-400">{score}</span></p>
                        <button
                          onClick={startGame}
                          className="px-4 py-1.5 text-[10px] font-black uppercase tracking-wider text-white bg-violet-600 rounded-lg hover:bg-violet-500 transition-colors shadow-md shadow-violet-600/20"
                        >
                          Play Again
                        </button>
                      </div>
                    )}

                    {/* Day Labels Column */}
                    <div className="grid grid-rows-7 gap-[3px] text-[9px] text-zinc-500 font-bold select-none pr-1.5 mt-6 h-[102px] shrink-0 leading-none items-center text-left">
                      <div /> {/* Sun */}
                      <div>Mon</div>
                      <div /> {/* Tue */}
                      <div>Wed</div>
                      <div /> {/* Thu */}
                      <div>Fri</div>
                      <div /> {/* Sat */}
                    </div>

                    <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
                      {/* Month Labels Row */}
                      <div className="grid grid-flow-col gap-[3px] text-[10px] text-zinc-400 font-bold select-none mb-1.5 h-4 w-max" style={{ gridTemplateColumns: `repeat(${getWeeks().length}, 12px)` }}>
                        {getMonthLabels().map((label, idx) => (
                          <div key={idx} className="truncate text-left pl-0.5 text-zinc-500" style={{ gridColumn: `span ${label.colSpan}` }}>
                            {label.text}
                          </div>
                        ))}
                      </div>

                      {/* Matrix Grid */}
                      <div className="grid grid-flow-col grid-rows-7 gap-[3px] h-[102px] w-max">
                        {calendarDays.map((day: any, i) => {
                          if (day.isSpacer) {
                            return <div key={`spacer-${i}`} className="w-3 h-3 shrink-0 opacity-0" />;
                          }

                          // Calculate coordinates (x = column, y = row)
                          const x = Math.floor(i / 7);
                          const y = i % 7;

                          const isSnakeHead = snake[0] && snake[0].x === x && snake[0].y === y;
                          const isSnakeSegment = snake.some(segment => segment.x === x && segment.y === y);
                          const isFoodSquare = food.x === x && food.y === y;

                          // Color classes
                          let bg = "bg-[#161b22]"; // level = 0
                          let glowStyle = {};
                          
                          if (isPlaying) {
                            if (isSnakeHead) {
                              bg = "bg-violet-400";
                              glowStyle = { boxShadow: "0 0 10px #a78bfa" };
                            } else if (isSnakeSegment) {
                              bg = "bg-violet-600";
                              glowStyle = { boxShadow: "0 0 6px #7c3aed" };
                            } else if (isFoodSquare) {
                              bg = "bg-emerald-400";
                              glowStyle = { boxShadow: "0 0 12px #34d399" };
                            } else {
                              // Dim background cells when playing
                              if (day.level === 1) bg = "bg-[#0e4429]/40";
                              if (day.level === 2) bg = "bg-[#006d32]/40";
                              if (day.level === 3) bg = "bg-[#26a641]/40";
                              if (day.level === 4) bg = "bg-[#39d353]/40";
                            }
                          } else {
                            if (day.level === 1) bg = "bg-[#0e4429]";
                            if (day.level === 2) bg = "bg-[#006d32]";
                            if (day.level === 3) bg = "bg-[#26a641]";
                            if (day.level === 4) bg = "bg-[#39d353]";
                          }

                          return (
                            <motion.div
                              key={i}
                              title={isPlaying ? undefined : `${day.count} contributions on ${day.date}`}
                              style={glowStyle}
                              className={`w-3 h-3 rounded-[2px] shrink-0 cursor-help ${bg} transition-all duration-300`}
                              whileHover={isPlaying ? undefined : { scale: 1.3, zIndex: 20, boxShadow: "0 0 8px rgba(57, 211, 83, 0.4)" }}
                              animate={!isPlaying && day.level > 2 ? {
                                opacity: [0.95, 1, 0.95],
                              } : undefined}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: (i % 8) * 0.2,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Game Controls D-Pad */}
                  {isPlaying && !gameOver && (
                    <div className="flex sm:hidden flex-col items-center gap-1 mt-4 select-none">
                      <button
                        onClick={() => setDirection((d) => (d.y === 1 ? d : { x: 0, y: -1 }))}
                        className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-xs active:bg-zinc-800"
                      >
                        ▲
                      </button>
                      <div className="flex gap-4">
                        <button
                          onClick={() => setDirection((d) => (d.x === 1 ? d : { x: -1, y: 0 }))}
                          className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-xs active:bg-zinc-800"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() => setDirection((d) => (d.x === -1 ? d : { x: 1, y: 0 }))}
                          className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-xs active:bg-zinc-800"
                        >
                          ▶
                        </button>
                      </div>
                      <button
                        onClick={() => setDirection((d) => (d.y === -1 ? d : { x: 0, y: 1 }))}
                        className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-xs active:bg-zinc-800"
                      >
                        ▼
                      </button>
                    </div>
                  )}

                  {/* Bottom scale legend bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-3 border-t border-zinc-900 w-full select-none">
                    {/* Instructions */}
                    <div className="text-[9px] text-zinc-400 font-semibold tracking-wide">
                      {isPlaying ? (
                        <span className="text-violet-400 animate-pulse flex items-center gap-1">
                          🎮 Controls: Use Arrow keys or WASD to navigate. Eat green squares!
                        </span>
                      ) : (
                        <span className="text-zinc-500">Tip: Click "Play Snake" to play on Suman's commits!</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-bold">
                      <span>Less</span>
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-[#161b22]" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-[#0e4429]" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-[#006d32]" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-[#26a641]" />
                      <div className="w-2.5 h-2.5 rounded-[2px] bg-[#39d353]" />
                      <span>More</span>
                    </div>
                  </div>
                </div>

              </div>
            </SpotlightCard>
          </div>

        </div>
      </section>
    </>
  );
};

export default AboutMe;
