'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle, FaCartPlus } from 'react-icons/fa';
import { useCart } from './CartContext';
import { ReactNode } from 'react';

interface Service {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  icon: ReactNode;
  features: string[];
  note: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: service.id,
      name: service.name,
      price: service.price,
      half: service.price / 2, // 50% advance
      type: 'service',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl text-blue-600">{service.icon}</span>
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">50% advance</span>
      </div>
      <h3 className="text-2xl font-bold mt-1">{service.name}</h3>
      <p className="text-gray-500 text-sm">{service.subtitle}</p>
      <div className="mt-2 text-2xl font-bold">
        Rs. {service.price.toLocaleString()}{' '}
        <span className="text-sm font-normal text-gray-500">/ project</span>
      </div>
      <ul className="text-sm text-gray-600 mt-3 space-y-1">
        {service.features.map((f, i) => (
          <li key={i}>
            <FaCheckCircle className="inline text-green-500 mr-1" /> {f}
          </li>
        ))}
        <li className="text-xs text-gray-400 mt-1">{service.note}</li>
      </ul>
      <button
        onClick={handleAdd}
        className="mt-4 w-full bg-gray-900 hover:bg-black text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
      >
        <FaCartPlus /> Add to cart
      </button>
    </motion.div>
  );
}