import { mockModules } from "./modules";

type HandlersToRegister = string[];

export const handlers = (mockedApis: HandlersToRegister) => {
  return mockModules
    .filter((module) => {
      return mockedApis.includes(module.name);
    })
    .map((module) => {
      return module.handler;
    });
};
