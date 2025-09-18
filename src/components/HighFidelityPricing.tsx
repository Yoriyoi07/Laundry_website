import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CheckCircle, Star, Sparkles, Crown, ArrowRight } from "lucide-react";

interface HighFidelityPricingProps {
  onSchedulePickup?: () => void;
  onGetQuote?: () => void;
  onContactSales?: () => void;
}

export function HighFidelityPricing({ onSchedulePickup, onGetQuote, onContactSales }: HighFidelityPricingProps) {
  const plans = [
    {
      name: "Basic",
      price: "$15",
      period: "per load",
      description: "Perfect for individuals and small households",
      features: [
        "Wash & Fold Service",
        "Standard Detergent", 
        "2-3 Day Turnaround",
        "Pickup & Delivery",
        "Basic Stain Treatment"
      ],
      icon: Sparkles,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      name: "Premium",
      price: "$25", 
      period: "per load",
      description: "Best value for families and regular customers",
      features: [
        "Wash & Fold Service",
        "Premium Detergent",
        "24-48 Hour Turnaround",
        "Pickup & Delivery",
        "Advanced Stain Treatment",
        "Fabric Softener",
        "Quality Inspection"
      ],
      popular: true,
      icon: Star,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100"
    },
    {
      name: "Deluxe",
      price: "$35",
      period: "per load", 
      description: "Ultimate care for your finest garments",
      features: [
        "Wash & Fold Service",
        "Eco-Friendly Products",
        "Same Day Service",
        "Pickup & Delivery",
        "Professional Stain Removal",
        "Hand Folding",
        "Garment Inspection",
        "Premium Packaging"
      ],
      icon: Crown,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100"
    }
  ];

  const addOns = [
    { name: "Express Service", price: "+$10", description: "Same-day turnaround" },
    { name: "Eco-Premium", price: "+$5", description: "100% organic detergents" },
    { name: "Garment Repair", price: "+$8", description: "Minor alterations & fixes" },
    { name: "Delivery Priority", price: "+$3", description: "Preferred time slots" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 relative overflow-hidden" id="pricing">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

  <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            Transparent Pricing
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple & Fair
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that works best for your laundry needs. No hidden fees, no contracts, 
            just transparent pricing with exceptional service guaranteed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden ${plan.popular ? 'ring-2 ring-purple-400 ring-opacity-50 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 shadow-lg">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative text-center pb-4 pt-8">
                <div className={`bg-gradient-to-r ${plan.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                  <plan.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">{plan.name}</CardTitle>
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 my-4">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                </div>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700 group-hover:text-gray-800">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full group-hover:shadow-lg transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-lg py-3`}
                  onClick={onSchedulePickup}
                >
                  Choose {plan.name}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-Ons Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50 mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Premium Add-Ons
          </h3>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Enhance your laundry experience with our premium add-on services.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {addon.price}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{addon.name}</h4>
                  <p className="text-gray-600 text-sm">{addon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Pricing CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 max-w-2xl mx-auto overflow-hidden">
            <CardContent className="p-12">
              <h4 className="text-2xl font-bold mb-4">Need Custom Pricing?</h4>
              <p className="text-blue-100 mb-8 text-lg leading-relaxed">
                Large families, businesses, or special requirements? We'll create a custom plan 
                that fits your specific needs and budget.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-8 py-3 transition-all duration-300 transform hover:scale-105"
                  onClick={onContactSales}
                >
                  Contact Sales Team
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 transition-all duration-300 transform hover:scale-105"
                  onClick={onGetQuote}
                >
                  Get Free Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Money-back guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">30-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}