'use client';

import CourseCard from './CourseCard';
import { motion } from 'framer-motion';

// Define course data with type
const coursesData = [
  {
    id: 'n8n-course',
    name: 'AI Automation Mastery',
    subtitle: 'Master n8n workflows from scratch',
    price: 7499,
    originalPrice: 12000,
    discount: 38,
    badge: 'Popular',
    classes: '6 classes',
    romanUrdu: true,
    outline: [
      { title: 'Class 1', desc: 'Introduction, UI & Setup' },
      { title: 'Class 2', desc: 'Core Concepts' },
      { title: 'Class 3', desc: 'Triggers, Webhooks & Cron Jobs' },
      { title: 'Class 4', desc: 'APIs & Real Integrations' },
      { title: 'Class 5', desc: 'Logic & Smart Automations' },
      { title: 'Final Project', desc: 'WhatsApp Restaurant Chatbot' },
    ],
  },
  {
    id: 'voice-course',
    name: 'AI Voice Agent Course',
    subtitle: 'Build production‑ready AI agents',
    price: 7499,
    originalPrice: 12000,
    discount: 38,
    badge: 'New',
    classes: '6 classes',
    romanUrdu: true,
    outline: [
      { title: 'Class 1', desc: 'Introduction to AI Call Agents' },
      { title: 'Class 2', desc: 'Designing the Call Flow & Script' },
      { title: 'Class 3', desc: 'Voice & Configuration' },
      { title: 'Class 4', desc: 'Integrations — CRM, Calendar & Webhooks' },
      { title: 'Class 5', desc: 'Phone Number Setup' },
      { title: 'Class 6', desc: 'Final Project: AI Receptionist in Roman Urdu' },
    ],
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">🎓 Courses</h2>
          <span className="text-sm text-gray-500">lifetime access · no refund</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {coursesData.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}