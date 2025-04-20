import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SidebarToggle from "../components/SidebarToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="font-work-sans">
            <Navbar />
            <div className="relative flex">
                <Sidebar isOpen={false} /> 

                <SidebarToggle />

                <div className="flex-1 transition-all duration-500 ease-in-out">
                    {children}
                </div>
            </div>
        </main>
    );
}
