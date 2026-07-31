import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full">
            <div className="h-20 md:pr-56 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex w-56 flex-col fixed z-50">
                <Sidebar />
            </div>
            <main className="md:pr-56 pt-20 h-full">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
