"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ModeToggle } from "./theme-toggle";

const allVideos = [
	{
		id: "1",
		title: "Bienvenida a Clicket Plus",
		module: "Introducción",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "5:20",
	},
	{
		id: "3",
		title: "Cómo crear tu primer evento",
		module: "Creación de Eventos",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "10:30",
	},
	{
		id: "6",
		title: "Personaliza tu evento",
		module: "Personalización",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "12:20",
	},
	{
		id: "9",
		title: "Promoción en redes sociales",
		module: "Marketing",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "11:30",
	},
	{
		id: "11",
		title: "Entendiendo tus métricas",
		module: "Análisis y Reportes",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "7:50",
	},
	{
		id: "4",
		title: "Configuración de entradas",
		module: "Creación de Eventos",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "7:15",
	},
	{
		id: "7",
		title: "Diseño de página de evento",
		module: "Personalización",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "8:10",
	},
	{
		id: "2",
		title: "Navegando por la plataforma",
		module: "Introducción",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "8:45",
	},
	{
		id: "5",
		title: "Personalización de formularios",
		module: "Creación de Eventos",
		thumbnail: "/placeholder.svg?height=720&width=1280",
		duration: "9:50",
	},
];

const modules = [...new Set(allVideos.map((video) => video.module))];

export function VideoGallery() {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [activeModule, setActiveModule] = React.useState<string | null>(null);
	const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

	const filteredVideos = React.useMemo(() => {
		return allVideos.filter((video) => {
			const matchesSearch = video.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesModule = activeModule ? video.module === activeModule : true;
			return matchesSearch && matchesModule;
		});
	}, [searchQuery, activeModule]);

	return (
		<div className="container mx-auto py-6 space-y-6">
			<header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="h-9 w-9" />
					<h1 className="text-2xl font-bold">Galería de Videos</h1>
				</div>
				<div className="w-full sm:w-auto flex items-center gap-2">
					<div className="relative w-full sm:w-64">
						<Search className="absolute left-2.5 top-1/2 -translate-y-1/2  h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Buscar videos..."
							className="pl-8 w-full"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="hidden sm:flex border rounded-md">
						<Button
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="icon"
							onClick={() => setViewMode("grid")}
							className="rounded-r-none"
						>
							<Grid className="h-4 w-4" />
							<span className="sr-only">Vista de cuadrícula</span>
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="icon"
							onClick={() => setViewMode("list")}
							className="rounded-l-none"
						>
							<List className="h-4 w-4" />
							<span className="sr-only">Vista de lista</span>
						</Button>
					</div>
					<ModeToggle />
				</div>
			</header>

			<Tabs defaultValue="all" className="w-full">
				<TabsList className="mb-4 flex flex-wrap h-auto">
					<TabsTrigger
						value="all"
						onClick={() => setActiveModule(null)}
						className="data-[state=active]:bg-primary data-[state=active]:text-zinc-50"
					>
						Todos los videos
					</TabsTrigger>
					{modules.map((module) => (
						<TabsTrigger
							key={module}
							value={module}
							onClick={() => setActiveModule(module)}
							className="data-[state=active]:bg-primary data-[state=active]:text-zinc-50"
						>
							{module}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent value="all" className="mt-0">
					{viewMode === "grid" ? (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredVideos.map((video) => (
								<VideoCard key={video.id} video={video} />
							))}
						</div>
					) : (
						<div className="space-y-4">
							{filteredVideos.map((video) => (
								<VideoListItem key={video.id} video={video} />
							))}
						</div>
					)}

					{filteredVideos.length === 0 && (
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								No se encontraron videos que coincidan con tu búsqueda.
							</p>
						</div>
					)}
				</TabsContent>

				{modules.map((module) => (
					<TabsContent key={module} value={module} className="mt-0">
						{viewMode === "grid" ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredVideos.map((video) => (
									<VideoCard key={video.id} video={video} />
								))}
							</div>
						) : (
							<div className="space-y-4 w-full">
								{filteredVideos.map((video) => (
									<VideoListItem key={video.id} video={video} />
								))}
							</div>
						)}

						{filteredVideos.length === 0 && (
							<div className="text-center py-12">
								<p className="text-muted-foreground">
									No se encontraron videos que coincidan con tu búsqueda.
								</p>
							</div>
						)}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}

function VideoCard({ video }: { video: (typeof allVideos)[0] }) {
	return (
		<Link href={`/videos/${video.id}`}>
			<Card className="overflow-hidden transition-all hover:shadow-md">
				<div className="relative aspect-video">
					<img
						src={video.thumbnail || "/placeholder.svg"}
						alt={video.title}
						className="object-cover w-full h-full"
					/>
					<div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
						{video.duration}
					</div>
				</div>
				<CardContent className="p-4">
					<div className="text-sm font-medium text-muted-foreground mb-1">
						{video.module}
					</div>
					<h3 className="font-semibold line-clamp-2">{video.title}</h3>
				</CardContent>
			</Card>
		</Link>
	);
}

function VideoListItem({ video }: { video: (typeof allVideos)[0] }) {
	return (
		<Link href={`/videos/${video.id}`}>
			<Card className="overflow-hidden rounded-none transition-all hover:shadow-md">
				<div className="flex flex-col sm:flex-row">
					<div className="relative sm:w-48 aspect-video">
						<img
							src={video.thumbnail || "/placeholder.svg"}
							alt={video.title}
							className="object-cover w-full h-full"
						/>
						<div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
							{video.duration}
						</div>
					</div>
					<CardContent className="p-4 flex-1">
						<div className="text-sm font-medium text-muted-foreground mb-1">
							{video.module}
						</div>
						<h3 className="font-semibold">{video.title}</h3>
					</CardContent>
				</div>
			</Card>
		</Link>
	);
}
