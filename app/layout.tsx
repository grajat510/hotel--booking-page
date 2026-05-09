import type { ReactNode } from "react";

const lemonMilk = "https://fonts.cdnfonts.com/css/lemonmilk";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href={lemonMilk} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
