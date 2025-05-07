
import React from "react";

const AuthFooter: React.FC = () => {
  return (
    <div className="mt-6 pt-4 text-center text-xs text-gray-500 border-t">
      <p>
        By using this service, you agree to our <a href="#" className="text-red-600 hover:underline">Terms of Service</a> and <a href="#" className="text-red-600 hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default AuthFooter;
