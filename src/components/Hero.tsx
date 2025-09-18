import { Button } from "./ui/button";
import { CheckCircle, Clock, Truck } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroProps {
  onSchedulePickup?: () => void;
  onGetQuote?: () => void;
}

export function Hero({ onSchedulePickup, onGetQuote }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20" id="home">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Professional Laundry Services 
              <span className="text-blue-600"> Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Skip the hassle of laundry day. We pick up, clean, and deliver your clothes 
              with professional care and attention to detail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="px-8 py-3" onClick={onSchedulePickup}>
                Schedule Pickup Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3" onClick={onGetQuote}>
                Get Free Quote
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Quality Guaranteed</p>
                  <p className="text-sm text-gray-600">100% satisfaction</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fast Turnaround</p>
                  <p className="text-sm text-gray-600">24-48 hours</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Free Pickup</p>
                  <p className="text-sm text-gray-600">& delivery</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative z-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                alt="Clean, folded laundry"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-6 rounded-xl shadow-lg z-20">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}