export const handleDate = (date: string): string => {
  const day = new Date(date);
  const parseDate =
    day.getFullYear() + "." + (day.getMonth() + 1) + "." + day.getDate();
  return parseDate;
};

export const isFavorite = (userFavorites: number[], jobId: number): boolean => {
  return userFavorites.includes(jobId);
};
