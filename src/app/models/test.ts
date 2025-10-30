import { Question } from "./Question";
import { TestType } from "./testType";

export interface Test {
    id: string; 
    title :string;
    description : string;
    type : TestType;
    dure : Number;
    questions : Question[];
    
}