// Generated by Xata Codegen 0.18.0. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "accounts",
    columns: [
      {
        name: "meta",
        type: "object",
        columns: [
          { name: "created_at", type: "datetime" },
          { name: "location", type: "string" },
          { name: "description", type: "text" },
          { name: "profile_image_url", type: "string" },
          { name: "url", type: "string" },
        ],
      },
      { name: "name", type: "string" },
      { name: "username", type: "string" },
      {
        name: "public_metrics",
        type: "object",
        columns: [
          { name: "followers_count", type: "int" },
          { name: "following_count", type: "int" },
          { name: "tweet_count", type: "int" },
          { name: "listed_count", type: "int" },
        ],
      },
      {
        name: "calculated_metrics",
        type: "object",
        columns: [
          { name: "average_tweets_per_year", type: "int" },
          { name: "years_on_twitter", type: "int" },
        ],
      },
      { name: "followed_by", type: "string" },
      { name: "timestamp", type: "datetime" },
      { name: "unfollowed", type: "datetime" },
      { name: "hidden", type: "datetime" },
    ],
  },
  {
    name: "user_meta",
    columns: [
      { name: "last", type: "datetime" },
      { name: "next", type: "datetime" },
    ],
  },
];
/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:
    "https://Queen-Raae-Workspace-edpk3k.xata.sh/db/Prune-your-Follows",
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};