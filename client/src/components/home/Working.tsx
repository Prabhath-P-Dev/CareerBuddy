export default function Working(){
    return(
        <section className="mt-10 p-8">
            <div className="flex flex-wrap gap-1.5 justify-between items-center">
                <div className="w-96 h-40 bg-gradient-to-b from-gray-100 to-blue-300 flex flex-col  items-center p-7">
                    <h2 className="text-2xl mb-4">Share your skills </h2>
                    <p>Tell us about your skills,interests,and career goals.</p>
                </div>
                <div className="w-96 h-40 bg-gradient-to-b from-gray-100 to-blue-300  flex flex-col items-center p-7">
                    <h2 className="text-2xl mb-4" >Get your Roadmap</h2>
                    <p>Get a personailzed path showing what you should learn and in what order.</p>
              </div>
                <div className="w-96 h-40 bg-gradient-to-b from-gray-100 to-blue-300 flex flex-col items-center p-7" >
                    <h2 className="text-2xl mb-4">Statr your journey</h2>
                    <p>Follow your roadmap,build projects,and develop the skills you need.</p>
                </div>
            </div>
        </section>
    )
}