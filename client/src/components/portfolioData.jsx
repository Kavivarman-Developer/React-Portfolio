import { FaGithub } from "react-icons/fa";
import {
  SiBootstrap,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
} from "react-icons/si";
import { TbApi, TbBolt, TbCode, TbRocket, TbSearch, TbSparkles } from "react-icons/tb";

export const PROJECTS = [
  {
    num: "01",
    color: "#00e5ff",
    title: "Real-Time CRM System",
    desc: "Enterprise-grade CRM with live updates, pipeline management, and AI-powered lead scoring.",
    stack: [["React", "cyan"], ["Socket.IO", "violet"], ["Node.js", "green"], ["MongoDB", "pink"]],
    github: "#",
    demo: "#",
  },
  {
    num: "02",
    color: "#7c3aed",
    title: "Visitor Management System",
    desc: "Smart check-in platform with QR codes, badge printing, and real-time host notifications.",
    stack: [["React", "cyan"], ["Express", "violet"], ["Firebase", "pink"], ["REST API", "green"]],
    github: "#",
    demo: "#",
  },
  {
    num: "03",
    color: "#f472b6",
    title: "AI Course Platform",
    desc: "Adaptive learning platform with AI-curated paths, progress analytics, and live sessions.",
    stack: [["React", "cyan"], ["Node.js", "green"], ["MongoDB", "pink"], ["Tailwind", "violet"]],
    github: "#",
    demo: "#",
  },
  {
    num: "04",
    color: "#10b981",
    title: "Call Management Dashboard",
    desc: "Unified comms dashboard with VoIP integration, call analytics, and team performance metrics.",
    stack: [["React", "cyan"], ["Socket.IO", "violet"], ["REST API", "green"], ["Framer Motion", "pink"]],
    github: "#",
    demo: "#",
  },
];

export const SKILLS = [
  { icon: <SiReact />, name: "React.js" },
  { icon: <SiNodedotjs />, name: "Node.js" },
  { icon: <SiExpress />, name: "Express.js" },
  { icon: <SiMongodb />, name: "MongoDB" },
  { icon: <SiSocketdotio />, name: "Socket.IO" },
  { icon: <SiTailwindcss />, name: "Tailwind" },
  { icon: <SiBootstrap />, name: "Bootstrap" },
  { icon: <SiMysql />, name: "MySQL" },
  { icon: <SiPhp />, name: "PHP" },
  { icon: <TbSparkles />, name: "Framer Motion" },
  { icon: <SiFirebase />, name: "Firebase" },
  { icon: <TbApi />, name: "REST APIs" },
  { icon: <FaGithub />, name: "GitHub" },
];

export const SERVICES = [
  { icon: <TbCode />, title: "Full Stack Development", desc: "End-to-end web applications built with React, Node.js, and MongoDB. From idea to production." },
  { icon: <TbSparkles />, title: "UI/UX Design", desc: "Premium, accessible interfaces crafted with Figma and Framer Motion for delightful user experiences." },
  { icon: <TbBolt />, title: "Real-Time Systems", desc: "Live dashboards, chat apps, and collaborative tools powered by Socket.IO and WebSockets." },
  { icon: <TbSearch />, title: "SEO Optimization", desc: "Technical SEO, performance tuning, and Core Web Vitals optimization for maximum visibility." },
  { icon: <TbApi />, title: "API Integration", desc: "Seamless third-party integrations, REST API design, and cloud service connectivity." },
  { icon: <TbRocket />, title: "Performance Audit", desc: "Lighthouse scores, bundle analysis, lazy loading, and code splitting for blazing fast apps." },
];

export const TESTIMONIALS = [
  { quote: "Kavi delivered a CRM system that transformed how our team works. Exceptional attention to detail and modern UI that our users love.", name: "Arjun Mehta", role: "CTO, TechVentures", initials: "AM" },
  { quote: "The visitor management system went live ahead of schedule. Clean code, solid architecture, and beautiful design - exactly what we needed.", name: "Priya Sharma", role: "Operations Head, CorpSpace", initials: "PS" },
  { quote: "Working with Kavi was effortless. He understood our vision immediately and executed it with precision. The real-time features are flawless.", name: "Rahul Nair", role: "Founder, EduFlow", initials: "RN" },
];
