"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
	Maximize,
	Minimize,
	Pause,
	Play,
	SkipBack,
	SkipForward,
	Volume2,
	VolumeX,
} from "lucide-react";
import * as React from "react";

interface VideoPlayerProps {
	video: {
		title: string;
		videoUrl: string;
		thumbnail: string;
	};
}

export function VideoPlayer({ video }: VideoPlayerProps) {
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const [volume, setVolume] = React.useState(1);
	const [isMuted, setIsMuted] = React.useState(false);
	const [isFullscreen, setIsFullscreen] = React.useState(false);
	const [currentTime, setCurrentTime] = React.useState("0:00");
	const [duration, setDuration] = React.useState("0:00");
	const playerRef = React.useRef<HTMLDivElement>(null);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const formatTime = React.useCallback((seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	}, []);

	const handleProgress = React.useCallback(() => {
		if (videoRef.current) {
			const currentProgress =
				(videoRef.current.currentTime / videoRef.current.duration) * 100;
			setProgress(currentProgress);
			setCurrentTime(formatTime(videoRef.current.currentTime));
		}
	}, [formatTime]);

	const handleVolumeChange = (value: number[]) => {
		const newVolume = value[0] / 100;
		setVolume(newVolume);
		if (videoRef.current) {
			videoRef.current.volume = newVolume;
		}
		setIsMuted(newVolume === 0);
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
			if (isMuted) {
				videoRef.current.volume = volume;
			} else {
				setVolume(videoRef.current.volume);
				videoRef.current.volume = 0;
			}
		}
	};

	const handleSeek = (value: number[]) => {
		if (videoRef.current) {
			const seekTime = (value[0] / 100) * videoRef.current.duration;
			videoRef.current.currentTime = seekTime;
			setProgress(value[0]);
		}
	};

	const toggleFullscreen = () => {
		if (!document.fullscreenElement && playerRef.current) {
			playerRef.current.requestFullscreen().catch((err) => {
				console.error(`Error attempting to enable fullscreen: ${err.message}`);
			});
		} else {
			document.exitFullscreen();
		}
	};

	const skipForward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime += 10;
		}
	};

	const skipBackward = () => {
		if (videoRef.current) {
			videoRef.current.currentTime -= 10;
		}
	};

	React.useEffect(() => {
		const video = videoRef.current;

		if (video) {
			video.addEventListener("play", () => setIsPlaying(true));
			video.addEventListener("pause", () => setIsPlaying(false));
			video.addEventListener("timeupdate", handleProgress);
			video.addEventListener("loadedmetadata", () => {
				setDuration(formatTime(video.duration));
			});

			document.addEventListener("fullscreenchange", () => {
				setIsFullscreen(!!document.fullscreenElement);
			});
		}

		return () => {
			if (video) {
				video.removeEventListener("play", () => setIsPlaying(true));
				video.removeEventListener("pause", () => setIsPlaying(false));
				video.removeEventListener("timeupdate", handleProgress);
				video.removeEventListener("loadedmetadata", () => {});
			}
			document.removeEventListener("fullscreenchange", () => {});
		};
	}, [handleProgress, formatTime]);

	return (
		<Card className="overflow-hidden" ref={playerRef}>
			<div className="relative bg-black">
				<video
					ref={videoRef}
					src={video.videoUrl}
					poster={video.thumbnail}
					className="w-full aspect-video"
					onClick={togglePlay}
				/>

				{/* Overlay de título */}
				<div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white">
					<h2 className="text-lg font-medium">{video.title}</h2>
				</div>

				{/* Controles */}
				<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white">
					<div className="p-2">
						<Slider
							value={[progress]}
							min={0}
							max={100}
							step={0.1}
							onValueChange={handleSeek}
							className="w-full cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary"
						/>
					</div>

					<div className="flex items-center justify-between p-2 pt-0">
						<div className="flex items-center gap-2">
							<Button
								variant="ghost"
								size="icon"
								onClick={togglePlay}
								className="h-8 w-8 text-white hover:bg-white/20"
							>
								{isPlaying ? (
									<Pause className="h-5 w-5" />
								) : (
									<Play className="h-5 w-5" />
								)}
							</Button>

							<Button
								variant="ghost"
								size="icon"
								onClick={skipBackward}
								className="h-8 w-8 text-white hover:bg-white/20"
							>
								<SkipBack className="h-5 w-5" />
							</Button>

							<Button
								variant="ghost"
								size="icon"
								onClick={skipForward}
								className="h-8 w-8 text-white hover:bg-white/20"
							>
								<SkipForward className="h-5 w-5" />
							</Button>

							<div className="flex items-center gap-2 ml-2">
								<Button
									variant="ghost"
									size="icon"
									onClick={toggleMute}
									className="h-8 w-8 text-white hover:bg-white/20"
								>
									{isMuted ? (
										<VolumeX className="h-5 w-5" />
									) : (
										<Volume2 className="h-5 w-5" />
									)}
								</Button>

								<Slider
									value={[isMuted ? 0 : volume * 100]}
									min={0}
									max={100}
									step={1}
									onValueChange={handleVolumeChange}
									className="w-20 cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white"
								/>
							</div>

							<span className="text-xs ml-2">
								{currentTime} / {duration}
							</span>
						</div>

						<Button
							variant="ghost"
							size="icon"
							onClick={toggleFullscreen}
							className="h-8 w-8 text-white hover:bg-white/20"
						>
							{isFullscreen ? (
								<Minimize className="h-5 w-5" />
							) : (
								<Maximize className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
}
