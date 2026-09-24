"use client";

import {
  Search,
  ChevronRight,
  Bell,
} from "lucide-react";
import { usePathname } from "next/navigation";

function getPageName(pathname: string) {
  if (pathname.startsWith("/personas")) return "Personas";
  if (pathname.startsWith("/hypotheses")) return "Hypotheses";
  if (pathname.startsWith("/evidence")) return "Evidence";
  if (pathname.startsWith("/reports")) return "Reports";
  if (pathname.startsWith("/settings")) return "Settings";

  return "Dashboard";
}

export default function Topbar() {
  const pathname = usePathname();
  const pageName = getPageName(pathname);

  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span className="breadcrumb-muted">DARKTRACE</span>
        <ChevronRight size={14} />
        <span className="breadcrumb-current">{pageName}</span>
      </div>

      <div className="topbar-actions">
        <button className="global-search">
          <Search size={16} strokeWidth={1.8} />

          <span>Search intelligence...</span>

          <kbd>⌘ K</kbd>
        </button>

        <div className="demo-badge">
          <span className="demo-dot" />
          DEMO DATASET
        </div>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={17} strokeWidth={1.8} />
        </button>

        <div className="user-avatar">AK</div>
      </div>
    </header>
  );
}