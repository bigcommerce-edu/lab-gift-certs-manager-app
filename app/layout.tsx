import type { Metadata } from "next";
import Header from "@/components/header";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import ThemeProvider from "./theme-provider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "BigCommerce Gift Certificate Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <div>
              <Suspense>
                <Header />
              </Suspense>
              {children}
            </div>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
