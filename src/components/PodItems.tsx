import { filterPodsAtom } from "@/atoms";
import { Pod } from "@/types";
import { useAtomValue } from "jotai";
import React from "react";
import PodItem from "./PodItem";

type Props = {
  pods: Pod[];
};

const PodItems = ({ pods }: Props) => {
  const filterPods = useAtomValue(filterPodsAtom);

  const filteredPods = pods.filter((pod) => {
    return pod.name.includes(filterPods);
  });

  return (
    <tbody>
      {filteredPods.map((pod) => (
        <PodItem pod={pod} />
      ))}
    </tbody>
  );
};

export default PodItems;
