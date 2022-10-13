import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";

export function AccountCard({ sx, ...rest }) {
  const { username, name, description, profile_image_url } = rest;
  const { followers_count = "YYY", following_count = "ZZZ" } = rest;
  const { average_tweets_per_year = "Z", age = "X" } = rest;
  const isPlaceholder = !username;

  return (
    <div className="flex-space relative flex h-full flex-col  rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div className="flex space-x-3 px-4 pt-5">
        {!isPlaceholder && (
          <ExternalLinkIcon className="absolute top-3 right-3 h-6 w-6 text-gray-500" />
        )}
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full border"
            src={profile_image_url}
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <a
            href={`https://twitter.com/${username}`}
            className="focus:outline-none"
            target="_blank"
            rel="noreferrer"
          >
            {/* Makes the while  box clickable */}
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium leading-5 text-gray-900">
              {name}
            </p>
            <p className="truncate text-sm leading-5 text-gray-500">
              {isPlaceholder ? <>&nbsp;</> : `@${username}`}
            </p>
          </a>
        </div>
      </div>

      <p className="px-5 py-4 text-sm leading-5 text-gray-900">{description}</p>

      <div className="mt-auto flex justify-between space-x-3 rounded-b-lg border-t bg-slate-100 py-3 px-4">
        <p className="text-xs leading-5 text-gray-500">
          <strong>{followers_count}</strong> Followers
          <br />
          <strong>{following_count}</strong> Following
        </p>
        <p className="text-right text-xs leading-5 text-gray-500">
          Joined <strong>{age}</strong> years ago
          <br />
          Average <strong>{average_tweets_per_year}</strong> tweets per year
        </p>
      </div>
    </div>
  );
}