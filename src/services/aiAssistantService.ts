import {
  PERSONAL_INFO,
  SKILLS_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  TESTIMONIALS_DATA
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

// Google Gemini API Keys Pool configured via environment variables (.env / VITE_GEMINI_API_KEYS)
const DEFAULT_GEMINI_API_KEYS: string[] = [];

// Helper to retrieve all configured keys from env or defaults
const getApiKeyPool = (): string[] => {
  const envKeysRaw = import.meta.env.VITE_GEMINI_API_KEYS;
  const singleKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (envKeysRaw && typeof envKeysRaw === 'string') {
    const parsed = envKeysRaw
      .split(',')
      .map((k: string) => k.trim())
      .filter((k: string) => k.length > 0);
    if (parsed.length > 0) return parsed;
  }

  if (singleKey && typeof singleKey === 'string' && singleKey.trim().length > 0) {
    return [singleKey.trim(), ...DEFAULT_GEMINI_API_KEYS.filter((k) => k !== singleKey.trim())];
  }

  return DEFAULT_GEMINI_API_KEYS;
};

// Pointer for round-robin rotation across requests
let activeKeyIndex = 0;

/**
 * Returns API keys ordered starting from the current rotation index.
 * This distributes load and provides instant failover to remaining keys.
 */
const getOrderedKeys = (): string[] => {
  const pool = getApiKeyPool();
  const ordered: string[] = [];
  for (let i = 0; i < pool.length; i++) {
    ordered.push(pool[(activeKeyIndex + i) % pool.length]);
  }
  return ordered;
};

// Complete RAG Context compiled from verified portfolio data
const RAG_SYSTEM_PROMPT = `You are the official AI Representative and Virtual Assistant for Peter Kiplagat Misik.
Your role is to represent Peter professionally, accurately, and enthusiastically to recruiters, clients, university peers, and collaborators.

PROFILE & VERIFIED BACKGROUND:
- Name: ${PERSONAL_INFO.name}
- Profession: Information Technology Student | Software Developer | Network Engineer
- Current Education: ${EDUCATION_DATA.degree} (${EDUCATION_DATA.status}) at ${EDUCATION_DATA.institution} (2023 – Present).
- Specialization: ${EDUCATION_DATA.specialization}
- Relevant Coursework: ${EDUCATION_DATA.coursework.join(", ")}
- Location: ${PERSONAL_INFO.location} (East Africa Time, UTC+3)
- Email: ${PERSONAL_INFO.email}
- Phone: ${PERSONAL_INFO.phone} (Formatted: ${PERSONAL_INFO.phoneFormatted})
- WhatsApp: ${PERSONAL_INFO.whatsappUrl} (Number: ${PERSONAL_INFO.phone})
- Availability: ${PERSONAL_INFO.availability}

INDUSTRIAL ATTACHMENT EXPERIENCE:
- Institution: Emgwen Technical Training Institute (EmgTTI)
- Supervisor: Madam Elizabeth Tum (Head of ICT & Attachment Supervisor)
- Role: ICT Industrial Attachment (Attaché)
- Responsibilities: Computer assembly, OS installation, hardware troubleshooting, preventative maintenance; network topology simulation and design in Cisco Packet Tracer; training diploma and certificate students on Cisco Packet Tracer, Microsoft Office, and programming fundamentals; LAN troubleshooting and network maintenance.
- Endorsement by Madam Elizabeth Tum: "${TESTIMONIALS_DATA[0].content}"

TECHNICAL SKILLS:
- Programming Languages: ${SKILLS_DATA.filter((s) => s.category === 'programming').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- Frontend Development: ${SKILLS_DATA.filter((s) => s.category === 'frontend').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- Backend Development: ${SKILLS_DATA.filter((s) => s.category === 'backend').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- Databases: ${SKILLS_DATA.filter((s) => s.category === 'databases').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- Networking & Infrastructure: ${SKILLS_DATA.filter((s) => s.category === 'networking').map((s) => `${s.name} (${s.level}%)`).join(", ")}
- DevOps & Tools: ${SKILLS_DATA.filter((s) => s.category === 'tools').map((s) => `${s.name} (${s.level}%)`).join(", ")}

KEY PROJECTS:
1. TSafari Transport Management System: Real-time passenger booking and fleet coordination. Stack: Django, PostgreSQL, Tailwind CSS, Channels (WebSockets), Safaricom Daraja M-Pesa STK Push API.
2. EVERGREEN Agrovet Management System: Inventory control, veterinary pharmaceutical batch expiration tracking, and POS sales. Stack: React, Node.js, Express, PostgreSQL.
3. School Enterprise Network Design: Comprehensive multi-building campus network with departmental VLAN segmentation, Router-on-a-Stick (802.1Q encapsulation), Access Control Lists (ACLs), DHCP routing, and redundant spanning tree. Stack: Cisco Packet Tracer.
4. E-Football Tournament Management System: Esports competition platform with automated bracket seeding, screenshot score verification, and live leaderboards. Stack: React, Node.js, PostgreSQL.

CERTIFICATIONS:
${CERTIFICATIONS_DATA.map((c) => `- ${c.title} by ${c.issuer} (${c.year})`).join("\n")}

GUIDELINES FOR RESPONSES:
1. Always respond directly and specifically to the client's request or inquiry. Never reply with generic repetitive statements.
2. Maintain a polite, confident, articulate, and professional tone on Peter Kiplagat Misik's behalf.
3. Reference specific details, numbers, tech stacks, or accomplishments that match what the client is asking.
4. If asked about contacts or WhatsApp, explicitly provide his phone number (0743329366) and mention WhatsApp availability.
5. If asked about his attachment or Madam Elizabeth Tum, highlight her strong recommendation and his hands-on work at EmgTTI.
6. If asked for his resume/CV, let the user know they can download it or preview it directly in the app.
7. Format your response cleanly with concise paragraphs and markdown bullet points where appropriate.`;

// Determine dynamic action button based on user query & AI response
const determineAction = (query: string, responseText: string): ChatMessage['action'] | undefined => {
  const q = query.toLowerCase();
  const r = responseText.toLowerCase();

  if (q.includes('cv') || q.includes('resume') || q.includes('curriculum vitae') || q.includes('download') || r.includes('curriculum vitae') || r.includes('download cv') || r.includes('resume')) {
    return {
      type: 'download_cv',
      label: 'Download CV (PDF)',
      target: PERSONAL_INFO.cvPath
    };
  }

  if (q.includes('whatsapp') || q.includes('chat') || q.includes('text') || q.includes('0743329366') || r.includes('whatsapp') || q.includes('call') || q.includes('reach') || q.includes('hire') || q.includes('contact')) {
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

  if (q.includes('network') || q.includes('cisco') || q.includes('packet tracer') || q.includes('vlan')) {
    return {
      type: 'navigate_project',
      label: 'View Network Design Case Study',
      target: '/project/school-network-design'
    };
  }

  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('built')) {
    return {
      type: 'navigate_section',
      label: 'Explore Projects Section',
      target: '#projects'
    };
  }

  if (q.includes('skill') || q.includes('language') || q.includes('stack') || q.includes('tech') || q.includes('experience')) {
    return {
      type: 'navigate_section',
      label: 'View Interactive Skills Grid',
      target: '#skills'
    };
  }

  if (q.includes('attachment') || q.includes('emgtti') || q.includes('tum') || q.includes('supervisor')) {
    return {
      type: 'navigate_section',
      label: 'View EmgTTI Experience',
      target: '#experience'
    };
  }

  return {
    type: 'open_resume',
    label: 'Preview Peter\'s Resume'
  };
};

/**
 * Generate AI Response using Google Gemini API with multi-key load balancing,
 * automatic failover across keys, and resilient local fallback.
 */
export const generateAiResponse = async (
  query: string,
  history: { sender: 'user' | 'assistant'; text: string }[] = []
): Promise<{ text: string; action?: ChatMessage['action'] }> => {
  const keys = getOrderedKeys();
  const primaryModel = import.meta.env.VITE_GEMINI_MODEL || 'gemini-3.5-flash-lite';
  const candidateModels = [primaryModel, 'gemini-3.1-flash-lite', 'gemini-3.8-flash'].filter(
    (val, idx, arr) => arr.indexOf(val) === idx
  );

  // Construct Gemini conversation payload with history & RAG instructions
  const contents: Array<{ role: 'user' | 'model'; parts: { text: string }[] }> = [];

  const validHistory = history
    .slice(-8)
    .filter((msg) => msg.text && msg.text.trim().length > 0);

  for (const msg of validHistory) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: query }]
  });

  const requestBody = {
    systemInstruction: {
      parts: [{ text: RAG_SYSTEM_PROMPT }]
    },
    contents,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 600,
      topP: 0.95
    }
  };

  let lastError: unknown = null;

  // Attempt requests across the pool of API keys (failover & load balancing)
  for (let kIdx = 0; kIdx < keys.length; kIdx++) {
    const key = keys[kIdx];

    for (let mIdx = 0; mIdx < candidateModels.length; mIdx++) {
      const model = candidateModels[mIdx];
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

          if (replyText) {
            // Update active rotation index to distribute future queries across keys
            activeKeyIndex = (activeKeyIndex + kIdx + 1) % keys.length;
            const action = determineAction(query, replyText);
            return { text: replyText, action };
          }
        }

        const errorText = await response.text();
        console.warn(
          `Gemini API returned status ${response.status} on key [${kIdx + 1}/${keys.length}] model ${model}:`,
          errorText
        );
        lastError = new Error(`HTTP ${response.status}: ${errorText}`);

        // If rate limit (429) or quota error (403), switch immediately to the next key
        if (response.status === 429 || response.status === 403) {
          break;
        }
      } catch (networkErr) {
        clearTimeout(timeoutId);
        console.warn(`Request failed on key [${kIdx + 1}/${keys.length}] model ${model}:`, networkErr);
        lastError = networkErr;
        // Continue to next model or key
      }
    }
  }

  console.error('All Gemini API keys and models exhausted. Using resilient fallback knowledge base:', lastError);
  return getFallbackRAGResponse(query);
};

// Resilient local RAG fallback in case of offline mode or temporary network disconnect
const getFallbackRAGResponse = async (query: string): Promise<{ text: string; action?: ChatMessage['action'] }> => {
  const q = query.toLowerCase().trim();
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (q.includes('cv') || q.includes('resume') || q.includes('curriculum') || q.includes('download')) {
    return {
      text: `You can view or download Peter Kiplagat Misik's complete Curriculum Vitae directly. It details his BSc in Information Technology from Taita Taveta University, hands-on ICT attachment at EmgTTI, software engineering projects, and Cisco certifications.`,
      action: {
        type: 'download_cv',
        label: 'Download CV (PDF)',
        target: PERSONAL_INFO.cvPath
      }
    };
  }

  if (q.includes('whatsapp') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('reach') || q.includes('contact') || q.includes('email')) {
    return {
      text: `You can reach Peter directly on WhatsApp or phone at **${PERSONAL_INFO.phone}** (${PERSONAL_INFO.phoneFormatted}) or via email at **${PERSONAL_INFO.email}**. He responds promptly to inquiries regarding software development, networking contracts, and attachment opportunities.`,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (0743329366)',
        target: PERSONAL_INFO.whatsappUrl
      }
    };
  }

  if (q.includes('attachment') || q.includes('emgtti') || q.includes('emgwen') || q.includes('tum') || q.includes('elizabeth') || q.includes('experience')) {
    return {
      text: `Peter completed his ICT Industrial Attachment at **Emgwen Technical Training Institute (EmgTTI)** under the supervision of **Madam Elizabeth Tum (Head of ICT)**.

His core responsibilities included:
• Computer assembly, workstation setup, and hardware troubleshooting
• Network design and cabling implementation using Cisco Packet Tracer
• Instructing diploma students on networking fundamentals, topologies, and office productivity tools
• Diagnosing and resolving LAN bottlenecks for administrative offices

Madam Elizabeth Tum commended Peter for his reliability, technical competence, and patience in mentoring students!`,
      action: {
        type: 'navigate_section',
        label: 'View Experience Timeline',
        target: '#experience'
      }
    };
  }

  if (q.includes('tsafari') || (q.includes('transport') && q.includes('booking'))) {
    return {
      text: `**TSafari Transport Management System** is a real-time booking and fleet coordination platform engineered by Peter Kiplagat Misik.

Key technical highlights:
• **Backend**: Django with Django Channels (WebSockets) for real-time seat locks and fleet tracking
• **Mobile Payments**: Safaricom Daraja M-Pesa STK Push API integration with automated callback reconciliation
• **Database**: PostgreSQL with transactional concurrency control
• **Frontend**: Modern responsive UI styled with Tailwind CSS`,
      action: {
        type: 'navigate_project',
        label: 'View TSafari Case Study',
        target: '/project/tsafari-transport'
      }
    };
  }

  if (q.includes('agrovet') || q.includes('evergreen') || q.includes('pos') || q.includes('inventory')) {
    return {
      text: `**EVERGREEN Agrovet Management System** is a point-of-sale and inventory control suite developed for agricultural and veterinary retail.

Key capabilities:
• Real-time stock deductions and automated expiry notifications for pharmaceuticals
• Barcode scanning and batch tracking
• Daily profit/loss ledger generation and sales reconciliation
• Built using React, Node.js, Express, and PostgreSQL`,
      action: {
        type: 'navigate_project',
        label: 'View Agrovet Case Study',
        target: '/project/evergreen-agrovet'
      }
    };
  }

  if (q.includes('network') || q.includes('cisco') || q.includes('vlan') || q.includes('router') || q.includes('packet tracer') || q.includes('acl')) {
    return {
      text: `Peter has in-depth expertise in **Cisco Network Engineering and Simulation**:
• Multi-building enterprise network design with departmental VLAN segmentation
• Inter-VLAN routing via Router-on-a-Stick (802.1Q encapsulation)
• Access Control Lists (Standard & Extended ACLs) for traffic filtering and security
• Spanning Tree Protocol (STP) redundancy, DHCP pools, and subnetting across Class A/B/C networks`,
      action: {
        type: 'navigate_project',
        label: 'View Network Design Case Study',
        target: '/project/school-network-design'
      }
    };
  }

  if (q.includes('project') || q.includes('built') || q.includes('portfolio') || q.includes('work')) {
    return {
      text: `Peter has built several production-grade projects spanning full-stack development and networking:
1. **TSafari Transport Management**: Real-time booking, driver dashboards, Django Channels WebSockets, and M-Pesa Daraja API.
2. **EVERGREEN Agrovet POS Suite**: Inventory tracking, batch expiry warnings, and POS sales in React & Node.js.
3. **School Enterprise Network Design**: Multi-department VLAN segmentation and routing in Cisco Packet Tracer.
4. **E-Football Tournament Management**: Bracket automation and screenshot validation in React & PostgreSQL.`,
      action: {
        type: 'navigate_section',
        label: 'Explore Projects Section',
        target: '#projects'
      }
    };
  }

  if (q.includes('skill') || q.includes('language') || q.includes('stack') || q.includes('tech') || q.includes('python') || q.includes('react') || q.includes('django')) {
    return {
      text: `Peter Kiplagat Misik commands a comprehensive toolchain:
• **Programming**: Python (92%), JavaScript (88%), TypeScript (85%), Java (80%), C++ (75%)
• **Frontend**: React 19, Tailwind CSS, HTML5/CSS3, Vite, Framer Motion
• **Backend**: Django, Node.js, Express, REST APIs, WebSockets (Django Channels)
• **Databases**: PostgreSQL, MySQL, SQLite
• **Networking**: Cisco Packet Tracer, VLAN Segmentation, Router/Switch Configuration, LAN/WAN
• **Tools**: Linux Administration, Git & GitHub, Postman, VS Code`,
      action: {
        type: 'navigate_section',
        label: 'View Interactive Skills Grid',
        target: '#skills'
      }
    };
  }

  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('ttu') || q.includes('taita')) {
    return {
      text: `Peter is currently pursuing a **${EDUCATION_DATA.degree}** (${EDUCATION_DATA.status}) at **${EDUCATION_DATA.institution}** (2023 – Present).
His specialization is **${EDUCATION_DATA.specialization}**, with core coursework in ${EDUCATION_DATA.coursework.slice(0, 4).join(', ')}.`,
      action: {
        type: 'navigate_section',
        label: 'View Education Background',
        target: '#about'
      }
    };
  }

  if (q.includes('hire') || q.includes('intern') || q.includes('available') || q.includes('job') || q.includes('opportunity')) {
    return {
      text: `Peter is actively available for **${PERSONAL_INFO.availability}**. He brings a unique combination of full-stack software development (Django, React, Node.js, PostgreSQL) and enterprise Cisco network engineering, backed by real-world attachment experience at EmgTTI.

Feel free to connect directly via WhatsApp at **${PERSONAL_INFO.phone}** or email at **${PERSONAL_INFO.email}**!`,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (0743329366)',
        target: PERSONAL_INFO.whatsappUrl
      }
    };
  }

  return {
    text: `I am Peter Kiplagat Misik's AI representative! I can answer questions about his **BSc in Information Technology** at Taita Taveta University, his software projects (**TSafari**, **Agrovet POS**), his Cisco network designs, or his ICT attachment at **EmgTTI** under Madam Elizabeth Tum.

What would you like to know about Peter's background, skills, or projects?`,
    action: {
      type: 'whatsapp',
      label: 'Chat with Peter on WhatsApp',
      target: PERSONAL_INFO.whatsappUrl
    }
  };
};
