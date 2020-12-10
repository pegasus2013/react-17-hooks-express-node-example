/**
 *
 * Validations via custom validators without using libs like express-validator
 */

// Thanks to:
// http://fightingforalostcause.net/misc/2006/compare-email-regex.php
// http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
// http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378

const emailRegEx = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function validateEmail(email) {
  if (!email) return false;

  if (email.length > 256) return false;

  if (!emailRegEx.test(email)) return false;

  // Further checking of some things regex can't handle
  const emailParts = email.split('@');
  const account = emailParts[0];
  const address = emailParts[1];

  if (account.length > 64) return false;

  const domainParts = address.split('.');
  if (domainParts.some((part) => part.length > 63)) return false;

  return true;
}

function validateMessage(message) {
  if (!message) return false;
  if (message.length < 30) return false;

  return true;
}

module.exports = {
  validateEmail,
  validateMessage,
};
