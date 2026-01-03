import Image from "next/image";
import TypewriterSlogan from "./components/TypewriterSlogan";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import GraphBackground from "./components/GraphBackground";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center gap-8 relative overflow-hidden">
      <GraphBackground />
      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-5xl pt-32 z-10">
        
        {/* Graph Container */}
        <div className="relative w-full h-[300px] md:h-[500px]">
          
          {/* SVG Connector Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Connections */}
            <g className="stroke-black/80 dark:stroke-purple-500/80 stroke-[0.3] [stroke-dasharray:1,1]">
              <path d="M20 50 L50 25" /> {/* Office -> Shed */}
              <path d="M50 25 L85 55" /> {/* Shed -> Field */}
              <path d="M20 50 L10 80" /> {/* Office -> Child 1 */}
              <path d="M20 50 L20 80" /> {/* Office -> Child 2 */}
              <path d="M20 50 L30 80" /> {/* Office -> Child 3 */}
            </g>
          </svg>

          {/* Nodes Layer */}
          
          {/* Node: Office (Left) */}
          <div className="absolute top-[50%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <span className="text-sm font-medium text-black dark:text-purple-200">Office</span>
            <div className="w-12 h-12 bg-[#1C1C1E] dark:bg-purple-600 dark:shadow-[0_0_15px_rgba(168,85,247,0.5)] rounded-full shadow-lg transition-transform hover:scale-110"></div>
          </div>

          {/* Node: Shed 1 (Top Center) */}
          <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <span className="text-sm font-medium text-black dark:text-purple-200">Shed 1</span>
            <div className="w-12 h-12 bg-[#1C1C1E] dark:bg-purple-600 dark:shadow-[0_0_15px_rgba(168,85,247,0.5)] rounded-full shadow-lg transition-transform hover:scale-110"></div>
          </div>

          {/* Node: Field (Right) */}
          <div className="absolute top-[55%] left-[85%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
            <span className="text-sm font-medium text-black dark:text-purple-200">Field</span>
            <div className="w-12 h-12 bg-[#1C1C1E] dark:bg-purple-600 dark:shadow-[0_0_15px_rgba(168,85,247,0.5)] rounded-full shadow-lg transition-transform hover:scale-110"></div>
          </div>

          {/* Child Nodes (Below Office) */}
          <div className="absolute top-[80%] left-[10%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1C1C1E] dark:bg-purple-600 dark:shadow-[0_0_10px_rgba(168,85,247,0.5)] rounded-full shadow-md hover:scale-110 transition-transform"></div>
          <div className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1C1C1E] dark:bg-purple-600 dark:shadow-[0_0_10px_rgba(168,85,247,0.5)] rounded-full shadow-md hover:scale-110 transition-transform"></div>
          <div className="absolute top-[80%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#1C1C1E] dark:bg-purple-600 dark:shadow-[0_0_10px_rgba(168,85,247,0.5)] rounded-full shadow-md hover:scale-110 transition-transform"></div>

        </div>

        {/* Animated Slogan */}
        <TypewriterSlogan />

      </main>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
}
