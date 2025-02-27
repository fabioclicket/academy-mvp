import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { VideoComments } from "@/components/video-comments";
import { VideoPlayer } from "@/components/video-player";
import { VideoRating } from "@/components/video-rating";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function VideoPage({ params }: { params: { id: string } }) {
	const videoData = {
		id: params.id,
		title: "Cómo crear tu primer evento",
		module: "Módulo 2",
		description:
			"Aprende a crear y configurar tu primer evento en la plataforma Clicket+. En este video tutorial te guiaremos paso a paso en el proceso de creación de eventos, desde la configuración básica hasta opciones avanzadas.",
		videoUrl:
			"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "10:30",
		instructor: "Andrea Montaño",
		date: "2025-05-15",
	};

	return (
		<SidebarProvider>
			<div className="flex h-screen w-full">
				<AppSidebar />
				<SidebarInset className="flex-1 overflow-auto">
					<div className="container mx-auto py-6 space-y-8">
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="icon" asChild>
								<Link href="/">
									<ArrowLeft className="h-5 w-5" />
									<span className="sr-only">Volver</span>
								</Link>
							</Button>
							<div>
								<h4 className="text-sm font-medium text-muted-foreground">
									{videoData.module}
								</h4>
								<h1 className="text-2xl font-bold">{videoData.title}</h1>
							</div>
						</div>

						<VideoPlayer video={videoData} />

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="lg:col-span-2 space-y-6">
								<div className="space-y-4">
									<h2 className="text-xl font-semibold">Descripción</h2>
									<p className="text-muted-foreground">
										{videoData.description}
									</p>
									<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
										<div>Protagonista: {videoData.instructor}</div>
										<div>
											Fecha: {new Date(videoData.date).toLocaleDateString()}
										</div>
										<div>Duración: {videoData.duration}</div>
									</div>
								</div>

								<VideoComments videoId={videoData.id} />
							</div>

							<div className="space-y-6">
								<VideoRating videoId={videoData.id} />
								<div className="rounded-lg border p-4">
									<h3 className="font-medium mb-2">Recursos adicionales</h3>
									<ul className="space-y-2 text-sm">
										<li className="text-primary hover:underline cursor-pointer">
											Guía de inicio rápido (PDF)
										</li>
										<li className="text-primary hover:underline cursor-pointer">
											Plantilla de evento (XLSX)
										</li>
										<li className="text-primary hover:underline cursor-pointer">
											Checklist de configuración
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
