import { Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body className="antialiased mx-4 lg:mx-auto py-2 relative lg:w-3/4">
        <nav className="sticky z-50 w-full top-2">
          <div className="box flex">
            <Link href="/">
              <p className="text-2xl">kopi-pasta</p>
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
