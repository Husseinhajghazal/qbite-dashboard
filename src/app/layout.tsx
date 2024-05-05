import { AOSInit } from "./aos";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "@/utils/ReduxProvider";
import QueryProvider from "@/utils/QueryProvider";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/utils/AuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://admin.q-bite.net"),
  title: "QBite - Dashboard",
  description:
    "We are a website offering the service of creating your own menu online, allowing you to add and modify food items at any time, as well as generate your personalized QR Code instantly - نحن موقع يقدم خدمة إنشاء قائمة الطعام الخاصة بك عبر الإنترنت، مما يتيح لك إضافة وتعديل العناصر الغذائية في أي وقت، بالإضافة إلى إنشاء رمز الاستجابة السريعة (QR Code) الخاص بك على الفور",
  icons: {
    icon: ["/icons/favicon.ico?v=4"],
    apple: ["/icons/apple-touch-icon.png?v=4"],
    shortcut: ["/icons/apple-touch-icon.png"],
  },
  manifest: "/icons/site.webmanifest",
  openGraph: {
    images: "/opengraph-image.png",
    title: "QBite - Dashboard",
    description:
      "We are a website offering the service of creating your own menu online, allowing you to add and modify food items at any time, as well as generate your personalized QR Code instantly - نحن موقع يقدم خدمة إنشاء قائمة الطعام الخاصة بك عبر الإنترنت، مما يتيح لك إضافة وتعديل العناصر الغذائية في أي وقت، بالإضافة إلى إنشاء رمز الاستجابة السريعة (QR Code) الخاص بك على الفور",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AOSInit />
      <body>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ReduxProvider>
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
        </ReduxProvider>
        <div id="CategoryEditior" />
        <div id="background" />
      </body>
    </html>
  );
}
