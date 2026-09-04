export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-gray-100 to-blue-300 text-black">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <h1 className="text-3xl">CareerBuddy</h1>
                </div>
                <p className="text-center text-sm max-w-xl  font-normal leading-relaxed ">
                    Discover your direction .Build your skills. Shape your future.
                </p>
            </div>
            <div className="border-t border-[#4f3f6e]">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a >CareerBuddy</a> ©2026. All rights reserved.
                </div>
            </div>
        </footer>
    );
};