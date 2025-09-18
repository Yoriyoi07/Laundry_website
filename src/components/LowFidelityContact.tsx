import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function LowFidelityContact() {
  return (
    <section className="py-16 border-b-2 border-gray-300" id="contact">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl text-center mb-12">Contact Us</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-2 border-gray-300">
            <CardHeader>
              <CardTitle>Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input placeholder="Your Email" type="email" />
                <Input placeholder="Your Phone" type="tel" />
                <Textarea placeholder="Your Message" rows={4} />
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Phone: (555) 123-4567</p>
                  </div>
                  <div>
                    <p className="font-medium">Email: info@freshlaundry.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Address: 123 Main Street</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-gray-300">
              <CardContent className="pt-6">
                <h4 className="font-medium mb-2">Business Hours</h4>
                <p>Mon-Fri: 7AM-7PM</p>
                <p>Sat: 8AM-5PM</p>
                <p>Sun: Closed</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}