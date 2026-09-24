import Sidebar from "./sidebar";
import Topbar from "./topbar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Topbar />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}