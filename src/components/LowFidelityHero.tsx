import { Button } from "./ui/button";

interface LowFidelityHeroProps {
  onSchedulePickup?: () => void;
  onGetQuote?: () => void;
}

export function LowFidelityHero({ onSchedulePickup, onGetQuote }: LowFidelityHeroProps) {
  return (
    <section className="py-16 border-b-2 border-gray-300" id="home">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-full h-64 bg-gray-300 mx-auto mb-8"></div>
        
        <h1 className="text-4xl mb-4">Professional Laundry Services</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          We pick up, clean, and deliver your clothes with professional care.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={onSchedulePickup}>Schedule Pickup</Button>
          <Button variant="outline" size="lg" onClick={onGetQuote}>Get Quote</Button>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 mx-auto mb-2"></div>
            <p>Quality Guaranteed</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 mx-auto mb-2"></div>
            <p>Fast Service</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 mx-auto mb-2"></div>
            <p>Free Pickup</p>
          </div>
        </div>
      </div>
    </section>
  );
}