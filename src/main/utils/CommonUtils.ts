import dayjs from 'dayjs';

export const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const showTime = (date: Date) => {
  return dayjs.tz(date, 'Asia/Ho_Chi_Minh');
};

export const passDataTime = (date: Date | string) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ').replace('+07:00', 'Z');
};

export const formatDate = (
  startDate: Date | string,
  endDate: Date | string
) => {
  return `${dayjs(startDate).format('HH:mm')} - ${dayjs(endDate).format(
    'HH:mm'
  )}, ${dayjs(startDate).format('DD/MM/YYYY')}`;
};
