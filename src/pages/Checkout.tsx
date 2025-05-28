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
        :root {
          --stripe-bg: #f6f9fc;
          --stripe-card-bg: #ffffff;
          --stripe-border: #e3e8ee;
          --stripe-text: #32325d;
          --stripe-text-light: #8898aa;
          --stripe-primary: #635bff;
          --stripe-primary-hover: #5851df;
          --stripe-success: #00d924;
          --stripe-radius: 8px;
          --stripe-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          --stripe-shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.12);
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--stripe-bg);
          margin: 0;
          padding: 0;
          color: var(--stripe-text);
          line-height: 1.5;
        }

        .hide {
          display: none !important;
        }

        .spinner-container {
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 40px auto;
        }

        .spinner {
          border: 3px solid var(--stripe-border);
          border-top-color: var(--stripe-primary);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          min-height: 100vh;
        }

        .payment-card {
          background: var(--stripe-card-bg);
          border-radius: var(--stripe-radius);
          box-shadow: var(--stripe-shadow);
          overflow: hidden;
          transition: box-shadow 0.2s ease;
        }

        .payment-card:hover {
          box-shadow: var(--stripe-shadow-hover);
        }

        .payment-header {
          text-align: center;
          padding: 40px 40px 20px;
          border-bottom: 1px solid var(--stripe-border);
        }

        .payment-title {
          font-size: 24px;
          font-weight: 600;
          color: var(--stripe-text);
          margin: 0 0 12px;
        }

        .payment-amount {
          font-size: 32px;
          font-weight: 700;
          color: var(--stripe-text);
          margin: 0;
          display: inline-block;
          padding: 8px 20px;
          background: linear-gradient(135deg, var(--stripe-primary), #7c3aed);
          color: white;
          border-radius: 6px;
        }

        .nft-image-container {
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid var(--stripe-border);
        }

        .nft-image {
          max-width: 100%;
          height: auto;
          border-radius: var(--stripe-radius);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .payment-form-container {
          padding: 40px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: var(--stripe-text);
          margin-bottom: 8px;
        }

        .form-input, .div_input {
          width: 100%;
          height: 48px;
          padding: 12px 16px;
          border: 1px solid var(--stripe-border);
          border-radius: var(--stripe-radius);
          font-size: 16px;
          color: var(--stripe-text);
          background: var(--stripe-card-bg);
          transition: all 0.2s ease;
          appearance: none;
        }

        .form-input:focus, .div_input:focus {
          outline: none;
          border-color: var(--stripe-primary);
          box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
        }

        .form-input::placeholder {
          color: var(--stripe-text-light);
        }

        .submit-button {
          width: 100%;
          height: 48px;
          background: var(--stripe-primary);
          color: white;
          border: none;
          border-radius: var(--stripe-radius);
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 24px;
        }

        .submit-button:hover {
          background: var(--stripe-primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .footer {
          text-align: center;
          margin-top: 60px;
          padding: 20px;
          color: var(--stripe-text-light);
          font-size: 14px;
        }

        .alerts {
          margin: 20px 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px 16px;
          }

          .payment-header {
            padding: 30px 20px 15px;
          }

          .payment-form-container {
            padding: 30px 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .payment-title {
            font-size: 20px;
          }

          .payment-amount {
            font-size: 24px;
          }

          .nft-image {
            max-width: 280px;
          }
        }
      `}</style>

      {/* External CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/minstyle.io@2.0.1/dist/css/minstyle.io.min.css"
      />
      <link
        rel="stylesheet"
        href="https://paypal-with-nodejs.onrender.com/style.css"
      />

      <div className="container">
        <div className="payment-card">
          <div className="payment-header">
            <h2 className="payment-title">ai-generated NFT Bored Ape</h2>
            <div className="payment-amount">$100.00 USD</div>
          </div>

          <div id="alerts" className="alerts"></div>

          <div id="loading" className="spinner-container">
            <div className="spinner"></div>
          </div>

          <div id="content" className="hide">
            <div className="nft-image-container">
              <img
                src="https://cdn.discordapp.com/attachments/1060825015681028127/1076385063903694908/rauljr7_3d_e83fed6a-69aa-4a6a-b0ec-928edd57aecf.png"
                className="nft-image"
                alt="NFT"
              />
            </div>

            <div className="payment-form-container">
              <div id="payment_options">
                <div className="row ms-form-group" id="card-form">
                  <div className="form-group">
                    <label htmlFor="card-number" className="form-label">
                      Card Number
                    </label>
                    <div className="div_input" id="card-number"></div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiration-date" className="form-label">
                        Expiration Date
                      </label>
                      <div className="div_input" id="expiration-date"></div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv" className="form-label">
                        Security Code
                      </label>
                      <div className="div_input" id="cvv"></div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      placeholder="username@email.com"
                      type="email"
                      id="email"
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <input
                      className="submit-button"
                      type="submit"
                      value="Complete Purchase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          Footer Intentionally left empty :)
        </div>
      </div>
    </>
  );
};

export default NftPayment;