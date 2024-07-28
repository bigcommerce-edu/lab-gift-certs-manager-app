import type { Metadata } from "next";
import Header from "@/components/header";
import StyledComponentsRegistry from "@/lib/styled-components-registry";
import ThemeProvider from "./theme-provider";
import { Suspense } from "react";
import "./globals.css";

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
      <body>
        <StyledComponentsRegistry>
          <div>
            <Suspense>
              <Header />
            </Suspense>
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
