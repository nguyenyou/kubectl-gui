import { Pod } from "@/types";
import React from "react";
import clsx from "clsx";
import Link from 'next/link'

type Props = {
  pod: Pod;
};

const PodItem = ({ pod }: Props) => {
  return (
    <tr key={pod.name}>
      <td className="text-left px-2 border-b border-primary-500 py-1">
        <Link href={`/${pod.name}`}>
          <a className="text-blue-600">{pod.name}</a>
        </Link>
      </td>
      <td className={clsx("text-left px-2 border-b border-primary-500 py-1")}>{pod.ready}</td>
      <td
        className={clsx(
          "text-left px-2 border-b border-primary-500 py-1",
          pod.status.toLowerCase() === "running"
            ? "text-green-600"
            : "text-red-600"
        )}
      >
        {pod.status}
      </td>
      <td className="text-left px-2 border-b border-primary-500 py-1">{pod.restarts}</td>
      <td className="text-left px-2 border-b border-primary-500 py-1">{pod.age}</td>
    </tr>
  );
};

export default PodItem;
