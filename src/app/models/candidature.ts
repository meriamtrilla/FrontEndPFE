import { Offer } from "./offer";
import { User } from "./user";

export interface Candidature {
    id: Number;
     user_id : Number;
        offre_id : Number;
     letter : string;
     offer? :Offer;
     user? :User;
     dateCandidature : String;
     status : String;
     cv : String;
  }
  