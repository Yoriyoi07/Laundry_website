import { Button } from "./ui/button";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import freshLaundryLogo from "figma:asset/49f45e220814ca125e52e8c0dfd89873315edb49.png";

interface HeaderProps {
  onSchedulePickup?: () => void;
  onGetQuote?: () => void;
  onNavigate?: (sectionId: string) => void;
  onPhoneCall?: () => void;
}

export function Header({ onSchedulePickup, onGetQuote, onNavigate, onPhoneCall }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate?.(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <img 
              src={freshLaundryLogo} 
              alt="Fresh Laundry Logo" 
              className="h-12 w-auto mr-3"
            />
            <span className="text-xl font-semibold text-gray-900">Fresh Laundry</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => handleNavClick('home')} 
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('services')} 
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('about')} 
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('pricing')} 
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavClick('contact')} 
              className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onPhoneCall}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span>(555) 123-4567</span>
            </button>
            <Button variant="outline" onClick={onGetQuote}>Get Quote</Button>
            <Button onClick={onSchedulePickup}>Schedule Pickup</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('home')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick('services')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => handleNavClick('about')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('pricing')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavClick('contact')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-left"
              >
                Contact
              </button>
              <div className="pt-4 border-t">
                <button 
                  onClick={onPhoneCall}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-3"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span>(555) 123-4567</span>
                </button>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" onClick={onGetQuote}>Get Quote</Button>
                  <Button className="w-full" onClick={onSchedulePickup}>Schedule Pickup</Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}