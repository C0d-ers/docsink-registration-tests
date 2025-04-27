const MailosaurClient = require('mailosaur');

const apiKey = 'ExqRSohYRhQlahuSiok9khWv57pV5kAV';
const serverId = 'ydkwval9';

const mailosaur = new MailosaurClient(apiKey);

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${randomString}@${serverId}.mailosaur.net`;
}


async function extractOtpFromEmail(emailAddress) {
    const email = await mailosaur.messages.get(serverId, {
      sentTo: emailAddress,
      timeout: 15000
    });
  
    // Look inside the HTML version
    const htmlBody = email.html.body;
  
    // Match 6 digit number inside <strong> tag
    const otpMatch = htmlBody.match(/<strong[^>]*>(\d{6})<\/strong>/);
  
    if (otpMatch) {
      return otpMatch[1];
    }
  
    throw new Error('OTP not found in email');
  }

module.exports = {
  generateRandomEmail,
  extractOtpFromEmail
};
