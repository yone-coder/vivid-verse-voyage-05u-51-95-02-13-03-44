
import { TransferData } from '@/pages/MultiStepTransferSheetPage';

interface EmailNotificationService {
  sendTransferConfirmation: (
    userEmail: string,
    transferData: TransferData,
    transactionId: string
  ) => Promise<void>;
}

export const emailNotificationService: EmailNotificationService = {
  sendTransferConfirmation: async (
    userEmail: string,
    transferData: TransferData,
    transactionId: string
  ) => {
    if (!userEmail) {
      console.log('No email provided for notification');
      return;
    }

    try {
      const emailData = {
        to: userEmail,
        subject: "Money Transfer Confirmation - Transaction Completed",
        html: `
          <!DOCTYPE html>
          <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="x-apple-disable-message-reformatting">
            <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
            <title>Money Transfer Confirmation</title>
            <!--[if mso]>
            <noscript>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            </noscript>
            <![endif]-->
            <style>
              /* Reset and base styles */
              * { box-sizing: border-box; margin: 0; padding: 0; }
              
              body, table, td, p, a, li, blockquote {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
              
              table, td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }
              
              img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
              }
              
              /* Email styles */
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #f8fafc;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              }
              
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 20px;
                text-align: center;
                border-radius: 16px 16px 0 0;
              }
              
              .header h1 {
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
                margin: 0;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              
              .success-icon {
                width: 64px;
                height: 64px;
                background: #10b981;
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
              }
              
              .content {
                background: #ffffff;
                padding: 0;
                margin: 0;
              }
              
              .section {
                padding: 24px;
                margin: 0;
              }
              
              .amount-highlight {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #ffffff;
                text-align: center;
                padding: 32px 24px;
                margin: 0;
              }
              
              .amount-value {
                font-size: 42px;
                font-weight: 800;
                margin: 0 0 8px 0;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              
              .amount-label {
                font-size: 16px;
                opacity: 0.9;
                margin: 0;
                font-weight: 500;
              }
              
              .details-card {
                background: #f8fafc;
                border-radius: 12px;
                padding: 24px;
                margin: 24px 0;
                border: 1px solid #e2e8f0;
              }
              
              .details-grid {
                display: grid;
                gap: 16px;
              }
              
              .detail-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #e2e8f0;
              }
              
              .detail-row:last-child {
                border-bottom: none;
              }
              
              .detail-label {
                color: #64748b;
                font-size: 14px;
                font-weight: 500;
                margin: 0;
              }
              
              .detail-value {
                color: #1e293b;
                font-size: 14px;
                font-weight: 600;
                margin: 0;
                text-align: right;
                max-width: 200px;
                word-wrap: break-word;
              }
              
              .transaction-id {
                background: #1e293b;
                color: #ffffff;
                padding: 8px 12px;
                border-radius: 6px;
                font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
                font-size: 13px;
                letter-spacing: 0.5px;
              }
              
              .status-badge {
                background: #dcfce7;
                color: #166534;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              
              .info-card {
                background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
                border-radius: 12px;
                padding: 24px;
                margin: 24px 0;
                border: 1px solid #a7f3d0;
              }
              
              .info-card h3 {
                color: #065f46;
                font-size: 18px;
                font-weight: 700;
                margin: 0 0 12px 0;
                display: flex;
                align-items: center;
              }
              
              .info-card p {
                color: #047857;
                font-size: 14px;
                line-height: 1.6;
                margin: 8px 0;
              }
              
              .warning-card {
                background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
                border-radius: 12px;
                padding: 24px;
                margin: 24px 0;
                border: 1px solid #fdba74;
              }
              
              .warning-card h3 {
                color: #c2410c;
                font-size: 18px;
                font-weight: 700;
                margin: 0 0 12px 0;
                display: flex;
                align-items: center;
              }
              
              .warning-card ul {
                margin: 0;
                padding-left: 20px;
              }
              
              .warning-card li {
                color: #ea580c;
                font-size: 14px;
                line-height: 1.6;
                margin: 8px 0;
              }
              
              .footer {
                background: #1e293b;
                color: #94a3b8;
                text-align: center;
                padding: 32px 24px;
                border-radius: 0 0 16px 16px;
              }
              
              .footer p {
                margin: 0;
                font-size: 14px;
                line-height: 1.6;
              }
              
              .footer a {
                color: #60a5fa;
                text-decoration: none;
              }
              
              .logo-text {
                color: #ffffff;
                font-size: 20px;
                font-weight: 800;
                margin: 0 0 8px 0;
              }
              
              /* Mobile responsiveness */
              @media only screen and (max-width: 600px) {
                .email-container {
                  width: 100% !important;
                  margin: 0 !important;
                }
                
                .header {
                  padding: 32px 16px !important;
                  border-radius: 0 !important;
                }
                
                .header h1 {
                  font-size: 24px !important;
                }
                
                .section {
                  padding: 20px 16px !important;
                }
                
                .amount-highlight {
                  padding: 28px 16px !important;
                }
                
                .amount-value {
                  font-size: 36px !important;
                }
                
                .details-card {
                  margin: 20px 0 !important;
                  padding: 20px !important;
                }
                
                .detail-row {
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 4px;
                }
                
                .detail-value {
                  text-align: left !important;
                  max-width: 100% !important;
                }
                
                .info-card, .warning-card {
                  margin: 20px 0 !important;
                  padding: 20px !important;
                }
                
                .footer {
                  padding: 28px 16px !important;
                  border-radius: 0 !important;
                }
              }
              
              /* Dark mode support */
              @media (prefers-color-scheme: dark) {
                .details-card {
                  background: #1e293b !important;
                  border-color: #334155 !important;
                }
                
                .detail-label {
                  color: #94a3b8 !important;
                }
                
                .detail-value {
                  color: #f1f5f9 !important;
                }
              }
            </style>
          </head>
          <body style="margin:0;padding:0;width:100%;word-spacing:normal;background-color:#f8fafc;">
            <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
              
              <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                <tr>
                  <td align="center" style="padding:20px 0;">
                    
                    <div class="email-container">
                      
                      <!-- Header -->
                      <div class="header">
                        <div class="success-icon">
                          <svg width="32" height="32" fill="#ffffff" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                        </div>
                        <h1>Transfer Successful!</h1>
                      </div>
                      
                      <!-- Content -->
                      <div class="content">
                        
                        <!-- Amount Highlight -->
                        <div class="amount-highlight">
                          <div class="amount-value">$${transferData.amount}</div>
                          <div class="amount-label">Successfully sent to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName}</div>
                        </div>
                        
                        <!-- Transaction Details -->
                        <div class="section">
                          <div class="details-card">
                            <div class="details-grid">
                              <div class="detail-row">
                                <p class="detail-label">Transaction ID</p>
                                <p class="detail-value">
                                  <span class="transaction-id">${transactionId}</span>
                                </p>
                              </div>
                              
                              <div class="detail-row">
                                <p class="detail-label">Status</p>
                                <p class="detail-value">
                                  <span class="status-badge">Completed</span>
                                </p>
                              </div>
                              
                              <div class="detail-row">
                                <p class="detail-label">Date & Time</p>
                                <p class="detail-value">${new Date().toLocaleDateString('en-US', { 
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}</p>
                              </div>
                              
                              <div class="detail-row">
                                <p class="detail-label">Recipient Name</p>
                                <p class="detail-value">${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName}</p>
                              </div>
                              
                              <div class="detail-row">
                                <p class="detail-label">Phone Number</p>
                                <p class="detail-value">+509 ${transferData.receiverDetails.phoneNumber}</p>
                              </div>
                              
                              <div class="detail-row">
                                <p class="detail-label">Pickup Location</p>
                                <p class="detail-value">${transferData.receiverDetails.commune}, ${transferData.receiverDetails.department}</p>
                              </div>
                              
                              <div class="detail-row">
                                <p class="detail-label">Your Email</p>
                                <p class="detail-value">${userEmail}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Next Steps -->
                        <div class="section">
                          <div class="info-card">
                            <h3>
                              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right:8px;">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                              </svg>
                              What happens next?
                            </h3>
                            <p><strong>📱 SMS Notification:</strong> The recipient will receive an SMS notification at <strong>+509 ${transferData.receiverDetails.phoneNumber}</strong> when funds are ready for pickup.</p>
                            <p><strong>⏰ Pickup Window:</strong> Funds will be available for pickup within 24-48 hours at authorized pickup locations.</p>
                            <p><strong>🆔 Required for Pickup:</strong> Valid government-issued photo ID and transaction reference number.</p>
                          </div>
                        </div>
                        
                        <!-- Important Information -->
                        <div class="section">
                          <div class="warning-card">
                            <h3>
                              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="margin-right:8px;">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                              </svg>
                              Important Information
                            </h3>
                            <ul>
                              <li>Keep this email as your official receipt and proof of transfer</li>
                              <li>Transaction ID <strong>${transactionId}</strong> is required for any inquiries</li>
                              <li>Funds must be collected within 30 days of transfer completion</li>
                              <li>Contact our 24/7 customer support for any assistance needed</li>
                            </ul>
                          </div>
                        </div>
                        
                      </div>
                      
                      <!-- Footer -->
                      <div class="footer">
                        <p class="logo-text">TransferNow</p>
                        <p>This is an automated confirmation email. Please keep this for your records.</p>
                        <p style="margin-top:16px;">
                          Need help? Contact us at <a href="mailto:support@example.com">support@example.com</a><br>
                          or visit our help center for instant assistance.
                        </p>
                        <p style="margin-top:24px;font-size:12px;opacity:0.7;">
                          © 2024 TransferNow. All rights reserved. | Secure & Licensed Money Transfer Service
                        </p>
                      </div>
                      
                    </div>
                    
                  </td>
                </tr>
              </table>
              
            </div>
          </body>
          </html>
        `,
        text: `Money Transfer Confirmation - Your transfer of $${transferData.amount} USD to ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName} has been completed successfully. Transaction ID: ${transactionId}. The recipient will be notified when funds are ready for pickup within 24-48 hours.`
      };

      console.log('Sending email notification to:', userEmail);
      console.log('Using transaction ID:', transactionId);
      
      const response = await fetch('https://resend-u11p.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        console.log('Email notification sent successfully');
      } else {
        console.error('Failed to send email notification');
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  }
};
