'use client';

import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';
import { FaRobot, FaGlobe } from 'react-icons/fa';

const servicesData = [
  {
    id: 'ai-auto-service',
    name: 'AI Automation',
    subtitle: 'Any type of AI automation · n8n workflows',
    price: 30000,
    icon: <FaRobot />,
    features: [
      'Custom workflow design & build',
      'n8n automation only',
      'API integrations & webhooks',
      'Ongoing support & documentation',
    ],
    note: 'Client provides n8n platform account.',
  },
  {
    id: 'website-service',
    name: 'Complete Website',
    subtitle: 'Professional business website',
    price: 20000,
    icon: <FaGlobe />,
    features: [
      'Responsive modern design',
      'Up to 8 pages',
      'SEO optimization',
      '1 month free support',
    ],
    note: 'Domain, hosting & third‑party costs client\'s responsibility.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8">⚡ Done‑for‑you Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}