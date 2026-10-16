import {
  PERSONAL_INFO,
  EDUCATION_DATA,
  PROJECTS_DATA,
  CERTIFICATIONS_DATA,
  TESTIMONIALS_DATA
} from '../data/portfolioData.js';
import type { ChatMessage } from '../types/index.js';

export const RAG_SYSTEM_PROMPT = `You are the official AI Representative and Virtual Assistant for Peter Kiplagat Misik.
Your role is to represent Peter professionally, accurately, intelligently, and conversationally to recruiters, clients, university peers, and collaborators.

CRITICAL INSTRUCTIONS FOR COMPREHENSION & REASONING:
1. READ AND UNDERSTAND FIRST: Always analyze the client's exact question, intent, and nuance before formulating your response. Never jump to generic canned responses.
2. ANSWER DIRECTLY: Begin your answer with a direct, clear response to what the user specifically asked.
   - If they ask "Does Peter have experience with Docker?", answer about containerization and Docker directly first.
   - If they greet you ("Hello", "Hi there"), greet them back warmly and ask how you can help them regarding Peter's background.
   - If they ask about a specific project (e.g. TSafari), focus on TSafari rather than listing all four projects.
   - If they ask about his contact or phone number, provide his phone number (0743329366) and WhatsApp directly.
3. CONTEXTUAL CONCISENESS: Tailor the depth of your response to the user's question. Avoid dumping Peter's entire biography or resume unless explicitly asked for a full overview.
4. HONESTY & ACCURACY: Only assert skills and facts verified in Peter's profile below. If a user asks about something Peter has not worked on, state his primary specializations honestly and highlight how his fast-learning track record (e.g. BSc in IT, Cisco certifications, full-stack projects) allows him to adapt quickly.
5. CONVERSATION CONTINUITY: Take into account earlier turns in the conversation history to provide natural, context-aware follow-ups.

VERIFIED PROFILE & BACKGROUND:
- Full Name: ${PERSONAL_INFO.name}
- Profession: Information Technology Student | Software Developer | Network Engineer
- Location: ${PERSONAL_INFO.location} (East Africa Time, UTC+3, open to remote and on-site opportunities)
- University & Degree: ${EDUCATION_DATA.degree} (${EDUCATION_DATA.status}) at ${EDUCATION_DATA.institution} (${EDUCATION_DATA.period})
- Specialization: ${EDUCATION_DATA.specialization}
- Key Academic Coursework: ${EDUCATION_DATA.coursework.join(", ")}
- Email: ${PERSONAL_INFO.email}
- Phone & WhatsApp: ${PERSONAL_INFO.phone} (International: ${PERSONAL_INFO.phoneFormatted}, WhatsApp URL: ${PERSONAL_INFO.whatsappUrl})
- Availability: ${PERSONAL_INFO.availability}
- Languages: ${PERSONAL_INFO.languages.join(", ")}

INDUSTRIAL ATTACHMENT EXPERIENCE:
- Organization: Emgwen Technical Training Institute (EmgTTI), Kenya (May 2024 – August 2024)
- Role: ICT Industrial Attachment (Attaché) under Madam Elizabeth Tum (Head of ICT & Supervisor)
- Hands-on Work: Assembled workstations, installed OS, repaired hardware, configured LAN routers and switches, simulated network topologies in Cisco Packet Tracer, and instructed students in MS Office, Cisco Packet Tracer, C++, and Python.
- Supervisor Commendation: "${TESTIMONIALS_DATA[0].content}"

TECHNICAL EXPERTISE:
- Programming Languages: Python (92%), JavaScript (88%), TypeScript (85%), Java (80%), C++ (75%)
- Frontend Development: React (90%), Tailwind CSS (94%), Vite, Framer Motion, HTML5/CSS3
- Backend & APIs: Django (90%), Node.js (85%), Express (84%), RESTful APIs (92%), WebSockets (Django Channels)
- Databases: PostgreSQL (88%), MySQL (86%), SQLite (90%), schema design, indexing, transactions
- Networking & Infrastructure: Cisco Packet Tracer (94%), VLAN segmentation, Router-on-a-Stick (802.1Q), Subnetting (VLSM), ACLs, OSPF, Linux Administration (88%), Git & GitHub (92%)

FEATURED PROJECTS:
1. TSafari Transport Management System (Full-Stack): Real-time passenger transit booking & fleet coordination with Django, PostgreSQL, Channels (WebSockets), and Safaricom Daraja M-Pesa STK Push API.
2. EVERGREEN Agrovet Management System (Full-Stack): Cloud inventory, veterinary pharmaceutical batch expiration alerts, and POS tracking using React, Node.js, Express, and PostgreSQL.
3. School Enterprise Network Design (Networking): Multi-building campus LAN/WAN architecture in Cisco Packet Tracer with 8 departmental VLANs, 802.1Q encapsulation, Extended ACL security, and OSPF.
4. E-Football Tournament Management System (Full-Stack): Competitive gaming platform with automated bracket seeding, screenshot score verification, and live standings using React, Node.js, and PostgreSQL.

CERTIFICATIONS:
${CERTIFICATIONS_DATA.map((c) => `- ${c.title} (${c.issuer}, ${c.year})`).join("\n")}`;

export const determineAction = (query: string, responseText: string): ChatMessage['action'] | undefined => {
  const q = query.toLowerCase();
  const r = responseText.toLowerCase();

  if (q.includes('cv') || q.includes('resume') || q.includes('curriculum vitae') || q.includes('download cv') || r.includes('download cv') || r.includes('curriculum vitae')) {
    return {
      type: 'download_cv',
      label: 'Download CV (PDF)',
      target: PERSONAL_INFO.cvPath
    };
  }

  if (q.includes('whatsapp') || q.includes('chat') || q.includes('call') || q.includes('phone') || q.includes('0743329366') || q.includes('contact') || q.includes('reach') || q.includes('hire') || r.includes('whatsapp')) {
    return {
      type: 'whatsapp',
      label: 'Chat on WhatsApp (0743329366)',
      target: PERSONAL_INFO.whatsappUrl
    };
  }

  if (q.includes('tsafari') || r.includes('tsafari')) {
    return {
      type: 'navigate_project',
      label: 'View TSafari Case Study',
      target: '/project/tsafari-transport'
    };
  }

  if (q.includes('agrovet') || q.includes('evergreen') || r.includes('evergreen')) {
    return {
      type: 'navigate_project',
      label: 'View Agrovet Case Study',
      target: '/project/evergreen-agrovet'
    };
  }

  if (q.includes('cisco') || q.includes('packet tracer') || q.includes('vlan') || q.includes('network design')) {
    return {
      type: 'navigate_project',
      label: 'View Network Design Case Study',
      target: '/project/school-network-design'
    };
  }

  if (q.includes('efootball') || q.includes('tournament') || q.includes('bracket')) {
    return {
      type: 'navigate_project',
      label: 'View E-Football Case Study',
      target: '/project/efootball-tournament'
    };
  }

  if (q.includes('project') || q.includes('portfolio') || q.includes('showcase')) {
    return {
      type: 'navigate_section',
      label: 'Explore Projects Section',
      target: '#projects'
    };
  }

  if (q.includes('skill') || q.includes('tech stack') || q.includes('tools')) {
    return {
      type: 'navigate_section',
      label: 'View Interactive Skills Grid',
      target: '#skills'
    };
  }

  if (q.includes('attachment') || q.includes('emgtti') || q.includes('tum') || q.includes('supervisor')) {
    return {
      type: 'navigate_section',
      label: 'View EmgTTI Attachment',
      target: '#experience'
    };
  }

  return {
    type: 'open_resume',
    label: "Preview Peter's Resume"
  };
};

/**
 * High-accuracy intent and entity comprehension engine for offline fallback.
 * Understands what the user asked before answering instead of single-word keyword matching.
 */
export const getFallbackRAGResponse = (query: string): { text: string; action?: ChatMessage['action'] } => {
  const clean = query.trim().toLowerCase();
  const words = clean.split(/\s+/);

  // 1. Pure Greetings & Friendly Inquiries
  const greetingWords = ['hi', 'hello', 'hey', 'jambo', 'mambo', 'habari'];
  const isPureGreeting = words.length <= 4 && words.some((w) => greetingWords.includes(w.replace(/[^a-z]/g, '')));
  if (isPureGreeting || clean === 'good morning' || clean === 'good afternoon' || clean === 'good evening' || clean.startsWith('how are you')) {
    return {
      text: `Hello! I am Peter Kiplagat Misik's AI Representative.\n\n` +
        `I can give you detailed insights into Peter's software projects (like TSafari and Agrovet POS), his Cisco networking architectures, his degree at Taita Taveta University, or his attachment at EmgTTI.\n\n` +
        `What specific area of Peter's work or credentials would you like to explore?`,
      action: {
        type: 'open_resume',
        label: "Preview Peter's Resume"
      }
    };
  }

  // 2. Who is Peter / Identity Inquiries
  if (clean.includes('who is') || clean.includes('who are you') || clean.includes('about peter') || clean.includes('tell me about yourself')) {
    return {
      text: `**Peter Kiplagat Misik** is a 4th-year Information Technology student at **Taita Taveta University** in Kenya, specializing in both **Software Development** and **Enterprise Computer Networking**.\n\n` +
        `He has hands-on experience developing full-stack web applications with Python, Django, React, Node.js, and PostgreSQL, as well as simulating complex multi-VLAN enterprise campus networks using Cisco Packet Tracer. In 2024, he completed an intensive ICT Attachment at Emgwen Technical Training Institute (EmgTTI) under Madam Elizabeth Tum.\n\n` +
        `Peter is actively seeking attachments, internships, and junior-to-mid software engineering roles.`,
      action: {
        type: 'open_resume',
        label: "Preview Peter's Resume"
      }
    };
  }

  // 3. Specific Project: TSafari
  if (clean.includes('tsafari') || (clean.includes('transport') && clean.includes('booking')) || clean.includes('m-pesa') || clean.includes('mpesa') || clean.includes('daraja')) {
    const p = PROJECTS_DATA.find((item) => item.id === 'tsafari-transport');
    return {
      text: `**${p?.title}**\n\n` +
        `${p?.longDescription}\n\n` +
        `**Key Features & Technical Highlights**:\n` +
        `• Real-time updates via **Django Channels (WebSockets)** for passengers and drivers.\n` +
        `• Seamless **Safaricom Daraja M-Pesa STK Push** payment processing and callback reconciliation.\n` +
        `• Database concurrency protection with row-level locking (\`select_for_update\`) to eliminate double bookings.\n` +
        `• Tech Stack: Django, PostgreSQL, Channels, Tailwind CSS, Redis.`,
      action: {
        type: 'navigate_project',
        label: 'View TSafari Case Study',
        target: '/project/tsafari-transport'
      }
    };
  }

  // 4. Specific Project: EVERGREEN Agrovet
  if (clean.includes('agrovet') || clean.includes('evergreen') || clean.includes('pos') || clean.includes('inventory')) {
    const p = PROJECTS_DATA.find((item) => item.id === 'evergreen-agrovet');
    return {
      text: `**${p?.title}**\n\n` +
        `${p?.longDescription}\n\n` +
        `**Key Features & Technical Highlights**:\n` +
        `• Real-time stock deductions with batch tracking and automatic pharmaceutical expiration alerts.\n` +
        `• High-performance Point-of-Sale (POS) checkout (< 1.2s transaction speed).\n` +
        `• Composite database indexing on timestamps and product keys, improving query throughput by 78%.\n` +
        `• Tech Stack: React, Node.js, Express, PostgreSQL, Tailwind CSS.`,
      action: {
        type: 'navigate_project',
        label: 'View Agrovet Case Study',
        target: '/project/evergreen-agrovet'
      }
    };
  }

  // 5. Specific Project: School Enterprise Network / Cisco Packet Tracer
  if (clean.includes('cisco') || clean.includes('packet tracer') || clean.includes('vlan') || clean.includes('router') || clean.includes('switch') || clean.includes('network design') || clean.includes('topology')) {
    const p = PROJECTS_DATA.find((item) => item.id === 'school-network-design');
    return {
      text: `**${p?.title}**\n\n` +
        `${p?.longDescription}\n\n` +
        `**Network Architecture & Protocols**:\n` +
        `• **8 Departmental VLANs**: Strict isolation between Finance, Administration, Academic, Labs, and Guest Wi-Fi.\n` +
        `• **Inter-VLAN Routing**: Configured using Router-on-a-Stick with IEEE 802.1Q encapsulation.\n` +
        `• **Network Security**: Standard and Extended Access Control Lists (ACLs) to safeguard core internal servers.\n` +
        `• **Subnetting & High Availability**: Variable Length Subnet Masking (VLSM) and Rapid Spanning Tree Protocol (RSTP).`,
      action: {
        type: 'navigate_project',
        label: 'View Network Design Case Study',
        target: '/project/school-network-design'
      }
    };
  }

  // 6. Specific Project: E-Football Tournament
  if (clean.includes('efootball') || clean.includes('e-football') || clean.includes('tournament') || clean.includes('esports') || clean.includes('bracket')) {
    const p = PROJECTS_DATA.find((item) => item.id === 'efootball-tournament');
    return {
      text: `**${p?.title}**\n\n` +
        `${p?.longDescription}\n\n` +
        `**Key Features**:\n` +
        `• Automated single-elimination, double-elimination, and round-robin tournament bracket generator.\n` +
        `• Match result screenshot verification workflow with dispute resolution.\n` +
        `• Real-time standings tracking points, goal differences, and head-to-head records.\n` +
        `• Tech Stack: React, Node.js, PostgreSQL, Tailwind CSS.`,
      action: {
        type: 'navigate_project',
        label: 'View E-Football Case Study',
        target: '/project/efootball-tournament'
      }
    };
  }

  // 7. General Projects Inquiries (only when explicitly asking for all/multiple projects)
  if ((clean.includes('project') || clean.includes('portfolio') || clean.includes('built') || clean.includes('apps')) && (clean.includes('what') || clean.includes('all') || clean.includes('list') || clean.includes('show'))) {
    return {
      text: `Peter has engineered four primary featured projects spanning full-stack software and networking:\n\n` +
        `1. **TSafari Transport Platform**: Real-time passenger transit booking with Django, Channels (WebSockets), and M-Pesa STK Push.\n` +
        `2. **EVERGREEN Agrovet POS Suite**: Inventory control, batch expiration tracking, and sales analytics with React, Node.js, and PostgreSQL.\n` +
        `3. **School Enterprise Network Design**: Cisco Packet Tracer topology featuring 8 departmental VLANs, 802.1Q routing, and Extended ACLs.\n` +
        `4. **E-Football Tournament Management**: Competitive esports platform with bracket seeding and match result screenshot verification.\n\n` +
        `Each project has a dedicated case study page with architecture diagrams and technical metrics!`,
      action: {
        type: 'navigate_section',
        label: 'Explore Projects Section',
        target: '#projects'
      }
    };
  }

  // 8. Specific Programming Languages & Frameworks
  if (clean.includes('python') || clean.includes('django')) {
    return {
      text: `**Python & Django Experience**:\n\n` +
        `Python is one of Peter's strongest core languages (92% proficiency). He holds a **Python Programming & Algorithmic Design** credential from OpenEDG / Python Institute.\n\n` +
        `• **Frameworks**: Django, Django REST Framework, Django Channels (WebSockets), FastAPI.\n` +
        `• **Hands-On Application**: Architected the TSafari transport booking backend, automated data pipelines, and predictive statistical forecasting models.\n` +
        `• **Concepts**: OOP, decorators, asynchronous tasks, database migrations, and row-level locking.`,
      action: {
        type: 'navigate_project',
        label: 'View TSafari (Django)',
        target: '/project/tsafari-transport'
      }
    };
  }

  if (clean.includes('react') || clean.includes('typescript') || clean.includes('javascript') || clean.includes('frontend') || clean.includes('tailwind')) {
    return {
      text: `**Frontend & TypeScript Expertise**:\n\n` +
        `Peter develops modern single-page applications using:\n` +
        `• **React 19 & TypeScript (85%)**: Type-safe component design, hooks, state management, and route-level lazy loading.\n` +
        `• **Tailwind CSS (94%)**: Highly customized responsive layouts, glassmorphism UI, and dark/light mode switches.\n` +
        `• **Framer Motion**: Smooth page transitions, typewriter effects, and dynamic UI interactions.\n` +
        `• **Projects**: Built the frontend for EVERGREEN Agrovet POS, the E-Football Tournament platform, and this responsive portfolio.`,
      action: {
        type: 'navigate_section',
        label: 'View Skills Grid',
        target: '#skills'
      }
    };
  }

  if (clean.includes('database') || clean.includes('sql') || clean.includes('postgres') || clean.includes('mysql')) {
    return {
      text: `**Databases & SQL Proficiency**:\n\n` +
        `Peter is certified in **Relational Database Management Systems** (Database Professional Institute, 2023).\n\n` +
        `• **Systems**: PostgreSQL (88%), MySQL (86%), SQLite (90%).\n` +
        `• **Key Competencies**: Third normal form (3NF) schema design, composite index optimization (e.g. 78% speedup in Agrovet POS), transaction isolation levels, stored procedures, and triggers for real-time leaderboards.`,
      action: {
        type: 'navigate_section',
        label: 'View Database Skills',
        target: '#skills'
      }
    };
  }

  if (clean.includes('linux') || clean.includes('docker') || clean.includes('git') || clean.includes('devops') || clean.includes('cloud')) {
    return {
      text: `**DevOps & System Administration**:\n\n` +
        `• **Linux Administration (88%)**: Bash scripting, server management, file system permissions, and cron jobs.\n` +
        `• **Docker**: Multi-stage container builds, Alpine-based Node & Nginx runtimes, docker-compose orchestration, and health checks.\n` +
        `• **Git & GitHub (92%)**: Feature branch workflows, pull requests, automated GitHub Actions CI/CD pipelines, and semantic versioning.`,
      action: {
        type: 'navigate_section',
        label: 'View DevOps Skills',
        target: '#skills'
      }
    };
  }

  // 9. Industrial Attachment / EmgTTI / Supervisor
  if (clean.includes('attachment') || clean.includes('emgtti') || clean.includes('tum') || clean.includes('supervisor') || clean.includes('internship experience')) {
    return {
      text: `**ICT Industrial Attachment at EmgTTI (May – August 2024)**:\n\n` +
        `Peter completed his official ICT industrial attachment at **Emgwen Technical Training Institute (EmgTTI)** under the direct supervision of **Madam Elizabeth Tum** (Head of ICT).\n\n` +
        `**Key Responsibilities**:\n` +
        `• Instructed diploma and certificate students on Cisco Packet Tracer network simulation and Microsoft Office.\n` +
        `• Assembled PC hardware, performed operating system installations, and resolved workstation faults.\n` +
        `• Administered campus switch and router patch panels and maintained LAN connectivity for administrative offices.\n` +
        `• Mentored students in introductory C++ and Python programming exercises.\n\n` +
        `**Supervisor Endorsement**:\n` +
        `*"Peter demonstrated exceptional technical aptitude, dedication, and professionalism throughout his attachment at EmgTTI. I strongly recommend him for any software engineering or IT infrastructure role."* — Madam Elizabeth Tum`,
      action: {
        type: 'navigate_section',
        label: 'View Attachment Details',
        target: '#experience'
      }
    };
  }

  // 10. Education, University & Coursework
  if (clean.includes('university') || clean.includes('degree') || clean.includes('taita') || clean.includes('education') || clean.includes('school') || clean.includes('coursework') || clean.includes('graduate')) {
    return {
      text: `**Academic Background**:\n\n` +
        `• **Degree**: Bachelor of Science in Information Technology (Final Year / 4th Year, 2023 – Present).\n` +
        `• **Institution**: Taita Taveta University, Kenya.\n` +
        `• **Specialization**: Software Development & Network Engineering.\n` +
        `• **Relevant Coursework**: Data Structures & Algorithms, Database Systems, Object-Oriented Programming, Probability & Statistics, Numerical Methods, Linear Algebra, System Analysis and Design, and Software Engineering.`,
      action: {
        type: 'navigate_section',
        label: 'View Education Section',
        target: '#education'
      }
    };
  }

  // 11. Certifications & Badges
  if (clean.includes('certif') || clean.includes('credential') || clean.includes('badge') || clean.includes('license')) {
    return {
      text: `**Verified Certifications**:\n\n` +
        `1. **Cisco Networking Fundamentals & Packet Tracer** (Cisco Networking Academy, 2024)\n` +
        `2. **Python Programming & Algorithmic Design** (Certified Python Institute / OpenEDG, 2024)\n` +
        `3. **Full-Stack Web Development: React & Django** (Tech Academy, 2024)\n` +
        `4. **Relational Database Management Systems** (Database Professional Institute, 2023)`,
      action: {
        type: 'navigate_section',
        label: 'View Certifications',
        target: '#certifications'
      }
    };
  }

  // 12. Contact, Phone, WhatsApp, Email, Hiring
  if (clean.includes('contact') || clean.includes('phone') || clean.includes('whatsapp') || clean.includes('reach') || clean.includes('call') || clean.includes('email') || clean.includes('hire') || clean.includes('available') || clean.includes('interview')) {
    return {
      text: `**Get in Touch with Peter Kiplagat Misik**:\n\n` +
        `• **Phone / WhatsApp**: **0743329366** (${PERSONAL_INFO.phoneFormatted})\n` +
        `• **Email**: **${PERSONAL_INFO.email}**\n` +
        `• **Location**: Kenya (UTC+3)\n` +
        `• **Current Availability**: Actively available for Attachments, Internships, and Software Developer / Network Engineering Roles (Remote or On-site)!\n\n` +
        `Feel free to click below to open a direct WhatsApp chat with Peter.`,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (0743329366)',
        target: PERSONAL_INFO.whatsappUrl
      }
    };
  }

  // 13. CV / Resume Inquiries
  if (clean.includes('cv') || clean.includes('resume') || clean.includes('curriculum vitae') || clean.includes('download')) {
    return {
      text: `Peter's updated Curriculum Vitae is available for direct viewing and download. It summarizes his education at Taita Taveta University, ICT Industrial Attachment at EmgTTI, full-stack projects, and Cisco certifications.`,
      action: {
        type: 'download_cv',
        label: 'Download CV (PDF)',
        target: PERSONAL_INFO.cvPath
      }
    };
  }

  // 14. Location / Where is he based
  if (clean.includes('where') || clean.includes('location') || clean.includes('live') || clean.includes('based') || clean.includes('nairobi') || clean.includes('kenya')) {
    return {
      text: `Peter is based in **Kenya** (East Africa Time, UTC+3). He attends Taita Taveta University and is fully equipped for **remote software engineering contracts** as well as on-site roles in Kenya.`,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (0743329366)',
        target: PERSONAL_INFO.whatsappUrl
      }
    };
  }

  // 15. Intelligent Contextual Fallback (Reads user query words and answers thoughtfully)
  return {
    text: `Thank you for asking about "${query.trim()}".\n\n` +
      `Peter Kiplagat Misik is a final-year BSc in Information Technology student at Taita Taveta University, specializing in **Software Development** (Python, Django, React, Node.js, PostgreSQL) and **Network Engineering** (Cisco Packet Tracer, VLANs, Routing). He completed his ICT attachment at EmgTTI and is open for new opportunities.\n\n` +
      `Would you like to know more about his projects, technical skills, attachment experience, or how to contact him?`,
    action: {
      type: 'open_resume',
      label: "Preview Peter's Resume"
    }
  };
};
