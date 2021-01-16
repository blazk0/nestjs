import { useMutation, useQuery, useQueryCache } from 'react-query';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/router';

import { getUser, loginUser } from '@services/auth';
import { setAuthToken } from '@utils/globals';
import { LoginType } from '@pages/login';
import ids from '@constants/queries/ids';

export const useGetUser = (path: any) => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    setAuthToken(token || '');
  }

  return useQuery(ids.user, getUser, {
    onSuccess: () => {
      const newRoute = path === '/' ? '/about' : path;

      router.replace(newRoute);
    },
    onError: () => router.replace('/login'),
    retry: false,
  });
};

export const useLoginUser = () => {
  const queryCache = useQueryCache();
  const router = useRouter();

  return useMutation(loginUser, {
    onSuccess: user => {
      queryCache.setQueryData(ids.user, user);
      localStorage.setItem('token', user.token);
      setAuthToken(user.token);

      router.replace('/about');
    },
    onError: (actions: FormikHelpers<LoginType>) => {
      actions.setStatus('Invalid Credentials');

      setTimeout(() => {
        actions.setStatus('');
      }, 2000);
    },
  });
};
