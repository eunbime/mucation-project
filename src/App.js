import GlobalStyles from 'styles/GlobalStyle';
import Router from 'shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
