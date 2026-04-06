import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Layout from '../../components/Layout';
import { AuthProvider } from '../../lib/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  const fullWidth = (Component as any)?.fullWidth ?? false;

  return (
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <Layout fullWidth={fullWidth}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
