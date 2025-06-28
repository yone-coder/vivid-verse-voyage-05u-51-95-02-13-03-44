
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

const DashboardCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('Dashboard callback - checking authentication status...');
      
      try {
        // Check authentication status with backend
        const authStatus = await authService.checkAuthStatus();
        
        if (authStatus.authenticated) {
          console.log('User authenticated successfully:', authStatus.user);
          
          // Store authentication data
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(authStatus.user));
          
          // Generate a simple token for local use
          localStorage.setItem('authToken', 'authenticated_' + Date.now());
          
          // Trigger auth state change event to notify MainLayout
          window.dispatchEvent(new Event('authStateChanged'));
          
          // Small delay to ensure state is updated
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 100);
        } else {
          console.error('Authentication failed - user not authenticated');
          navigate('/signin?error=auth_failed', { replace: true });
        }
      } catch (error) {
        console.error('Error handling dashboard callback:', error);
        navigate('/signin?error=callback_error', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Completing Sign In</h2>
        <p className="text-gray-600">Please wait while we finish setting up your account...</p>
      </div>
    </div>
  );
};

export default DashboardCallback;
