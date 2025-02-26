import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { VideoGallery } from "@/components/video-gallery"

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <VideoGallery />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

