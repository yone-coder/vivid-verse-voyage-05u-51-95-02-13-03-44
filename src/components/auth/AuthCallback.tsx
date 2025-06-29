
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Processing auth callback...');
        
        // Get the session from URL hash
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/signin?error=callback_error');
          return;
        }

        if (data.session) {
          console.log('Authentication successful:', data.session.user);
          
          // Store authentication state
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('authToken', data.session.access_token);
          localStorage.setItem('user', JSON.stringify(data.session.user));
          
          // Trigger auth state change event
          window.dispatchEvent(new Event('authStateChanged'));
          
          // Redirect to homepage
          navigate('/', { replace: true });
        } else {
          console.log('No session found, redirecting to signin');
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error processing auth callback:', error);
        navigate('/signin?error=processing_error');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Completing Sign In</h2>
        <p className="text-gray-600">Please wait while we process your authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
