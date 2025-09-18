import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface LowFidelityPricingProps {
  onSchedulePickup?: () => void;
  onContactSales?: () => void;
}

export function LowFidelityPricing({ onSchedulePickup, onContactSales }: LowFidelityPricingProps) {
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
        "Pickup & Delivery"
      ]
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
        "Stain Treatment",
        "Fabric Softener"
      ],
      popular: true
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
        "Advanced Stain Removal",
        "Hand Folding",
        "Garment Inspection"
      ]
    }
  ];

  return (
    <section className="py-16 border-b-2 border-gray-300" id="pricing">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl text-center mb-4">Simple Pricing</h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the plan that works best for your laundry needs. No hidden fees, no contracts.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`border-2 border-gray-300 ${plan.popular ? 'border-blue-500' : ''}`}>
              {plan.popular && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <div className="w-4 h-4 bg-green-500 mr-3 rounded"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? 'bg-blue-600' : ''}`} onClick={onSchedulePickup}>
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="border-2 border-gray-300 max-w-md mx-auto">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-2">Need Custom Pricing?</h4>
              <p className="text-gray-600 mb-4">
                Large families or businesses can get custom rates.
              </p>
              <Button 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={onContactSales}
              >
                Contact Sales Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}