import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { TopHeader } from "./TopHeader";
import { RightPanel } from "./RightPanel";

export function AppLayout({
  children,
  showRightPanel = true,
}: {
  children: React.ReactNode;
  showRightPanel?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopHeader />
      {showRightPanel && <RightPanel />}
      <main
        className={`md:ps-[220px] ${showRightPanel ? "lg:pe-[280px]" : ""} md:pt-16 pb-20 md:pb-0`}
      >
        <div className="mx-auto w-full max-w-[860px] px-4 md:px-6 py-4 md:py-6">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
