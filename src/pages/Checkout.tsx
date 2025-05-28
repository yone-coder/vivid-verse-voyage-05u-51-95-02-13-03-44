import { useEffect } from "react";

const NftPayment = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://paypal-with-nodejs.onrender.com/script.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const hidePayPalButtons = () => {
        const selectors = [
          ".paypal-button",
          "#paypal-button-container",
          ".paypal-buttons",
          "#smart-button-container"
        ];

        selectors.forEach((selector) => {
          document.querySelectorAll(selector).forEach((el) => {
            el.style.display = "none";
          });
        });
      };

      // Run immediately and after a short delay
      hidePayPalButtons();
      setTimeout(hidePayPalButtons, 1000);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          margin: 0;
          padding: 20px;
        }
        
        .stripe-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 0 16px;
        }
        
        .stripe-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          margin-bottom: 24px;
        }
        
        .stripe-header {
          text-align: center;
          padding: 32px 24px 24px;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .stripe-title {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 12px;
          line-height: 1.25;
        }
        
        .stripe-price {
          display: inline-block;
          background: linear-gradient(135deg, #635bff 0%, #4f46e5 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 18px;
          font-weight: 500;
          margin: 0;
        }
        
        .stripe-image-container {
          padding: 0;
          text-align: center;
        }
        
        .stripe-nft-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        
        .stripe-form-container {
          padding: 32px 24px;
        }
        
        .stripe-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .stripe-form-row {
          display: flex;
          gap: 16px;
        }
        
        .stripe-form-row > div {
          flex: 1;
        }
        
        .stripe-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }
        
        .stripe-input, .div_input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s ease;
          background: white;
        }
        
        .stripe-input:focus, .div_input:focus {
          outline: none;
          border-color: #635bff;
          box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
        }
        
        .stripe-input::placeholder {
          color: #9ca3af;
        }
        
        .stripe-submit-btn {
          background: linear-gradient(135deg, #635bff 0%, #4f46e5 100%);
          color: white;
          border: none;
          padding: 16px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 8px;
        }
        
        .stripe-submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 91, 255, 0.4);
        }
        
        .stripe-submit-btn:active {
          transform: translateY(0);
        }
        
        .stripe-alerts {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .stripe-loading {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }
        
        .stripe-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #e5e7eb;
          border-top: 3px solid #635bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .hide {
          display: none;
        }
        
        .stripe-footer {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          margin-top: 32px;
        }
        
        @media (max-width: 640px) {
          .stripe-form-row {
            flex-direction: column;
            gap: 20px;
          }
          
          .stripe-header {
            padding: 24px 20px 20px;
          }
          
          .stripe-form-container {
            padding: 24px 20px;
          }
          
          .stripe-title {
            font-size: 20px;
          }
        }
      `}</style>

      {/* External CSS for compatibility */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/minstyle.io@2.0.1/dist/css/minstyle.io.min.css"
      />

      <div className="stripe-container">
        <div className="stripe-card">
          <div className="stripe-header">
            <h2 className="stripe-title">ai-generated NFT Bored Ape</h2>
            <div className="stripe-price">$100.00 USD</div>
          </div>
          
          <div id="alerts" className="stripe-alerts"></div>
          
          <div id="loading" className="stripe-loading">
            <div className="stripe-spinner"></div>
          </div>
          
          <div id="content" className="hide">
            <div className="stripe-image-container">
              <img
                src="https://cdn.discordapp.com/attachments/1060825015681028127/1076385063903694908/rauljr7_3d_e83fed6a-69aa-4a6a-b0ec-928edd57aecf.png"
                className="stripe-nft-image"
                alt="NFT"
              />
            </div>
            
            <div className="stripe-form-container">
              <div id="payment_options">
                <div className="stripe-form" id="card-form">
                  <div>
                    <label htmlFor="card-number" className="stripe-label">
                      Card Number
                    </label>
                    <div className="div_input" id="card-number"></div>
                  </div>
                  
                  <div className="stripe-form-row">
                    <div>
                      <label htmlFor="expiration-date" className="stripe-label">
                        Expiration Date
                      </label>
                      <div className="div_input" id="expiration-date"></div>
                    </div>
                    <div>
                      <label htmlFor="cvv" className="stripe-label">
                        Security Code
                      </label>
                      <div className="div_input" id="cvv"></div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="stripe-label">
                      Email
                    </label>
                    <input
                      placeholder="username@email.com"
                      type="email"
                      id="email"
                      className="stripe-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <button
                      className="stripe-submit-btn"
                      type="submit"
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="stripe-footer">
          Footer Intentionally left empty :)
        </footer>
      </div>
    </>
  );
};

export default NftPayment;