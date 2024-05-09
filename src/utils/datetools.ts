const humanDate = (lang = navigator.language, unformattedDate: string): string => {
  const splittedDate = unformattedDate.split('/');
  const castDate = new Date(`${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`);
  const humanFriendlyDate = new Intl.DateTimeFormat(lang, {
    dateStyle: 'long'
  }).format(castDate);

  return humanFriendlyDate;
};

export default humanDate;
