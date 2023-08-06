import {toast} from 'react-toastify';

export const successSnackbar = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const errorSnackbar = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const warningSnackbar = (message: string) => {
  toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
