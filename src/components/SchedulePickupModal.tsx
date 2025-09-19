import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Calendar, Clock, MapPin, User, Phone, Mail, Shirt, Star, CheckCircle, ArrowRight, DollarSign } from "lucide-react";
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
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
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
    { id: 'wash-fold', name: 'Wash & Fold', price: '$1.50/lb', basePrice: 1.50, unit: 'lb', description: 'Standard laundry service' },
    { id: 'dry-clean', name: 'Dry Cleaning', price: '$8.99/item', basePrice: 8.99, unit: 'item', description: 'Professional dry cleaning' },
    { id: 'premium', name: 'Premium Care', price: '$2.50/lb', basePrice: 2.50, unit: 'lb', description: 'Delicate fabric handling' },
    { id: 'express', name: 'Express Service', price: '+$10', basePrice: 10, unit: 'flat', description: '24-hour turnaround' }
  ];

  const timeSlots = [
    '8:00 AM - 10:00 AM',
    '10:00 AM - 12:00 PM', 
    '12:00 PM - 2:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM',
    '6:00 PM - 8:00 PM'
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

  // Price calculation function
  const calculatePrice = () => {
    const selectedService = services.find(s => s.id === formData.service);
    if (!selectedService) return null;

    const weight = parseFloat(formData.estimatedWeight) || 10; // Default to 10 lbs if not specified
    let baseTotal = 0;

    // Calculate base price based on service type
    if (selectedService.unit === 'lb') {
      baseTotal = selectedService.basePrice * weight;
    } else if (selectedService.unit === 'item') {
      // For dry cleaning, estimate items based on weight (roughly 2 lbs per item)
      const estimatedItems = Math.max(1, Math.ceil(weight / 2));
      baseTotal = selectedService.basePrice * estimatedItems;
    } else {
      // Flat fee for express service
      baseTotal = selectedService.basePrice;
    }

    // Add urgency fees
    let urgencyFee = 0;
    if (formData.urgency === 'express') {
      urgencyFee = 10;
    } else if (formData.urgency === 'same-day') {
      urgencyFee = 25;
    }

    // Add pickup fee for heavy loads (over 20 lbs)
    const heavyLoadFee = weight > 20 ? 5 : 0;

    const subtotal = baseTotal + urgencyFee + heavyLoadFee;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    return {
      baseTotal,
      urgencyFee,
      heavyLoadFee,
      subtotal,
      tax,
      total,
      weight,
      serviceName: selectedService.name,
      serviceUnit: selectedService.unit,
      urgencyName: formData.urgency === 'express' ? 'Express (24-48 hours)' : 
                   formData.urgency === 'same-day' ? 'Same Day' : 'Standard (2-3 days)'
    };
  };

  const priceBreakdown = calculatePrice();

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
    const finalPriceBreakdown = calculatePrice();
    const summary = `
Pickup Details:
• Date: ${new Date(formData.pickupDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
• Time: ${formData.pickupTime}
• Service: ${selectedService?.name}
• Weight: ${formData.estimatedWeight} lbs
• Address: ${formData.address}, ${formData.city} ${formData.zipCode}
${finalPriceBreakdown ? `• Estimated Total: $${finalPriceBreakdown.total.toFixed(2)}` : ''}
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
    setValidationErrors({});
    setStep(1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.firstName && 
               formData.lastName && 
               formData.email && 
               validateEmail(formData.email) &&
               formData.phone && 
               validatePhone(formData.phone) &&
               Object.keys(validationErrors).length === 0;
      case 2:
        return formData.address && 
               formData.city && validateCity(formData.city) &&
               formData.zipCode && validateZipCode(formData.zipCode) &&
               !validationErrors.city && !validationErrors.zipCode;
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
        return formData.pickupDate && formData.pickupTime && formData.service && formData.estimatedWeight;
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
                  className={`focus:border-blue-400 focus:ring-blue-400 ${validationErrors.email ? 'border-red-500' : ''}`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm">{validationErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="09123456789"
                  className={`focus:border-blue-400 focus:ring-blue-400 ${validationErrors.phone ? 'border-red-500' : ''}`}
                />
                {validationErrors.phone && (
                  <p className="text-red-500 text-sm">{validationErrors.phone}</p>
                )}
                <p className="text-xs text-gray-500">Must start with 09 and be 11 digits total</p>
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
                    placeholder="Manila"
                    className={`focus:border-green-400 focus:ring-green-400 ${validationErrors.city ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.city && (
                    <p className="text-red-500 text-sm">{validationErrors.city}</p>
                  )}
                  <p className="text-xs text-gray-500">Enter your city name (letters only)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="1234"
                    className={`focus:border-green-400 focus:ring-green-400 ${validationErrors.zipCode ? 'border-red-500' : ''}`}
                    maxLength={4}
                  />
                  {validationErrors.zipCode && (
                    <p className="text-red-500 text-sm">{validationErrors.zipCode}</p>
                  )}
                  <p className="text-xs text-gray-500">Must be exactly 4 digits</p>
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
                  {services.map((service) => {
                    // Calculate price for this specific service
                    const weight = parseFloat(formData.estimatedWeight) || 10;
                    let estimatedCost = 0;
                    if (service.unit === 'lb') {
                      estimatedCost = service.basePrice * weight;
                    } else if (service.unit === 'item') {
                      const estimatedItems = Math.max(1, Math.ceil(weight / 2));
                      estimatedCost = service.basePrice * estimatedItems;
                    } else {
                      estimatedCost = service.basePrice;
                    }

                    return (
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
                          <div className="text-right">
                            <Badge variant="secondary">{service.price}</Badge>
                            {formData.estimatedWeight && (
                              <p className="text-xs text-purple-600 mt-1 font-medium">
                                ≈ ${estimatedCost.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedWeight">Estimated Weight (lbs) *</Label>
                  <Input
                    id="estimatedWeight"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.estimatedWeight}
                    onChange={(e) => handleInputChange('estimatedWeight', e.target.value)}
                    placeholder="e.g., 15"
                    className="focus:border-purple-400 focus:ring-purple-400"
                  />
                  <p className="text-xs text-gray-500">
                    💡 Typical load: 8-12 lbs (one week of laundry for one person)
                  </p>
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

              {/* Pricing Summary */}
              {priceBreakdown && (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Estimated Cost
                  </h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-blue-700">Service:</span>
                          <span className="font-medium text-blue-900">{priceBreakdown.serviceName}</span>
                        </div>
                        {priceBreakdown.serviceUnit === 'lb' && (
                          <div className="flex justify-between mb-1">
                            <span className="text-blue-600">{priceBreakdown.weight} lbs:</span>
                            <span className="font-medium">${priceBreakdown.baseTotal.toFixed(2)}</span>
                          </div>
                        )}
                        {priceBreakdown.serviceUnit === 'item' && (
                          <div className="flex justify-between mb-1">
                            <span className="text-blue-600">Est. {Math.ceil(priceBreakdown.weight / 2)} items:</span>
                            <span className="font-medium">${priceBreakdown.baseTotal.toFixed(2)}</span>
                          </div>
                        )}
                        {priceBreakdown.serviceUnit === 'flat' && (
                          <div className="flex justify-between mb-1">
                            <span className="text-blue-600">Service fee:</span>
                            <span className="font-medium">${priceBreakdown.baseTotal.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-blue-700">Speed:</span>
                          <span className="font-medium text-blue-900">{priceBreakdown.urgencyName}</span>
                        </div>
                        {priceBreakdown.urgencyFee > 0 && (
                          <div className="flex justify-between mb-1">
                            <span className="text-blue-600">Rush fee:</span>
                            <span className="font-medium">+${priceBreakdown.urgencyFee.toFixed(2)}</span>
                          </div>
                        )}
                        {priceBreakdown.heavyLoadFee > 0 && (
                          <div className="flex justify-between mb-1">
                            <span className="text-blue-600">Heavy load:</span>
                            <span className="font-medium">+${priceBreakdown.heavyLoadFee.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-blue-300 pt-3">
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="text-blue-700">Subtotal:</span>
                        <span className="font-medium">${priceBreakdown.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-blue-700">Tax (8%):</span>
                        <span className="font-medium">${priceBreakdown.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg text-blue-900 bg-white/60 p-2 rounded">
                        <span>Total Estimate:</span>
                        <span>${priceBreakdown.total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-blue-600 bg-white/60 p-2 rounded">
                      💡 Final price may vary based on actual weight and any special requirements
                    </div>
                  </div>
                </div>
              )}

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
                  {priceBreakdown && (
                    <p className="text-green-700 text-sm font-medium">
                      💰 Estimated: ${priceBreakdown.total.toFixed(2)}
                    </p>
                  )}
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