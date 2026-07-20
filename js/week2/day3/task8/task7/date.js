export const formatDate = (date, format) => {
    const dateString = new Date(date).toString();
    const dateArray = dateString.split(" ");
    const [month, day, year] = [dateArray[1], dateArray[2], dateArray[3]];
    const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
    };
    const utils = {
        "DD/MM/YYYY": () => {
            return `${day}/${months[month]}/${year}`;
        },

        "YYYY-MM-DD": () => {
            return `${year}-${months[month]}-${day}`;
        },
        "Month DD, YYYY": () => {
            return `${month} ${day}, ${year}`;
        },
        relative: () => {
            let relativeDays = 0;
            todayDateArray = new Date(Date.now()).toString().split(" ");
            const [todayMonth, todayDay, todayYear] = [
                todayDateArray[1],
                todayDateArray[2],
                todayDateArray[3],
            ];
            if (todayYear != year) {
                relativeDays += (parseInt(year) - parseInt(todayYear)) * 365;
            }
            if (month !== todayMonth) {
                relativeDays +=
                    (parseInt(months[month]) - parseInt(months[todayMonth])) *
                    31;
            }
            if (day !== todayDay) {
                relativeDays += day - todayDay;
            }
            if (relativeDays > 0) return `${Math.abs(relativeDays)} days later`;

            if (relativeDays < 0) {
                return `${Math.abs(relativeDays)} days ago`;
            }

            if (relativeDays === 0) return `today`;
        },
    };
    const func = utils[format];
    return func();
};
