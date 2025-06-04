
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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h1 style="color: #10b981; text-align: center; margin-bottom: 30px;">💰 Money Transfer Successful!</h1>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #1e40af; margin-top: 0;">Transfer Details</h2>
                <p><strong>Amount Sent:</strong> $${transferData.amount} USD</p>
                <p><strong>Recipient:</strong> ${transferData.receiverDetails.firstName} ${transferData.receiverDetails.lastName}</p>
                <p><strong>Location:</strong> ${transferData.receiverDetails.commune}, ${transferData.receiverDetails.department}</p>
                <p><strong>Transaction ID:</strong> ${transactionId}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Your Email:</strong> ${userEmail}</p>
              </div>
              
              <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #065f46; margin-top: 0;">📱 Next Steps</h3>
                <p>Your money transfer has been processed successfully and will be available for pickup within 24-48 hours.</p>
                <p>The recipient will receive an SMS notification at <strong>+509 ${transferData.receiverDetails.phoneNumber}</strong> when the funds are ready for pickup.</p>
              </div>
              
              <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #c2410c; margin-top: 0;">💡 Important Information</h3>
                <p>• Keep this email as your receipt</p>
                <p>• Transaction ID: <strong>${transactionId}</strong></p>
                <p>• Customer support: support@example.com</p>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <p style="color: #6b7280; font-size: 14px;">
                  This is an automated confirmation email. Please keep this for your records.
                </p>
              </div>
            </div>
          </div>
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
