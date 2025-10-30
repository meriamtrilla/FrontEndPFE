import { Candidature } from './candidature';
import { Category } from './category';
import { Interview } from './Interview';
import { Test } from './test';

export class Offer {
  id!: Number;
  title!: String;
  description!: String;
  interview?: Interview;
  test?: Test;
  category?: Category;
  number_post!: Number;
  type_contract!: String; // Stage , CDD , CDI, CVP
  type_employment!: String; // Presentielle , en ligne , hypride
  experience!: Number;
  skills!: String;
  keywords!: String;
  status!: boolean;
  candidatures? : Candidature[];
}
