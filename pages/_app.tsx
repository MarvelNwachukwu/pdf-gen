import {
  createContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export const PDfContext = createContext<string>('');

let contextData: string = '';

function MyApp({ Component, pageProps }: AppProps) {
  const [pdfTemplate, setPdfTemplate] = useState<string>('');
  const [contextDataState, setContextDataState] = useState(contextData);
  const [Timeout, setTimeOut] = useState(0);
  const router = useRouter();

  if (router.asPath == '/') {
    setTimeout(() => {
      setTimeOut(Timeout + 1);
    }, 1000);
  }

  useLayoutEffect(() => {
    setPdfTemplate(contextData);
    console.log('State Mutated:', contextData);
  }, [Timeout]);

  return (
    <PDfContext.Provider value={pdfTemplate}>
      <Component {...pageProps} />
    </PDfContext.Provider>
  );
}

const updateApp = (newValue: string) => {
  console.log('update received:', newValue);
  contextData = newValue;
};

export default MyApp;
export { updateApp };
