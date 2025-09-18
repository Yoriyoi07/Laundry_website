import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function LowFidelityAbout() {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Happy Customers" },
    { number: "50k+", label: "Items Cleaned" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const values = [
    { title: "Family Owned", description: "A local business that treats every customer like family" },
    { title: "Quality First", description: "Professional-grade equipment and expert techniques" },
    { title: "Eco-Friendly", description: "Environmentally safe detergents and processes" },
    { title: "Community Care", description: "Supporting our local community for over a decade" }
  ];

  return (
    <section className="py-16 border-b-2 border-gray-300" id="about">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl text-center mb-12">About Fresh Laundry</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="w-full h-64 bg-gray-300 mb-6"></div>
          </div>
          
          <div>
            <h3 className="text-2xl mb-4">Trusted Laundry Care Since 2014</h3>
            <p className="text-gray-600 mb-6">
              What started as a small family business has grown into the most trusted 
              laundry service in the community. We combine traditional care with modern 
              convenience to deliver exceptional results.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 border-2 border-gray-300">
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="border-2 border-gray-300">
          <CardHeader>
            <CardTitle className="text-center">Why Choose Fresh Laundry?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 bg-gray-300 mr-4 mt-1"></div>
                  <div>
                    <h4 className="font-medium mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}