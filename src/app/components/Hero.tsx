'use client';

import { motion } from 'framer-motion';
import { FaRocket, FaConciergeBell } from 'react-icons/fa';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-12 text-center lg:text-left">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid lg:grid-cols-2 gap-10 items-center"
      >
        <div className="space-y-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
            🔥 Ahmed Memon · Official
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Master <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Automation</span> <br />&amp; n8n Workflows
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">
            Build production‑ready agents, automate anything, and scale your business with Ahmed&apos;s premium courses &amp; done‑for‑you services.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="#courses"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 inline-flex items-center gap-2 hover:scale-105 transition"
            >
              <FaRocket /> Explore Courses
            </Link>
            <Link
              href="#services"
              className="bg-white border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:border-blue-400 transition inline-flex items-center gap-2"
            >
              <FaConciergeBell /> Services
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden lg:block relative"
        >
          <div className="absolute -top-8 -right-8 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
          <div className="relative bg-white/70 backdrop-blur rounded-2xl p-6 border shadow-xl">
            <div className="flex items-center gap-3 border-b pb-3">
              <div className="text-3xl text-blue-600">🤖</div>
              <div>
                <p className="font-bold">AI Automation Mastery</p>
                <p className="text-xs text-gray-500">6 classes · lifetime access</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold text-xl">Rs. 7,499</span>
              <span className="text-sm line-through text-gray-400">Rs. 12,000</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Save 38%</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <span className="text-green-500 mr-1">✓</span> Includes Roman Urdu project
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}