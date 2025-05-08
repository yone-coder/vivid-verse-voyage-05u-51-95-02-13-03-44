
import React from 'react';
import { Key, Fingerprint, Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PasskeyTabProps {
  onSubmit?: (e: React.FormEvent) => void;
  showSubmitButton?: boolean;
}

const PasskeyTab = ({ onSubmit, showSubmitButton = false }: PasskeyTabProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Animated icon container */}
      <motion.div 
        className="relative mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff474733] to-[#ff6060] blur-xl rounded-full opacity-30" />
        
        {/* Icon background */}
        <motion.div 
          className="relative bg-gradient-to-br from-white to-gray-50 w-20 h-20 rounded-full shadow-lg flex items-center justify-center border border-gray-100"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Icon with drop shadow */}
          <Fingerprint className="h-10 w-10 text-[#ff4747] drop-shadow-md" />
        </motion.div>
      </motion.div>

      {/* Title and description */}
      <motion.div 
        className="text-center space-y-3 mb-6"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-xl font-semibold bg-gradient-to-r from-[#ff3030] to-[#ff6060] bg-clip-text text-transparent">
          Passwordless Sign In
        </h3>
        <p className="text-gray-600 max-w-xs mx-auto text-sm leading-relaxed">
          Use your device's biometric authentication or security key for a faster, more secure sign-in experience.
        </p>
      </motion.div>

      {/* Security badges */}
      <motion.div 
        className="flex items-center justify-center gap-3 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <Shield className="h-3 w-3 mr-1 text-green-500" />
          <span>FIDO2 Certified</span>
        </div>
        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
          <Key className="h-3 w-3 mr-1 text-blue-500" />
          <span>WebAuthn</span>
        </div>
      </motion.div>
      
      {/* Submit button */}
      {showSubmitButton && onSubmit && (
        <motion.button 
          type="button"
          onClick={(e) => onSubmit(e)}
          className="w-full flex items-center justify-center bg-gradient-to-r from-[#ff3030] to-[#ff6060] text-white font-medium py-3.5 px-4 rounded-md hover:shadow-md hover:from-[#ff2020] hover:to-[#ff5050] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff4747] focus:ring-offset-2 relative overflow-hidden group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="mr-2">Continue with Passkey</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          
          {/* Subtle animation effect on hover */}
          <motion.div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-md"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      )}

      {/* Help text */}
      <motion.p 
        className="text-xs text-gray-500 mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        Don't have a passkey? You'll be prompted to create one.
      </motion.p>
    </div>
  );
};

export default PasskeyTab;
