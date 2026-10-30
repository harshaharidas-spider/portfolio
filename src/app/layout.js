import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata = {
  title: "Tony John",
  description: "Technology should make business less complicated. Twenty-four years in IT - engineer, e-commerce consultant, digital marketer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${roboto.className} h-full antialiased`}>
      <body
        suppressHydrationWarning
        className={`${roboto.className} min-h-full flex flex-col bg-[#2b3d3f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
