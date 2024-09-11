export const sessionClear = (onSuccess?: () => void) => {
  window.sessionStorage.clear();
  window.localStorage.clear();
  if (onSuccess) onSuccess();
};
