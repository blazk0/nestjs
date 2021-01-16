import { useEffect } from 'react';
import { Layout } from 'antd';
import { AppProps } from 'next/app';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import '../styles/globals.css';
import Container from '@components/layout/container/Container';
import { reactQueryConfig } from '@constants/queries';
import { useRouter } from 'next/router';

const queryCache = new QueryCache({
  defaultConfig: reactQueryConfig,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const pathName = router.pathname;

    router.replace({
      pathname: '/',
      query: { pathName },
    });
  }, []);

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Layout className="layoutContainer">
        <Container drawer={pageProps.drawer}>
          <Component {...pageProps} />
        </Container>
      </Layout>

      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
}

export default MyApp;
