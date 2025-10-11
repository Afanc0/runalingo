import { Button } from "@/components/ui/button";
import Image from "next/image";
import machupichu from "@/assets/asset_machu_pichu_resized.png"

import yellowblob from "@/assets/Ellipse 2.png"
import redblob from "@/assets/Ellipse 1.png"
import Link from "next/link";

export default function HomePage() {

    return (
        <main className="min-h-screen flex flex-col items-center">
            <nav className="w-full flex justify-center h-[75px] px-8">
                <div className="w-full flex flex-row justify-between items-center p-[10px]">
                    <div className="h-[50px] w-[180px] flex items-center">
                        <span>runalingo.</span>
                    </div>
                    <div className="flex justify-center items-center flex-row gap-14 p-[10px]">
                        <span>About</span>
                        <span>Mission</span>
                        <span>Contact</span>
                    </div>
                    <Link href="/auth/login">
                        <Button className="px-6 py-[10px] rounded-xl border-2 border-b-4 bg-[#0754CF] border-[#091B38] h-[50px] w-[180px]">
                            <span className="font-bold text-base uppercase">Login</span>
                        </Button>
                    </Link>
                </div>
            </nav>
            <section className="flex-1 flex justify-center items-center flex-col">
                <Image className="absolute top-24 left-12" src={redblob} alt="red blob"/>
                <Image className="absolute bottom-24 right-12" src={yellowblob} alt="yellow blob"/>
                <div className="flex justify-center items-center flex-col gap-7 z-10">
                    <h1 className="font-bold text-6xl text-center">¡Allinllachu! Learn <br /> Quechua. Love the culture.</h1>
                    <p className="font-medium text-lg text-center">Discover the beauty of the Quechua language through engaging, interactive lessons designed for all learners.</p>
                    <Button className="px-6 py-[10px] rounded-xl border-2 border-b-4 bg-[#0754CF] border-[#091B38] h-[50px] w-[180px]">
                        <span className="font-bold text-base uppercase">Get Started</span>
                    </Button>
                </div>
                <div className="mt-16 z-10">
                    <Image src={machupichu} alt="Machu Picchu" width={750} />
                </div>
            </section>
            <footer className="p-[10px]">
                <span className="text-[#B2B2B2] text-sm">
                    © 2025 runalingo • Quechua made simple, fun, and alive.
                </span>
            </footer>
        </main>
    )
}