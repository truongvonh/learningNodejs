export const jsonSuccess = (result) => {
  return { success: true, result };
};

export const jsonError = (err) => {
  return { success: false, err };
};
