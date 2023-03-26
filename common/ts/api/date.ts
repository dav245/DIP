export const formatApiDateString = (dateString: string | null) => {
  if (dateString === null) return "";

  const date = new Date(dateString);

  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  if (year === new Date().getFullYear().toString()) {
    return `${day}. ${month}. ${hours}:${minutes}`;
  }

  return `${month}. ${day}. ${year} ${hours}:${minutes}`;
};
