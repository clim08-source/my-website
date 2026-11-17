export type Project = {
  /** Used in the link to this project: /projects#<slug> opens its popup. */
  slug: string;
  title: string;
  /** One or two lines shown on the frame on the projects page. */
  summary: string;
  /** Fuller write-up shown in the popup, one string per paragraph. */
  description: string[];
  image: string;
  alt: string;
  /** "contain" shows the whole image (charts); the default crops to fill. */
  fit?: "contain";
  award?: { title: string; event: string };
  /** Extra charts or screenshots shown under the write-up in the popup. */
  figures?: { src: string; alt: string; width: number; height: number }[];
  /**
   * Demo video, as a path under /public. The popup shows a placeholder until
   * the file exists, so it's safe to list it before the video is added.
   */
  video?: string;
  tech: { name: string; icon: string }[];
  links: { label: string; href: string }[];
};

/**
 * Projects fill the frames on the projects page in order (left to right,
 * top to bottom). Frames without a project stay empty.
 */
export const PROJECTS: Project[] = [
  {
    slug: "uw-hiring-radar",
    title: "UW Hiring Radar",
    summary:
      "A live feed of UWaterloo club and design team applications, with a tracker for your own.",
    description: [
      "Every term, hundreds of Waterloo clubs and design teams open exec, director and subteam applications for just a few weeks — each one tucked away in a different Instagram bio or Linktree. UW Hiring Radar pulls them all into one live feed.",
      "It discovers about 250 clubs and teams from the WUSA Clubs Directory and the Sedra Student Design Centre, then follows each one’s Instagram bio links, link-in-bio pages, Notion sites and websites to work out which links are real applications for the current or upcoming term. Every form is checked to see whether it is still accepting responses, so each card is marked Open, Unverified or Closed.",
      "Alongside the feed is a Bento-grid tracker: bookmark an application, drag it between Saved, Applied, Interview, Offer and Not this term, keep notes, and watch upcoming deadlines.",
      "Built with Next.js, React, TypeScript and Tailwind CSS, with Prisma on SQLite locally and Postgres when hosted on Vercel. Links are classified with Gemini, backed by a keyword fallback and a fixed rule that drops any term that has already ended.",
    ],
    image: "/projects/uw-hiring-radar.png",
    alt: "UW Hiring Radar showing a live feed of open club and design team applications",
    video: "/projects/uw-hiring-radar.mp4",
    tech: [
      { name: "Next.js", icon: "/home/nextjs.svg" },
      { name: "React", icon: "/home/react.svg" },
      { name: "TypeScript", icon: "/home/typescript.svg" },
      { name: "Tailwind CSS", icon: "/home/tailwindcss.svg" },
      { name: "Gemini", icon: "/home/gemini.svg" },
    ],
    links: [
      { label: "Live site", href: "https://uw-hiring-radar.vercel.app/" },
      {
        label: "GitHub",
        href: "https://github.com/clim08-source/uw-hiring-radar",
      },
    ],
  },
  {
    slug: "pwhl-vs-nhl",
    title: "PWHL vs NHL",
    summary:
      "A statistical look at how play in the Professional Women’s Hockey League differs from the NHL.",
    description: [
      "How different is the game in the Professional Women’s Hockey League from the NHL? This analysis compares the two across scoring, league-wide rates, shot locations, shot types and angles, and goaltending, using every regular-season game from 2023-24 (the PWHL’s first season) to 2025-26.",
      "PWHL games are lower scoring and tighter: 4.7 goals a game against 6.1 in the NHL, with half of PWHL games decided by a single goal. Teams in both leagues get about the same number of shots on goal, so the gap comes from what happens to those shots — 7.8% of PWHL shots go in, compared with 9.9% in the NHL.",
      "It isn’t shot selection. PWHL teams shoot from just as close and from slightly more central angles, and if their shots went in as often as similar NHL shots, they would score slightly more than the NHL does. The whole gap is in finishing or goaltending, and it sits in close and mid-range wrist shots and backhands.",
      "Built in R with the tidyverse, using play-by-play data from the PWHL and NHL through fastRhockey and rinks drawn with sportyR. Shot quality and goals saved above expected come from logistic regressions on shot distance, angle and type.",
    ],
    image: "/home/project-pwhl.png",
    alt: "Hex-bin shot location maps comparing the PWHL and NHL",
    fit: "contain",
    figures: [
      {
        src: "/projects/pwhl-01_goals_per_game.png",
        alt: "Chart of goals per game in the PWHL and NHL",
        width: 2700,
        height: 1650,
      },
      {
        src: "/projects/pwhl-14_shot_quality_gap.png",
        alt: "Chart of PWHL shooting percentage if shots were scored at NHL rates",
        width: 2700,
        height: 1500,
      },
      {
        src: "/projects/pwhl-12_shooting_by_type.png",
        alt: "Chart of shooting percentage by shot type in the PWHL and NHL",
        width: 2700,
        height: 1650,
      },
    ],
    tech: [{ name: "R", icon: "/home/r.svg" }],
    links: [
      { label: "GitHub", href: "https://github.com/clim08-source/pwhl-vs-nhl" },
    ],
  },
  {
    slug: "homebuddy",
    title: "HomeBuddy",
    summary:
      "A daily voice check-in that helps seniors age at home instead of in a care facility.",
    description: [
      "HomeBuddy brings the reassurance of a nursing home’s daily check-in to older adults living at home. Health problems like missed meals, dehydration and skipped medications build slowly, and often nobody notices until they end in an emergency room visit. My team built it for the PointClickCare Challenge at the Women in Engineering (WiE) Hackathon 2026 at the University of Waterloo, where it won.",
      "The older adult taps one big button and Rosie, an AI voice companion, starts a friendly conversation about sleep, meals, drinks, pain, mood, falls and medications, followed by any questions their doctor has added. Nothing needs to be typed. At the end they can ask their care team a question, and Rosie brings back the answer on the next call.",
      "After each call the day is marked green, yellow or red. The AI doesn’t choose the colour: it only reports what was said, and a fixed set of rules decides, so the same answers always give the same result and every flag can explain why it was raised. A yellow that keeps coming back turns red, and urgent words like “I fell” alert the care team and family straight away.",
      "Doctors see every patient on a dashboard, red first, and record how each alert was handled. Family members get a read-only view of today’s colour, the latest summary and each alert’s progress.",
      "Built with React, TypeScript and Tailwind CSS on TanStack Start, with Gemini Live for the voice call, Gemini Flash to turn each transcript into answers, and Supabase for the database and sign-in. Designed in Figma with large text and high contrast for older eyes. It is a hackathon prototype, not a medical device.",
    ],
    image: "/home/project-homebuddy.png",
    alt: "HomeBuddy voice assistant interface greeting a patient",
    video: "/projects/homebuddy.mp4",
    award: { title: "Winner", event: "WiE Hackathon" },
    figures: [
      {
        src: "/projects/homebuddy-care.png",
        alt: "HomeBuddy doctor’s dashboard listing patients by colour, with open alerts below",
        width: 1504,
        height: 1600,
      },
      {
        src: "/projects/homebuddy-family.png",
        alt: "HomeBuddy family view showing a patient who needs attention and the care team’s follow-up",
        width: 1600,
        height: 1112,
      },
    ],
    tech: [
      { name: "React", icon: "/home/react.svg" },
      { name: "TypeScript", icon: "/home/typescript.svg" },
      { name: "Gemini Live API", icon: "/home/gemini.svg" },
      { name: "Supabase", icon: "/home/supabase.svg" },
      { name: "Figma", icon: "/home/figma.svg" },
    ],
    links: [
      {
        label: "Live site",
        href: "https://codebase-launchpad-studio.lovable.app/",
      },
      { label: "GitHub", href: "https://github.com/winnie-c8/homeBuddy" },
    ],
  },
  {
    slug: "wnba-home-court",
    title: "W/NBA Home Court",
    summary:
      "Does the WNBA get the same home court advantage as the NBA? A comparison, including shared arenas.",
    description: [
      "Does the WNBA get the same home court advantage as the NBA? This analysis compares the two leagues over the 2021 to 2025 regular seasons, including the teams that share an arena.",
      "Home teams win about 54–55% of games in both leagues. Once WNBA games are scaled to the NBA’s 48 minutes, the average home margin is about 1.5 points in the WNBA and 1.8 in the NBA — a difference that isn’t statistically significant.",
      "Built in R with the tidyverse, using ESPN game results through the wehoop and hoopR packages.",
    ],
    image: "/projects/wnba-home-court.png",
    alt: "Chart comparing home court advantage for WNBA and NBA teams that share an arena",
    fit: "contain",
    tech: [{ name: "R", icon: "/home/r.svg" }],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/clim08-source/w-nba-home-court-advantage",
      },
    ],
  },
  {
    slug: "my-website",
    title: "This Website",
    summary:
      "My portfolio, with a playable hand-drawn guitar for a menu. You’re looking at it.",
    description: [
      "The site you’re on right now. I wanted a portfolio that felt like me, so the home page is a hand-drawn guitar you can actually play: each string plays its own note and takes you to a different page.",
      "I designed it in Figma first, with my own illustrations and a font made from my handwriting, then built it to scale with the screen so the drawings stay lined up at any size. The string sounds are generated in the browser instead of played from recordings.",
      "Built with Next.js, React, TypeScript and Tailwind CSS, designed in Figma, and written with help from Claude Code.",
    ],
    image: "/projects/my-website.png",
    alt: "Home page of this website, with a hand-drawn guitar under the name Caitlin",
    tech: [
      { name: "Next.js", icon: "/home/nextjs.svg" },
      { name: "React", icon: "/home/react.svg" },
      { name: "TypeScript", icon: "/home/typescript.svg" },
      { name: "Tailwind CSS", icon: "/home/tailwindcss.svg" },
      { name: "Figma", icon: "/home/figma.svg" },
      { name: "Claude Code", icon: "/home/claude.svg" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/clim08-source/my-website" },
    ],
  },
];
