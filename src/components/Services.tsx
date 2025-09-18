import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Shirt, Sparkles, Truck, Clock, Shield, Star } from "lucide-react";

interface ServicesProps {
  onSchedulePickup?: () => void;
  onLearnMore?: (service: string) => void;
}

export function Services({ onSchedulePickup, onLearnMore }: ServicesProps) {
  const services = [
    {
      icon: Shirt,
      title: "Wash & Fold",
      description: "Professional washing, drying, and folding of your everyday clothes",
      features: ["Eco-friendly detergents", "Fabric softener included", "Sorted by preference"],
      price: "Starting at $1.50/lb",
      popular: false
    },
    {
      icon: Sparkles,
      title: "Dry Cleaning",
      description: "Expert dry cleaning for delicate fabrics and formal wear",
      features: ["Professional pressing", "Stain treatment", "Protective garment bags"],
      price: "Starting at $8.99/item",
      popular: true
    },
    {
      icon: Truck,
      title: "Pickup & Delivery",
      description: "Convenient door-to-door service at your schedule",
      features: ["Same-day pickup", "Real-time tracking", "Flexible scheduling"],
      price: "Free within 5 miles",
      popular: false
    }
  ];

  const additionalServices = [
    { icon: Clock, title: "Express Service", description: "24-hour turnaround" },
    { icon: Shield, title: "Stain Removal", description: "Specialized treatment" },
    { icon: Star, title: "Premium Care", description: "Luxury fabric handling" }
  ];

  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Laundry Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From everyday wash & fold to specialized dry cleaning, we handle all your laundry needs 
            with professional care and attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-shadow cursor-pointer ${service.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {service.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-blue-600 mb-4">{service.price}</p>
                  <div className="space-y-2">
                    <Button 
                      variant={service.popular ? "default" : "outline"} 
                      className="w-full"
                      onClick={onSchedulePickup}
                    >
                      Schedule Now
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full text-blue-600 hover:text-blue-700"
                      onClick={() => onLearnMore?.(service.title)}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Additional Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div 
                key={index} 
                className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onLearnMore?.(service.title)}
              >
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <service.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" onClick={onSchedulePickup}>
              Get Started with Any Service
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}