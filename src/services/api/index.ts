export const getErrorMessage = (err: any) => {
  return err.response?.data.errors[0].message;
};
