const generateTIN = () => {
  const prefix = "ET";
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000); // 6 digits
  return `${prefix}-${year}-${random}`;
};

export default generateTIN;
