export function timeDifference(date: Date) {
  const today = new Date();
  const hoursDifference = (today.getTime() - date.getTime()) / (1000 * 60 * 60);
  const minutesDifference = Math.ceil(
    ((today.getTime() - date.getTime()) / (1000 * 60 * 60) -
      Math.floor(hoursDifference)) *
      60
  );

  let formattedDate = "0";

  if (Math.ceil(hoursDifference) <= 24) {
    if (Math.floor(hoursDifference) >= 1) {
      formattedDate = `${Math.floor(hoursDifference)} hour${
        Math.floor(hoursDifference) > 1 ? "s" : ""
      } and ${minutesDifference} minute${minutesDifference > 1 ? "s" : ""} ago`;
    } else {
      formattedDate = `${minutesDifference} minute${
        minutesDifference > 1 ? "s" : ""
      } ago`;
    }
  } else {
    formattedDate = Intl.DateTimeFormat(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  return formattedDate
}
