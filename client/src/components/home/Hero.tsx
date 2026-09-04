import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function Hero() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            
                .font-berkshire {
                    font-family: 'Berkshire Swash', cursive;
                }
            `}</style>
            <section className="flex flex-col items-center pb-48 text-center text-sm text-white max-md:px-2 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-image-grain.png')] bg-cover bg-center h-[100vh]">
                <nav className="flex flex-wrap justify-between items-center px-4 md:px-16 lg:px-24 xl:px-32 py-3.5 border-b border-slate-200/20 w-full">
                    <a href="#">
                       <h1 className="text-3xl">CareerBuddy</h1>
                    </a>
                    <div>
                    <button className="w-auto h-auto text-lg text-black font-bold bg-gradient-to-b from-gray-100 to-blue-300 px-3 py-2 rounded-4xl mr-4 transition-transform duration-150 active:scale-90 hover:from-violet-500 hover:to-violet-600 transition-colors">
                        Signup
                    </button>
                    <button className="w-auto h-auto text-lg font-bold text-black bg-gradient-to-b from-gray-100 to-blue-300 px-3 py-2 rounded-4xl transition-transform duration-150 active:scale-90 hover:from-violet-500 hover:to-violet-600 transition-colors">
                        Login
                    </button>
                    </div>
                </nav>
                <h1 className="font-berkshire text-[45px]/[52px] md:text-6xl/[65px] mt-6 max-w-4xl">
                    Find the right career . Know what to learn next.
                </h1>
                <p className="text-base mt-2 max-w-xl">Discover where your skills can take you. </p>
                <p className="text-base mt-3 md:mt-7 max-w-xl">
                    Get a personalized roadmap to turn your interest into a career.
                </p>
                <Link to="/career" >
                   <button className=" flex justify-between items-center gap-1 bg-gradient-to-b from-gray-100 to-blue-300 text-black text-xl font-bold mt-10 px-4 py-3 rounded-2xl transition-transform duration-150 active:scale-90 hover:from-violet-500 hover:to-violet-600 transition-colors ">
                    Get Started
                    <ArrowRight size={16} />
                </button>
                </Link>
                
        </section>
        </>
    );
};