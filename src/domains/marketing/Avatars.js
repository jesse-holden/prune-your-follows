import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export function Avatars({ children }) {
  const data = useStaticQuery(graphql`
    query {
      allUserAvatar {
        nodes {
          username
          avatarUrl
        }
      }
    }
  `);

  if (data.allUserAvatar.nodes.length === 0) return null;

  return (
    <>
      {children}
      <div className="flex justify-center -space-x-1 overflow-hidden">
        {data.allUserAvatar.nodes.map((user) => {
          return (
            <img
              key={user.username}
              className="inline-block h-8 w-8 rounded-full bg-blue-200 ring-2 ring-white"
              src={user.avatarUrl}
              alt={user.username}
            />
          );
        })}
      </div>
    </>
  );
}