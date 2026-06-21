import "./globals.css";

export const metadata = {
  title: "Oleksii Shevchenko | Lead Generation & Upwork Growth",
  description:
    "Enterprise-style personal page for Oleksii Shevchenko, Lead Upwork Researcher and Lead Generation Specialist.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
