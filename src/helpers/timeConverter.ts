import { DateTime } from 'luxon';

export const hourMonth = (date: string): string => {

    //format date in following format 00:00 am | November 7th'
    return DateTime.fromISO(date).toFormat('t | LLLL dd');

}