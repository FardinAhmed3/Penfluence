export const metadata = {
  title: 'Penfluence',
  description: 'Penfluence, made by students, for students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}