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
- Programming Languages: ${SKILLS_DATA.filter(s => s.category === 'programming').map(s => `${s.name} (${s.level}%)`).join(", ")}
- Frontend Development: ${SKILLS_DATA.filter(s => s.category === 'frontend').map(s => `${s.name} (${s.level}%)`).join(", ")}
- Backend Development: ${SKILLS_DATA.filter(s => s.category === 'backend').map(s => `${s.name} (${s.level}%)`).join(", ")}
- Databases: ${SKILLS_DATA.filter(s => s.category === 'databases').map(s => `${s.name} (${s.level}%)`).join(", ")}
- Networking & Infrastructure: ${SKILLS_DATA.filter(s => s.category === 'networking').map(s => `${s.name} (${s.level}%)`).join(", ")}
- DevOps & Tools: ${SKILLS_DATA.filter(s => s.category === 'tools').map(s => `${s.name} (${s.level}%)`).join(", ")}

KEY PROJECTS:
1. TSafari Transport Management System: Real-time passenger booking and fleet coordination. Stack: Django, PostgreSQL, Tailwind CSS, Channels (WebSockets), Safaricom Daraja M-Pesa STK Push API.
2. EVERGREEN Agrovet Management System: Inventory control, veterinary pharmaceutical batch expiration tracking, and POS sales. Stack: React, Node.js, Express, PostgreSQL.
3. School Enterprise Network Design: Comprehensive multi-building campus network with departmental VLAN segmentation, Router-on-a-Stick (802.1Q encapsulation), Access Control Lists (ACLs), DHCP routing, and redundant spanning tree. Stack: Cisco Packet Tracer.
4. E-Football Tournament Management System: Esports competition platform with automated bracket seeding, screenshot score verification, and live leaderboards. Stack: React, Node.js, PostgreSQL.

CERTIFICATIONS:
${CERTIFICATIONS_DATA.map(c => `- ${c.title} by ${c.issuer} (${c.year})`).join("\n")}

GUIDELINES FOR RESPONSES:
1. Always speak on behalf of Peter Kiplagat Misik in a polite, confident, concise, and professional tone.
2. Emphasize his BSc in Information Technology degree, hands-on industrial attachment at EmgTTI, and his dual strength in full-stack software development and Cisco network engineering.
3. If asked about contacts or WhatsApp, explicitly provide his phone number (0743329366) and mention WhatsApp availability.
4. If asked about his attachment or Madam Elizabeth Tum, highlight her strong recommendation of his work at EmgTTI.
5. If asked for his resume/CV, let the user know they can download it or preview it directly.
6. Keep answers informative, well-formatted with markdown bullet points where appropriate, and avoid generic fluff.`;

// Determine dynamic action button based on user query & AI response
const determineAction = (query: string, responseText: string): ChatMessage['action'] | undefined => {
  const q = query.toLowerCase();
  const r = responseText.toLowerCase();

  if (q.includes('cv') || q.includes('resume') || q.includes('curriculum vitae') || q.includes('download') || r.includes('curriculum vitae') || r.includes('download')) {
    return {
      type: 'download_cv',
      label: 'Download CV (PDF)',
      target: PERSONAL_INFO.cvPath
    };
  }

  if (q.includes('whatsapp') || q.includes('chat') || q.includes('text') || q.includes('0743329366') || r.includes('whatsapp')) {
    return {
      type: 'whatsapp',
      label: 'Chat on WhatsApp (0743329366)',
      target: PERSONAL_INFO.whatsappUrl
    };
  }

  if (q.includes('tsafari')) {
    return {
      type: 'navigate_project',
      label: 'View TSafari Case Study',
      target: '/project/tsafari-transport'
    };
  }

  if (q.includes('agrovet') || q.includes('evergreen')) {
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

  if (q.includes('skill') || q.includes('language') || q.includes('stack') || q.includes('tech')) {
    return {
      type: 'navigate_section',
      label: 'View Interactive Skills Grid',
      target: '#skills'
    };
  }

  if (q.includes('attachment') || q.includes('emgtti') || q.includes('tum') || q.includes('experience')) {
    return {
      type: 'navigate_section',
      label: 'View EmgTTI Experience',
      target: '#experience'
    };
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('call') || q.includes('reach') || q.includes('opportunity')) {
    return {
      type: 'whatsapp',
      label: 'Message Peter on WhatsApp',
      target: PERSONAL_INFO.whatsappUrl
    };
  }

  return {
    type: 'open_resume',
    label: 'Preview Peter\'s Resume'
  };
};

// Connect to NVIDIA NIM API with RAG context
export const generateAiResponse = async (
  query: string,
  history: { sender: 'user' | 'assistant'; text: string }[] = []
): Promise<{ text: string; action?: ChatMessage['action'] }> => {
  const apiKey =
    import.meta.env.VITE_NVIDIA_API_KEY ||
    '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';
  const model = import.meta.env.VITE_NVIDIA_MODEL || 'meta/llama-3.2-11b-vision-instruct';

  try {
    // Format conversation history (last 6 messages for context)
    const formattedMessages = [
      { role: 'system', content: RAG_SYSTEM_PROMPT },
      ...history.slice(-6).map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: query }
    ];

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: formattedMessages,
        max_tokens: 350,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`NVIDIA NIM returned ${response.status}: ${errText}. Falling back to local RAG knowledge base.`);
      return getFallbackRAGResponse(query);
    }

    const data = await response.json();
    const replyText =
      data.choices?.[0]?.message?.content?.trim() ||
      "I am Peter Kiplagat Misik's AI assistant. Please feel free to reach out directly to Peter on WhatsApp at 0743329366.";

    const action = determineAction(query, replyText);
    return { text: replyText, action };
  } catch (err) {
    console.error('Error invoking NVIDIA NIM API:', err);
    return getFallbackRAGResponse(query);
  }
};

// Resilient local RAG fallback in case of network latency or offline mode
const getFallbackRAGResponse = async (query: string): Promise<{ text: string; action?: ChatMessage['action'] }> => {
  const q = query.toLowerCase().trim();
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (q.includes('cv') || q.includes('resume') || q.includes('download')) {
    return {
      text: `You can view or download Peter Kiplagat Misik's complete Curriculum Vitae directly. It details his BSc in Information Technology from Taita Taveta University, hands-on ICT attachment at EmgTTI, software projects, and Cisco certifications.`,
      action: {
        type: 'download_cv',
        label: 'Download CV (PDF)',
        target: PERSONAL_INFO.cvPath
      }
    };
  }

  if (q.includes('whatsapp') || q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('reach')) {
    return {
      text: `You can reach Peter directly on WhatsApp or mobile at **${PERSONAL_INFO.phone}** (${PERSONAL_INFO.phoneFormatted}). He is prompt in responding to inquiries regarding software development, networking contracts, and attachment opportunities.`,
      action: {
        type: 'whatsapp',
        label: 'Chat on WhatsApp (0743329366)',
        target: PERSONAL_INFO.whatsappUrl
      }
    };
  }

  if (q.includes('attachment') || q.includes('emgtti') || q.includes('emgwen') || q.includes('tum') || q.includes('elizabeth')) {
    return {
      text: `Peter completed his ICT Industrial Attachment at **Emgwen Technical Training Institute (EmgTTI)** under the supervision of **Madam Elizabeth Tum (Head of ICT)**.

His core responsibilities included:
• Computer assembly, workstation setup, and hardware maintenance
• Network design and cabling implementation using Cisco Packet Tracer
• Instructing diploma students on networking fundamentals, topologies, and office productivity tools
• Diagnosing and resolving LAN bottlenecks for administrative offices

Madam Elizabeth Tum highly commended Peter for his reliability, technical competence, and patience in training students!`,
      action: {
        type: 'navigate_section',
        label: 'View Experience Timeline',
        target: '#experience'
      }
    };
  }

  if (q.includes('project') || q.includes('built') || q.includes('tsafari') || q.includes('agrovet')) {
    return {
      text: `Peter has engineered several production-grade projects:
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

  if (q.includes('skill') || q.includes('language') || q.includes('stack') || q.includes('tech')) {
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

  return {
    text: `I am Peter Kiplagat Misik's AI representative! I can share details regarding his **BSc in Information Technology** at Taita Taveta University, his software projects (**TSafari**, **Agrovet POS**), his Cisco network designs, or his ICT attachment at **EmgTTI** under Madam Elizabeth Tum.

How can I help you today?`,
    action: {
      type: 'whatsapp',
      label: 'Chat with Peter on WhatsApp',
      target: PERSONAL_INFO.whatsappUrl
    }
  };
};
