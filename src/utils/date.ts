import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const input = "2026-12-12 11:11";
const userTZ = "Asia/Tokyo";

const d = dayjs.tz(input, userTZ);

const iso = d.toISOString();

console.log(iso);
