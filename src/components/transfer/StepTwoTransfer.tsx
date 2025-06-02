import React, { useState } from 'react';
import { User, Phone, MapPin } from 'lucide-react';

export default function ReceiverDetailsForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  const InputField = ({ label, name, type = 'text', icon: Icon, placeholder }) => (
    <div className="space-y-1">
      <label htmlFor={name} className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
        <Icon className="w-3 h-3" />
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-black transition-all ${
          errors[name] 
            ? 'border-red-300 bg-red-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      />
      {errors[name] && (
        <p className="text-xs text-red-500">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Receiver Details</h3>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <InputField
            label="First Name"
            name="firstName"
            icon={User}
            placeholder="John"
          />
          <InputField
            label="Last Name"
            name="lastName"
            icon={User}
            placeholder="Doe"
          />
        </div>
        
        <InputField
          label="Phone"
          name="phone"
          type="tel"
          icon={Phone}
          placeholder="+1 (555) 123-4567"
        />
        
        <InputField
          label="Address"
          name="address"
          icon={MapPin}
          placeholder="123 Main St, City, State 12345"
        />
      </div>
    </div>
  );
}