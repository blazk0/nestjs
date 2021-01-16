import { AxiosRequestConfig } from 'axios';
import { FormikHelpers } from 'formik';

import axios from '@utils/axios';
import { User } from '@ts-types/auth';
import { LoginType } from 'pages/login';

const commonConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getUser = async (): Promise<User> => {
  try {
    const res = await axios.get('/auth');

    console.log('called');

    return res.data;
  } catch (err) {
    throw err;
  }
};

type loginUserType = {
  values: LoginType;
  actions: FormikHelpers<LoginType>;
};

export const loginUser = async ({
  values,
  actions,
}: loginUserType): Promise<User> => {
  try {
    const res = await axios.post('/auth/signin', values, commonConfig);

    return res.data;
  } catch (err) {
    throw actions;
  }
};
