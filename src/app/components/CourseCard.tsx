'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaMicrophoneAlt,
  FaCartPlus,
} from 'react-icons/fa';
import { useCart } from './CartContext';

// Types for course data
interface CourseOutlineItem {
  title: string;
  desc: string;
}

interface Course {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: number;
  badge: string;
  classes: string;
  romanUrdu: boolean;
  outline: CourseOutlineItem[];
}

export default function CourseCard({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: course.id,
      name: course.name,
      price: course.price,
      half: 0, // courses are full payment upfront
      type: 'course',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {course.badge}
        </span>
        <span className="text-sm text-gray-400 flex items-center gap-1">
          <FaClock /> {course.classes} · ~15min
        </span>
      </div>
      <h3 className="text-2xl font-bold mt-2">{course.name}</h3>
      <p className="text-gray-500 text-sm">{course.subtitle}</p>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-2xl font-bold">Rs. {course.price.toLocaleString()}</span>
        <span className="text-sm line-through text-gray-400">
          Rs. {course.originalPrice.toLocaleString()}
        </span>
        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
          Save {course.discount}%
        </span>
      </div>
      <ul className="text-sm text-gray-600 mt-2 space-y-1">
        <li>
          <FaCheckCircle className="inline text-green-500 mr-1" /> Lifetime access to all recordings
        </li>
        <li>
          <FaCheckCircle className="inline text-green-500 mr-1" /> Access given immediately after payment
        </li>
        <li>
          <FaExclamationCircle className="inline text-red-400 mr-1" /> No Refund Policy
        </li>
      </ul>

      {/* Outline toggle */}
      <div
        className="text-blue-600 text-sm font-medium mt-2 inline-flex items-center gap-1 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
        {expanded ? 'Hide' : 'Show'} full course outline
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-sm text-gray-600 space-y-1 border-t pt-2">
              {course.outline.map((item, idx) => (
                <p key={idx}>
                  <span className="font-semibold">{item.title}</span> — {item.desc}
                </p>
              ))}
              {course.romanUrdu && (
                <p className="text-xs text-gray-400 mt-1">
                  <FaMicrophoneAlt className="inline mr-1" /> Includes Roman Urdu project
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleAdd}
        className="mt-4 w-full bg-gray-900 hover:bg-black text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
      >
        <FaCartPlus /> Enroll now
      </button>
    </motion.div>
  );
}