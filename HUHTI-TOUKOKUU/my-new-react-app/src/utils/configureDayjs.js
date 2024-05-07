import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('fi');
dayjs.tz.setDefault("Europe/Helsinki");

export default dayjs;
