'use client';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { AlertsManager, createAlertsManager, GlobalStyles } from '@bigcommerce/big-design';
import { PropsWithChildren } from 'react';

export const alertsManager = createAlertsManager();

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <>
      <GlobalStyles />
      <AlertsManager manager={alertsManager} />
      <StyledThemeProvider theme={defaultTheme}>
        {children}
      </StyledThemeProvider>
    </>
  );
}