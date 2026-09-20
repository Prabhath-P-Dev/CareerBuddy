export interface RoadmapStep{
    title:string;
    description:string;
    skills:string[];
}

export interface CareerRoadmap{
   career:string;
   overview:string;
   steps:RoadmapStep[];
}