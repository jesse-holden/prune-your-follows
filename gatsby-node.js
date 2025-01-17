const { getXataClient } = require("./xata");
const { Client } = require("twitter-api-sdk");

const createUserAvatarNodes = async (gatsbyUtils) => {
  // 1. Get the list of user from Xata ✅
  // 2. Get info about from Twitter ✅
  // 3. Create Gatsby Data Node ✅
  // 4. Gatsby Plugin Remote Image ✅

  const { actions, createNodeId, createContentDigest, reporter } = gatsbyUtils;
  const { createNode } = actions;

  const xata = getXataClient();

  const records = await xata.db.meta.getAll();

  const twitterClient = new Client(process.env.TWITTER_BEARER_TOKEN);

  for (const record of records) {
    const { data: account } = await twitterClient.users.findUserById(
      record.id,
      {
        "user.fields": ["profile_image_url"],
      }
    );

    createNode({
      id: createNodeId(account.username),
      avatarUrl: account.profile_image_url,
      username: account.username,
      internal: {
        type: "UserAvatar",
        contentDigest: createContentDigest(account),
      },
    });
  }
};

exports.sourceNodes = async (gatsbyUtils) => {
  const { reporter } = gatsbyUtils;

  reporter.verbose("Sourcing user avatars - START");
  await createUserAvatarNodes(gatsbyUtils);
  reporter.verbose("Sourcing user avatars - DONE");
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type UserAvatar implements Node {
      username: String!
      avatarUrl: String!
    }
  `;
  createTypes(typeDefs);
};
