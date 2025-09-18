import { Button } from "./ui/button";

interface LowFidelityHeaderProps {
  onSchedulePickup?: () => void;
  onGetQuote?: () => void;
  onNavigate?: (sectionId: string) => void;
  onPhoneCall?: () => void;
}

export function LowFidelityHeader({ onSchedulePickup, onGetQuote, onNavigate, onPhoneCall }: LowFidelityHeaderProps) {
  return (
    <header className="border-b-2 border-gray-300 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate?.('home')}>
          <div className="w-12 h-12 bg-gray-300 mr-3"></div>
          <span className="text-xl">Fresh Laundry</span>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <button onClick={() => onNavigate?.('home')} className="text-gray-600 hover:text-blue-600">Home</button>
          <button onClick={() => onNavigate?.('services')} className="text-gray-600 hover:text-blue-600">Services</button>
          <button onClick={() => onNavigate?.('about')} className="text-gray-600 hover:text-blue-600">About</button>
          <button onClick={() => onNavigate?.('contact')} className="text-gray-600 hover:text-blue-600">Contact</button>
        </nav>
        
        <div className="hidden md:flex space-x-2">
          <Button variant="outline" onClick={onGetQuote}>Get Quote</Button>
          <Button onClick={onSchedulePickup}>Call Now</Button>
        </div>
        
        {/* Mobile */}
        <Button className="md:hidden" variant="outline" onClick={onPhoneCall}>Call</Button>
      </div>
    </header>
  );
}