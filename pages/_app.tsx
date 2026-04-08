import '../styles/theme.css';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { AuthProvider } from '../lib/authContext';
import { LoadingProvider, useLoading } from '../lib/loadingContext';

function RouterListener() {
  const router = useRouter();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      // Extract route path (remove query string and hash)
      const routePath = url.split('?')[0].split('#')[0];
      startLoading(routePath);
    };

    const handleRouteChangeComplete = (url: string) => {
      const routePath = url.split('?')[0].split('#')[0];
      stopLoading(routePath);
    };

    const handleRouteChangeError = () => {
      stopLoading('');
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router, startLoading, stopLoading]);

  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  const fullWidth = (Component as any)?.fullWidth ?? false;
  const title = (Component as any)?.title ?? (pageProps as any)?.title;

  return (
    <ChakraProvider value={defaultSystem}>
      <LoadingProvider>
        <RouterListener />
        <AuthProvider>
          <Layout fullWidth={fullWidth} title={title}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </LoadingProvider>
    </ChakraProvider>
  );
}

export default MyApp;
