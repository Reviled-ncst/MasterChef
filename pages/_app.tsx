import '../styles/theme.css';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { AuthProvider } from '../lib/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  const fullWidth = (Component as any)?.fullWidth ?? false;
  const title = (Component as any)?.title ?? (pageProps as any)?.title;

  return (
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <Layout fullWidth={fullWidth} title={title}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
