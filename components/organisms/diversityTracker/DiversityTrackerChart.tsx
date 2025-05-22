"use client";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

type ChartItem = {
  label: string;
  percent: number;
};

type DiversitySummary = {
  totalResponses: number;
  selfIdentity: ChartItem[];
  ageRange: ChartItem[];
  sexualOrientation: ChartItem[];
  inclusivityScore: string;
  averageRating: string;
  message?: string;
};

const colorMap = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-cyan-400",
  "bg-pink-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-red-400",
];

function BarGroup({ items }: { items: ChartItem[] }) {
  if (!items) return;
  return (
    <div className="flex h-6 overflow-hidden rounded bg-gray-200 shadow">
      {items?.map((item, idx) =>
        item.percent > 0 ? (
          <div
            key={item.label}
            className={`${colorMap[idx % colorMap.length]} h-full`}
            style={{ width: `${item.percent}%` }}
            title={`${item.label}: ${item.percent}%`}
          />
        ) : null,
      )}
    </div>
  );
}

function Legend({ items }: { items: ChartItem[] }) {
  if (!items) return;
  return (
    <div className="mt-2 flex flex-wrap gap-4 text-xs">
      {items?.map((item, idx) => (
        <div key={item.label} className="flex items-center gap-1">
          <span
            className={`inline-block h-3 w-3 rounded ${
              colorMap[idx % colorMap.length]
            }`}
          ></span>
          <span>
            {item.label}: {item.percent}%
          </span>
        </div>
      ))}
    </div>
  );
}

export function DiversityTrackerChart() {
  const { data, isLoading } = useQuery<DiversitySummary>({
    queryKey: ["diversityTrackerSummary"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/diversity-tracker/summary`,
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading || !data) return <div>Loading chart...</div>;
  if (data.totalResponses === 0) return <div>No responses yet.</div>;

  return (
    <div className="mx-auto flex w-full flex-col gap-8 rounded-lg bg-white py-6">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">Total Responses</span>
        <span className="text-2xl font-bold">{data.totalResponses}</span>
      </div>

      <div>
        <div className="mb-1 font-semibold">Self Identity</div>
        <div className="flex flex-col gap-4">
          <Legend items={data.selfIdentity} />
          <BarGroup items={data.selfIdentity} />
        </div>
      </div>

      <div>
        <div className="mb-1 font-semibold">Age Range</div>
        <div className="flex flex-col gap-4">
          <Legend items={data.ageRange} />
          <BarGroup items={data.ageRange} />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-1 font-semibold">Sexual Orientation</div>
        <div className="flex flex-col gap-4">
          <Legend items={data.sexualOrientation} />
          <BarGroup items={data.sexualOrientation} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div>
          <span className="font-semibold">Inclusivity Score (1–10): </span>
          {data.inclusivityScore}
        </div>
        <div>
          <span className="font-semibold">Average Rating: </span>
          {data.averageRating}
        </div>
      </div>
    </div>
  );
}
