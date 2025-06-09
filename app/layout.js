import "@/styles/globals.css";
import Header from "@/components/Header"
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kahoot Clone v5",
  description:
    "An educational project to explore diffrent and new technologies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
