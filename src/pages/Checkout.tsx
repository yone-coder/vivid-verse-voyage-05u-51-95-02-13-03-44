import { useEffect, useRef } from "react";

const NftPayment = () => {
  // Use refs to store variables that were previously global
  const currentCustomerIdRef = useRef('');
  const orderIdRef = useRef('');
  const paypalHostedFieldsRef = useRef(null);

  useEffect(() => {
    // Embedded script.js code
    const API_BASE_URL = "https://paypal-with-nodejs.onrender.com";

    const scriptToHead = (attributesObject) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        for (const name of Object.keys(attributesObject)) {
          script.setAttribute(name, attributesObject[name]);
        }
        document.head.appendChild(script);
        script.addEventListener('load', resolve);
        script.addEventListener('error', reject);
      });
    };

    const resetPurchaseButton = () => {
      const form = document.querySelector("#card-form");
      const submitBtn = form?.querySelector("input[type='submit']");
      if (submitBtn) {
        submitBtn.removeAttribute("disabled");
        submitBtn.value = "Purchase";
      }
    };

    const isUserLoggedIn = () => {
      return new Promise((resolve) => {
        // Note: In Claude artifacts, localStorage is not available
        // In your actual app, uncomment the line below:
        // currentCustomerIdRef.current = localStorage.getItem("logged_in_user_id") || "";
        currentCustomerIdRef.current = "";
        resolve();
      });
    };

    const getClientToken = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`${API_BASE_URL}/get_client_token`, {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "customer_id": currentCustomerIdRef.current }),
          });

          const clientToken = await response.text();
          resolve(clientToken);
        } catch (error) {
          reject(error);
        }
      });
    };

    const handleClose = (event) => {
      const alert = event.target.closest(".ms-alert");
      if (alert) {
        alert.remove();
      }
    };

    const handleClick = (event) => {
      if (event.target.classList.contains("ms-close")) {
        handleClose(event);
      }
    };

    // Add click event listener
    document.addEventListener("click", handleClick);

    const paypalSdkUrl = "https://www.paypal.com/sdk/js";
    const clientId = "AU23YbLMTqxG3iSvnhcWtix6rGN14uw3axYJgrDe8VqUVng8XiQmmeiaxJWbnpbZP_f4--RTg146F1Mj";
    const currency = "USD";
    const intent = "capture";

    const displayErrorAlert = () => {
      const alertsEl = document.getElementById("alerts");
      if (alertsEl) {
        alertsEl.innerHTML = `<div class="ms-alert ms-action2 ms-small"><span class="ms-close"></span><p>An Error Occurred! (View console for more info)</p></div>`;
      }
    };

    const displaySuccessMessage = (orderDetails) => {
      console.log(orderDetails);
      const intentObject = intent === "authorize" ? "authorizations" : "captures";
      const alertsEl = document.getElementById("alerts");
      const cardForm = document.getElementById("card-form");
      
      if (alertsEl) {
        const firstName = orderDetails?.payer?.name?.given_name || '';
        const lastName = orderDetails?.payer?.name?.surname || '';
        const amount = orderDetails.purchase_units[0].payments[intentObject][0].amount.value;
        const currencyCode = orderDetails.purchase_units[0].payments[intentObject][0].amount.currency_code;
        
        alertsEl.innerHTML = `<div class='ms-alert ms-action'>Thank you ${firstName} ${lastName} for your payment of ${amount} ${currencyCode}!</div>`;
      }

      // Hide the card form after successful payment
      if (cardForm) {
        cardForm.classList.add("hide");
      }
    };

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

    // Main PayPal initialization code
    isUserLoggedIn()
      .then(() => {
        return getClientToken();
      })
      .then((clientToken) => {
        return scriptToHead({
          "src": paypalSdkUrl + "?client-id=" + clientId + "&enable-funding=venmo&currency=" + currency + "&intent=" + intent + "&components=hosted-fields", 
          "data-client-token": clientToken
        });
      })
      .then(() => {
        // Handle loading spinner
        const loadingEl = document.getElementById("loading");
        const contentEl = document.getElementById("content");
        
        if (loadingEl) loadingEl.classList.add("hide");
        if (contentEl) contentEl.classList.remove("hide");

        // Hide PayPal buttons
        hidePayPalButtons();
        setTimeout(hidePayPalButtons, 1000);

        // Hosted Fields Only
        if (window.paypal && window.paypal.HostedFields.isEligible()) {
          // Renders card fields
          paypalHostedFieldsRef.current = window.paypal.HostedFields.render({
            // Call your server to set up the transaction
            createOrder: () => {
              return fetch(`${API_BASE_URL}/create_order`, {
                method: "post", 
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify({ "intent": intent })
              })
              .then((response) => response.json())
              .then((order) => { 
                orderIdRef.current = order.id; 
                return order.id; 
              });
            },
            styles: {
              '.valid': {
                color: 'green'
              },
              '.invalid': {
                color: 'red'
              },
              'input': {
                'font-size': '16pt',
                'color': '#ffffff'
              },
            },
            fields: {
              number: {
                selector: "#card-number",
                placeholder: "4111 1111 1111 1111"
              },
              cvv: {
                selector: "#cvv",
                placeholder: "123"
              },
              expirationDate: {
                selector: "#expiration-date",
                placeholder: "MM/YY"
              }
            }
          }).then((cardFields) => {
            const cardForm = document.querySelector("#card-form");
            if (cardForm) {
              cardForm.addEventListener("submit", (event) => {
                event.preventDefault();
                const submitBtn = cardForm.querySelector("input[type='submit']");
                if (submitBtn) {
                  submitBtn.setAttribute("disabled", "");
                  submitBtn.value = "Loading...";
                }

                cardFields
                  .submit({
                    // Customer Data
                    cardholderName: "Raúl Uriarte, Jr.",
                    billingAddress: {
                      streetAddress: "123 Springfield Rd",
                      extendedAddress: "",
                      region: "AZ",
                      locality: "CHANDLER",
                      postalCode: "85224",
                      countryCodeAlpha2: "US",
                    },
                  })
                  .then(() => {
                    return fetch(`${API_BASE_URL}/complete_order`, {
                      method: "post", 
                      headers: { "Content-Type": "application/json; charset=utf-8" },
                      body: JSON.stringify({
                        "intent": intent,
                        "order_id": orderIdRef.current,
                        "email": document.getElementById("email")?.value
                      })
                    })
                    .then((response) => response.json())
                    .then((orderDetails) => {
                      displaySuccessMessage(orderDetails);
                    })
                    .catch((error) => {
                      console.log(error);
                      displayErrorAlert();
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    resetPurchaseButton();
                    displayErrorAlert();
                  });
              });
            }
          });
        } else {
          // Show message if hosted fields are not available
          const alertsEl = document.getElementById("alerts");
          if (alertsEl) {
            alertsEl.innerHTML = `<div class="ms-alert ms-action2 ms-small"><span class="ms-close"></span><p>Card payment form is not available in this browser.</p></div>`;
          }
        }
      })
      .catch((error) => {
        console.error('PayPal initialization error:', error);
        resetPurchaseButton();
        displayErrorAlert();
      });

    // Cleanup function
    return () => {
      // Remove event listener
      document.removeEventListener("click", handleClick);
      
      // Clean up PayPal scripts
      const paypalScripts = document.head.querySelectorAll('script[src*="paypal.com"]');
      paypalScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <>
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
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm">
            <h2 className="ms-text-center">ai-generated NFT Bored Ape</h2>
            <div className="ms-text-center pb-2">
              <div className="ms-label ms-large ms-action2 ms-light">
                $100.00 USD
              </div>
            </div>
            <div id="alerts" className="ms-text-center"></div>
            <div id="loading" className="spinner-container ms-div-center">
              <div className="spinner"></div>
            </div>
            <div id="content" className="hide">
              <div className="ms-card ms-fill">
                <div className="ms-card-content">
                  <img
                    src="https://cdn.discordapp.com/attachments/1060825015681028127/1076385063903694908/rauljr7_3d_e83fed6a-69aa-4a6a-b0ec-928edd57aecf.png"
                    style={{ width: "400px" }}
                    alt="NFT"
                  />
                </div>
              </div>
              <div id="payment_options">
                <div className="row ms-form-group" id="card-form">
                  <div>
                    <label htmlFor="card-number">Card Number</label>
                    <div className="div_input" id="card-number"></div>
                  </div>
                  <div className="col-md mb-2">
                    <label htmlFor="expiration-date">Expiration Date</label>
                    <div className="div_input" id="expiration-date"></div>
                  </div>
                  <div className="col-md mb-2">
                    <label htmlFor="cvv">Security Code</label>
                    <div className="div_input" id="cvv"></div>
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      placeholder="username@email.com"
                      type="email"
                      id="email"
                      className="div_input"
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="ms-fullwidth mt-2 ms-medium"
                      type="submit"
                      value="Purchase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm"></div>
          <footer style={{ marginTop: "50px" }} className="ms-footer">
            Footer Intentionally left empty :)
          </footer>
        </div>
      </div>
    </>
  );
};

export default NftPayment;