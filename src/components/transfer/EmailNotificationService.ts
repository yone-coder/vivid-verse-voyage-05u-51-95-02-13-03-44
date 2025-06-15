
export const emailNotificationService = {
  sendTransferConfirmation: (
    email: string,
    transferData: any,
    transactionId: string
  ) => {
    // Dummy implementation: Log to console
    console.log("Confirmation email sent to", email, transferData, transactionId);
  }
};
