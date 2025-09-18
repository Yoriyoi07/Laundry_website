import { useState } from "react";
import { HighFidelityHeader } from "./components/HighFidelityHeader";
import { HighFidelityHero } from "./components/HighFidelityHero";
import { HighFidelityServices } from "./components/HighFidelityServices";
import { HighFidelityAbout } from "./components/HighFidelityAbout";
import { HighFidelityPricing } from "./components/HighFidelityPricing";
import { HighFidelityContact } from "./components/HighFidelityContact";
import { HighFidelityFooter } from "./components/HighFidelityFooter";
import { SchedulePickupModal } from "./components/SchedulePickupModal";
import { GetQuoteModal } from "./components/GetQuoteModal";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isGetQuoteModalOpen, setIsGetQuoteModalOpen] = useState(false);

  const openScheduleModal = () => setIsScheduleModalOpen(true);
  const closeScheduleModal = () => setIsScheduleModalOpen(false);
  
  const openGetQuoteModal = () => setIsGetQuoteModalOpen(true);
  const closeGetQuoteModal = () => setIsGetQuoteModalOpen(false);

  // Navigation functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Contact functions
  const handlePhoneCall = () => {
    window.open('tel:+15551234567', '_self');
    toast.success("Opening phone app to call (555) 123-4567");
  };

  const handleEmailContact = () => {
    window.open('mailto:info@freshlaundry.com?subject=Laundry Service Inquiry', '_blank');
    toast.success("Opening email client");
  };

  // Sales team contact function
  const handleContactSales = () => {
    window.open('mailto:sales@freshlaundry.com?subject=Custom Pricing Inquiry - Enterprise Solutions&body=Hello Fresh Laundry Sales Team,%0D%0A%0D%0AI am interested in discussing custom pricing options for:%0D%0A%0D%0A- Business/Organization: [Please specify]%0D%0A- Estimated weekly volume: [Please specify]%0D%0A- Special requirements: [Please specify]%0D%0A%0D%0APlease contact me to schedule a consultation.%0D%0A%0D%0AThank you!', '_blank');
    toast.success("Opening email to sales team - We'll respond within 4 hours!");
  };

  // Social media functions
  const handleSocialClick = (platform: string, url: string) => {
    window.open(url, '_blank');
    toast.success(`Opening ${platform}`);
  };

  // Utility functions
  const handleLearnMore = (service: string) => {
    toast.info(`Learn more about ${service} - Contact us for details!`);
    scrollToSection('contact');
  };

  const handleNewsletterSignup = () => {
    toast.success("Newsletter signup coming soon! We'll notify you when it's ready.");
  };

  const commonProps = {
    onSchedulePickup: openScheduleModal,
    onGetQuote: openGetQuoteModal,
    onNavigate: scrollToSection,
    onPhoneCall: handlePhoneCall,
    onEmailContact: handleEmailContact,
    onSocialClick: handleSocialClick,
    onLearnMore: handleLearnMore,
    onNewsletterSignup: handleNewsletterSignup,
    onContactSales: handleContactSales,
  };

  return (
    <div className="min-h-screen bg-white">
      <HighFidelityHeader 
        onSchedulePickup={commonProps.onSchedulePickup}
        onGetQuote={commonProps.onGetQuote}
        onNavigate={commonProps.onNavigate}
        onPhoneCall={commonProps.onPhoneCall}
      />
      <HighFidelityHero 
        onSchedulePickup={commonProps.onSchedulePickup}
        onGetQuote={commonProps.onGetQuote}
      />
      <HighFidelityServices onSchedulePickup={commonProps.onSchedulePickup} />
      <HighFidelityAbout />
      <HighFidelityPricing 
        onSchedulePickup={commonProps.onSchedulePickup}
        onGetQuote={commonProps.onGetQuote}
        onContactSales={commonProps.onContactSales}
      />
      <HighFidelityContact onSchedulePickup={commonProps.onSchedulePickup} />
      <HighFidelityFooter 
        onNavigate={commonProps.onNavigate}
        onPhoneCall={commonProps.onPhoneCall}
        onEmailContact={commonProps.onEmailContact}
        onSocialClick={commonProps.onSocialClick}
        onLearnMore={commonProps.onLearnMore}
        onNewsletterSignup={commonProps.onNewsletterSignup}
      />
      
      {/* Schedule Pickup Modal */}
      <SchedulePickupModal 
        isOpen={isScheduleModalOpen} 
        onClose={closeScheduleModal} 
      />
      
      {/* Get Quote Modal */}
      <GetQuoteModal 
        isOpen={isGetQuoteModalOpen} 
        onClose={closeGetQuoteModal} 
      />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}