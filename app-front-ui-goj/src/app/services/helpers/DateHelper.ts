export function fromUtcToUtf(utcDateString: string): string {
    const utcDate = new Date(utcDateString);
    return utcDate.toLocaleString();
}

const utcDateString = "2023-10-05T14:48:00Z";
const localDateString = fromUtcToUtf(utcDateString);
console.log(localDateString);