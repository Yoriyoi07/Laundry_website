import { LowFidelityHeader } from "./components/LowFidelityHeader";
import { LowFidelityHero } from "./components/LowFidelityHero";
import { LowFidelityServices } from "./components/LowFidelityServices";
import { LowFidelityContact } from "./components/LowFidelityContact";

export default function LowFidelityApp() {
  return (
    <div className="min-h-screen bg-white">
      <LowFidelityHeader />
      <LowFidelityHero />
      <LowFidelityServices />
      <LowFidelityContact />
      
      {/* Simple Footer */}
      <footer className="py-8 border-t-2 border-gray-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 Fresh Laundry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}