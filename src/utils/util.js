export function commafy(value) {
    let numberString = `${value}`;

    numberString = numberString.split('');

    numberString.reverse();

    numberString = numberString.reduce((prev, current, index) => {
        const shouldComma = (index + 1) % 3 === 0 && index + 1 < numberString.length;
        let updatedValue = `${prev}${current}`;
        if (shouldComma) {
            updatedValue = `${updatedValue},`;
        }
        return updatedValue;
    }, '');

    numberString = numberString.split('');
    numberString.reverse()
    numberString = numberString.join('');

    return numberString;
}

export function friendlyDate(value) {
    const date = new Date(value);
    return new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
    }).format(date);
}