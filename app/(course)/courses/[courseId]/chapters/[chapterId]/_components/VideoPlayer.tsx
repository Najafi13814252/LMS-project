"use client"

import { cn } from "@/lib/utils"
import { CircleLock02Icon, Loader } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"

interface VideoPlayerProps {
    chapterId: string
    title: string
    courseId: string
    videoUrl: string
    nextChapterId?: string
    isLocked: boolean
    completedOnEnd: boolean
}

function VideoPlayer({ chapterId, title, courseId, videoUrl, nextChapterId, isLocked, completedOnEnd }: VideoPlayerProps) {
    const [isReady, setIsReady] = useState(false)
    return (
        <div className="relative aspect-video">
            {!isLocked && !isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <HugeiconsIcon icon={Loader} className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                    <HugeiconsIcon icon={CircleLock02Icon} className="w=8 h-8" />
                    <p className="text-sm">این ویدئو قفل است</p>
                </div>
            ) : (
                <video controls className={cn(
                    "rounded-md",
                    !isReady && "hidden"
                )}
                    onCanPlay={() => setIsReady(true)}
                    onEnded={() => {}}
                    title={title}
                    autoPlay
                >
                    <source src={videoUrl} />
                </video>
            )}

        </div>
    )
}

export default VideoPlayer
