import { Badge } from "./ui/badge";
import { Users, Award, Leaf, Heart, CheckCircle, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HighFidelityAbout() {
  const stats = [
    { number: "10+", label: "Years Experience", color: "from-blue-500 to-blue-600" },
    { number: "500+", label: "Happy Customers", color: "from-green-500 to-green-600" },
    { number: "50k+", label: "Items Cleaned", color: "from-purple-500 to-purple-600" },
    { number: "99%", label: "Satisfaction Rate", color: "from-orange-500 to-orange-600" }
  ];

  const values = [
    {
      icon: Users,
      title: "Family Owned",
      description: "A local business that treats every customer like family",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Professional-grade equipment and expert techniques",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Environmentally safe detergents and processes",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Heart,
      title: "Community Care",
      description: "Supporting our local community for over a decade",
      color: "from-red-500 to-red-600"
    }
  ];

  const achievements = [
    "Best Laundry Service 2023",
    "Eco-Friendly Business Award",
    "Community Choice Winner",
    "5-Star Customer Rating"
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden" id="about">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

  <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
                About Fresh Laundry
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-gray-900">Trusted Laundry Care</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Since 2014
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                What started as a small family business has grown into the most trusted 
                laundry service in the community. We combine traditional care with modern 
                convenience to deliver exceptional results.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to quality, sustainability, and customer satisfaction has 
                made us the preferred choice for busy families and professionals who 
                demand the best care for their garments.
              </p>
            </div>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                  <div className={`w-full h-1 bg-gradient-to-r ${stat.color} rounded-full mt-3 opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Awards & Recognition
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {achievement}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&h=500&fit=crop"
                  alt="Professional laundry facility"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-xl z-20 max-w-xs">
                  <div className="flex items-center">
                    <div className="bg-white/20 p-3 rounded-full mr-4">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">100% Eco-Friendly</p>
                      <p className="text-sm text-green-100">Safe for you & environment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-3xl opacity-20 blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-10 blur-3xl"></div>
          </div>
        </div>

        {/* Enhanced Values Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/50">
          <h3 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose Fresh Laundry?
          </h3>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our core values drive everything we do, ensuring exceptional service and customer satisfaction.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className={`bg-gradient-to-r ${value.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}