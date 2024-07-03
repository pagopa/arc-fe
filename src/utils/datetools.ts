const humanDate = (lang = navigator.language, unformattedDate: string): string => {
  try {
    const splittedDate = unformattedDate.split('/');
    console.log(splittedDate)
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
