const humanDate = (lang = navigator.language, unformattedDate: string): string => {
  try {
    const splittedDate = unformattedDate.split('/');
    const castDate = new Date(`${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`);
    const humanFriendlyDate = new Intl.DateTimeFormat(lang, {
      dateStyle: 'long'
    }).format(castDate);

    return humanFriendlyDate;
  } catch (error) {
    return 'Invalid Date';
  }
};

const isoToHumanDateRome = (isoDateString?: string, locale = navigator.language) => {
  if (!isoDateString) {
    return '';
  }

  const date = new Date(isoDateString);

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    console.warn('Invalid Date', date);
    return '';
  }

  return date.toLocaleString(locale, {
    timeZone: 'Europe/Rome',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const datetools = { humanDate, isoToHumanDateRome };
