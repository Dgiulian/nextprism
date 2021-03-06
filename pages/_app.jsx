import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
