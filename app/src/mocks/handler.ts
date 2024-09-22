import { mockModules } from "./modules";

type HandlersToRegister = string[];

export function handlers(mockApis: HandlersToRegister) {
  return mockModules
    .filter((module) => {
      return mockApis.includes(module.name);
    })
    .map((module) => {
      return module.handler;
    });
}
