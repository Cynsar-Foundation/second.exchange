import Pino from "pino";

export const logger = Pino({
  name: "app-name",
  level: "debug",
});
