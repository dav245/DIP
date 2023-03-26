export const useButtonConfirmation = (callback: () => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  const setShouldConfirmTimeout = () => {
    timeoutId = setTimeout(callback, 2000);
  };

  const clearShouldConfirmTimeout = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
  };

  return {
    setShouldConfirmTimeout,
    clearShouldConfirmTimeout,
  };
};
