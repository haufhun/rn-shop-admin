export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // TODO: Check if user is authenticated and is admin

  return <>{children}</>;
}
