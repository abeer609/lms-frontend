import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 animated-bg">
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-bg {
          background: linear-gradient(
            -45deg,
            #000000,   /* black */
            #1e1b4b,   /* deep indigo */
            #3b82f6,   /* bright blue */
            #9333ea,   /* purple */
            #1f2937    /* dark gray instead of white */
          );
          background-size: 500% 500%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
