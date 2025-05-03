export const validateFullName = (name: string): string | undefined => {
  if (name.trim().split(/\s+/).length < 2) {
    return "* must be your first and last name";
  }
  return undefined;
};

export const validatePhoneNumber = (phone: string): string | undefined => {
  const cleanedPhone = phone.replace(/\D/g, "");
  if (!/^\d{10,11}$/.test(cleanedPhone)) {
    return "* numbers only (ex. 1231231234)";
  }
  return undefined;
};
