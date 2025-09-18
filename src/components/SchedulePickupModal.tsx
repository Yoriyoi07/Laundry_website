import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Calendar, Clock, MapPin, User, Phone, Mail, Shirt, Star, CheckCircle, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface SchedulePickupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchedulePickupModal({ isOpen, onClose }: SchedulePickupModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    pickupDate: '',
    pickupTime: '',
    service: 'wash-fold',
    specialInstructions: '',
    estimatedWeight: '',
    urgency: 'standard'
  });

  const [step, setStep] = useState(1);
  const [minDate, setMinDate] = useState('');
  const totalSteps = 3;

  // Set minimum date to today
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setMinDate(formattedDate);
  }, []);

  const services = [
    { id: 'wash-fold', name: 'Wash & Fold', price: '$1.50/lb', description: 'Standard laundry service' },
    { id: 'dry-clean', name: 'Dry Cleaning', price: '$8.99/item', description: 'Professional dry cleaning' },
    { id: 'premium', name: 'Premium Care', price: '$2.50/lb', description: 'Delicate fabric handling' },
    { id: 'express', name: 'Express Service', price: '+$10', description: '24-hour turnaround' }
  ];

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM', 
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Provide feedback for date selection
    if (field === 'pickupDate' && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        toast.error("Please select a future date for pickup");
        return;
      }
      
      const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
      toast.success(`Pickup scheduled for ${dayName}, ${selectedDate.toLocaleDateString()}`);
    }
    
    // Provide feedback for time selection
    if (field === 'pickupTime' && value) {
      toast.success(`Time slot selected: ${value}`);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Validate pickup date one more time
    if (formData.pickupDate) {
      const selectedDate = new Date(formData.pickupDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        toast.error("Please select a valid future date for pickup");
        return;
      }
    }
    
    // Create summary for confirmation
    const selectedService = services.find(s => s.id === formData.service);
    const summary = `
Pickup Details:
• Date: ${new Date(formData.pickupDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
• Time: ${formData.pickupTime}
• Service: ${selectedService?.name}
• Address: ${formData.address}, ${formData.city} ${formData.zipCode}
    `.trim();
    
    // Simulate form submission
    toast.success("Pickup scheduled successfully! We'll send you a confirmation email shortly.", {
      description: summary,
      duration: 8000
    });
    
    onClose();
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      pickupDate: '',
      pickupTime: '',
      service: 'wash-fold',
      specialInstructions: '',
      estimatedWeight: '',
      urgency: 'standard'
    });
    setStep(1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.address && formData.city && formData.zipCode;
      case 3:
        // Validate pickup date is not in the past
        if (formData.pickupDate) {
          const selectedDate = new Date(formData.pickupDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            return false;
          }
        }
        return formData.pickupDate && formData.pickupTime && formData.service;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Shirt className="w-6 h-6 mr-3 text-blue-600" />
            Schedule Your Pickup
          </DialogTitle>
          <DialogDescription className="text-lg">
            Book your free laundry pickup in just a few simple steps.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                stepNumber <= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {stepNumber < step ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                  stepNumber < step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Contact Information
                </h3>
                <p className="text-blue-700 text-sm">
                  We'll use this information to coordinate your pickup and keep you updated.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                    className="focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                    className="focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className="focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>
          )}

          {/* Step 2: Address Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Pickup Address
                </h3>
                <p className="text-green-700 text-sm">
                  Where should we pick up your laundry? Free delivery within 5 miles.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street, Apt 2B"
                  className="focus:border-green-400 focus:ring-green-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Your City"
                    className="focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="12345"
                    className="focus:border-green-400 focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 text-sm">
                  <Star className="w-4 h-4 inline mr-2" />
                  Free pickup and delivery within 5 miles of our location. Additional fees may apply for longer distances.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Service Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Service Details
                </h3>
                <p className="text-purple-700 text-sm">
                  Choose your preferred pickup time and service type.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDate">Pickup Date *</Label>
                  <input
                    id="pickupDate"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                    min={minDate}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 focus:border-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ colorScheme: 'light' }}
                  />
                  {formData.pickupDate && (
                    <p className="text-sm text-purple-600">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(formData.pickupDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                  {!formData.pickupDate && (
                    <p className="text-sm text-gray-500">
                      Click to select a date
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupTime">Pickup Time *</Label>
                  <select
                    id="pickupTime"
                    value={formData.pickupTime}
                    onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 focus:border-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map((slot, index) => (
                      <option key={index} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {formData.pickupTime && (
                    <p className="text-sm text-purple-600">
                      <Clock className="w-4 h-4 inline mr-1" />
                      We'll arrive during: {formData.pickupTime}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Service Type *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.service === service.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => handleInputChange('service', service.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{service.name}</h4>
                        <Badge variant="secondary">{service.price}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedWeight">Estimated Weight (lbs)</Label>
                  <Input
                    id="estimatedWeight"
                    value={formData.estimatedWeight}
                    onChange={(e) => handleInputChange('estimatedWeight', e.target.value)}
                    placeholder="e.g., 15"
                    className="focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Service Speed</Label>
                  <select
                    id="urgency"
                    value={formData.urgency}
                    onChange={(e) => handleInputChange('urgency', e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 focus:border-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="standard">Standard (2-3 days)</option>
                    <option value="express">Express (24-48 hours) +$10</option>
                    <option value="same-day">Same Day +$25</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  placeholder="Any special care instructions, stain information, or preferences..."
                  rows={3}
                  className="focus:border-purple-400 focus:ring-purple-400"
                />
              </div>

              {/* Date/Time Summary */}
              {formData.pickupDate && formData.pickupTime && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Pickup Summary</h4>
                  <p className="text-green-700 text-sm">
                    📅 {new Date(formData.pickupDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-green-700 text-sm">
                    ⏰ {formData.pickupTime}
                  </p>
                  <p className="text-green-700 text-sm">
                    🧺 {services.find(s => s.id === formData.service)?.name}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </div>
          
          <div className="space-x-3">
            {step > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            
            {step < totalSteps ? (
              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                Schedule Pickup
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Free Pickup
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Satisfaction Guaranteed
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Secure & Insured
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}