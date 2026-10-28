export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedmemon.com').replace(/\/$/, '');
export const BUSINESS_NAME = 'Ahmed Memon';
export const WHATSAPP_NUMBER = '923182082758';

export const COURSE_PRICE = 6000;
export const COURSE_ORIGINAL = 12000;
export const BUNDLE_PRICE = 10000;
export const BUNDLE_SAVING = COURSE_PRICE * 2 - BUNDLE_PRICE; // Rs. 2,000 (Rs. 1,000 per course)

export const rs = (n: number) => `Rs. ${n.toLocaleString('en-US')}`;
export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const STATS = { students: '100+', projects: '40+' };

export type Course = {
  id: string;
  name: string;
  subtitle: string;
  pitch: string;
  classes: string;
  duration: string;
  outcomes: string[];
  outline: { title: string; points: string[] }[];
};

export const courses: Course[] = [
  {
    id: 'ai-automation-mastery',
    name: 'AI Automation Mastery',
    subtitle: 'Master n8n workflows from scratch',
    pitch: 'Go from zero to building real AI workflows, then learn how to find clients and deliver them.',
    classes: '12 classes',
    duration: '~2h 45m total',
    outcomes: [
      'Build n8n workflows with triggers, webhooks and AI agent nodes',
      'Create a WhatsApp restaurant chatbot that takes orders',
      'Add RAG, memory and error handling so automations are production-ready',
      'Find local and international clients and sell automations',
    ],
    outline: [
      { title: 'Introduction, UI & Setup', points: ['What is n8n?', 'AI automation vs normal automation', 'Cloud vs self-hosted', 'n8n instance tour (UI walkthrough)', 'Basic workflow concept'] },
      { title: 'Core Concepts', points: ['Nodes explained', 'What is a workflow?', 'Trigger vs action nodes', 'Simple automation: manual trigger + send email', 'Understanding data flow'] },
      { title: 'Triggers, Webhooks & Cron Jobs', points: ['What is a webhook?', 'What is a cron job?', 'Form submission automations', 'Workflow trigger node', 'Real-world examples'] },
      { title: 'APIs & Real Integrations', points: ['What is an API?', 'GET vs POST requests', 'MCP server & client', 'How mapping, set nodes & expressions work'] },
      { title: 'Logic & Smart Automations', points: ['IF conditions', 'Switch nodes', 'Filters', 'AI agent node introduction', 'How AI agent nodes work'] },
      { title: 'WhatsApp Restaurant Chatbot', points: ['Third-party WhatsApp tool setup, no Business API needed', 'Building the chatbot flow: customer messages, AI takes the order', 'AI agent node configuration for natural conversation', 'Parsing and validating the order (item, quantity, price)', 'Saving confirmed orders to Google Sheets in real time', 'Full end-to-end walkthrough'] },
      { title: 'What is RAG?', points: ['What RAG (Retrieval-Augmented Generation) is', 'RAG with Pinecone', 'How to set up RAG in your workflow'] },
      { title: 'Error Handling', points: ['How error handling works', 'Building production-ready error handling'] },
      { title: 'Memory in AI Agents', points: ['Short-term vs long-term memory', 'Using Supabase Postgres as production-ready long-term memory', 'How memory state is maintained'] },
      { title: 'Finding Clients (Part 1) & Delivery', points: ['2-3 proven methods to find clients', 'Writing an effective outreach message', 'How to deliver AI automation to a client'] },
      { title: 'Lead Generation Automation', points: ['Automation that scrapes leads from Google Maps', 'AI writes a personalized email for each lead', 'Automatically sends the email to every lead'] },
      { title: 'Finding Clients (Part 2)', points: ['Finding local clients', 'Finding international clients', '4-5 high-quality client-hunting methods', 'Reaching out via WhatsApp, DMs & Emails', 'Avoiding spam filters while cold emailing'] },
    ],
  },
  {
    id: 'ai-voice-agent-course',
    name: 'AI Voice Agent Course',
    subtitle: 'Build production-ready AI calling agents',
    pitch: 'Build a voice agent that answers calls, handles objections and books appointments, then learn how to sell it.',
    classes: '7 classes',
    duration: '~1h 45m total',
    outcomes: [
      'Set up inbound and outbound AI call agents on Retell AI',
      'Write natural call scripts that handle greetings, objections and fallbacks',
      'Connect agents to a CRM, calendar and webhooks',
      'Build a full AI receptionist (walkthrough in Roman Urdu) and find clients for it',
    ],
    outline: [
      { title: 'Introduction to AI Call Agents', points: ['What an AI call agent is and how it works', 'Popular platforms: VAPI, Retell AI', 'Inbound vs outbound agents', 'Real-world use cases', 'Setting up Retell AI and dashboard walkthrough'] },
      { title: 'Designing the Call Flow & Script', points: ['Single prompt agent, full dashboard walkthrough', 'Writing a natural call script with AI', 'Handling greetings, objections, fallback responses', 'Setting agent goals', 'Testing script logic', 'How voicemail & IVR works'] },
      { title: 'Voice & Configuration', points: ['Dynamic vs static variables', 'Choosing the right AI voice (ElevenLabs)', 'Tone, speed, language', 'Building a persona', 'Background sound & silence detection', 'Knowledge base in agent'] },
      { title: 'Integrations: CRM, Calendar & Webhooks', points: ['Connecting to a CRM (GoHighLevel, HubSpot, etc.)', 'Booking via Cal.com or Google Calendar', 'Sending call data via webhooks', 'Tools like transfer call and more'] },
      { title: 'Phone Number Setup', points: ['Connecting a number with Retell', 'Where to buy numbers', 'Phone number page UI'] },
      { title: 'AI Receptionist Agent', points: ['Full receptionist agent, built in Roman Urdu'] },
      { title: 'Finding Clients & Outreach', points: ['How to find clients for AI voice agents', 'How to deliver the agent to a client', 'Writing an effective outreach message'] },
    ],
  },
];

export const faqs = [
  { q: 'Do I need any experience to start?', a: 'The AI Automation Mastery course starts from the basics: what n8n is, how nodes and workflows work, and then builds up to AI agents. The Voice Agent course walks through the platforms step by step. If you get stuck anywhere, you can message me directly.' },
  { q: 'How do I get access after buying?', a: 'Message me on WhatsApp, complete the payment, and you get access to the recorded classes immediately after payment.' },
  { q: 'Do I really get personal guidance?', a: 'Yes. If you get stuck on any class, tool or error, message me on WhatsApp and I will guide you personally. You have my full support while you learn.' },
  { q: 'How does the two-course bundle work?', a: 'Each course is Rs. 6,000. Take both together and the total is Rs. 10,000, which saves you Rs. 2,000 (Rs. 1,000 off each course).' },
  { q: 'How long do I have access?', a: 'Lifetime. Both courses are recorded, so you can watch and re-watch every class whenever you like, with no expiry.' },
  { q: 'Can I get a refund?', a: 'No. Courses are digital products and all purchases are final once access is granted. Please read the full outline first, and message me on WhatsApp with any question before you buy.' },
  { q: 'Do you build automations, voice agents and websites for businesses?', a: 'Yes. Done-for-you AI automation, AI calling agents and business websites are available. Project terms are agreed over WhatsApp before work begins.' },
];
