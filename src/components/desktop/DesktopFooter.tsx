
import React from 'react';
import { Globe, Mail, Phone, MapPin, Shield, CreditCard, HelpCircle } from 'lucide-react';

const DesktopFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">
                  GLOBAL TRANSFÈ
                </h3>
                <p className="text-xs text-gray-400 -mt-1">Worldwide Money Transfer</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Send money worldwide with confidence. Fast, secure, and reliable international money transfers at competitive rates.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Money Transfer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Locations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Track Transfer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Exchange Rates
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                +1 (800) 123-4567
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                support@globaltransfe.com
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                New York, USA
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="font-medium text-white mb-2">Follow Us</h5>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-xs">f</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-xs">t</span>
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-xs">in</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 Global Transfè. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
