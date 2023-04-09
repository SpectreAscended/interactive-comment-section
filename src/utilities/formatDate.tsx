const formatDate = (inputDate: Date | string) => {
  const date = new Date(inputDate);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return formattedDate;
};

export default formatDate;
