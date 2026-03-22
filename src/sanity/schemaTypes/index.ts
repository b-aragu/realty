import { type SchemaTypeDefinition } from "sanity";
import { property } from "./property";
import { project } from "./project";
import { article } from "./article";
import { location } from "./location";
import { agent } from "./agent";
import { stay } from "./stay";
import { siteSettings } from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [property, project, article, location, agent, stay, siteSettings],
};
