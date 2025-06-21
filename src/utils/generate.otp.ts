export const generateOtp = () => (Math.floor(Math.random() * 9000) + 1000).toString();
