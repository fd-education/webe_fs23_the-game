import type { AppProps } from 'next/app';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/icons.css';
import '../styles/scrollbar.css';
import '../styles/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
