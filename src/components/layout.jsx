import PropTypes from "prop-types";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
