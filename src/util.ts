import { formatDistance } from 'date-fns'

export function dateFromNow(utc: number) {
    return formatDistance(new Date(), new Date(utc * 1000))
}
