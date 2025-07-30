import "@/styles/globals.css";

export const metadata = {
  title: "Kahoot Clone v5",
  description:
    "An educational project to explore diffrent and new technologies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
