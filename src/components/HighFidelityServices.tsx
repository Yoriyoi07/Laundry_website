import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Shirt, Sparkles, Truck, Clock, Shield, Star, ArrowRight, CheckCircle } from "lucide-react";

interface HighFidelityServicesProps {
  onSchedulePickup?: () => void;
}

export function HighFidelityServices({ onSchedulePickup }: HighFidelityServicesProps) {
  const services = [
    {
      icon: Shirt,
      title: "Wash & Fold",
      description: "Professional washing, drying, and folding with premium care",
      features: ["Eco-friendly detergents", "Fabric softener included", "Sorted by preference", "Professional folding"],
      price: "Starting at $1.50/lb",
      popular: false,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      icon: Sparkles,
      title: "Premium Dry Cleaning",
      description: "Expert dry cleaning for delicate fabrics and formal wear",
      features: ["Professional pressing", "Stain treatment", "Protective garment bags", "Same-day available"],
      price: "Starting at $8.99/item",
      popular: true,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      icon: Truck,
      title: "Pickup & Delivery",
      description: "Convenient door-to-door service on your schedule",
      features: ["Same-day pickup", "Real-time tracking", "Flexible scheduling", "Contactless service"],
      price: "Free within 5 miles",
      popular: false,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100"
    }
  ];

  const additionalServices = [
    { icon: Clock, title: "Express Service", description: "24-hour turnaround", color: "text-orange-600" },
    { icon: Shield, title: "Stain Removal", description: "Specialized treatment", color: "text-red-600" },
    { icon: Star, title: "Premium Care", description: "Luxury fabric handling", color: "text-yellow-600" }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

  <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            Premium Services
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Complete Laundry
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From everyday wash & fold to specialized dry cleaning, we handle all your laundry needs 
            with professional care, eco-friendly processes, and unmatched convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className={`relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden ${service.popular ? 'ring-2 ring-purple-400 ring-opacity-50' : ''}`}>
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 shadow-lg">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative text-center pb-4 pt-8">
                <div className={`bg-gradient-to-r ${service.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">{service.title}</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-700 group-hover:text-gray-800">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="text-center space-y-4">
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {service.price}
                  </p>
                  <Button 
                    className={`w-full group-hover:shadow-lg transition-all duration-300 ${service.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'}`}
                    onClick={onSchedulePickup}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 shadow-xl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Premium Add-On Services
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="flex items-center bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="bg-gray-50 p-4 rounded-xl mr-6 group-hover:bg-gray-100 transition-colors">
                  <service.icon className={`w-6 h-6 ${service.color}`} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{service.title}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6 text-lg">
              Need a custom solution for your business or large family?
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 px-8 py-3"
            >
              Contact Us for Custom Pricing
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}