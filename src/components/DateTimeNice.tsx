import { getDateTimeReadable } from "@/utils/dateTime";

const DateTimeNice = ({dateIn}: {dateIn: Date | undefined}) => {
  const { date, time } = getDateTimeReadable(dateIn);
  return (
    <>
      <span className="font-medium">{date}</span>
      <span className="ml-2">{time}</span>
    </>
  )
}

export default DateTimeNice;
