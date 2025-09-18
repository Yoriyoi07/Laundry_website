import { Button } from "./ui/button";
import { Menu, Phone, Star } from "lucide-react";
import { useState } from "react";
import freshLaundryLogo from "figma:asset/FreshLaundry.png";

interface HighFidelityHeaderProps {
  onSchedulePickup?: () => void;
  onGetQuote?: () => void;
  onNavigate?: (sectionId: string) => void;
  onPhoneCall?: () => void;
}

export function HighFidelityHeader({ onSchedulePickup, onGetQuote, onNavigate, onPhoneCall }: HighFidelityHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate?.(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with contact info */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm border-b border-blue-50">
          <div className="flex items-center space-x-6 text-gray-600">
            <button 
              onClick={onPhoneCall}
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-blue-600" />
              <span>(555) 123-4567</span>
            </button>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              <span>4.9/5 Rating • 500+ Happy Customers</span>
            </div>
          </div>
          <div className="text-blue-600 font-medium">
            🎉 New Customer Special: 20% Off First Order!
          </div>
        </div>

        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center group cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative">
              <img 
                src={freshLaundryLogo} 
                alt="Fresh Laundry Logo" 
                className="h-14 w-auto mr-4 transition-transform group-hover:scale-105"
              />
              <div className="absolute -inset-2 bg-blue-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">Fresh Laundry</span>
              <p className="text-sm text-blue-600 font-medium">Professional Care Since 2014</p>
            </div>
          </div>

          {/* Enhanced Navigation */}
          <nav className="hidden md:flex space-x-1">
            {[
              {label: 'Home', section: 'home'},
              {label: 'Services', section: 'services'},
              {label: 'About', section: 'about'},
              {label: 'Pricing', section: 'pricing'},
              {label: 'Contact', section: 'contact'}
            ].map((item) => (
              <button 
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </button>
            ))}
          </nav>

          {/* Enhanced CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="border-blue-200 text-blue-700 hover:bg-blue-50 transition-all duration-200"
              onClick={onGetQuote}
            >
              Get Quote
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5" onClick={onSchedulePickup}>
              Schedule Pickup
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-100 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              {[
                {label: 'Home', section: 'home'},
                {label: 'Services', section: 'services'},
                {label: 'About', section: 'about'},
                {label: 'Pricing', section: 'pricing'},
                {label: 'Contact', section: 'contact'}
              ].map((item) => (
                <button 
                  key={item.section}
                  onClick={() => handleNavClick(item.section)}
                  className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-blue-100 space-y-3">
                <Button variant="outline" className="w-full border-blue-200 text-blue-700" onClick={onGetQuote}>
                  Get Quote
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700" onClick={onSchedulePickup}>
                  Schedule Pickup
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}