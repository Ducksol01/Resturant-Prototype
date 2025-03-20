
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const AboutPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Home
        </Button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-6">About Taste Haven</h1>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-700 mb-4">
              Taste Haven is a premium food delivery platform that connects food lovers with the best restaurants in their area. We believe that great food should be accessible to everyone, and our mission is to make food ordering a seamless and enjoyable experience.
            </p>
            
            <p className="text-gray-700 mb-4">
              Founded in 2023, Taste Haven has quickly become a favorite among food enthusiasts who appreciate quality, convenience, and exceptional customer service. We partner with a diverse range of restaurants, from local gems to popular chains, to bring you a wide variety of culinary delights.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="font-medium mb-2">Quality</h3>
                <p className="text-gray-600 text-sm">We carefully select our restaurant partners to ensure that only the highest quality food is available on our platform.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="font-medium mb-2">Convenience</h3>
                <p className="text-gray-600 text-sm">Our user-friendly interface makes ordering food as simple and convenient as possible.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="font-medium mb-2">Community</h3>
                <p className="text-gray-600 text-sm">We support local businesses and contribute to the growth of the food industry in our communities.</p>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50">
                <h3 className="font-medium mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">We continuously improve our platform to provide the best possible experience for our users and partners.</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            
            <p className="text-gray-700 mb-4">
              If you have any questions, suggestions, or concerns, we'd love to hear from you. You can reach our customer support team at <a href="mailto:support@tastehaven.com" className="text-blue-600 hover:underline">support@tastehaven.com</a> or visit our <a href="/contact" className="text-blue-600 hover:underline">Contact page</a> for more information.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutPage;
