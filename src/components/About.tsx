import { Badge } from "./ui/badge";
import { Users, Award, Leaf, Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Happy Customers" },
    { number: "50k+", label: "Items Cleaned" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      icon: Users,
      title: "Family Owned",
      description: "A local business that treats every customer like family"
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Professional-grade equipment and expert techniques"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Environmentally safe detergents and processes"
    },
    {
      icon: Heart,
      title: "Community Care",
      description: "Supporting our local community for over a decade"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Badge className="mb-4">About Fresh Laundry</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted Laundry Care Since 2014
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              What started as a small family business has grown into the most trusted 
              laundry service in the community. We combine traditional care with modern 
              convenience to deliver exceptional results.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our commitment to quality, sustainability, and customer satisfaction has 
              made us the preferred choice for busy families and professionals who 
              demand the best care for their garments.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=500&fit=crop"
              alt="Professional laundry facility"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">100% Eco-Friendly</p>
                  <p className="text-sm text-gray-600">Safe for you & environment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Fresh Laundry?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}