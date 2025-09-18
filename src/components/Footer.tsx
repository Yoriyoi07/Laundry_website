import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from "lucide-react";
import freshLaundryLogo from "figma:asset/49f45e220814ca125e52e8c0dfd89873315edb49.png";
import { useState } from "react";

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onPhoneCall?: () => void;
  onEmailContact?: () => void;
  onSocialClick?: (platform: string, url: string) => void;
  onLearnMore?: (service: string) => void;
  onNewsletterSignup?: () => void;
}

export function Footer({ 
  onNavigate, 
  onPhoneCall, 
  onEmailContact, 
  onSocialClick, 
  onLearnMore,
  onNewsletterSignup 
}: FooterProps) {
  const [email, setEmail] = useState('');

  const socialLinks = {
    Facebook: 'https://facebook.com/freshlaundry',
    Twitter: 'https://twitter.com/freshlaundry',
    Instagram: 'https://instagram.com/freshlaundry'
  };

  const handleNewsletterSubmit = () => {
    if (email.trim()) {
      onNewsletterSignup?.();
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div 
              className="flex items-center mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onNavigate?.('home')}
            >
              <img 
                src={freshLaundryLogo} 
                alt="Fresh Laundry Logo" 
                className="h-10 w-auto mr-3"
              />
              <span className="text-xl font-semibold">Fresh Laundry</span>
            </div>
            <p className="text-gray-400 mb-6">
              Professional laundry services with free pickup and delivery. 
              Serving the community with quality care since 2014.
            </p>
            <div className="flex space-x-4">
              <button 
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                onClick={() => onSocialClick?.('Facebook', socialLinks.Facebook)}
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button 
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                onClick={() => onSocialClick?.('Twitter', socialLinks.Twitter)}
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button 
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
                onClick={() => onSocialClick?.('Instagram', socialLinks.Instagram)}
              >
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onLearnMore?.('Wash & Fold')}
                >
                  Wash & Fold
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onLearnMore?.('Dry Cleaning')}
                >
                  Dry Cleaning
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onLearnMore?.('Pickup & Delivery')}
                >
                  Pickup & Delivery
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onLearnMore?.('Express Service')}
                >
                  Express Service
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onLearnMore?.('Stain Removal')}
                >
                  Stain Removal
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onLearnMore?.('Alterations')}
                >
                  Alterations
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onNavigate?.('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onNavigate?.('services')}
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onNavigate?.('about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onNavigate?.('pricing')}
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onNavigate?.('contact')}
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors text-left"
                  onClick={() => onLearnMore?.('FAQs')}
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get laundry tips and special offers delivered to your inbox.
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={handleNewsletterSubmit}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="font-medium">123 Main Street</p>
                <p className="text-gray-400 text-sm">Your City, ST 12345</p>
              </div>
            </div>
            <div className="flex items-center cursor-pointer hover:text-blue-400 transition-colors" onClick={onPhoneCall}>
              <Phone className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="font-medium">(555) 123-4567</p>
                <p className="text-gray-400 text-sm">Mon-Fri: 7AM-7PM</p>
              </div>
            </div>
            <div className="flex items-center cursor-pointer hover:text-blue-400 transition-colors" onClick={onEmailContact}>
              <Mail className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="font-medium">info@freshlaundry.com</p>
                <p className="text-gray-400 text-sm">24hr response time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Fresh Laundry. All rights reserved. | 
            <button className="hover:text-white transition-colors ml-1 mr-1" onClick={() => onLearnMore?.('Privacy Policy')}>
              Privacy Policy
            </button> | 
            <button className="hover:text-white transition-colors ml-1" onClick={() => onLearnMore?.('Terms of Service')}>
              Terms of Service
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}