import type {
  Project,
  ExperienceItem,
  EducationItem,
  SkillItem,
  CertificationItem,
  TestimonialItem,
  StatItem,
  BlogPostItem
} from '../types';

export const PERSONAL_INFO = {
  name: "Peter Kiplagat Misik",
  greeting: "Hello, I'm",
  title: "IT Student | Software Developer | Network Engineer",
  roles: [
    "Full Stack Developer",
    "Python Developer",
    "React Developer",
    "Network Engineer",
    "Data Analyst"
  ],
  bio: "Passionate Information Technology student and aspiring Software Developer pursuing a Bachelor of Science in Information Technology at Taita Taveta University. Experienced in full-stack web development, enterprise networking simulations, and system administration. Committed to crafting high-performance, accessible, and scalable digital solutions that solve real-world problems.",
  aboutDetailed: {
    personalIntro: "I am a dedicated 4th-year Information Technology student based in Kenya, specializing in modern web application architecture and computer network engineering.",
    journey: "My tech journey began with low-level logic and algorithms, expanding into full-stack web applications with Python, Django, React, and robust relational databases. Simultaneously, my fascination with infrastructure led me to deep dive into Cisco Packet Tracer, VLAN segmentation, and enterprise routing.",
    careerGoals: "My aspiration is to engineer mission-critical systems at the intersection of scalable distributed software, high-throughput network architectures, and robust cloud services.",
    mindset: "I thrive on breaking down complex challenges into elegant, maintainable code and rock-solid network designs with a security-first mindset."
  },
  location: "Kenya",
  email: "petermisik86@gmil.com",
  phone: "0743329366",
  phoneFormatted: "+254 743 329 366",
  whatsappUrl: "https://wa.me/254743329366",
  university: "Taita Taveta University",
  degree: "Bachelor of Science in Information Technology",
  specialization: "Software Development & Network Engineering",
  yearOfStudy: "4th Year (2023 – Present)",
  languages: ["English (Fluent)", "Swahili (Native)"],
  availability: "Open for Attachments, Internships & Software Developer Roles",
  cvPath: "/CV.pdf",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    whatsapp: "https://wa.me/254743329366",
    email: "mailto:petermisik86@gmil.com"
  }
};

export const STATS: StatItem[] = [
  { label: "Completed Projects", value: 16, suffix: "+", description: "Full-stack apps & networking labs" },
  { label: "Hours of Coding", value: 850, suffix: "+", description: "Python, TypeScript & SQL" },
  { label: "Certifications & Badges", value: 4, suffix: "+", description: "Cisco, Python, Web & DB" },
  { label: "Code Quality & Uptime", value: 99, suffix: "%", description: "Clean architecture standard" }
];

export const EDUCATION_DATA: EducationItem = {
  institution: "Taita Taveta University",
  degree: "Bachelor of Science in Information Technology",
  specialization: "Software Development & Network Engineering",
  period: "2023 – Present",
  status: "Undergraduate (Final Year)",
  coursework: [
    "Data Structures & Algorithms",
    "Database Systems",
    "Object-Oriented Programming",
    "Probability & Statistics",
    "Numerical Methods",
    "Linear Algebra",
    "System Analysis and Design",
    "Software Engineering"
  ],
  highlights: [
    "Strong emphasis on analytical thinking, statistical modeling, and algorithmic optimization.",
    "Active participant in tech symposiums, algorithmic problem-solving, and peer programming circles.",
    "Integrated mathematical formulations into production-ready software solutions."
  ]
};

export const SKILLS_DATA: SkillItem[] = [
  // Programming
  { name: "Python", level: 92, category: "programming", highlight: true },
  { name: "JavaScript", level: 88, category: "programming", highlight: true },
  { name: "TypeScript", level: 85, category: "programming", highlight: true },
  { name: "Java", level: 80, category: "programming" },
  { name: "C++", level: 75, category: "programming" },

  // Frontend
  { name: "React", level: 90, category: "frontend", highlight: true },
  { name: "Tailwind CSS", level: 94, category: "frontend", highlight: true },
  { name: "HTML5 & CSS3", level: 95, category: "frontend" },
  { name: "Vite", level: 88, category: "frontend" },
  { name: "Framer Motion", level: 82, category: "frontend" },

  // Backend
  { name: "Django", level: 90, category: "backend", highlight: true },
  { name: "Node.js", level: 85, category: "backend", highlight: true },
  { name: "Express", level: 84, category: "backend" },
  { name: "RESTful APIs", level: 92, category: "backend" },
  { name: "Django Channels (WebSockets)", level: 82, category: "backend" },

  // Databases
  { name: "PostgreSQL", level: 88, category: "databases", highlight: true },
  { name: "MySQL", level: 86, category: "databases" },
  { name: "SQLite", level: 90, category: "databases" },

  // Networking
  { name: "Cisco Packet Tracer", level: 94, category: "networking", highlight: true },
  { name: "Network Design & Architecture", level: 90, category: "networking", highlight: true },
  { name: "Router & Switch Configuration", level: 88, category: "networking" },
  { name: "LAN / WAN Management", level: 86, category: "networking" },
  { name: "VLANs & Network Segmentation", level: 92, category: "networking", highlight: true },

  // Tools
  { name: "Git & GitHub", level: 92, category: "tools", highlight: true },
  { name: "Linux Administration", level: 88, category: "tools", highlight: true },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Postman", level: 87, category: "tools" }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "tsafari-transport",
    title: "TSafari Transport Management System",
    subtitle: "Real-time passenger transport booking & fleet coordination platform",
    description: "Full-featured web application powering online booking, dynamic driver allocation, live trip notifications, and seamless M-Pesa mobile money integration.",
    longDescription: "TSafari is an enterprise-grade transit reservation and dispatching platform engineered to eliminate ticketing friction in inter-county travel. Built with Django and PostgreSQL, it features bidirectional WebSocket updates for drivers and passengers using Django Channels, real-time M-Pesa STK Push payments, and an intuitive role-based management dashboard.",
    category: "fullstack",
    tags: ["Django", "PostgreSQL", "Tailwind CSS", "Channels", "M-Pesa API", "Python"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com",
    liveUrl: "https://tsafari-demo.example.com",
    features: [
      "Customer booking portal with dynamic seat selection and route tracking",
      "Dedicated driver dashboard for schedule acceptance, trip logs, and manifest",
      "Real-time notifications via Django Channels WebSockets",
      "Direct Daraja M-Pesa API STK push payment processing and callback reconciliation",
      "Automated SMS/Email booking confirmations and downloadable PDF tickets",
      "Granular administrative analytics on revenue, vehicle utilization, and peak routes"
    ],
    architecture: [
      "Decoupled MVC architecture with asynchronous Django ASGI workers (Daphne / Redis)",
      "PostgreSQL relational schema with transactional integrity for seat bookings",
      "Secure webhook listener endpoints verifying M-Pesa cryptographic payload signatures",
      "Responsive client-side interface styled with Tailwind CSS for mobile responsiveness"
    ],
    challenges: [
      "Handling concurrent booking race conditions when multiple travelers select the identical seat simultaneously.",
      "Ensuring deterministic callback handling for Safaricom Daraja M-Pesa network latency."
    ],
    lessonsLearned: [
      "Implemented database row-level locking (`select_for_update`) to prevent overbooking.",
      "Architected idempotent payment verification pipelines to prevent double ticketing."
    ],
    metrics: [
      { label: "Booking Latency", value: "< 250ms" },
      { label: "Payment Success Rate", value: "99.4%" },
      { label: "Concurrent Passengers", value: "500+" }
    ],
    featured: true
  },
  {
    id: "evergreen-agrovet",
    title: "EVERGREEN Agrovet Management System",
    subtitle: "Cloud inventory, veterinary pharmaceuticals & sales tracking suite",
    description: "Modern POS and supply-chain management application tailored for agrovet enterprises to track batches, expiry alerts, inventory turnover, and financial books.",
    longDescription: "EVERGREEN is a robust inventory control and point-of-sale system addressing critical bottlenecks in agricultural and veterinary retail. Developed using a React frontend paired with a Node.js REST API and PostgreSQL, it provides real-time stock deductions, automatic expiry notifications, barcode tracking, and comprehensive profit/loss ledger generation.",
    category: "fullstack",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com",
    liveUrl: "https://evergreen-agrovet.example.com",
    features: [
      "Real-time inventory deduction with low-stock threshold triggers",
      "Pharmaceutical batch tracking with automated expiration date warnings",
      "Rapid point-of-sale checkout with receipt generation and credit sales support",
      "Customer ledger records for loyalty tracking and wholesale invoice settlement",
      "Exportable financial analytics with monthly profit, expense, and tax summaries"
    ],
    architecture: [
      "Modular Node.js and Express RESTful API with structured service layers",
      "PostgreSQL normalized database with comprehensive foreign-key indexing",
      "React single-page application with optimistic UI updates and state management",
      "JWT-based role-based access control (Cashier, Store Manager, Director)"
    ],
    challenges: [
      "Tracking inventory items with multiple units of measure (single vials vs. cartons).",
      "Optimizing SQL queries across high-frequency daily sales records."
    ],
    lessonsLearned: [
      "Structured composite database indexes on timestamps and product foreign keys, reducing query time by 78%.",
      "Designed an extensible unit conversion table for variable packaging formats."
    ],
    metrics: [
      { label: "Stock Accuracy", value: "99.9%" },
      { label: "POS Checkout Speed", value: "1.2s" },
      { label: "Database Records", value: "15,000+" }
    ],
    featured: true
  },
  {
    id: "school-network-design",
    title: "School Enterprise Network Design",
    subtitle: "High-security multi-departmental campus network infrastructure",
    description: "Complete architectural simulation of a campus LAN/WAN incorporating departmental VLAN segmentation, redundant core switches, firewall access lists, and DHCP routing.",
    longDescription: "An end-to-end enterprise network topology designed and verified in Cisco Packet Tracer. Engineered to support faculty, administrative offices, computer laboratories, library resources, and guest wireless access with zero cross-departmental security leakage.",
    category: "networking",
    tags: ["Cisco Packet Tracer", "VLANs", "Router Configuration", "Network Security", "OSPF"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com",
    liveUrl: "#",
    features: [
      "Strict VLAN segmentation isolating Finance, Administration, Academic, and Guest Wi-Fi",
      "Subnet calculation using Variable Length Subnet Masking (VLSM) for IP conservation",
      "Inter-VLAN routing configured with Router-on-a-Stick (802.1Q encapsulation)",
      "Access Control Lists (ACLs) restricting student and guest access to management servers",
      "Centralized DHCP server allocation with dynamic reservations for core hardware",
      "Redundant spanning tree protocol (STP) preventing switching loops across core distribution layers"
    ],
    architecture: [
      "Cisco 3-tier hierarchical model (Core, Distribution, and Access layers)",
      "High-availability trunking links with LACP EtherChannel aggregation",
      "Standard and extended ACLs enforcing least-privilege traffic flow",
      "OSPF routing protocol enabling dynamic scalability across remote branch buildings"
    ],
    challenges: [
      "Preventing broadcast storms while maintaining inter-departmental printer access.",
      "Optimizing subnets across 8 distinct departments with divergent workstation quantities."
    ],
    lessonsLearned: [
      "Mastered VLSM to maximize IPv4 space utilization with zero IP exhaustion.",
      "Applied Rapid Spanning Tree Protocol (RSTP) to achieve sub-second convergence."
    ],
    metrics: [
      { label: "VLAN Segments", value: "8 Subnets" },
      { label: "Endpoints Supported", value: "650+" },
      { label: "Failover Time", value: "< 2s" }
    ],
    featured: true
  },
  {
    id: "efootball-tournament",
    title: "E-Football Tournament Management System",
    subtitle: "Competitive esports platform with automated bracket seeding & match verification",
    description: "Dynamic tournament staging platform featuring round-robin and knockout schedules, live player leaderboards, in-depth player statistics, and match result screenshot validation.",
    longDescription: "Developed for university and regional gaming leagues, this system automates bracket generation, dispute resolution, and stats aggregation for e-football tournaments. Players submit match screenshots which are verified by tournament marshals before results are committed to global leaderboards.",
    category: "fullstack",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "REST API"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com",
    liveUrl: "https://efootball-league.example.com",
    features: [
      "Automated tournament brackets (Single elimination, Double elimination, Group Stages)",
      "Live updating leaderboards tracking Goal Difference, Points, Form, and Clean Sheets",
      "Player dashboard with head-to-head records and tournament history",
      "Screenshot proof upload workflow for dispute-free score verifications",
      "Real-time notifications for upcoming match fixtures and scheduling shifts"
    ],
    architecture: [
      "React modern frontend with dynamic bracket visualization components",
      "Node.js/Express backend with validation middleware and role-based permissions",
      "PostgreSQL database with relational match history and aggregated statistics views",
      "Cloud storage integration for match result screenshot archiving"
    ],
    challenges: [
      "Algorithmically resolving tie-breakers based on head-to-head, away goals, and fair play scores.",
      "Handling high concurrent traffic spikes during tournament final weekends."
    ],
    lessonsLearned: [
      "Implemented stored procedures and database triggers to calculate real-time table rankings atomically.",
      "Designed intuitive UX for mobile-first gamers submitting match proofs."
    ],
    metrics: [
      { label: "Tournaments Staged", value: "24+" },
      { label: "Registered Players", value: "480+" },
      { label: "Verification Latency", value: "< 3 mins" }
    ],
    featured: true
  },
  {
    id: "campus-wifi-portal",
    title: "Campus Captive Portal & Bandwidth Monitor",
    subtitle: "RADIUS authenticated wireless access controller & usage analytics",
    description: "A network management dashboard and captive portal designed for campus environments to authenticate student sessions and monitor bandwidth consumption.",
    longDescription: "Engineered to assist network administrators in tracking peak network usage times, allocating fair-share bandwidth quotas, and preventing rogue devices on the campus infrastructure.",
    category: "networking",
    tags: ["Linux", "Python", "Networking", "MySQL", "Packet Tracer"],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com",
    liveUrl: "#",
    features: [
      "RADIUS server authentication integration with university student credentials",
      "Per-user bandwidth rate limiting to prevent network congestion",
      "Administrative dashboard highlighting real-time access point health",
      "Automated session timeout and rogue AP detection mechanisms"
    ],
    architecture: [
      "Python network telemetry scrapers interfacing with gateway interfaces",
      "MySQL user session and connection log data warehouse",
      "Responsive web management console with live traffic graphs"
    ],
    challenges: ["Detecting MAC address spoofing and session hijacking attempts."],
    lessonsLearned: ["Configured 802.1X enterprise network security protocols."],
    metrics: [
      { label: "Active Sessions", value: "1,200+" },
      { label: "Peak Bandwidth Managed", value: "1 Gbps" }
    ],
    featured: false
  },
  {
    id: "statistical-forecast-engine",
    title: "Statistical Forecasting & Modeling Engine",
    subtitle: "Time-series predictive analytics suite built with Python & Scikit-Learn",
    description: "Data analytics platform implementing probability distributions, linear regression, and ARIMA forecasting models for real-world empirical data sets.",
    longDescription: "Leveraging academic foundations in Mathematics and Statistics, this project executes exploratory data analysis, hypothesis testing, and machine learning models for forecasting operational demands and economic variables.",
    category: "backend",
    tags: ["Python", "Pandas", "NumPy", "Statistics", "FastAPI"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com",
    liveUrl: "#",
    features: [
      "Automated time-series data cleaning and outlier detection algorithms",
      "Interactive regression analysis with confidence interval visualization",
      "FastAPI microservice endpoints serving low-latency predictions",
      "Comprehensive statistical summary reports with p-values and R² metrics"
    ],
    architecture: [
      "Modular Python analytics core utilizing NumPy, Pandas, and SciPy",
      "RESTful API endpoints wrapped with FastAPI and Pydantic validation",
      "Containerized deployment configuration for reproducible statistical pipelines"
    ],
    challenges: ["Managing non-stationary time series data with high seasonal volatility."],
    lessonsLearned: ["Applied differencing techniques and seasonal decomposition to achieve robust forecasting models."],
    metrics: [
      { label: "Model Accuracy (R²)", value: "0.94" },
      { label: "Inference Speed", value: "18ms" }
    ],
    featured: false
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "ICT Industrial Attachment (Attaché)",
    organization: "Emgwen Technical Training Institute (EmgTTI)",
    location: "Kenya",
    period: "May 2024 – August 2024",
    type: "On-site Internship",
    description: "Delivered hands-on technical support, network configuration, and educational training to students and institutional staff across multiple departments at EmgTTI.",
    responsibilities: [
      "Conducted computer literacy and productivity training sessions covering Microsoft Word, Excel, PowerPoint, and operating systems.",
      "Assisted in computer assembly, workstation hardware installation, operating system deployment, and preventative maintenance.",
      "Trained diploma and certificate students on networking fundamentals using Cisco Packet Tracer simulations.",
      "Demonstrated core network topologies (Star, Mesh, Hybrid), IP subnetting, and structured cabling practices.",
      "Diagnosed and resolved hardware faults, printer malfunctions, and LAN connectivity bottlenecks for administrative offices.",
      "Assisted in switch and router patch panel administration and server room cable management.",
      "Guided students through beginner-to-intermediate C++ and Python programming exercises in Code::Blocks and VS Code."
    ],
    technologies: [
      "Cisco Packet Tracer",
      "Windows & Linux Administration",
      "LAN Management",
      "Hardware Troubleshooting",
      "MS Office Suite",
      "Structured Cabling",
      "Python",
      "C++"
    ]
  },
  {
    id: "exp-2",
    role: "Freelance Software Developer & IT Consultant",
    organization: "Independent Practice",
    location: "Kenya (Remote)",
    period: "2023 – Present",
    type: "Freelance",
    description: "Designed, developed, and deployed custom software solutions and database systems for local businesses, community organizations, and student initiatives.",
    responsibilities: [
      "Architected bespoke web applications using Django, React, and PostgreSQL.",
      "Integrated mobile money payment gateways (M-Pesa Daraja API) for automated revenue collection.",
      "Consulted small business owners on ICT infrastructure upgrades and data backup strategies.",
      "Conducted code reviews and mentored junior computer science peers on Git workflows and REST API design."
    ],
    technologies: [
      "Django",
      "React",
      "PostgreSQL",
      "M-Pesa API",
      "Git & GitHub",
      "Tailwind CSS"
    ]
  }
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "cert-cisco",
    title: "Cisco Networking Fundamentals & Packet Tracer",
    issuer: "Cisco Networking Academy",
    year: "2024",
    credentialId: "CSCO-NET-2024-88",
    description: "Comprehensive credential covering IPv4/IPv6 addressing, VLAN configuration, router-on-a-stick routing, ACLs, NAT, and network security policies.",
    skills: ["Cisco Packet Tracer", "VLANs", "Subnetting", "Routing Protocols", "Network Security"],
    icon: "Network",
    verifyUrl: "https://www.netacad.com"
  },
  {
    id: "cert-python",
    title: "Python Programming & Algorithmic Design",
    issuer: "Certified Python Institute / OpenEDG",
    year: "2024",
    credentialId: "PY-ADV-9921-JK",
    description: "Demonstrated advanced proficiency in Object-Oriented Programming, data structures, algorithm optimization, file handling, and computational problem solving.",
    skills: ["Python 3", "OOP", "Data Structures", "Algorithms", "Exception Handling"],
    icon: "Code2",
    verifyUrl: "https://pythoninstitute.org"
  },
  {
    id: "cert-web",
    title: "Full-Stack Web Development: React & Django",
    issuer: "Tech Academy / Professional Development",
    year: "2024",
    credentialId: "WD-FULL-4432-JK",
    description: "End-to-end web engineering mastery focusing on modern React components, state management, RESTful APIs, Django backend architecture, and relational databases.",
    skills: ["React", "Django", "REST APIs", "Tailwind CSS", "PostgreSQL"],
    icon: "Globe",
    verifyUrl: "https://coursera.org"
  },
  {
    id: "cert-db",
    title: "Relational Database Management Systems",
    issuer: "Database Professional Institute",
    year: "2023",
    credentialId: "DBMS-SQL-7712-JK",
    description: "Rigorous certification covering schema normalization, complex SQL querying, indexing techniques, stored procedures, and database security.",
    skills: ["PostgreSQL", "MySQL", "Query Optimization", "Schema Design", "Transactions"],
    icon: "Database",
    verifyUrl: "https://oracle.com"
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Madam Elizabeth Tum",
    position: "Attachment Supervisor & Head of ICT",
    organization: "Emgwen Technical Training Institute (EmgTTI)",
    content: "Peter demonstrated exceptional technical aptitude, dedication, and professionalism throughout his ICT industrial attachment at EmgTTI. He was instrumental in maintaining our computer laboratories, configuring networking equipment, and guiding students through practical software and productivity exercises. I strongly recommend him for any software engineering or IT infrastructure role.",
    avatarText: "ET",
    rating: 5
  },
  {
    id: "test-2",
    name: "Dr. K. Mwangi",
    position: "Senior Lecturer, School of Computing & IT",
    organization: "Taita Taveta University",
    content: "Peter demonstrated exceptional technical skills and analytical problem-solving throughout his IT modules. His ability to synthesize modern software architectures, robust relational databases, and secure network design is outstanding.",
    avatarText: "KM",
    rating: 5
  },
  {
    id: "test-3",
    name: "Faith Chebet",
    position: "Lead Project Coordinator",
    organization: "TSafari Project Initiative",
    content: "Working with Peter on the TSafari platform was an absolute pleasure. He implemented the real-time Django Channels and M-Pesa payment integration flawlessly. His communication, punctuality, and clean code standards are world-class.",
    avatarText: "FC",
    rating: 5
  }
];

export const BLOG_POSTS: BlogPostItem[] = [
  {
    id: "post-1",
    title: "Mastering VLAN Segmentation & Inter-VLAN Routing with Cisco Packet Tracer",
    excerpt: "A practical guide to designing high-security campus topologies, configuring 802.1Q encapsulation, and securing departmental traffic.",
    date: "Sep 2024",
    readTime: "6 min read",
    category: "Networking",
    tags: ["Cisco", "VLAN", "Packet Tracer", "Security"],
    link: "#"
  },
  {
    id: "post-2",
    title: "Integrating Daraja M-Pesa API with Django Channels for Real-Time Booking",
    excerpt: "How to handle asynchronous STK push callbacks, maintain database idempotency, and push instant status updates to client frontends via WebSockets.",
    date: "Aug 2024",
    readTime: "8 min read",
    category: "Backend",
    tags: ["Django", "M-Pesa", "WebSockets", "Python"],
    link: "#"
  },
  {
    id: "post-3",
    title: "Why Statistics and Linear Algebra Make You a 10x Software Engineer",
    excerpt: "Connecting academic coursework in probability, matrices, and numerical analysis to real-world algorithms, machine learning, and database query optimization.",
    date: "Jul 2024",
    readTime: "5 min read",
    category: "Career & Tech",
    tags: ["Mathematics", "Algorithms", "Computer Science"],
    link: "#"
  }
];
