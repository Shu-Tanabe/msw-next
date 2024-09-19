import { filmsQueryhandler } from "./modules/films";
import { peopleQueryhandler } from "./modules/people";

export const handlers = [peopleQueryhandler, filmsQueryhandler];
