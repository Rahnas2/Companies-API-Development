export const validateCompanyForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "Company name is required";
  }
  if (!formData.industry?.trim()) {
    errors.industry = "Industry is required";
  }
  
  if (!formData.address?.street?.trim()) {
    errors.street = "Street address is required";
  }
  if (!formData.address?.city?.trim()) {
    errors.city = "City is required";
  }
  if (!formData.address?.state?.trim()) {
    errors.state = "State is required";
  }
  if (!formData.address?.country?.trim()) {
    errors.country = "Country is required";
  }
  if (!formData.address?.postalCode?.trim()) {
    errors.postalCode = "Postal Code is required";
  }

  const currentYear = new Date().getFullYear();
  if (
    !formData.foundedYear ||
    formData.foundedYear < 1800 ||
    formData.foundedYear > currentYear
  ) {
    errors.foundedYear = "Please enter a valid founded year";
  }

  if (!formData.noEmployees || formData.noEmployees < 1) {
    errors.noEmployees = "Number of employees must be at least 1";
  }

  return errors;
};
