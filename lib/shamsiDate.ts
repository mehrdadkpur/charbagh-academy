import jalaali from "jalaali-js";

export const shamsiDate = ({ date }: { date: string }) => {
  const jDate = jalaali.toJalaali(new Date(date));

  const paddedMonth = jDate.jm.toString().padStart(2, '0');
  const paddedDay = jDate.jd.toString().padStart(2, '0');

  return `${jDate.jy}/${paddedMonth}/${paddedDay}`;
};
