import { roadmap } from "../data/roadmap"
export default function Roadmap(){
    return(
        <>
         <div className="flex flex-col justify-between items-center">
            <h1 className="mb-6">{roadmap.career}</h1>
            {roadmap.skills.map((skill,index)=>(
              <div key={skill} className="flex flex-col justify-between items-center mt-4 w-24 h-20 ">
                <div>{skill}</div>
                {index<roadmap.skills.length-1 &&(
                  <div>|</div>
                )}
                
              </div>
            ))}
         </div>
        </>


    )
}