/**
 * Formats a given date string into `DD.MM.YYYY` format.
 *
 * @param {string} date - The date string to be formatted, in `YYYY-MM-DD` format.
 * @returns {string} - The formatted date string as `DD.MM.YYYY`.
 */
export function formatDate(date: string): string {
    const dateObj = new Date(date)
    const dd = String(dateObj.getDate()).padStart(2, '0')
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
    const yyyy = dateObj.getFullYear()

    return `${dd}. ${mm} .${yyyy}`
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
