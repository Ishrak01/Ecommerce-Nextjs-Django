import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "./Redux/ReduxProvider";
import Navbar from "./components/Navbar";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zone Sparks Limited",
  description: "Generated by Hasin Ishrak",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <ReduxProvider>
          <div className="sticky top-0"> <Navbar /></div>
         
          <Toaster position="top-right" />  
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}