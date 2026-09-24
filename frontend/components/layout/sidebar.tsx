"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  FileSearch,
  FileText,
  Settings,
  Database,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Personas",
    href: "/personas",
    icon: Users,
  },
  {
    name: "Hypotheses",
    href: "/hypotheses",
    icon: GitBranch,
  },
  {
    name: "Evidence",
    href: "/evidence",
    icon: FileSearch,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-mark">D</div>

        <div>
          <div className="brand-name">DARKTRACE</div>
          <div className="brand-tagline">Connecting the Hidden Threads</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">INVESTIGATE</div>

        {navigation.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="sidebar-bottom">
        <Link
          href="/settings"
          className={`nav-item ${
            pathname.startsWith("/settings") ? "active" : ""
          }`}
        >
          <Settings size={17} strokeWidth={1.8} />
          <span>Settings</span>
        </Link>

        <div className="dataset-card">
          <div className="dataset-icon">
            <Database size={15} strokeWidth={1.8} />
          </div>

          <div className="dataset-info">
            <div className="dataset-label">DATASET</div>
            <div className="dataset-name">Synthetic v1.0</div>
          </div>

          <span className="status-dot" />
        </div>
      </div>
    </aside>
  );
}