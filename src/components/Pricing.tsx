import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Check, Star } from "lucide-react";

interface PricingProps {
  onSchedulePickup?: () => void;
  onGetQuote?: () => void;
  onContactSales?: () => void;
}

export function Pricing({ onSchedulePickup, onGetQuote, onContactSales }: PricingProps) {
  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small loads",
      price: "1.50",
      unit: "per lb",
      features: [
        "Wash & fold service",
        "Standard detergent",
        "48-hour turnaround",
        "Free pickup & delivery",
        "Basic folding"
      ],
      popular: false,
      buttonText: "Get Started"
    },
    {
      name: "Premium",
      description: "Great for families and regular customers",
      price: "1.25", 
      unit: "per lb",
      features: [
        "Wash & fold service",
        "Premium detergent & softener",
        "24-hour turnaround",
        "Free pickup & delivery",
        "Professional folding & packaging",
        "Stain pre-treatment",
        "Separate loads by preference"
      ],
      popular: true,
      buttonText: "Choose Premium"
    },
    {
      name: "Deluxe",
      description: "Ultimate care for your finest garments",
      price: "2.00",
      unit: "per lb",
      features: [
        "All Premium features",
        "Luxury detergent brands",
        "Same-day service available",
        "White-glove delivery service",
        "Dry cleaning included",
        "Garment repairs & alterations",
        "Dedicated account manager",
        "Quality guarantee"
      ],
      popular: false,
      buttonText: "Go Deluxe"
    }
  ];

  const addOns = [
    { service: "Express Service (24hrs)", price: "$5.00 extra" },
    { service: "Dry Cleaning", price: "$8.99/item" },
    { service: "Stain Removal", price: "$3.00/item" },
    { service: "Alterations", price: "Quote upon request" }
  ];

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include free pickup and delivery 
            within 5 miles. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600 mb-4">
                  {plan.description}
                </CardDescription>
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.unit}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={onSchedulePickup}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Additional Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white p-4 rounded-lg text-center">
                <h4 className="font-semibold text-gray-900 mb-2">{addon.service}</h4>
                <p className="text-blue-600 font-semibold">{addon.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Need a custom plan for your business or large family? 
            </p>
            <div className="space-x-4">
              <Button variant="outline" onClick={onGetQuote}>Get Custom Quote</Button>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                onClick={onContactSales}
              >
                Contact Sales Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}