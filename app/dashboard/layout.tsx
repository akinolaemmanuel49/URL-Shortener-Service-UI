import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 min-h-full max-h-full">{children}</main>
      </div>
    </div>
  );
}
