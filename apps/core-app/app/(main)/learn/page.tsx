import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import moutain from "@/assets/mountain.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { CategoryCard } from "@/components/category-card";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    return (
        <div className="h-screen overflow-y-scroll">
            <div className="flex-1 flex justify-center items-center px-16 py-8 flex-col">
                <div className="border border-black rounded-3xl flex flex-row p-8 flex-wrap-reverse">
                    <div className="flex-1 p-3 flex justify-center flex-col gap-4">
                        <h1 className="text-5xl">
                            Cusco Quechua
                        </h1>
                        <p className="text-base">
                            Research shows we remember far more when we actively practice, not just read or watch. Take a few minutes right now to apply what you’ve learned
                        </p>
                        <div>
                            <Button className="bg-transparent text-black rounded-full border border-black hover:bg-black hover:text-white py-5 px-4">
                                <span className="text-base flex justify-center items-center gap-3">
                                    See More
                                    <SquareArrowOutUpRight className="!w-4 !h-4"/>
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 p-3 flex justify-end items-center">
                        <Image src={moutain} alt="Mountain" width={351} height={281} className="min-w-[351px]"/>
                    </div>
                </div>
                <div className="min-w-full mt-16 flex flex-col gap-16">
                    <CategoryCard 
                        title="Unit 1: Quechua Preliminaries" 
                        description="This unit covers the basic concepts like numbers, common phrases, and vocabulary"
                        active
                    />
                    {/* <CategoryCard 
                        title="Unit 2: Quechua Pronouns" 
                        description="This unit covers the basics on pronouns and forming your first sentence"
                        active
                    /> */}
                </div>
            </div>
        </div>
    );
}
