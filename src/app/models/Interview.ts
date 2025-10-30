import { Question } from "./Question";

export interface Interview {
    id: string; 
    title :string;
    description : string;
    questions :Question[];
   
}