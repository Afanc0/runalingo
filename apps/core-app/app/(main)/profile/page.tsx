import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";

// import Image from "next/image";
import { Flame, Star, Trophy } from "lucide-react";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    const user = data?.claims;

    return (
         <div className="h-screen overflow-y-scroll w-full">
            <div className="flex-1 flex justify-center items-center px-16 py-8 flex-col">
                {/* Profile Card */}
                <div className="flex flex-col gap-6">
                    <div>
                        <img src="https://github.com/evilrabbit.png" alt="EvilRabbit" className="min-w-[351px] rounded-3xl"/>
                    </div>
                    <div className="flex flex-col border-b pb-4">
                        <span className="text-2xl font-bold">{user.email}</span>
                        <span className="text-[#231913]">Joined May 2015</span>
                    </div>
                    <div className="min-w-[500px]">
                        <h2 className="text-2xl font-bold">Statistics</h2>
                        <div className="grid gap-6 grid-cols-2 mt-4">
                            <div className="px-4 py-6 border-2 rounded-3xl flex gap-4">
                                <div>
                                    <Flame color="gray" className="h-8 w-8"/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold">0</span>
                                    <span>Lesson Completed</span>
                                </div>
                            </div>
                            <div className="px-4 py-6 border-2 rounded-3xl flex gap-4">
                                <div>
                                    <Star color="gray" className="h-8 w-8"/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold">0</span>
                                    <span>Total Points</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Achievements</h2>
                        <div className="grid gap-6 mt-4">
                            <div className="px-4 py-6 border-2 rounded-3xl flex gap-4">
                                <div className="border-2 border-green-300 flex justify-center items-center p-3 rounded-xl bg-green-600">
                                    <Trophy color="white" className="h-8 w-8"/>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold">Dip Your Toes</span>
                                    <span>Complete Unit 1 of Quechua Cusqueño</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
