"use client"

import { useFetchUnit } from "@/data/test_lesson_data"

export const LessonDashboard = () => {

    const { data } = useFetchUnit()

    return (
        <div className="flex-1 flex justify-center items-center px-16 py-8 flex-col gap-12">
            <div className="flex flex-col gap-6 min-w-[592px]">
                <div className="bg-[#0754CF] flex flex-col min-w-full p-4 gap-4 rounded-xl">
                    <span className="font-bold text-[#FDFDFD]">{data?.unitNumber}</span>
                    <span className="font-bold text-[#FDFDFD] text-xl">{data?.unitName}</span>
                </div>
                <div className="grid-cols-3 grid gap-[10px]">
                    {Array.from({ length: data?.numberOfLessons as number }).map((_, i) => (
                        <div key={i} className="flex flex-col justify-end bg-[#0754CF] p-[10px] gap-[10px] min-h-36 rounded-xl">
                            <span className="font-bold text-[#FDFDFD]">Level {i+1}</span>
                            <span className="font-bold text-[#FDFDFD]">Done</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}