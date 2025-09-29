import { Unlock, LockIcon } from "lucide-react"
import { CardContainer } from "./card-containter";

const lessons = [
    {
        title: "Learn Your Numbers",
        description: "This lessons will cover the first 10 numbers in Quechua",
        link: "https://react.dev/learn",
    },
    // {
    //     title: "Allinllachu?",
    //     description: "Learn about the common greetings and phrases that'll get you interacting with natives",
    //     link: "https://react.dev/learn",
    // },
]

interface CategoryCardProps {
    title: string;
    description: string;
    active: boolean;
}

export const CategoryCard = ({
    title,
    description,
    active
}: CategoryCardProps) => {
    return (
        <div>
            <div>
                <span className="flex items-center gap-2">
                    <h2 className="text-3xl">{title}</h2>
                    {active ? <Unlock className="!h-4 !w-4"/> : <LockIcon className="!h-4 !w-4"/> }
                </span>
                <p className="text-base">{description}</p>
            </div>
            <div className="mt-8">
                <CardContainer lessons={lessons}/>
            </div>
        </div>
    )
}