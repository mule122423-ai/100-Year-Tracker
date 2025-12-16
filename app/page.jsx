// TrackerApp.jsx (Comprehensive BATCH 1 & BATCH 2)
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress" 
import { HeartIcon, ZapIcon, ListIcon, BookOpenIcon, StarIcon, DollarSignIcon, BarChartIcon, SettingsIcon, MoonIcon, UtensilsIcon } from "lucide-react"

// --- 1. LOCAL COLORS AND CLASSES (Moved here for simplicity) ---
const COLORS = {
  BACKGROUND: '#0d0d0d',  // Deep Black/Charcoal
  PRIMARY_TEXT: '#f0f0f0', // Off-White
  BORDER_COLOR: '#333333', // Subtle Divider
  GOLD: '#D4AF37',       // Soft Gold
  VIOLET: '#8A2BE2',     // Deep Violet
};

const GLOBAL_CLASSES = {
  BG: `bg-[${COLORS.BACKGROUND}]`,
  TEXT_GOLD: `text-[${COLORS.GOLD}]`,
  TEXT_VIOLET: `text-[${COLORS.VIOLET}]`,
  BORDER: `border-[${COLORS.BORDER_COLOR}]`,
  INDICATOR_GOLD: `bg-[${COLORS.GOLD}]`,
};

// --- 2. BOTTOM NAVIGATION (Moved here for simplicity) ---
const navItems = [
  { name: 'Wellness', icon: HeartIcon },
  { name: 'Skills', icon: ZapIcon },
  { name: 'Tasks', icon: ListIcon },
  { name: 'Journal', icon: BookOpenIcon },
  { name: 'Inspiration', icon: StarIcon },
  { name: 'Finance', icon: DollarSignIcon },
  { name: '100-Year', icon: BarChartIcon },
  { name: 'Settings', icon: SettingsIcon },
];

function BottomNav({ activeTab, setActiveTab }) {
  return (
    <footer className={`fixed bottom-0 left-0 right-0 ${GLOBAL_CLASSES.BG} ${GLOBAL_CLASSES.BORDER} border-t shadow-2xl z-50`}>
      <nav className="flex justify-around items-center h-16 w-full max-w-7xl mx-auto px-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center justify-center p-1 transition-colors duration-200 
              ${item.name === activeTab ? GLOBAL_CLASSES.TEXT_GOLD : GLOBAL_CLASSES.TEXT_VIOLET + ' opacity-70'}
            `}
          >
            <item.icon className={`w-5 h-5 ${item.name === activeTab ? 'scale-110' : ''}`} />
            <span className="text-[10px] mt-0.5 font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
}

// --- 3. PROGRESS CARD (Remains the same) ---
function ProgressCard({ title, icon: Icon, progress, goal, className, color }) {
  return (
    <div className={`p-6 rounded-xl shadow-2xl ${className} ${GLOBAL_CLASSES.BORDER} border border-opacity-30`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className={`text-lg font-semibold ${GLOBAL_CLASSES.TEXT_GOLD}`}>{title}</h3>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className={`text-4xl font-extrabold mb-3 ${color}`}>{progress}%</div>
      <Progress 
        value={progress} 
        className={`h-2 ${GLOBAL_CLASSES.INDICATOR_GOLD} opacity-30`} 
        indicatorClassName={GLOBAL_CLASSES.INDICATOR_GOLD} 
      />
      <p className="text-sm text-gray-400 mt-3">{goal}</p>
    </div>
  )
}

// --- 4. TAB CONTENT (Remains the same) ---
const TabContent = ({ activeTab }) => {
  if (activeTab === 'Wellness') {
    return (
      <section className="mb-8">
        <h2 className={`text-xl font-semibold mb-4 ${GLOBAL_CLASSES.TEXT_GOLD} ${GLOBAL_CLASSES.BORDER} border-b pb-1`}>
          Wellness Meters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressCard
            title="Sleep Quality"
            icon={MoonIcon}
            progress={90}
            goal="Goal: 6.75 hours (WES factor)"
            className="bg-[#161b22]"
            color={GLOBAL_CLASSES.TEXT_GOLD}
          />
          <ProgressCard
            title="Nutrition Score"
            icon={UtensilsIcon}
            progress={85}
            goal="Wholesomeness Meter"
            className="bg-[#161b22]"
            color={GLOBAL_CLASSES.TEXT_GOLD}
          />
        </div>
      </section>
    );
  }
  // All other tab content placeholders
  return (
    <div className={`p-6 rounded-lg ${GLOBAL_CLASSES.BORDER} border text-center ${GLOBAL_CLASSES.TEXT_VIOLET}`}>
      <h3 className="text-2xl font-bold mb-2">{activeTab} Page}</h3>
      <p className="text-lg">Custom logic for {activeTab} will be integrated here.</p>
    </div>
  );
};

// --- 5. SPLASH SCREEN (New Component) ---
function SplashScreen({ setIsReady }) {
    const SPLASH_DURATION = 3000; // Display for 3.0 seconds

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsReady(true);
        }, SPLASH_DURATION);

        return () => clearTimeout(timer);
    }, [setIsReady]);

    return (
        <div 
          className={`fixed inset-0 flex items-center justify-center ${COLORS.BACKGROUND} z-[9999] transition-opacity duration-1000`}
        >
          <div className="flex flex-col items-center p-8 max-w-sm w-full">
            {/* IMPORTANT: Image must be in public/assets/splash_screen_drop.png */}
            <img 
              src="/assets/splash_screen_drop.png" 
              alt="Drop by Drop, a Stone is Eroded"
              className="w-full h-auto object-contain max-h-[80vh] animate-fadeIn"
            />
            
            <p className={`mt-8 text-xl font-medium ${COLORS.GOLD}`}>
              Consistency. Patience. Impact.
            </p>
          </div>
        </div>
    );
}


// --- MAIN APP COMPONENT ---
export default function TrackerApp() {
  const [activeTab, setActiveTab] = useState('Wellness');
  const [isReady, setIsReady] = useState(false); // State for Splash Screen

  // 1. RENDER SPLASH SCREEN FIRST
  if (!isReady) {
    return <SplashScreen setIsReady={setIsReady} />;
  }

  // 2. RENDER MAIN APP AFTER SPLASH SCREEN
  return (
    <div className={`flex flex-col min-h-screen ${GLOBAL_CLASSES.BG} ${GLOBAL_CLASSES.PRIMARY_TEXT} pb-16`}>
      <header className={`py-4 px-6 ${GLOBAL_CLASSES.BORDER} border-b`}>
        <div className="flex items-center justify-between">
          <h1 className={`text-2xl font-bold ${GLOBAL_CLASSES.TEXT_GOLD}`}>DROP.</h1>
          <div className="flex items-center space-x-2">
            <HeartIcon className={`w-5 h-5 ${GLOBAL_CLASSES.TEXT_VIOLET}`} />
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-6 overflow-y-auto">
        <TabContent activeTab={activeTab} />
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
