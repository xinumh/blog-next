import { PostType } from "@/types/post";
import Link from "next/link";
import React from "react";
import { tagColorMap } from "./PostHeader";
import clsx from "clsx";

type Props = {
  tag: PostType["tags"][0];
  className?: string;
};

const PostTag = ({ tag, className = "px-3 py-1" }: Props) => {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag.name)}`}
      className={clsx(`text-sm rounded ${tagColorMap[tag.color]}`, className)}
    >
      {tag.name}
    </Link>
  );
};

export default PostTag;
