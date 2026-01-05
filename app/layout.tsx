import "./globals.css";
import Header from "@/components/header";
import ClientBootstrap from "@/components/ClientBootstrap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 overflow-x-hidden bg-background text-foreground">
        {/* Client-only init */}
        <ClientBootstrap />

        <Header />
        {children}
      </body>
    </html>
  );
}
