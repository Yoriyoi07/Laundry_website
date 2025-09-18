import { Button } from "./ui/button";

interface LowFidelityServicesProps {
  onSchedulePickup?: () => void;
  onLearnMore?: (service: string) => void;
}

export function LowFidelityServices({ onSchedulePickup, onLearnMore }: LowFidelityServicesProps) {
  return (
    <section className="py-16 border-b-2 border-gray-300" id="services">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl text-center mb-12">Our Services</h2>
        
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 mx-auto mb-4"></div>
            <h3 className="text-xl mb-2">Wash & Fold</h3>
            <p className="text-gray-600 mb-4">Professional washing and folding service</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={onSchedulePickup}>
                Schedule
              </Button>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => onLearnMore?.('Wash & Fold')}>
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 mx-auto mb-4"></div>
            <h3 className="text-xl mb-2">Dry Cleaning</h3>
            <p className="text-gray-600 mb-4">Expert dry cleaning for delicate items</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={onSchedulePickup}>
                Schedule
              </Button>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => onLearnMore?.('Dry Cleaning')}>
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 mx-auto mb-4"></div>
            <h3 className="text-xl mb-2">Pickup & Delivery</h3>
            <p className="text-gray-600 mb-4">Convenient door-to-door service</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={onSchedulePickup}>
                Schedule
              </Button>
              <Button variant="ghost" size="sm" className="w-full" onClick={() => onLearnMore?.('Pickup & Delivery')}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Button onClick={onSchedulePickup}>Get Started Today</Button>
        </div>
      </div>
    </section>
  );
}