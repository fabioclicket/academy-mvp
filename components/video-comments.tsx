"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import * as React from "react";

interface VideoCommentsProps {
	videoId: string;
}

const initialComments = [
	{
		id: "1",
		user: {
			name: "Carlos Rodríguez",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "CR",
		},
		content:
			"Excelente tutorial, me ha ayudado mucho a entender cómo configurar mi primer evento. ¡Gracias!",
		date: "2023-06-10T14:30:00Z",
		likes: 5,
	},
	{
		id: "2",
		user: {
			name: "Laura Gómez",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "LG",
		},
		content:
			"Me gustaría que profundizaran más en las opciones de personalización. Por lo demás, muy buen contenido.",
		date: "2023-06-09T10:15:00Z",
		likes: 2,
	},
	{
		id: "3",
		user: {
			name: "Miguel Ángel",
			avatar: "/placeholder.svg?height=40&width=40",
			initials: "MA",
		},
		content:
			"¿Alguien sabe si hay un video que explique cómo integrar pasarelas de pago personalizadas?",
		date: "2023-06-08T18:45:00Z",
		likes: 0,
	},
];

export function VideoComments({ videoId }: VideoCommentsProps) {
	const [comments, setComments] = React.useState(initialComments);
	const [newComment, setNewComment] = React.useState("");
	const { toast } = useToast();

	const handleAddComment = () => {
		if (!newComment.trim()) return;

		const comment = {
			id: Date.now().toString(),
			user: {
				name: "Usuario Actual",
				avatar: "/placeholder.svg?height=40&width=40",
				initials: "UA",
			},
			content: newComment,
			date: new Date().toISOString(),
			likes: 0,
		};

		setComments([comment, ...comments]);
		setNewComment("");

		toast({
			title: "Comentario añadido",
			description: "Tu comentario ha sido publicado correctamente.",
		});
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("es-ES", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleLike = (commentId: string) => {
		setComments(
			comments.map((comment) =>
				comment.id === commentId
					? { ...comment, likes: comment.likes + 1 }
					: comment,
			),
		);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Comentarios ({comments.length})</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<Textarea
						placeholder="Escribe un comentario..."
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						className="resize-none"
					/>
					<Button onClick={handleAddComment} disabled={!newComment.trim()}>
						Publicar comentario
					</Button>
				</div>

				<div className="space-y-6">
					{comments.map((comment) => (
						<div key={comment.id} className="flex gap-4">
							<Avatar>
								<AvatarImage
									src={comment.user.avatar}
									alt={comment.user.name}
								/>
								<AvatarFallback>{comment.user.initials}</AvatarFallback>
							</Avatar>
							<div className="flex-1 space-y-1">
								<div className="flex items-center justify-between">
									<div className="font-medium">{comment.user.name}</div>
									<div className="text-xs text-muted-foreground">
										{formatDate(comment.date)}
									</div>
								</div>
								<p className="text-sm">{comment.content}</p>
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										className="h-auto p-0 text-muted-foreground hover:text-foreground"
										onClick={() => handleLike(comment.id)}
									>
										Me gusta ({comment.likes})
									</Button>
									<Button
										variant="ghost"
										size="sm"
										className="h-auto p-0 text-muted-foreground hover:text-foreground"
									>
										Responder
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
