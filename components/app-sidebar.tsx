"use client";

import { Label } from "@/components/ui/label";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import { BookOpen, Home, Play, Search, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const modules = [
	{
		id: "getting-started",
		title: "Introducción",
		videos: [
			{ id: "1", title: "Bienvenida a Clicket Plus", duration: "5:20" },
			{ id: "2", title: "Navegando por la plataforma", duration: "8:45" },
		],
	},
	{
		id: "event-creation",
		title: "Creación de Eventos",
		videos: [
			{ id: "3", title: "Cómo crear tu primer evento", duration: "10:30" },
			{ id: "4", title: "Configuración de entradas", duration: "7:15" },
			{ id: "5", title: "Personalización de formularios", duration: "9:50" },
		],
	},
	{
		id: "customization",
		title: "Personalización",
		videos: [
			{ id: "6", title: "Personaliza tu evento", duration: "12:20" },
			{ id: "7", title: "Diseño de página de evento", duration: "8:10" },
			{ id: "8", title: "Marca y estilo", duration: "6:45" },
		],
	},
	{
		id: "marketing",
		title: "Marketing",
		videos: [
			{ id: "9", title: "Promoción en redes sociales", duration: "11:30" },
			{ id: "10", title: "Email marketing para eventos", duration: "9:25" },
		],
	},
	{
		id: "analytics",
		title: "Análisis y Reportes",
		videos: [
			{ id: "11", title: "Entendiendo tus métricas", duration: "7:50" },
			{ id: "12", title: "Reportes avanzados", duration: "10:15" },
		],
	},
];

export function AppSidebar() {
	const pathname = usePathname();
	const [searchQuery, setSearchQuery] = React.useState("");

	const filteredModules = React.useMemo(() => {
		if (!searchQuery.trim()) return modules;

		return modules
			.map((module) => ({
				...module,
				videos: module.videos.filter((video) =>
					video.title.toLowerCase().includes(searchQuery.toLowerCase()),
				),
			}))
			.filter((module) => module.videos.length > 0);
	}, [searchQuery]);

	return (
		<Sidebar>
			<SidebarHeader className="border-b">
				<div className="flex items-center justify-center p-4">
					<div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
						Propio <span>Academy</span>
					</div>
				</div>
				<div className="px-4 pb-4">
					<div className="relative">
						<Label htmlFor="search" className="sr-only">
							Buscar
						</Label>
						<SidebarInput
							id="search"
							placeholder="Buscar videos..."
							className="pl-8"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild isActive={pathname === "/"}>
								<Link href="/">
									<Home className="h-4 w-4" />
									<span>Inicio</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link href="/">
									<Video className="h-4 w-4" />
									<span>Todos los videos</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>

				{filteredModules.map((module) => (
					<SidebarGroup key={module.id}>
						<SidebarGroupLabel>
							<BookOpen className="h-4 w-4 mr-2" />
							{module.title}
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{module.videos.map((video) => (
									<SidebarMenuItem key={video.id}>
										<SidebarMenuButton
											asChild
											isActive={pathname === `/videos/${video.id}`}
											tooltip={`${video.title} (${video.duration})`}
										>
											<Link href={`/videos/${video.id}`}>
												<Play className="h-4 w-4" />
												<span>{video.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
