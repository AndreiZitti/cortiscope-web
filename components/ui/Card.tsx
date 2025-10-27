import React from "react";

interface CardProps {
  title: string;
  description: string;
  className?: string;
}

export default function Card({ title, description, className = "" }: CardProps) {
  return (
    <div
      className={`p-8 bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}
    >
      <h3 className="text-2xl font-bold text-dark mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
