import { setupWorker } from "msw/browser";
import { handlers } from "./handler";

type Worker = {
  mockedApis: string[];
};

export const worker = ({ mockedApis }: Worker) => {
  return setupWorker(...handlers(mockedApis));
};
