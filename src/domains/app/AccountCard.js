import React from "react";
import parse from "html-react-parser";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import axios from "axios";

const display = (...props) => {
  const theString = props
    .filter((item) => item !== undefined)
    .map((item) => "" + item)
    .reduce((acc, item) => {
      return acc || item;
    }, "");

  return theString ? parse(theString) : "";
};

export function AccountCard({ sx, highlight, ...account }) {
  const twitterUrl = account.username
    ? `https://twitter.com/${account.username}`
    : "";
  const avatarImageUrl = account.meta?.profile_image_url;
  const avatarImageAlt = `${account.username} Avatar Image`;

  const displayUsername = display(highlight?.username?.[0], account.username);
  const displayName = display(highlight?.name?.[0], account.name);
  const displayLocation = display(
    highlight?.meta?.location?.[0],
    account.meta?.location
  );
  const displayDescription = display(
    highlight?.meta?.description?.[0],
    account.meta?.description
  );

  const displayFollowingCount = display(
    account.public_metrics?.following_count,
    "YYYY"
  );
  const displayFollowerCount = display(
    account.public_metrics?.followers_count,
    "XXXX"
  );

  const displayYearsOnTwitter = display(
    account.calculated_metrics?.years_on_twitter,
    "Y"
  );
  const displayAverageTweetsPerYear = display(
    account.calculated_metrics?.average_tweets_per_year,
    "X"
  );

  const handleUnfollow = async (event) => {
    try {
      const unfollowed = await axios.post("/api/following", {
        accountId: account.id,
      });
      console.log({ unfollowed });
    } catch (error) {
      console.log(error, account.id);
    }
  };

  return (
    <div className="flex-space relative flex h-full flex-col rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div className="flex px-4 pt-5">
        {twitterUrl && (
          <ExternalLinkIcon className="absolute top-3 right-3 h-6 w-6 text-gray-500" />
        )}
        <div className="flex-shrink-0">
          {avatarImageUrl ? (
            <img
              className="h-10 w-10 rounded-full border"
              src={avatarImageUrl}
              alt={avatarImageAlt}
            />
          ) : (
            <div className="h-10 w-10 rounded-full border" />
          )}
        </div>
        <div className="pl-3 pr-5">
          {/* Makes the whole box clickable */}
          <p className="text-sm font-medium leading-5 text-gray-900">
            <a
              href={twitterUrl}
              className="focus:outline-none"
              target="_blank"
              rel="noreferrer"
            >
              {displayName ? <>{displayName}</> : <>&nbsp;</>}
            </a>
          </p>
          <p className="truncate text-sm leading-5 text-gray-500">
            {displayUsername && <>@{displayUsername}</>}
            {displayLocation && <> - {displayLocation}</>}
          </p>
        </div>
      </div>

      <p className="px-5 py-4 text-sm leading-5 text-gray-900">
        {displayDescription}
      </p>

      <div className="mt-auto flex justify-between space-x-3 rounded-b-lg border-t bg-slate-100 py-3 px-4">
        <p className="text-xs leading-5 text-gray-500">
          <strong>{displayFollowerCount}</strong> Followers
          <br />
          <strong>{displayFollowingCount}</strong> Following
        </p>
        <p className="text-right text-xs leading-5 text-gray-500">
          Joined <strong>{displayYearsOnTwitter}</strong> years ago
          <br />
          Average <strong>{displayAverageTweetsPerYear}</strong> tweets per year
        </p>
      </div>

      <button onClick={handleUnfollow}>Unfollow</button>
    </div>
  );
}
