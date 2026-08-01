// Function to validate email format
const isValidEmail = (email) => {
  // Basic RFC 5322-compliant pattern for most real-world cases
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Ensure input is a string and matches the pattern
  return typeof email === "string" && emailPattern.test(email);
};

export default isValidEmail;
