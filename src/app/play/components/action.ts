export const submitData = async (formData: FormData) => {
  console.log('submitting data', Object.fromEntries(formData.entries()));
};
