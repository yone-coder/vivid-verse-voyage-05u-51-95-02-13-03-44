
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      // Redirect back to sign in with error message
      navigate('/signin?error=' + error);
      return;
    }

    if (token) {
      // Store the token (you might want to use a more secure method)
      localStorage.setItem('authToken', token);
      console.log('OAuth success, token received');
      
      // Redirect to dashboard/home page
      navigate('/');
    } else {
      // No token received, redirect back to sign in
      navigate('/signin?error=no_token');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing sign in...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
