import { format } from 'date-fns';

export const formatJsonDate = (date, pattern = 'dd/MM/yyyy') => {
   if (date) {
      return format(jsonDateToDate(date), pattern);
   } else {
      return '';
   }
};

export const jsonDateToDate = (data) => {
   if (date) {
      return new Date(Number(date.match(/\d+/)[0]));
   } else {
      return null;
   }
};

export const formatTime = (time, pattern = 'HH:mm') => {
   return format(new Date(time), pattern);
};

export const formatToOData = (date) => {
   if (!date) {
      return null;
   }

   return format(new Date(date), `yyyy-MM-dd'T'HH:mm:ss`);
};
