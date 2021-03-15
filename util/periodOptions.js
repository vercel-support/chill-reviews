import format from 'date-fns/format';
import sub from 'date-fns/sub'

const strFormat = 'yyyy-MM-dd'
const date = new Date()

const DAY = format(sub(date, { days: 1 }), strFormat)
const WEEK = format(sub(date, { weeks: 1 }), strFormat)
const TWO_WEEK = format(sub(date, { weeks: 2 }), strFormat)
const MONTH = format(sub(date, { months: 1 }), strFormat)
const THREE_MONTHS = format(sub(date, { months: 3 }), strFormat)
const YEAR = format(sub(date, { years: 1 }), strFormat)

export const periods = [
    {
        value: DAY,
        label: 'Last 24 Hours',
    },
    {
        value: WEEK,
        label: 'Last 7 Days',
    },
    {
        value: TWO_WEEK,
        label: 'Last 14 Days',
    },
    {
        value: MONTH,
        label: 'Last 30 Days',
    },
    {
        value: THREE_MONTHS,
        label: 'Last 90 Days',
    },
    {
        value: YEAR,
        label: 'Last 365 Days',
    },
    {
        value: "ALL",
        label: 'All',
    },
];