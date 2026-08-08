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
import { TbApi, TbBolt, TbCode, TbRocket, TbSparkles } from "react-icons/tb";
import projectCRM from "../assets/portfolio.png";
import projectAI from "../assets/exclusiveOfferCardImg1.png";
import projectDashboard from "../assets/exclusiveOfferCardImg2.png";

const projectArris = "https://image.thum.io/get/width/1400/crop/850/https://arris-website.vercel.app/";
const projectAarisErp = "https://image.thum.io/get/width/1400/crop/850/https://aaris-erp.vercel.app/login";

export const PROJECTS = [
  {
    num: "01",
    color: "#2563eb",
    image: projectCRM,
    title: "SAP Frontend Project",
    desc: "A deployed business dashboard frontend focused on clean navigation, responsive layouts, and practical data screens.",
    stack: [["React", "cyan"], ["Vite", "violet"], ["Responsive UI", "green"], ["Vercel", "pink"]],
    github: "#",
    demo: "https://sap-project-frontend-eight.vercel.app/",
  },
  {
    num: "02",
    color: "#0ea5e9",
    image: projectAarisErp,
    title: "AARIS ERP",
    desc: "A secure ERP login and business console concept with authentication-ready screens, clean form UX, and admin workflow foundations.",
    stack: [["React", "cyan"], ["ERP UI", "violet"], ["Auth Flow", "green"], ["Vercel", "pink"]],
    github: "#",
    demo: "https://aaris-erp.vercel.app/login",
  },
  {
    num: "03",
    color: "#0f766e",
    image: projectArris,
    title: "AARIS Group Website",
    desc: "A multi-business service portal for online services, mobiles, home appliances, tours and travel, with clear contact actions.",
    stack: [["React", "cyan"], ["Vercel", "violet"], ["Responsive UI", "green"], ["Business Website", "pink"]],
    github: "#",
    demo: "https://arris-website.vercel.app/",
  },
  {
    num: "04",
    color: "#9333ea",
    image: projectAI,
    title: "Learning Platform UI",
    desc: "Course browsing, progress tracking, and admin-friendly content screens built with reusable React components.",
    stack: [["React", "cyan"], ["Node.js", "green"], ["MongoDB", "pink"], ["Tailwind", "violet"]],
    github: "#",
    demo: "#",
  },
  {
    num: "05",
    color: "#ea580c",
    image: projectDashboard,
    title: "Operations Dashboard",
    desc: "A dashboard-style interface for viewing activity, reports, and team metrics with a clear information hierarchy.",
    stack: [["React", "cyan"], ["Socket.IO", "violet"], ["REST API", "green"], ["Framer Motion", "pink"]],
    github: "#",
    demo: "#",
  },
];

export const PROJECT_ADS = [
  {
    kicker: "ERP Concept",
    title: "AARIS ERP",
    copy: "Secure login screens, admin-console structure, and business workflow UI for real ERP usage.",
    projectTitle: "AARIS ERP",
    demo: "https://aaris-erp.vercel.app/login",
  },
  {
    kicker: "Business Website",
    title: "AARIS Group Website",
    copy: "Service-focused website design with responsive pages, clear navigation, and direct contact actions.",
    projectTitle: "AARIS Group Website",
    demo: "https://arris-website.vercel.app/",
  },
  {
    kicker: "Dashboard UI",
    title: "SAP Frontend Project",
    copy: "Data-heavy business screens built with React, reusable layouts, and production deployment polish.",
    projectTitle: "SAP Frontend Project",
    demo: "https://sap-project-frontend-eight.vercel.app/",
  },
  {
    kicker: "MERN App",
    title: "Learning Platform UI",
    copy: "Course, progress, and admin-friendly content screens designed for scalable learning products.",
    projectTitle: "Learning Platform UI",
    demo: "#",
  },
  {
    kicker: "Realtime Ops",
    title: "Operations Dashboard",
    copy: "Reporting, metrics, and activity views shaped for teams that need fast operational clarity.",
    projectTitle: "Operations Dashboard",
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

export const SKILL_GROUPS = [
  {
    label: "Frontend",
    items: [
      { icon: <SiReact />, name: "React.js" },
      { icon: <SiTailwindcss />, name: "Tailwind" },
      { icon: <SiBootstrap />, name: "Bootstrap" },
      { icon: <TbSparkles />, name: "Framer Motion" },
    ],
  },
  {
    label: "Backend",
    items: [
      { icon: <SiNodedotjs />, name: "Node.js" },
      { icon: <SiExpress />, name: "Express.js" },
      { icon: <TbApi />, name: "REST APIs" },
      { icon: <SiPhp />, name: "PHP" },
    ],
  },
  {
    label: "Database & Tools",
    items: [
      { icon: <SiMongodb />, name: "MongoDB" },
      { icon: <SiMysql />, name: "MySQL" },
      { icon: <SiFirebase />, name: "Firebase" },
      { icon: <FaGithub />, name: "GitHub" },
    ],
  },
];

export const SERVICES = [
  { icon: <TbCode />, title: "Frontend Development", desc: "React screens, dashboards, and responsive interfaces built with maintainable components." },
  { icon: <TbBolt />, title: "Full-Stack MERN Apps", desc: "Node, Express, MongoDB, auth flows, forms, and admin features for working products." },
  { icon: <TbApi />, title: "API Design & Integration", desc: "Connecting frontends to REST APIs, Firebase, third-party services, and backend workflows." },
  { icon: <TbRocket />, title: "Freelance / Remote Collaboration", desc: "Clear communication, production deployment support, and steady project delivery." },
];

export const TESTIMONIALS = [
  { quote: "Kavi delivered a CRM system that transformed how our team works. Exceptional attention to detail and modern UI that our users love.", name: "Arjun Mehta", role: "CTO, TechVentures", initials: "AM" },
  { quote: "The visitor management system went live ahead of schedule. Clean code, solid architecture, and beautiful design - exactly what we needed.", name: "Priya Sharma", role: "Operations Head, CorpSpace", initials: "PS" },
  { quote: "Working with Kavi was effortless. He understood our vision immediately and executed it with precision. The real-time features are flawless.", name: "Rahul Nair", role: "Founder, EduFlow", initials: "RN" },
];
