"use client";

import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "@/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Github Commit History Viewer",
//   description: "Generate your Github History",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
