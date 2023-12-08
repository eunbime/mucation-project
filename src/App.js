import GlobalStyles from 'styles/GlobalStyle';
import Router from 'shared/Router';
// import { QueryClientProvider, useQueryClient } from 'react-query';

// const queryClient = useQueryClient();

function App() {
  return (
    <>
   
      <GlobalStyles />
      {/* <QueryClientProvider client={queryClient}> */}
      <Router />
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;
