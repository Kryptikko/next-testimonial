import '@/styles/globals.css'
import "@fontsource/dm-sans"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app'

// TODO: update theme as per branding
const theme = createTheme({
  typography: {
    fontFamily: [
      "DM San",
      "Roboto",
      '"Helvetica Neue"',
      'Arial',
    ].join(', ')
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
