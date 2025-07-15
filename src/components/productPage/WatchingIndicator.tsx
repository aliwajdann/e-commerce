import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export default function WatchingIndicator() {
  const [watchingCount, setWatchingCount] = useState(Math.floor(Math.random() * 41) + 10);
  const [isVisible, setIsVisible] = useState(true);

  // Update watching count every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // After fade out, update count and fade in
      setTimeout(() => {
        setWatchingCount(Math.floor(Math.random() * 41) + 10); // Random between 10-50
        setIsVisible(true);
      }, 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex py-4 cursor-pointer select-none">
      <div className={`transition-all duration-300 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
      }`}>
        <div className="bg-blue-50 border border-blue-200 md:rounded-full rounded-md px-4 py-2 flex items-center space-x-2 shadow-sm">
          <Eye size={16} className="text-blue-600" />
          <span className="text-blue-800 font-medium text-sm">
            {watchingCount} People watching this product now!
          </span>
        </div>
      </div>
    </div>
  );
}

// // Demo component to show the indicator in action
// function Demo() {
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-center mb-8">Watching Indicator Demo</h1>
        
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold mb-4">Product Page Example</h2>
//           <p className="text-gray-600 mb-6">
//             This indicator shows social proof by displaying how many people are currently viewing the product.
//             It updates every 5 seconds with a random number between 10-50.
//           </p>
          
//           <WatchingIndicator />
          
//           <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//             <h3 className="font-semibold mb-2">Features:</h3>
//             <ul className="text-sm text-gray-600 space-y-1">
//               <li>• Updates every 5 seconds</li>
//               <li>• Random count between 10-50 people</li>
//               <li>• Smooth fade animation on updates</li>
//               <li>• Eye icon for visual appeal</li>
//               <li>• Blue theme matching common UI patterns</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export { Demo as default };