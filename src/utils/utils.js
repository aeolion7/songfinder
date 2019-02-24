// given a date such as  06-29-1970,
// return 1970-06-29
export const formatDate = dateStr => {
  const month = dateStr.slice(0, 2);
  const date = dateStr.slice(3, 5);
  const year = dateStr.slice(6, 10);

  return year + '-' + month + '-' + date;
};

export const compare = (a, b) => {
  if (a.releaseDate < b.releaseDate) return -1;
  if (a.releaseDate > b.releaseDate) return 1;
  return 0;
};
