// AppProviderBasic.jsx
"use client";

import React from 'react';
import PropTypes from 'prop-types';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/nextjs';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

// Define your custom theme
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function AppProviderBasic({ window, navigation, children }) {
  const router = useDemoRouter('/page');

  // Handle window prop if provided
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={navigation}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}

AppProviderBasic.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
  /**
   * Navigation configuration array.
   */
  navigation: PropTypes.array.isRequired,
  /**
   * Child components to be rendered inside the layout.
   */
  children: PropTypes.node,
};

export default AppProviderBasic;
