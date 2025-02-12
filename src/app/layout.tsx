import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/components/providers/QueryProvider";
import JotaiProvider from "@/components/providers/JotaiProvider";

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.className}`}
    >
      <body className="antialiased scrollbar">
        <QueryProvider>
          <JotaiProvider>
            <div className="mx-4 lg:mx-auto py-2 relative lg:w-3/4">
              <Navbar />
              {children}
            </div>
          </JotaiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
