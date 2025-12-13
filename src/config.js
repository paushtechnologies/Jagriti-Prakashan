// src/config.js
// Edit this file before deploying.
// - sheetsWebhookUrl: set to your deployed Google Apps Script Web App URL that accepts POST JSON and writes to Google Sheet.
// - bankDetails: displayed on "Pay Now" modal.
// - upiVPA and upiQRImage: for UPI payment (static QR).
export const SITE = {
  title: "जागृति प्रकाशन",
  contactEmail: "orders@jagritiprakashan.example",
  // If empty, order submit to sheet is disabled and site will show a clear message.
  sheetsWebhookUrl: "YOUR_WEB_APP_URL_HERE",

  // Payment display details
  upiVPA: "your-vpa@bank",
  upiQRImage: "/assets/upi-qr.png",
  bankDetails: {
    accountName: "Jagriti Prakashan",
    accountNumber: "123456789012",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank, Main Branch",
    branch: "City Center"
  },

  social: {
    facebook: "https://www.facebook.com/yourpage",
    youtube: "https://www.youtube.com/channel/yourchannel",
    instagram: "https://www.instagram.com/yourhandle"
  },

  // For search - nothing needed here
};
