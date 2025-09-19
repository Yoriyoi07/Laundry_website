import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactProps {
  onPhoneCall?: () => void;
  onEmailContact?: () => void;
  onSchedulePickup?: () => void;
}

export function Contact({ onPhoneCall, onEmailContact, onSchedulePickup }: ContactProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-4567",
      subtitle: "Call us anytime",
      onClick: onPhoneCall
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@freshlaundry.com",
      subtitle: "We'll respond within 24hrs",
      onClick: onEmailContact
    },
    {
      icon: MapPin,
      title: "Location", 
      details: "123 Main Street, Your City, ST 12345",
      subtitle: "Free pickup within 5 miles",
      onClick: () => {
        window.open('https://maps.google.com?q=123+Main+Street,+Your+City,+ST+12345', '_blank');
        toast.success("Opening location in Google Maps");
      }
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 7AM-7PM, Sat: 8AM-5PM",
      subtitle: "Closed Sundays",
      onClick: () => toast.info("We're open Monday through Saturday!")
    }
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it starts with 09 and has exactly 11 digits
    return digitsOnly.startsWith('09') && digitsOnly.length === 11;
  };

  const validateZipCode = (zipCode: string): boolean => {
    // Philippines postal codes are 4 digits
    const digitsOnly = zipCode.replace(/\D/g, '');
    return digitsOnly.length === 4;
  };

  const validateCity = (city: string): boolean => {
    // City should be at least 2 characters and contain only letters, spaces, and basic punctuation
    const cityRegex = /^[a-zA-Z\s\-\.\']{2,}$/;
    return cityRegex.test(city.trim());
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Real-time validation
    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setValidationErrors(prev => ({ ...prev, email: 'Please enter a valid email address with @' }));
      }
    }
    
    if (field === 'phone' && value) {
      if (!validatePhone(value)) {
        setValidationErrors(prev => ({ ...prev, phone: 'Phone number must start with 09 and be exactly 11 digits' }));
      }
    }
    
    if (field === 'zipCode' && value) {
      if (!validateZipCode(value)) {
        setValidationErrors(prev => ({ ...prev, zipCode: 'ZIP code must be exactly 4 digits' }));
      }
    }
    
    if (field === 'city' && value) {
      if (!validateCity(value)) {
        setValidationErrors(prev => ({ ...prev, city: 'Please enter a valid city name (letters only)' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.email) {
      toast.error("Please fill out the required fields (Name and Email)");
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      toast.error("Phone number must start with 09 and be exactly 11 digits");
      return;
    }

    // Check for validation errors
    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    toast.success("Message sent! We'll get back to you within 24 hours.");
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      message: ''
    });
    setValidationErrors({});
  };

  const handleClaimDiscount = () => {
    toast.success("🎉 Discount claimed! Use code 'NEW20' for 20% off your first order.");
    onSchedulePickup?.();
  };

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to experience hassle-free laundry? Contact us today to schedule 
            your first pickup or ask any questions about our services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={validationErrors.email ? 'border-red-500' : ''}
                    required
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="09123456789"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={validationErrors.phone ? 'border-red-500' : ''}
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Must start with 09 and be 11 digits total (optional)</p>
                </div>
                
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input 
                    id="address" 
                    placeholder="123 Your Street, Apt 2B"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      placeholder="Manila"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={validationErrors.city ? 'border-red-500' : ''}
                    />
                    {validationErrors.city && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Enter your city name (letters only)</p>
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input 
                      id="zipCode" 
                      placeholder="1234"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className={validationErrors.zipCode ? 'border-red-500' : ''}
                      maxLength={4}
                    />
                    {validationErrors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.zipCode}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Must be exactly 4 digits</p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your laundry needs or ask any questions..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  Send Message & Get Quote
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-blue-600 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Why Choose Fresh Laundry?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Free pickup and delivery within 5 miles
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Professional cleaning with eco-friendly products
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  24-48 hour turnaround time
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  100% satisfaction guarantee
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index}
                  className={`${info.onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
                  onClick={info.onClick}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <info.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                        <p className="text-sm font-medium text-gray-900 mb-1">{info.details}</p>
                        <p className="text-xs text-gray-600">{info.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-semibold text-green-800 mb-2">
                    🎉 New Customer Special
                  </h4>
                  <p className="text-green-700 mb-3">
                    Get 20% off your first order when you mention this website!
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-green-300 text-green-700 hover:bg-green-100"
                    onClick={handleClaimDiscount}
                  >
                    Claim Your Discount
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}