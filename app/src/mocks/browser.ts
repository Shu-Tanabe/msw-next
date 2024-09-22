import { setupWorker } from "msw/browser";
import { handlers } from "./handler";

type Worker = {
  mockApis: string[];
};

export function worker({ mockApis }: Worker) {
  return setupWorker(...handlers(mockApis));
}
