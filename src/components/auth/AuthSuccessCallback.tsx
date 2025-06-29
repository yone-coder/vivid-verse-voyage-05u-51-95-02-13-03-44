
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccessCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('Auth success callback - processing OAuth response...');
      
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const isNewUser = searchParams.get('new') === 'true';
        
        if (!token || !userParam) {
          console.error('Missing token or user data in callback');
          navigate('/signin?error=missing_data', { replace: true });
          return;
        }

        // Parse user data
        const userData = JSON.parse(decodeURIComponent(userParam));
        console.log('Google OAuth successful, user data received:', userData);
        console.log('Is new user:', isNewUser);

        if (isNewUser) {
          console.log('New user detected, redirecting to account creation...');
          
          // Store the Google user data temporarily for the sign-up process
          localStorage.setItem('googleUserData', JSON.stringify({
            email: userData.email,
            name: userData.name,
            picture: userData.picture
          }));
          
          // Redirect to sign-up page to complete registration
          setTimeout(() => {
            navigate('/signin', { replace: true });
          }, 100);
        } else {
          console.log('Existing user found, logging in...');
          
          // Store authentication data for existing user
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('authToken', token);
          
          // Trigger auth state change event
          window.dispatchEvent(new Event('authStateChanged'));
          
          // Redirect to dashboard
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 100);
        }
      } catch (error) {
        console.error('Error handling auth success callback:', error);
        navigate('/signin?error=callback_error', { replace: true });
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing Google Sign In</h2>
        <p className="text-gray-600">Please wait while we complete your authentication...</p>
      </div>
    </div>
  );
};

export default AuthSuccessCallback;
