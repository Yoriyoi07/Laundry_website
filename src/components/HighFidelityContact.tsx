import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Star, CheckCircle, ArrowRight } from "lucide-react";

interface HighFidelityContactProps {
  onSchedulePickup?: () => void;
}

export function HighFidelityContact({ onSchedulePickup }: HighFidelityContactProps) {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us Today",
      details: "(555) 123-4567",
      subtitle: "Available 7 days a week",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "info@freshlaundry.com",
      subtitle: "24-hour response guarantee",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MapPin,
      title: "Visit Our Location", 
      details: "123 Main Street, Your City, ST 12345",
      subtitle: "Free pickup within 5 miles",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      subtitle: "Closed Sundays for family time",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const whyChooseUs = [
    "Free pickup and delivery within 5 miles",
    "Professional cleaning with eco-friendly products",
    "24-48 hour turnaround time",
    "100% satisfaction guarantee",
    "Experienced team with 10+ years of service",
    "Competitive pricing with no hidden fees"
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden" id="contact">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

  <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            Get In Touch
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Ready to Experience
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Fresh Laundry?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Contact us today to schedule your first pickup or ask any questions about our services. 
            We're here to make your laundry experience effortless and convenient.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
                Send Us a Message
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Fill out the form below and we'll get back to you within 24 hours with a personalized quote.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700 font-medium">Pickup Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Your Street, City, State" 
                    className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-gray-700 font-medium">Service Needed</Label>
                  <select 
                    id="service"
                    className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                  >
                    <option>Select a service</option>
                    <option>Wash & Fold</option>
                    <option>Dry Cleaning</option>
                    <option>Pickup & Delivery</option>
                    <option>Custom Quote</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your laundry needs or ask any questions..."
                    rows={4}
                    className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-lg py-3"
                  size="lg"
                  onClick={onSchedulePickup}
                >
                  Schedule Pickup & Get Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            {/* Why Choose Us Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3" />
                  Why Choose Fresh Laundry?
                </h3>
                <ul className="space-y-4">
                  {whyChooseUs.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-blue-200 flex-shrink-0" />
                      <span className="text-blue-50">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className={`bg-gradient-to-r ${info.color} p-3 rounded-xl mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                        <p className="font-medium text-gray-800 mb-1">{info.details}</p>
                        <p className="text-sm text-gray-600">{info.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Special Offer Card */}
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 border-2">
              <CardContent className="p-8 text-center">
                <div className="bg-green-500 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  🎉
                </div>
                <h4 className="text-xl font-bold text-green-800 mb-3">
                  New Customer Special Offer!
                </h4>
                <p className="text-green-700 mb-6 text-lg">
                  Get 20% off your first order when you mention this website! 
                  Plus free pickup and delivery on your initial service.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  onClick={onSchedulePickup}
                >
                  Claim Your Discount
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 py-4"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 py-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}