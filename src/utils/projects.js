// Dates in projects.json are stored as "YYYY, MonthName".
export const parseDate = (dateStr) => {
    const [year, month] = dateStr.split(', ');
    return new Date(`${month} 1, ${year}`);
};

export const sortNewestFirst = (projects) =>
    [...projects].sort((a, b) => parseDate(b.date) - parseDate(a.date));
