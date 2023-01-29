export const formatApiDateString = (dateString: string | null) => {
  if (dateString === null) return "";

  const date = new Date(dateString);

  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");

  const day = (date.getDay() + 1).toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${year} ${month}. ${day}. ${minutes}:${hours}`;
};
