// import { format } from 'date-fns';
import dayjs from 'dayjs';

export const INITIAL_STATE = {
  //   date: format(new Date(), 'MM/dd/yyyy h:mm a'),
  date: dayjs().format('L LTS'),
  name: '',
  description: '',
};
