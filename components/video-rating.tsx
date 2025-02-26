"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";
import * as React from "react";

interface VideoRatingProps {
	videoId: string;
}

export function VideoRating({ videoId }: VideoRatingProps) {
	const [rating, setRating] = React.useState<number | null>(null);
	const [hoveredRating, setHoveredRating] = React.useState<number | null>(null);
	const [feedback, setFeedback] = React.useState("");
	const [submitted, setSubmitted] = React.useState(false);
	const { toast } = useToast();

	const handleRatingSubmit = () => {
		if (!rating) return;

		// here send feedback and rating
		console.log({
			videoId,
			rating,
			feedback,
		});

		setSubmitted(true);

		toast({
			title: "¡Gracias por tu valoración!",
			description: "Tu opinión nos ayuda a mejorar nuestro contenido.",
		});
	};

	const handleRatingClick = (value: number) => {
		setRating(value);
	};

	const handleRatingHover = (value: number) => {
		setHoveredRating(value);
	};

	const handleRatingLeave = () => {
		setHoveredRating(null);
	};

	const renderStars = () => {
		const stars = [];
		const currentRating = hoveredRating !== null ? hoveredRating : rating;

		for (let i = 1; i <= 5; i++) {
			stars.push(
				<Button
					key={i}
					variant="ghost"
					size="icon"
					className={`h-8 w-8 ${
						i <= (currentRating || 0)
							? "text-yellow-500 hover:text-yellow-600"
							: "text-muted-foreground hover:text-yellow-400"
					}`}
					onClick={() => handleRatingClick(i)}
					onMouseEnter={() => handleRatingHover(i)}
					onMouseLeave={handleRatingLeave}
					disabled={submitted}
				>
					<Star
						className={`h-6 w-6 ${i <= (currentRating || 0) ? "fill-current" : ""}`}
					/>
					<span className="sr-only">{i} estrellas</span>
				</Button>,
			);
		}

		return stars;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Valora este video</CardTitle>
			</CardHeader>
			<CardContent>
				{!submitted ? (
					<div className="space-y-4">
						<div className="flex justify-center">{renderStars()}</div>
						<div className="text-center text-sm">
							{rating === 1 && "Muy malo"}
							{rating === 2 && "Malo"}
							{rating === 3 && "Regular"}
							{rating === 4 && "Bueno"}
							{rating === 5 && "Excelente"}
						</div>
						<Textarea
							placeholder="Comparte tu opinión sobre este video (opcional)"
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							className="resize-none"
						/>
						<Button
							onClick={handleRatingSubmit}
							disabled={!rating}
							className="w-full"
						>
							Enviar valoración
						</Button>
					</div>
				) : (
					<div className="text-center space-y-4">
						<div className="flex justify-center">
							{Array.from({ length: rating || 0 }).map((_, i) => (
								<Star
									key={i}
									className="h-6 w-6 text-yellow-500 fill-current"
								/>
							))}
						</div>
						<p className="text-muted-foreground">
							¡Gracias por valorar este video! Tu opinión nos ayuda a mejorar.
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
