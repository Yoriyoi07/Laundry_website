import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Star, Heart } from "lucide-react";
import freshLaundryLogo from "figma:asset/49f45e220814ca125e52e8c0dfd89873315edb49.png";
import { useState } from "react";

interface HighFidelityFooterProps {
  onNavigate?: (sectionId: string) => void;
  onPhoneCall?: () => void;
  onEmailContact?: () => void;
  onSocialClick?: (platform: string, url: string) => void;
  onLearnMore?: (service: string) => void;
  onNewsletterSignup?: () => void;
}

export function HighFidelityFooter({ 
  onNavigate, 
  onPhoneCall, 
  onEmailContact, 
  onSocialClick, 
  onLearnMore,
  onNewsletterSignup 
}: HighFidelityFooterProps) {
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
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

  <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Enhanced Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div 
              className="flex items-center group cursor-pointer"
              onClick={() => onNavigate?.('home')}
            >
              <div className="relative">
                <img 
                  src={freshLaundryLogo} 
                  alt="Fresh Laundry Logo" 
                  className="h-12 w-auto mr-4 transition-transform group-hover:scale-110"
                />
                <div className="absolute -inset-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-sm"></div>
              </div>
              <div>
                <span className="text-2xl font-bold">Fresh Laundry</span>
                <p className="text-blue-300 text-sm">Premium Care Since 2014</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Professional laundry services with free pickup and delivery. 
              We're committed to providing exceptional care for your garments while 
              supporting our local community.
            </p>
            
            {/* Rating Display */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 • 500+ Reviews</span>
            </div>
            
            {/* Enhanced Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, color: 'hover:bg-blue-600', platform: 'Facebook' },
                { icon: Twitter, color: 'hover:bg-sky-500', platform: 'Twitter' },
                { icon: Instagram, color: 'hover:bg-pink-600', platform: 'Instagram' }
              ].map((social, index) => (
                <button 
                  key={index} 
                  className={`bg-white/10 backdrop-blur-sm p-3 rounded-lg ${social.color} transition-all duration-300 cursor-pointer transform hover:scale-110 hover:shadow-lg`}
                  onClick={() => onSocialClick?.(social.platform, socialLinks[social.platform as keyof typeof socialLinks])}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {[
                'Wash & Fold',
                'Premium Dry Cleaning',
                'Pickup & Delivery',
                'Express Service',
                'Stain Removal',
                'Alterations & Repairs'
              ].map((service, index) => (
                <li key={index}>
                  <button 
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 flex items-center group text-left"
                    onClick={() => onLearnMore?.(service)}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', section: 'home' },
                { name: 'About Us', section: 'about' },
                { name: 'Services', section: 'services' },
                { name: 'Pricing', section: 'pricing' },
                { name: 'Contact', section: 'contact' },
                { name: 'Customer Reviews', section: 'about' }
              ].map((link, index) => (
                <li key={index}>
                  <button 
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-200 flex items-center group text-left"
                    onClick={() => onNavigate?.(link.section)}
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 group-hover:bg-white transition-colors"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold mb-6 text-white">Stay Connected</h3>
            <p className="text-gray-300 leading-relaxed">
              Get exclusive laundry tips, seasonal offers, and updates delivered to your inbox.
            </p>
            <div className="space-y-4">
              <Input 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-gray-300 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
              />
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={handleNewsletterSubmit}
              >
                Subscribe Now
              </Button>
              <p className="text-xs text-gray-400">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Contact Info Bar */}
        <div className="border-t border-white/20 mt-16 pt-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: MapPin,
                title: 'Visit Our Location',
                details: '123 Main Street, Your City, ST 12345',
                subtitle: 'Free pickup within 5 miles',
                onClick: () => {
                  window.open('https://maps.google.com?q=123+Main+Street,+Your+City,+ST+12345', '_blank');
                }
              },
              {
                icon: Phone,
                title: 'Call Us Today',
                details: '(555) 123-4567',
                subtitle: 'Mon-Fri: 7AM-7PM, Sat: 8AM-5PM',
                onClick: onPhoneCall
              },
              {
                icon: Mail,
                title: 'Email Support',
                details: 'info@freshlaundry.com',
                subtitle: '24-hour response guarantee',
                onClick: onEmailContact
              }
            ].map((contact, index) => (
              <button 
                key={index} 
                className="flex items-start space-x-4 group text-left"
                onClick={contact.onClick}
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <contact.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{contact.title}</h4>
                  <p className="text-gray-200 font-medium">{contact.details}</p>
                  <p className="text-gray-400 text-sm">{contact.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 flex items-center">
              © 2024 Fresh Laundry. Made with 
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              for our community.
            </p>
            <div className="flex space-x-6 text-sm">
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => onLearnMore?.('Privacy Policy')}
              >
                Privacy Policy
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => onLearnMore?.('Terms of Service')}
              >
                Terms of Service
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => onLearnMore?.('Cookie Policy')}
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}