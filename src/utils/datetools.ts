const humanDate = (lang = navigator.language, unformattedDateTime: string): string => {
  try {
    const unformattedDate = unformattedDateTime.split('T');
    const splittedDate = unformattedDate[0].split('-');
    const castDate = new Date(`${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`);
    const humanFriendlyDate = new Intl.DateTimeFormat(lang, {
      dateStyle: 'long'
    }).format(castDate);

    return humanFriendlyDate;
  } catch (error) {
    return 'Invalid Date';
  }
};

export default humanDate;
