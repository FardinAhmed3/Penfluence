import Navbar from "../../components/Navbar"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen">
        <Navbar />
        <main className="py-20 px-4 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  );
}