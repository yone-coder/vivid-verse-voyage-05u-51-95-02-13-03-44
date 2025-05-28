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

  const stripeStyles = {
    hide: {
      display: 'none !important'
    },
    spinnerContainer: {
      width: '100px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto'
    },
    spinner: {
      border: '3px solid #f0f2f5',
      borderTop: '3px solid #635bff',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite'
    },
    container: {
      minHeight: '100vh',
      backgroundColor: '#f6f9fc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '40px 20px'
    },
    mainCard: {
      maxWidth: '480px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden'
    },
    header: {
      padding: '32px 32px 24px',
      textAlign: 'center',
      borderBottom: '1px solid #e6ebf1'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#32325d',
      margin: '0 0 8px',
      lineHeight: '1.4'
    },
    price: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#635bff',
      margin: '0'
    },
    imageContainer: {
      padding: '24px 32px',
      textAlign: 'center',
      borderBottom: '1px solid #e6ebf1'
    },
    nftImage: {
      width: '100%',
      maxWidth: '300px',
      height: 'auto',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    formContainer: {
      padding: '32px'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#32325d',
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      height: '44px',
      padding: '0 12px',
      fontSize: '16px',
      border: '1.5px solid #e6ebf1',
      borderRadius: '6px',
      backgroundColor: 'white',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputFocus: {
      borderColor: '#635bff',
      boxShadow: '0 0 0 3px rgba(99, 91, 255, 0.1)'
    },
    rowGroup: {
      display: 'flex',
      gap: '12px'
    },
    colHalf: {
      flex: '1'
    },
    submitButton: {
      width: '100%',
      height: '44px',
      backgroundColor: '#635bff',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease, transform 0.1s ease',
      marginTop: '8px'
    },
    submitButtonHover: {
      backgroundColor: '#5a52ff'
    },
    footer: {
      textAlign: 'center',
      marginTop: '40px',
      padding: '20px',
      color: '#8898aa',
      fontSize: '14px'
    },
    alerts: {
      textAlign: 'center',
      margin: '16px 0'
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          
          .stripe-input:focus {
            border-color: #635bff !important;
            box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1) !important;
          }
          
          .stripe-button:hover {
            background-color: #5a52ff !important;
            transform: translateY(-1px);
          }
          
          .stripe-button:active {
            transform: translateY(0);
          }
        `}
      </style>
      
      <div style={stripeStyles.container}>
        <div style={stripeStyles.mainCard}>
          <div style={stripeStyles.header}>
            <h2 style={stripeStyles.title}>ai-generated NFT Bored Ape</h2>
            <div style={stripeStyles.price}>$100.00 USD</div>
          </div>
          
          <div id="alerts" style={stripeStyles.alerts}></div>
          
          <div id="loading" style={stripeStyles.spinnerContainer}>
            <div style={stripeStyles.spinner}></div>
          </div>
          
          <div id="content" style={stripeStyles.hide}>
            <div style={stripeStyles.imageContainer}>
              <img
                src="https://cdn.discordapp.com/attachments/1060825015681028127/1076385063903694908/rauljr7_3d_e83fed6a-69aa-4a6a-b0ec-928edd57aecf.png"
                style={stripeStyles.nftImage}
                alt="NFT Bored Ape"
              />
            </div>
            
            <div id="payment_options">
              <div style={stripeStyles.formContainer}>
                <div id="card-form">
                  <div style={stripeStyles.formGroup}>
                    <label style={stripeStyles.label} htmlFor="card-number">
                      Card Number
                    </label>
                    <div 
                      style={stripeStyles.input} 
                      id="card-number"
                      className="stripe-input"
                    ></div>
                  </div>
                  
                  <div style={stripeStyles.rowGroup}>
                    <div style={{...stripeStyles.formGroup, ...stripeStyles.colHalf}}>
                      <label style={stripeStyles.label} htmlFor="expiration-date">
                        Expiration Date
                      </label>
                      <div 
                        style={stripeStyles.input} 
                        id="expiration-date"
                        className="stripe-input"
                      ></div>
                    </div>
                    
                    <div style={{...stripeStyles.formGroup, ...stripeStyles.colHalf}}>
                      <label style={stripeStyles.label} htmlFor="cvv">
                        Security Code
                      </label>
                      <div 
                        style={stripeStyles.input} 
                        id="cvv"
                        className="stripe-input"
                      ></div>
                    </div>
                  </div>
                  
                  <div style={stripeStyles.formGroup}>
                    <label style={stripeStyles.label} htmlFor="email">
                      Email
                    </label>
                    <input
                      placeholder="username@email.com"
                      type="email"
                      id="email"
                      style={stripeStyles.input}
                      className="stripe-input"
                      required
                    />
                  </div>
                  
                  <button
                    style={stripeStyles.submitButton}
                    className="stripe-button"
                    type="submit"
                  >
                    Complete Purchase
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <footer style={stripeStyles.footer}>
          Footer Intentionally left empty :)
        </footer>
      </div>
    </>
  );
};

export default NftPayment;