/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore

"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, MinusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/atoms/card";
import Image from "next/image";

interface CoinConfig {
  key: string;
  slug: string;
  symbol: string;
}

const COIN_CONFIG_LIST: CoinConfig[] = [
  { key: "up", slug: "unistake", symbol: "UP" },
  { key: "lpt", slug: "livepeer", symbol: "LPT" },
  { key: "arb", slug: "arbitrum", symbol: "ARB" },
  { key: "eth", slug: "ethereum", symbol: "ETH" },
  { key: "edu", slug: "open-campus", symbol: "EDU" },
];

const COIN_GECKO_IDS = COIN_CONFIG_LIST.map((coin) => coin.slug);
const CYCLE_INTERVAL_MS = 15000;
const API_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export function TokenValue() {
  const [cryptoDataList, setCryptoDataList] = useState([]);
  const [currentCoinIndex, setCurrentCoinIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const fetchData = async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setLoading(true);
      setError(null);
    }

    const idsString = COIN_GECKO_IDS.join(",");
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsString}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

    try {
      if (!idsString) {
        setError("No coins configured to fetch.");
        if (isInitialLoad) setLoading(false);
        return;
      }

      console.log(`Attempting to fetch data from: ${apiUrl}`);
      const response = await fetch(apiUrl, {
        cache: "no-cache",
        mode: "cors",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        let errorDetails =
          "Could not retrieve error details from API response.";
        try {
          const errorData = await response.json();
          errorDetails =
            errorData.error ||
            (typeof errorData === "string"
              ? errorData
              : JSON.stringify(errorData));
        } catch (jsonError) {
          console.error("Failed to parse error JSON from API:", jsonError);
          errorDetails = await response
            .text()
            .catch(() => "Could not get raw text error response.");
        }
        throw new Error(
          `API Error: ${response.status} ${response.statusText}. Details: ${errorDetails}`,
        );
      }
      const data = await response.json();

      const orderedData = COIN_GECKO_IDS.map((id) =>
        data.find((coin) => coin.id === id),
      ).filter(Boolean);

      if (orderedData.length > 0) {
        // @ts-ignore
        setCryptoDataList(orderedData);
        setError(null);
      } else if (COIN_GECKO_IDS.length > 0) {
        const message =
          "No data returned from API for the selected coins. Please check the coin IDs or API status.";
        setError(message);
        setCryptoDataList([]);
      }
    } catch (err) {
      let errorMessage =
        "An unexpected error occurred while fetching cryptocurrency data.";
      if (
        err instanceof TypeError &&
        err.message.toLowerCase().includes("failed to fetch")
      ) {
        errorMessage = `Failed to fetch data from CoinGecko API. Please check your internet connection and ensure the URL (${apiUrl}) is accessible directly in your browser. The API might be temporarily unavailable or blocking requests.`;
      } else if (err instanceof Error) {
        if (err.message.startsWith("API Error:")) {
          errorMessage = err.message;
        } else {
          errorMessage = `An error occurred: ${err.message}`;
        }
      } else {
        errorMessage =
          "An unexpected error occurred while fetching cryptocurrency data. Check console for details.";
      }
      console.error(
        "Fetch error details:",
        (err as Error).message,
        "\nStack:",
        (err as Error).stack,
        "\nCause:",
        (err as Error).cause,
      );
      console.error(`Failed URL: ${apiUrl}`);
      setError(errorMessage);
    } finally {
      if (isInitialLoad) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData(true);
    const interval = setInterval(
      () => fetchData(false),
      API_REFRESH_INTERVAL_MS,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cryptoDataList.length === 0) return;

    const cycleTimer = setInterval(() => {
      setCurrentCoinIndex(
        (prevIndex) => (prevIndex + 1) % cryptoDataList.length,
      );
      setAnimationKey((prevKey) => prevKey + 1);
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(cycleTimer);
  }, [cryptoDataList]);

  const currentCoin =
    cryptoDataList.length > 0 ? cryptoDataList[currentCoinIndex] : null;

  return (
    <>
      <div className="flex h-[60px] items-center justify-center">
        {loading && !currentCoin && !error ? (
          <>{"..."}</>
        ) : currentCoin ? (
          <div key={animationKey} className="animate-in fade-in duration-500">
            <CryptoCard crypto={currentCoin} />
          </div>
        ) : null}
      </div>
    </>
  );
}

const CryptoCard = ({ crypto }) => {
  const priceChange = crypto.price_change_percentage_24h ?? 0;
  const isPositive = priceChange > 0;
  const isNegative = priceChange < 0;

  let ChangeIcon = MinusCircle;
  if (isPositive) ChangeIcon = ArrowUpRight;
  if (isNegative) ChangeIcon = ArrowDownRight;

  // Fix the image URL - prepend https: if it starts with //
  const imageUrl = crypto.image?.startsWith("//")
    ? `https:${crypto.image}`
    : crypto.image || "/home/Ellipse.svg";

  return (
    <Card className="w-[180px] overflow-hidden rounded-lg border-none !bg-[#211257] px-3 py-2 max-xl:hidden">
      <CardContent className="flex items-center justify-between gap-2 p-0">
        <div className="flex items-center gap-1">
          <div className="relative h-4 w-4">
            <Image
              src={imageUrl}
              alt={crypto.symbol?.toUpperCase() || "crypto"}
              width={16}
              height={16}
              className="rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/home/Ellipse.svg";
              }}
              unoptimized={imageUrl.endsWith(".gif")}
            />
          </div>
          <span className="text-xs font-medium text-white">
            $
            {crypto.current_price?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-xs font-medium text-[#848484]">USD</span>
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-medium ${
            isPositive ? "text-[#00A208]" : "text-[#FF3B30]"
          }`}
        >
          <ChangeIcon className="h-3 w-3" />
          {Math.abs(priceChange).toFixed(2)}%
        </span>
      </CardContent>
    </Card>
  );
};
