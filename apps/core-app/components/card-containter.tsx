"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react"
import { cn } from "@/lib/utils"
import moutain from "@/assets/mountain.png";
import Image from "next/image";
import Link from "next/link"

interface Lesson {
  title: string
  description: string
  link: string
}

interface CardContainerProps {
  lessons: Lesson[]
  className?: string
}

const LessonCard = ({
    lesson
}: { lesson: Lesson }) => {
    return (
        <div className="w-96">
            <div className="border">
                <Image src={moutain} alt="Mountain" width={351} height={281} className="min-w-[351px] object-cover"/>
            </div>
            <div className="flex flex-col text-base gap-2 mt-4">
                <span className="text-lg font-bold">{lesson.title}</span>
                <span>{lesson.description}</span>
            </div>
            
            <Button className="bg-transparent text-black rounded-full border border-black hover:bg-black hover:text-white py-5 px-4 mt-4">
                <Link href="/lesson/unit/1/level/1">
                    <span className="text-base flex justify-center items-center gap-3">
                        Start
                        <MoveRight className="!w-4 !h-4"/>
                    </span>
                </Link>
            </Button>
        </div>
    )
}

export function CardContainer({ lessons, className }: CardContainerProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const maxVisible = 3
    const totalCards = lessons.length

    const visibleLessons = lessons.slice(currentIndex, currentIndex + maxVisible)

    const showNavigation = totalCards > maxVisible
    const canGoBack = currentIndex > 0
    const canGoForward = currentIndex + maxVisible < totalCards

    const handlePrevious = () => {
        if (canGoBack) {
            setCurrentIndex(Math.max(0, currentIndex - maxVisible))
        }
    }

    const handleNext = () => {
        if (canGoForward) {
            setCurrentIndex(Math.min(totalCards - maxVisible, currentIndex + maxVisible))
        }
    }

    return (
        <div className={cn("w-full", className)}>
            {showNavigation && (
            <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                Showing {currentIndex + 1}-{Math.min(currentIndex + maxVisible, totalCards)} of {totalCards}
                </div>
                <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrevious}
                    disabled={!canGoBack}
                    aria-label="Previous lessons"
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    disabled={!canGoForward}
                    aria-label="Next lessons"
                >
                    <ChevronRight />
                </Button>
                </div>
            </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleLessons.map((lesson, index) => (
                <div
                    key={currentIndex + index}
                    className="animate-in fade-in-0 slide-in-from-right-2 duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <LessonCard lesson={lesson} />
                </div>
            ))}
            </div>
        </div>
    )
}
