import { Button } from "./ui/button";
import { CheckCircle, Clock, Truck, Star, ArrowRight, Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HighFidelityHeroProps {
  onSchedulePickup?: () => void;
  onGetQuote?: () => void;
}

export function HighFidelityHero({ onSchedulePickup, onGetQuote }: HighFidelityHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden" id="home">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 2xl:gap-28 items-center">
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm">
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Trusted by 500+ Families • 4.9★ Rating</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Fresh, Clean</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                  Laundry Delivered
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Experience premium laundry care with our professional wash, fold, and delivery service. 
                <span className="font-semibold text-blue-700"> We handle the dirty work, you enjoy fresh clothes.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={onSchedulePickup}
              >
                Schedule Free Pickup
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                onClick={onGetQuote}
              >
                <Play className="w-5 h-5 mr-2" />
                Get Free Quote
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              {[
                { icon: CheckCircle, title: "100% Satisfaction", desc: "Guaranteed quality", color: "text-green-600" },
                { icon: Clock, title: "24-48 Hours", desc: "Fast turnaround", color: "text-blue-600" },
                { icon: Truck, title: "Free Delivery", desc: "Within 5 miles", color: "text-purple-600" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="relative">
            <div className="relative z-10">
              {/* Main Image */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
                  alt="Premium laundry service"
                  className="w-full h-64 md:h-72 lg:h-80 xl:h-[22rem] 2xl:h-[26rem] object-cover rounded-2xl shadow-lg"
                />
                
                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-xl z-20">
                  <div className="text-center">
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-sm opacity-90">Happy Customers</p>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl shadow-xl z-20">
                  <div className="text-center">
                    <p className="text-2xl font-bold">24hr</p>
                    <p className="text-sm opacity-90">Fast Service</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl opacity-20 blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>

        {/* Bottom Section - Customer Logos/Testimonials Preview */}
        <div className="mt-24 text-center">
          <p className="text-gray-600 mb-8">Trusted by leading families and businesses</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-12 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}