import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const ThemeProvider = ({ children }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);
