import { Pod } from "@/types";
import React from "react";
import clsx from "clsx";

type Props = {
  pod: Pod;
};

const PodItem = ({ pod }: Props) => {
  return (
    <tr key={pod.name}>
      <td className="text-left px-2 border-b py-1">{pod.name}</td>
      <td className={clsx("text-left px-2 border-b py-1")}>{pod.ready}</td>
      <td
        className={clsx(
          "text-left px-2 border-b py-1",
          pod.status.toLowerCase() === "running"
            ? "text-green-600"
            : "text-red-600"
        )}
      >
        {pod.status}
      </td>
      <td className="text-left px-2 border-b py-1">{pod.restarts}</td>
      <td className="text-left px-2 border-b py-1">{pod.age}</td>
    </tr>
  );
};

export default PodItem;
