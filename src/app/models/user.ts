import { Education } from 'src/app/models/Education';
import { Notifcation } from './Notification';
import { Skill } from './Skill';
import { Language } from './language';
import { Experience } from './Experience';
import { Course } from './course';
export interface User {
    id? : number;
    firstname :string;
    lastname : string;
    username : string;
    password : string;
    phone: string; 
    age? : number;
    city? : string;
    speciality? : string;
    education? : string;
    sexe? : string;
    avatar? : string;
    notifications? : Notifcation[];
    skills? : Skill[];
    languages? : Language[];
    experiences : Experience[];
    educations : Education[];
    courses : Course[];
    experience : number;
}
