import {
  PERSONAL_INFO,
  PROJECTS_DATA
} from '../data/portfolioData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: {
    type: 'download_cv' | 'open_resume' | 'whatsapp' | 'email' | 'navigate_section' | 'navigate_project';
    label: string;
    target?: string;
  };
}

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
 * Intelligent semantic fallback understanding what the client asked before answering.
 */
const getFallbackRAGResponse = async (query: string): Promise<{ text: string; action?: ChatMessage['action'] }> => {
  const clean = query.trim().toLowerCase();
  const words = clean.split(/\s+/);
  await new Promise((resolve) => setTimeout(resolve, 200));

  // 1. Pure Greetings
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

  // 2. Who is Peter
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

  // 3. TSafari
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

  // 4. EVERGREEN Agrovet POS
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

  // 5. Cisco / Packet Tracer / Network Design
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

  // 6. E-Football Tournament
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

  // 7. General Projects List
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

  // 8. Python / Django
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

  // 9. React / TypeScript / Frontend
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

  // 10. Attachment / EmgTTI
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

  // 11. Contact / WhatsApp / Phone / Hire
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

  // 12. CV / Resume
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

  // 13. Location
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

  // 14. Thoughtful fallback reading the query
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

/**
 * Generate AI Response: First queries the separated backend /api/chat service
 * (where Gemini API keys and rotation are safely hosted). Falls back to local RAG if offline.
 */
export const generateAiResponse = async (
  query: string,
  history: { sender: 'user' | 'assistant'; text: string }[] = []
): Promise<{ text: string; action?: ChatMessage['action'] }> => {
  const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const endpoint = `${apiUrl}/api/chat`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: query,
        history: history.slice(-8)
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data?.success && data?.data?.text) {
        return {
          text: data.data.text,
          action: data.data.action
        };
      }
    }

    console.warn(`[AI Assistant] Backend returned status ${response.status}. Falling back to client-side RAG.`);
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.warn('[AI Assistant] Could not reach backend /api/chat. Seamlessly using offline RAG knowledge base.', err);
  }

  return getFallbackRAGResponse(query);
};
