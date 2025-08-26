import React from 'react';
import Navbar from './Navbar';

export default function HeroQuote({ quote }) {
  return (
    <div className="relative h-[60vh] md:h-screen bg-cover bg-fixed bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
        <h1 className="text-4xl md:text-6xl font-black mb-4">
          <span>
            Stay Motivated
          </span>
        </h1>
        <blockquote className="max-w-3xl text-lg md:text-2xl font-semibold leading-relaxed italic mb-6">
          “{quote.text}”
        </blockquote>
        <cite className="text-base md:text-lg font-medium">- {quote.author}</cite>
      </div>
    </div>
  );
}

