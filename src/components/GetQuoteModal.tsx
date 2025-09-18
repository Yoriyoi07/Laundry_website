import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Calculator, Mail, Phone, MapPin, Package, Clock, CheckCircle, ArrowRight, DollarSign } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetQuoteModal({ isOpen, onClose }: GetQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: 'wash-fold',
    frequency: 'weekly',
    estimatedWeight: '',
    specialRequirements: '',
    preferredContact: 'email'
  });

  const [step, setStep] = useState(1);
  const [quoteResult, setQuoteResult] = useState<any>(null);
  const totalSteps = 2;

  const serviceTypes = [
    { 
      id: 'wash-fold', 
      name: 'Wash & Fold', 
      basePrice: 1.50, 
      description: 'Standard laundry service',
      icon: Package 
    },
    { 
      id: 'dry-cleaning', 
      name: 'Dry Cleaning', 
      basePrice: 8.99, 
      description: 'Per item pricing',
      icon: Package 
    },
    { 
      id: 'premium', 
      name: 'Premium Care', 
      basePrice: 2.50, 
      description: 'Delicate fabric handling',
      icon: Package 
    },
    { 
      id: 'mixed', 
      name: 'Mixed Services', 
      basePrice: 2.00, 
      description: 'Combination of services',
      icon: Package 
    }
  ];

  const frequencies = [
    { id: 'weekly', name: 'Weekly', discount: 0.15 },
    { id: 'bi-weekly', name: 'Bi-Weekly', discount: 0.10 },
    { id: 'monthly', name: 'Monthly', discount: 0.05 },
    { id: 'one-time', name: 'One-Time', discount: 0 }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuote = () => {
    const selectedService = serviceTypes.find(s => s.id === formData.serviceType);
    const selectedFrequency = frequencies.find(f => f.id === formData.frequency);
    const weight = parseFloat(formData.estimatedWeight) || 10;
    
    if (!selectedService || !selectedFrequency) return null;

    let baseTotal;
    if (formData.serviceType === 'dry-cleaning') {
      baseTotal = selectedService.basePrice * Math.ceil(weight / 2); // Estimate items based on weight
    } else {
      baseTotal = selectedService.basePrice * weight;
    }

    const discount = baseTotal * selectedFrequency.discount;
    const discountedTotal = baseTotal - discount;
    const pickupDelivery = weight > 20 ? 5 : 0; // Fee for large loads
    const finalTotal = discountedTotal + pickupDelivery;

    return {
      baseTotal,
      discount,
      discountedTotal,
      pickupDelivery,
      finalTotal,
      serviceType: selectedService.name,
      frequency: selectedFrequency.name,
      weight
    };
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
    const quote = calculateQuote();
    setQuoteResult(quote);
    
    // Simulate sending quote
    toast.success("Quote calculated! We'll send the detailed estimate to your email shortly.");
    // Note: Removed automatic modal close - user now controls when to close
  };

  const handleCloseAndReset = () => {
    onClose();
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      serviceType: 'wash-fold',
      frequency: 'weekly',
      estimatedWeight: '',
      specialRequirements: '',
      preferredContact: 'email'
    });
    setStep(1);
    setQuoteResult(null);
  };

  const handleSchedulePickup = () => {
    // Close this modal and the parent can handle opening the schedule pickup modal
    handleCloseAndReset();
    toast.info("Redirecting to schedule pickup...");
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.serviceType && formData.frequency;
      default:
        return false;
    }
  };

  if (quoteResult) {
    return (
      <Dialog open={isOpen} onOpenChange={handleCloseAndReset}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <DollarSign className="w-6 h-6 mr-3 text-green-600" />
              Your Instant Quote
            </DialogTitle>
            <DialogDescription className="text-lg">
              Here's your personalized pricing estimate based on your requirements.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Quote Summary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Service Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span className="font-medium">{quoteResult.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{quoteResult.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Weight:</span>
                      <span className="font-medium">{quoteResult.weight} lbs</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Pricing Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Total:</span>
                      <span>${quoteResult.baseTotal.toFixed(2)}</span>
                    </div>
                    {quoteResult.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Frequency Discount:</span>
                        <span>-${quoteResult.discount.toFixed(2)}</span>
                      </div>
                    )}
                    {quoteResult.pickupDelivery > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Large Load Fee:</span>
                        <span>${quoteResult.pickupDelivery.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total Estimate:</span>
                      <span className="text-green-600">${quoteResult.finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  What's Included
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Free pickup and delivery</li>
                  <li>• Professional washing & folding</li>
                  <li>• Eco-friendly detergents</li>
                  <li>• Quality inspection</li>
                  <li>• 100% satisfaction guarantee</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  Next Steps
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Detailed quote sent to your email</li>
                  <li>• Schedule your first pickup</li>
                  <li>• Enjoy fresh, clean laundry!</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                onClick={handleSchedulePickup}
              >
                Schedule Pickup Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  toast.success("Quote saved! Check your email for the detailed estimate.");
                  handleCloseAndReset();
                }}
              >
                Save Quote & Close
              </Button>
            </div>

            {/* Contact Info */}
            <div className="text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p>Questions about your quote? Call us at <span className="font-medium text-blue-600">(555) 123-4567</span> or email <span className="font-medium text-blue-600">quotes@freshlaundry.com</span></p>
            </div>

            {/* Back to Form Option */}
            <div className="text-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setQuoteResult(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Modify Quote Details
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseAndReset}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Calculator className="w-6 h-6 mr-3 text-blue-600" />
            Get Your Free Quote
          </DialogTitle>
          <DialogDescription className="text-lg">
            Get an instant price estimate for your laundry needs in just 2 simple steps.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[1, 2].map((stepNumber) => (
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
              {stepNumber < 2 && (
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
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information
                </h3>
                <p className="text-blue-700 text-sm">
                  We'll use this information to send your personalized quote.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  className="focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="address">Service Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street, City, State"
                  className="focus:border-blue-400 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <select
                  id="preferredContact"
                  value={formData.preferredContact}
                  onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-400 focus:ring-blue-400"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="text">Text Message</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Service Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Service Requirements
                </h3>
                <p className="text-green-700 text-sm">
                  Tell us about your laundry needs for an accurate quote.
                </p>
              </div>

              <div className="space-y-3">
                <Label>Service Type *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {serviceTypes.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.serviceType === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => handleInputChange('serviceType', service.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{service.name}</h4>
                        <Badge variant="secondary">
                          ${service.basePrice}{service.id === 'dry-cleaning' ? '/item' : '/lb'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Service Frequency *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {frequencies.map((freq) => (
                    <div
                      key={freq.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.frequency === freq.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => handleInputChange('frequency', freq.id)}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{freq.name}</h4>
                        {freq.discount > 0 && (
                          <Badge className="bg-green-600">
                            {Math.round(freq.discount * 100)}% off
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedWeight">Estimated Weight (lbs)</Label>
                <Input
                  id="estimatedWeight"
                  type="number"
                  value={formData.estimatedWeight}
                  onChange={(e) => handleInputChange('estimatedWeight', e.target.value)}
                  placeholder="10"
                  className="focus:border-green-400 focus:ring-green-400"
                />
                <p className="text-sm text-gray-600">
                  Not sure? A typical load is 8-12 lbs (one week of laundry for one person)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Textarea
                  id="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                  placeholder="Any special washing instructions, stain treatments, or fabric care needs..."
                  rows={3}
                  className="focus:border-green-400 focus:ring-green-400"
                />
              </div>
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
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
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
                Get My Quote
                <Calculator className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Instant Quote
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              No Obligations
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
              Competitive Pricing
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}