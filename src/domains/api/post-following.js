import createError from "http-errors";
import { getXataClient } from "../xata";
import { unfollowUser } from "./twitter";

const xata = getXataClient();

export default async function ({ twitterAccessToken, followerId, accountId }) {
  const { data, error } = await unfollowUser({
    accessToken: twitterAccessToken,
    sourceUserId: followerId,
    targetUserId: accountId,
  });

  if (error) {
    throw createError.InternalServerError(error);
  }

  const record = await xata.db.accounts.update({
    id: accountId,
    following: data.following,
  });

  return record;
}
