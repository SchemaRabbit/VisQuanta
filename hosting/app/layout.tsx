import './globals.css';

export const metadata = {
  title: 'VisQuanta Glossary',
  description: 'Essential data visualization and business intelligence terms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}
