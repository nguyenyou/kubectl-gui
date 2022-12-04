import { currentContextAtom, filterPodsAtom } from "@/atoms";
import PodItem from "@/components/PodItem";
import PodItems from "@/components/PodItems";
import { Pod } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Command } from "@tauri-apps/api/shell";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect } from "react";

async function getPodsInfo() {
  const { stdout } = await new Command("kubectl-get-pods", ["get", "pods"]).execute();
  return stdout;
}

async function getCurrentContext() {
  const { stdout } = await new Command("kubectl-config-current-context", ["config", "current-context"]).execute();
  return stdout;
}

function App() {
  const [filterPods, setFilterPods] = useAtom(filterPodsAtom);
  const [currentContext, setCurrentContext] = useAtom(currentContextAtom);
  const query = useQuery({
    queryKey: ["pods"],
    queryFn: getPodsInfo,
    refetchInterval: 2000,
  });

  useEffect(() => {
    getCurrentContext().then((context) => {
      setCurrentContext(context);
    });
  }, [])

  if (query.isLoading) {
    return <div className="p-3">Loading...</div>;
  }
  if (query.isError) {
    return <div className="p-3">Error</div>;
  }

  const pods: Pod[] = [];
  const lines = query.data.split("\n");

  lines.forEach((line) => {
    const columns = line.split(/\s+/);
    if (columns.length === 5) {
      const pod: Pod = {
        name: columns[0],
        ready: columns[1],
        status: columns[2],
        restarts: columns[3],
        age: columns[4],
      };
      pods.push(pod);
    }
  });

  const headers = pods[0];
  const rows = pods.slice(1);

  return (
    <div className="bg-neutral-800 text-neutral-300 p-3">
      <div>Current context: {currentContext}</div>
      <div className="flex items-center justify-between mt-2">
        <input
          value={filterPods}
          onChange={(e) => setFilterPods(e.target.value)}
          className="border rounded px-2 py-1 text-neutral-600"
          placeholder="filter"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
        />
        <div>Total: {lines.length} pods</div>
      </div>
      <div className="mt-2">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left px-2 border-b py-1">{headers.name}</th>
              <th className="text-left px-2 border-b py-1">{headers.ready}</th>
              <th className="text-left px-2 border-b py-1">{headers.status}</th>
              <th className="text-left px-2 border-b py-1">
                {headers.restarts}
              </th>
              <th className="text-left px-2 border-b py-1">{headers.age}</th>
            </tr>
          </thead>
          <PodItems pods={rows} />
        </table>
      </div>
    </div>
  );
}

export default App;
