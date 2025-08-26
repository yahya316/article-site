// import React from 'react';
// import Navbar from './Navbar'; 

// export default function PageHero({ title }) {
//   return (
//     <div className="relative h-[65vh] bg-cover bg-fixed bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
//       <div className="absolute inset-0 bg-black opacity-40"></div>
      
//       <Navbar />

//       <div className="relative z-10 text-center p-4">
//         <h1 className="text-4xl md:text-6xl font-black">{title}</h1>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import Navbar from './Navbar'; 

export default function PageHero({ title }) {
  return (
    <div
      className="relative h-[50vh] sm:h-[55vh] md:h-[65vh] bg-cover bg-fixed bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Navbar */}
      <Navbar />

      {/* Title */}
      <div className="relative z-10 text-center p-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
          {title}
        </h1>
      </div>
    </div>
  );
}
