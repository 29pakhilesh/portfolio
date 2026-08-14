import { assetUrl } from './assetUrl'

export const profile = {
  name: 'Akhilesh Panigrahi',
  title: 'B.Tech CSE Student · Ex-Intern @ HSC',
  tagline:
    'Third-year Computer Science student at JUIT and former Summer Intern at Hughes Systique Corporation — AI workflows, full-stack systems, and product frontend engineering.',
  email: '29p.akhilesh@gmail.com',
  phone: '+91 9873081614',
  location: 'Ghaziabad, India',
  resumeUrl: assetUrl('Akhilesh-Panigrahi-Resume.pdf'),
  resumeDownloadName: 'Akhilesh-Panigrahi-Resume.pdf',
  photoAbout: assetUrl('profile.png'),
  photoHero: assetUrl('profile.png'),
  available: true,
  availabilityLabel: 'Available',
  availabilityMessage: 'Open for internships and project collaborations',
  social: {
    github: 'https://github.com/29pakhilesh',
    linkedin: 'https://www.linkedin.com/in/akhileshpanigrahi/',
    leetcode: 'https://leetcode.com/u/29pakhilesh/',
  },
  githubUsername: '29pakhilesh',
}

export const githubStatsFallback = {
  repos: 10,
  followers: 5,
  following: 10,
  joined: 'Sep 2024',
}

export const stats = [
  { value: '15', label: 'Technologies', href: '#skills' },
  { value: '6', label: 'Certifications', href: '#skills' },
  { value: '9', label: 'Projects built', href: '#work' },
  { value: '2028', label: 'Graduating', href: '#about' },
]

export const about = [
  "I'm a B.Tech Computer Science student at Jaypee University of Information Technology, passionate about software development and problem solving.",
  'Completed a Summer Internship at Hughes Systique Corporation (HSC) from May 25 to July 24, 2026 — learned AI & computer vision, REST APIs, full-stack systems, OpenStack Swift, and product frontend engineering.',
  'I build real-world systems — from a browser-based OS simulation to hostel complaint platforms with role-based dashboards and PostgreSQL backends.',
  'AWS Certified Cloud Practitioner (CLF-C02). Also certified in Python, C, DSA, and Cybersecurity. Always learning new tools to ship better software.',
]

export const experience = [
  {
    organization: 'Cambridge School Indirapuram',
    role: 'Secondary Education',
    location: 'Indirapuram, Ghaziabad',
    period: '',
    detail: '',
    kind: 'education',
    logo: assetUrl('logos/cambridge-school.png'),
    summary:
      'Completed schooling at Cambridge School Indirapuram, a CBSE-affiliated institution in Ghaziabad — building the academic foundation for engineering and computer science.',
    highlights: [
      'Strong base in mathematics, science, and analytical thinking',
      'Participated in school-level academic and co-curricular activities',
      'Developed discipline and study habits that carried into university',
    ],
    website: 'https://ip.cambridgeschool.edu.in/',
  },
  {
    organization: 'Jaypee University of Information Technology',
    role: 'B.Tech, Computer Science & Engineering',
    location: 'Wakhnaghat, Solan',
    period: '2024 — 2028',
    detail: 'Relevant coursework: DSA, DBMS, Web Development',
    kind: 'education',
    logo: assetUrl('logos/juit.png'),
    summary:
      'Pursuing B.Tech in Computer Science & Engineering at JUIT — focused on data structures, databases, web development, and building real-world software projects alongside coursework.',
    highlights: [
      'Coursework in DSA, DBMS, and Web Development',
      'Built multiple full-stack and systems projects alongside academics',
      'Active in problem solving through LeetCode and university assignments',
    ],
    website: 'https://www.juit.ac.in/',
  },
  {
    organization: 'Hughes Systique Corporation (HSC)',
    role: 'Summer Intern',
    location: 'Gurugram, Haryana, India',
    period: 'May 25 — Jul 24, 2026',
    detail: 'Internship · Hybrid',
    kind: 'internship',
    logo: assetUrl('logos/hsc.png'),
    summary:
      'Learned to build end-to-end systems across AI & computer vision, REST APIs, databases, OpenStack Swift object storage, and product-focused frontend engineering — from individual technologies to complete pipelines.',
    highlights: [
      'AI & computer vision — YOLO training, datasets, metrics, ONNX export, and edge deployment concepts',
      'REST APIs — CRUD design, auth, validation, error handling, and API testing with Postman',
      'Full-stack systems — FastAPI, PostgreSQL, React, and clear UI-to-API contracts',
      'Product frontend — React + TypeScript AI-workflow UIs, state management, and enterprise UX',
      'OpenStack Swift — object storage concepts: containers, objects, and cloud storage workflows',
    ],
    website: 'https://www.hsc.com/',
  },
  {
    organization: 'DLR Info',
    role: 'Freelance Full-Stack Developer',
    location: 'Remote',
    period: 'Jul 2026 — Present',
    detail: 'Paid Freelance · Remote',
    kind: 'freelance',
    logo: assetUrl('logos/dlr-info.svg'),
    summary:
      'Paid freelance engagement to design and ship a production live draw-results platform — public results board, history archive, and admin publishing tools — delivered end-to-end for a client.',
    highlights: [
      'Delivered a paid client product from requirements through deployment',
      'Built live results dashboard and historical draw archive for end users',
      'Implemented secure admin workflows to publish and manage draw results',
      'Full-stack delivery with Next.js frontend, Express API, and PostgreSQL',
    ],
  },
]

export const skills = [
  { category: 'Languages', items: ['C', 'C++', 'Python', 'JavaScript'] },
  { category: 'Web & Backend', items: ['React', 'Node.js', 'Express', 'Next.js', 'HTML', 'CSS'] },
  { category: 'Databases & Tools', items: ['PostgreSQL', 'MySQL', 'Git', 'VS Code', 'Linux', 'AWS'] },
]

export const skillPills = [
  'React', 'Node.js', 'PostgreSQL', 'Python', 'C++', 'JavaScript',
  'Express', 'Next.js', 'MySQL', 'HTML', 'CSS', 'Git', 'Linux', 'AWS',
]

export const techDetails = {
  C: {
    category: 'Languages',
    summary:
      'Foundation language for systems thinking — memory, pointers, and low-level logic from coursework and certifications.',
    usages: [
      {
        project: 'C Programming — Basics to Advanced (Udemy)',
        context: 'Completed structured training on pointers, memory management, and advanced C patterns.',
      },
      {
        project: 'Data Structures & Algorithms',
        context: 'Implemented core DSA problems in C as part of university coursework and practice.',
      },
    ],
  },
  'C++': {
    category: 'Languages',
    summary: 'Used for structured OOP, file handling, and building console-based management systems.',
    usages: [
      {
        project: 'Parking Management System',
        context: 'Built vehicle entry/exit flows, GST billing, and persistent records with file I/O in C++.',
        github: 'https://github.com/29pakhilesh/Multi-Vehicle-Parking-Management-System',
      },
    ],
  },
  Python: {
    category: 'Languages',
    summary:
      'Primary language for automation, ML pipelines, APIs, and scripting — from tools to full-stack backends.',
    usages: [
      {
        project: 'Traffic Sign Recognition',
        context: 'Trained ResNet18 with PyTorch and served inference through a FastAPI backend.',
        github: 'https://github.com/29pakhilesh/Traffic-Sign-Recognition',
      },
      {
        project: 'PDF Merger & Splitter',
        context: 'Automated merge/split workflows with PyPDF2 for document handling.',
        github: 'https://github.com/29pakhilesh/splitter-merger-tool-for-pdfs',
      },
      {
        project: 'Python Bootcamp — Zero to Hero (Udemy)',
        context: 'Certified training covering OOP, scripting, and practical Python patterns.',
      },
    ],
  },
  JavaScript: {
    category: 'Languages',
    summary: 'Core language for interactive frontends, browser apps, and full-stack JavaScript projects.',
    usages: [
      {
        project: 'WebUnix — Browser-Based OS',
        context: 'Implemented desktop UI, app windows, auth, and a LocalStorage-backed file system.',
        github: 'https://github.com/29pakhilesh/Webunix',
      },
      {
        project: 'Hostel Complaint Management System',
        context: 'React frontend with dynamic forms, dashboards, and client-side state for complaint flows.',
        github: 'https://github.com/29pakhilesh/Hostel-Complaint-System',
      },
    ],
  },
  React: {
    category: 'Web & Backend',
    summary: 'Component-based UI for dashboards, forms, and data-heavy portfolio and product projects.',
    usages: [
      {
        project: 'Hostel Complaint Management System',
        context: 'Student and admin dashboards with role-based views and complaint tracking UI.',
        github: 'https://github.com/29pakhilesh/Hostel-Complaint-System',
      },
      {
        project: 'Green Computing Dashboard',
        context: 'Interactive charts and panels for resource and energy usage visualization.',
        github: 'https://github.com/29pakhilesh/Green-Computing-Dashboard',
      },
      {
        project: 'Automated Resume Scoring System',
        context: 'Upload UI, scoring results, and feedback views for resume–job matching.',
        github: 'https://github.com/29pakhilesh/Automated-Resume-Scoring-System',
      },
      {
        project: 'This portfolio',
        context: 'Built with React 19 and Vite — sections, theme toggle, scroll reveals, and contact form.',
      },
    ],
  },
  'Node.js': {
    category: 'Web & Backend',
    summary: 'Server-side JavaScript for REST APIs, auth flows, and connecting React frontends to databases.',
    usages: [
      {
        project: 'Hostel Complaint Management System',
        context: 'Express API for complaints, users, roles, and PostgreSQL persistence.',
        github: 'https://github.com/29pakhilesh/Hostel-Complaint-System',
      },
    ],
  },
  Express: {
    category: 'Web & Backend',
    summary: 'Lightweight HTTP layer for routing, middleware, and REST endpoints on Node.js.',
    usages: [
      {
        project: 'Hostel Complaint Management System',
        context: 'REST routes for complaints, authentication middleware, and admin/student APIs.',
        github: 'https://github.com/29pakhilesh/Hostel-Complaint-System',
      },
    ],
  },
  'Next.js': {
    category: 'Web & Backend',
    summary: 'React framework for SSR, routing, and production-ready web apps — actively learning and prototyping.',
    usages: [
      {
        project: 'Personal learning',
        context: 'Exploring App Router, API routes, and deployment patterns for future full-stack projects.',
      },
    ],
  },
  HTML: {
    category: 'Web & Backend',
    summary: 'Semantic structure and accessible markup for multi-page and single-page web experiences.',
    usages: [
      {
        project: 'WebUnix — Browser-Based OS',
        context: 'Layout for desktop shell, windows, and in-browser application frames.',
        github: 'https://github.com/29pakhilesh/Webunix',
      },
      {
        project: 'This portfolio',
        context: 'Semantic sections, meta tags, and accessible document structure.',
      },
    ],
  },
  CSS: {
    category: 'Web & Backend',
    summary: 'Custom styling, responsive layouts, animations, and theme systems without heavy UI libraries.',
    usages: [
      {
        project: 'WebUnix — Browser-Based OS',
        context: 'Window chrome, desktop grid, and app styling for a cohesive OS-like interface.',
        github: 'https://github.com/29pakhilesh/Webunix',
      },
      {
        project: 'This portfolio',
        context: 'Golden theme variables, light/dark mode, scroll reveals, and responsive project grid.',
      },
    ],
  },
  PostgreSQL: {
    category: 'Databases & Tools',
    summary: 'Relational database for structured data, roles, and complaint or user records at scale.',
    usages: [
      {
        project: 'Hostel Complaint Management System',
        context: 'Schemas for users, complaints, statuses, and role-based access with SQL queries.',
        github: 'https://github.com/29pakhilesh/Hostel-Complaint-System',
      },
    ],
  },
  MySQL: {
    category: 'Databases & Tools',
    summary: 'SQL fundamentals, queries, and relational modeling from coursework and practice.',
    usages: [
      {
        project: 'University coursework (DBMS)',
        context: 'Designed tables, joins, and queries for academic database assignments.',
      },
      {
        project: 'Online Quiz System',
        context: 'Relational storage patterns for users, questions, and quiz attempts (web stack).',
        github: 'https://github.com/29pakhilesh/Online-Quiz-System',
      },
    ],
  },
  Git: {
    category: 'Databases & Tools',
    summary: 'Version control for every project — branching, commits, GitHub, and CI-friendly workflows.',
    usages: [
      {
        project: 'All GitHub projects',
        context: 'Feature branches, meaningful commits, and public repos for coursework and portfolio work.',
        github: 'https://github.com/29pakhilesh',
      },
    ],
  },
  'VS Code': {
    category: 'Databases & Tools',
    summary: 'Primary editor for React, Node, Python, and C++ with extensions for debugging and Git integration.',
    usages: [
      {
        project: 'Day-to-day development',
        context: 'Used across hostel platform, portfolio, ML apps, and university assignments.',
      },
    ],
  },
  Linux: {
    category: 'Databases & Tools',
    summary: 'Comfortable with terminal workflows, deployment environments, and open-source tooling.',
    usages: [
      {
        project: 'Development environment',
        context: 'Terminal, package managers, and server-style workflows for building and testing apps.',
      },
      {
        project: 'Traffic Sign Recognition',
        context: 'Python virtual environments and model training/serving from the command line.',
        github: 'https://github.com/29pakhilesh/Traffic-Sign-Recognition',
      },
    ],
  },
  AWS: {
    category: 'Databases & Tools',
    summary:
      'AWS Certified Cloud Practitioner (CLF-C02) — cloud fundamentals across compute, storage, networking, and identity.',
    usages: [
      {
        project: 'AWS Certified Cloud Practitioner (CLF-C02)',
        context: 'Passed the official Amazon Web Services exam covering EC2, S3, IAM, VPC, and cloud pricing models.',
      },
      {
        project: 'AWS Cloud Practitioner Prep Course',
        context: 'Completed Udemy exam-prep coursework before sitting the official CLF-C02 certification.',
      },
    ],
  },
}

export function getTechDetail(techName) {
  const base = techDetails[techName]
  if (!base) return null

  const knownProjects = new Set(base.usages.map((u) => u.project))
  const fromTags = projects
    .filter((p) => p.tags.includes(techName) && !knownProjects.has(p.title))
    .map((p) => ({
      project: p.title,
      context: p.description,
      github: p.github,
      url: p.url,
    }))

  const category =
    skills.find((g) => g.items.includes(techName))?.category ?? base.category

  return {
    ...base,
    category,
    usages: [...base.usages, ...fromTags],
  }
}

export const projects = [
  {
    title: 'DLR Info — Live Draw Results',
    description:
      'Paid freelance project: production live draw-results platform with a public results board, history archive, and admin tools for publishing and managing draws.',
    highlights: [
      'Client-paid freelance delivery from build through production use',
      'Live results dashboard with clear per-place draw cards',
      'History archive for browsing past draw numbers',
      'Admin workflow to publish, edit, and manage results securely',
      'Separate Next.js frontend and Express API with Postgres persistence',
    ],
    tags: ['Next.js', 'React', 'Express', 'PostgreSQL'],
    period: 'Jul 2026 — Present',
    accent: '#c8c8c8',
    featured: true,
    url: '',
    github: '',
  },
  {
    title: 'Traffic Sign Recognition',
    description:
      'Deep learning app with ResNet18 to classify traffic signs from images and live webcam feed.',
    highlights: [
      'ResNet18 model trained for traffic sign classes',
      'Image upload and live webcam inference',
      'FastAPI backend serving predictions to the UI',
    ],
    tags: ['Python', 'PyTorch', 'FastAPI', 'Deep Learning'],
    period: 'May 2026',
    accent: '#c8c8c8',
    featured: false,
    url: '',
    github: 'https://github.com/29pakhilesh/Traffic-Sign-Recognition',
  },
  {
    title: 'Automated Resume Scoring System',
    description:
      'Full-stack app that scores resumes against a job description with semantic similarity and feedback.',
    highlights: [
      'Resume–JD semantic similarity scoring',
      'Keyword coverage and gap analysis',
      'Actionable feedback for improving match strength',
    ],
    tags: ['React', 'TypeScript', 'FastAPI', 'SQLite'],
    period: 'Apr — May 2026',
    accent: '#c8c8c8',
    featured: false,
    url: '',
    github: 'https://github.com/29pakhilesh/Automated-Resume-Scoring-System',
  },
  {
    title: 'Hostel Complaint Management System',
    description:
      'Web platform for students to submit and track hostel complaints with role-based dashboards and real-time updates.',
    highlights: [
      'Student and admin dashboards with separate workflows',
      'REST API with Express and PostgreSQL persistence',
      'Complaint status tracking from submission to resolution',
    ],
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    period: 'Feb 2026 — Apr 2026',
    accent: '#c8c8c8',
    featured: true,
    url: 'https://hostel-complaint-system-opal.vercel.app',
    github: 'https://github.com/29pakhilesh/Hostel-Complaint-System',
    image: assetUrl('projects/hostel-complaint.png'),
  },
  {
    title: 'Online Quiz System',
    description:
      'Quiz platform with login, MCQ tests, automated scoring, and question management for instructors.',
    highlights: [
      'User authentication and role-based quiz access',
      'MCQ test engine with automated scoring',
      'Question bank management for instructors',
    ],
    tags: ['Web', 'Auth', 'MCQ Engine'],
    period: 'Mar 2026',
    accent: '#c8c8c8',
    featured: false,
    url: 'https://online-quiz-system-l94i.onrender.com',
    github: 'https://github.com/29pakhilesh/Online-Quiz-System',
    image: assetUrl('projects/online-quiz.png'),
  },
  {
    title: 'Green Computing Dashboard',
    description:
      'Dashboard to visualize energy and resource usage in computing systems with performance monitoring.',
    highlights: [
      'Charts for CPU, memory, and energy-style metrics',
      'React-based UI for monitoring resource trends',
      'Built around sustainability and efficiency themes',
    ],
    tags: ['React', 'Data Viz', 'Sustainability'],
    period: 'Mar 2026',
    accent: '#c8c8c8',
    featured: false,
    url: 'https://green-computing-dashboard-mu.vercel.app',
    github: 'https://github.com/29pakhilesh/Green-Computing-Dashboard',
    image: assetUrl('projects/green-computing.png'),
  },
  {
    title: 'WebUnix — Browser-Based OS',
    description:
      'Browser-based OS with multi-app desktop, LocalStorage file system, auth, and persistent sessions.',
    highlights: [
      'Desktop-style UI with draggable windows and app launcher',
      'LocalStorage-backed virtual file system',
      'Login flow with session persistence in the browser',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    period: 'Dec 2025',
    accent: '#c8c8c8',
    featured: true,
    url: 'https://webunix.vercel.app',
    github: 'https://github.com/29pakhilesh/Webunix',
    image: assetUrl('projects/webunix.png'),
  },
  {
    title: 'Parking Management System',
    description:
      'C++ system for vehicle entry/exit, GST-based billing, file handling, and automated records.',
    highlights: [
      'Vehicle entry/exit logging with slot management',
      'GST-based billing and receipt generation',
      'File-based persistence for parking records',
    ],
    tags: ['C++', 'File I/O', 'Billing'],
    period: 'Nov 2025',
    accent: '#c8c8c8',
    featured: false,
    url: '',
    github: 'https://github.com/29pakhilesh/Multi-Vehicle-Parking-Management-System',
  },
  {
    title: 'PDF Merger & Splitter',
    description:
      'Python tool using PyPDF2 to merge multiple PDFs and split documents for batch workflows.',
    highlights: [
      'Merge multiple PDFs into a single file',
      'Split PDFs by page ranges',
      'CLI-style automation for document batches',
    ],
    tags: ['Python', 'PyPDF2', 'Automation'],
    period: 'Jun — Jul 2025',
    accent: '#c8c8c8',
    featured: false,
    url: '',
    github: 'https://github.com/29pakhilesh/splitter-merger-tool-for-pdfs',
  },
]

export const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    logo: assetUrl('icons/aws.png'),
    period: 'Aug 2026',
    skills: ['Cloud fundamentals', 'EC2', 'S3', 'IAM'],
    kind: 'exam',
    badge: 'Official',
    certificateUrl: assetUrl('certificates/aws-cloud-practitioner.pdf'),
    downloadName: 'Akhilesh-Panigrahi-AWS-Cloud-Practitioner.pdf',
  },
  {
    name: 'AWS Cloud Practitioner Prep Course',
    issuer: 'Udemy',
    logo: assetUrl('icons/udemy.svg'),
    period: 'Feb 2026',
    skills: ['Exam prep', 'Cloud concepts', 'Practice tests'],
    kind: 'course',
    badge: 'Course',
    certificateUrl: assetUrl('certificates/aws-cloud-practitioner-udemy.pdf'),
    downloadName: 'Akhilesh-Panigrahi-AWS-Cloud-Practitioner-Udemy.pdf',
  },
  {
    name: 'Python Bootcamp — Zero to Hero',
    issuer: 'Udemy',
    period: 'Jul 2025',
    skills: ['Python', 'OOP', 'Scripting'],
    certificateUrl: assetUrl('certificates/python-zero-to-hero.pdf'),
    downloadName: 'Akhilesh-Panigrahi-Python-Bootcamp.pdf',
  },
  {
    name: 'C Programming — Basics to Advanced',
    issuer: 'Udemy',
    period: 'Sep 2025',
    skills: ['C', 'Pointers', 'Memory management'],
    certificateUrl: assetUrl('certificates/c-programming-basics-to-advanced.pdf'),
    downloadName: 'Akhilesh-Panigrahi-C-Programming.pdf',
  },
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    period: 'Jun 2025',
    skills: ['Network security', 'Threats', 'Vulnerabilities'],
    certificateUrl: assetUrl('certificates/introduction-to-cybersecurity-cisco.pdf'),
    downloadName: 'Akhilesh-Panigrahi-Cisco-Cybersecurity.pdf',
  },
  {
    name: 'Data Structures and Algorithms',
    issuer: 'OnWingspan',
    period: 'Apr 2025',
    skills: ['DSA', 'Problem solving', 'Algorithms'],
    certificateUrl: assetUrl('certificates/data-structures-and-algorithms.pdf'),
    downloadName: 'Akhilesh-Panigrahi-DSA.pdf',
  },
]

export const strengths = [
  {
    label: 'Teamwork',
    icon: 'teamwork',
    summary:
      'I collaborate clearly — sharing progress, taking feedback, and keeping delivery moving with mentors, teammates, and clients.',
    usages: [
      {
        project: 'Hughes Systique Corporation (HSC)',
        context:
          'Worked with mentors across AI, APIs, and frontend — synced on UI-to-API contracts and iterated on product-focused React workflows.',
      },
      {
        project: 'DLR Info — Live Draw Results',
        context:
          'Partnered with the client on requirements, demos, and revisions so the live results board and admin tools matched real publishing needs.',
      },
      {
        project: 'Hostel Complaint Management System',
        context:
          'Aligned student and admin workflows so both sides of the complaint lifecycle stayed clear and usable.',
      },
    ],
  },
  {
    label: 'Adaptability',
    icon: 'adaptability',
    summary:
      'I pick up new stacks and contexts quickly — from internship pipelines to freelance client work and course projects.',
    usages: [
      {
        project: 'Hughes Systique Corporation (HSC)',
        context:
          'Moved across YOLO/ONNX vision work, FastAPI + Postgres backends, OpenStack Swift, and TypeScript frontends in one internship.',
      },
      {
        project: 'DLR Info — Live Draw Results',
        context:
          'Adapted to a client brief and shipped a Next.js + Express + PostgreSQL product end-to-end for production use.',
      },
      {
        project: 'WebUnix — Browser-Based OS',
        context:
          'Switched from typical web apps into a desktop-style browser OS with LocalStorage persistence and multi-window UX.',
      },
    ],
  },
  {
    label: 'Problem Solving',
    icon: 'problem',
    summary:
      'I break messy requirements into concrete systems — scoring logic, live inference, billing rules, and status workflows.',
    usages: [
      {
        project: 'Automated Resume Scoring System',
        context:
          'Designed semantic similarity scoring, keyword coverage, and actionable feedback against a job description.',
        github: 'https://github.com/29pakhilesh/Automated-Resume-Scoring-System',
      },
      {
        project: 'Traffic Sign Recognition',
        context:
          'Trained ResNet18 and wired image + webcam inference through a FastAPI backend for live classification.',
        github: 'https://github.com/29pakhilesh/Traffic-Sign-Recognition',
      },
      {
        project: 'Parking Management System',
        context:
          'Modeled vehicle entry/exit, GST billing, and file-backed records in a C++ console system.',
        github: 'https://github.com/29pakhilesh/Multi-Vehicle-Parking-Management-System',
      },
      {
        project: 'Online Quiz System',
        context:
          'Built MCQ flow with auth, automated scoring, and instructor question management.',
        github: 'https://github.com/29pakhilesh/Online-Quiz-System',
      },
    ],
  },
  {
    label: 'Quick Learner',
    icon: 'learner',
    summary:
      'I ramp into unfamiliar tools fast — certifications, new frameworks, and production stacks — then apply them in shipped work.',
    usages: [
      {
        project: 'AWS Certified Cloud Practitioner (CLF-C02)',
        context:
          'Prepared and passed the official AWS exam covering EC2, S3, IAM, and cloud fundamentals.',
      },
      {
        project: 'Hughes Systique Corporation (HSC)',
        context:
          'Learned computer vision pipelines, REST API design, and enterprise frontend patterns during the summer internship.',
      },
      {
        project: 'DLR Info — Live Draw Results',
        context:
          'Picked up the client domain quickly and delivered a paid Next.js/Express/Postgres platform from build through use.',
      },
      {
        project: 'Green Computing Dashboard',
        context:
          'Applied charting and sustainability-focused metrics in a React monitoring UI.',
        github: 'https://github.com/29pakhilesh/Green-Computing-Dashboard',
      },
    ],
  },
]

export function getStrengthDetail(label) {
  return strengths.find((s) => s.label === label) ?? null
}

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#work', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]
