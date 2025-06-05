/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, MinusCircle } from "lucide-react";
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
const API_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

interface CoinData {
  id: string;
  symbol: string;
  price: string;
  change24h: string;
  imageUrl: string;
}

export function CryptoTickerCarousel() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setIsLoading(true);
      setError(null);
    }

    const idsString = COIN_GECKO_IDS.join(",");
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsString}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

    try {
      if (!idsString) {
        setError("No coins configured to fetch.");
        if (isInitialLoad) setIsLoading(false);
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
        const formattedCoins: CoinData[] = orderedData.map((coin, index) => ({
          id: coin.id,
          symbol: COIN_CONFIG_LIST[index].symbol,
          price: `$${
            coin.current_price?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }) || "0.00"
          }`,
          change24h: (coin.price_change_percentage_24h ?? 0).toFixed(2),
          imageUrl: coin.image?.startsWith("//")
            ? `https:${coin.image}`
            : coin.image || "/home/Ellipse.svg",
        }));
        setCoins(formattedCoins);
        setError(null);
      } else if (COIN_GECKO_IDS.length > 0) {
        const message =
          "No data returned from API for the selected coins. Please check the coin IDs or API status.";
        setError(message);
        setCoins([]);
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
        errorMessage = err.message.startsWith("API Error:")
          ? err.message
          : `An error occurred: ${err.message}`;
      } else {
        errorMessage =
          "An unexpected error occurred while fetching cryptocurrency data. Check console for details.";
      }
      console.error(
        "Fetch error details:",
        err.message,
        "\nStack:",
        err.stack,
        "\nCause:",
        err.cause,
      );
      console.error(`Failed URL: ${apiUrl}`);
      setError(errorMessage);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
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

  const renderCoinItem = (coin: CoinData, key: string) => {
    const isPositive = parseFloat(coin.change24h) >= 0;
    const isNegative = parseFloat(coin.change24h) < 0;

    let ChangeIcon = MinusCircle;
    if (isPositive) ChangeIcon = ArrowUpRight;
    if (isNegative) ChangeIcon = ArrowDownRight;

    return (
      <div
        key={key}
        className="inline-flex items-center gap-2 rounded-lg border-none px-4 py-1"
      >
        <div className="flex items-center gap-1">
          <div className="relative h-4 w-4">
            <Image
              src={coin.imageUrl}
              alt={coin.symbol}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/home/Ellipse.svg";
              }}
              unoptimized={process.env.NODE_ENV !== "production"}
            />
          </div>
          <span className="text-xs font-medium text-white">{coin.price}</span>
          <span className="text-xs font-medium text-[#848484]">USD</span>
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-medium ${
            isPositive ? "text-[#00A208]" : "text-[#FF3B30]"
          }`}
        >
          <ChangeIcon className="h-3 w-3" />
          {Math.abs(parseFloat(coin.change24h)).toFixed(2)}%
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div
        className="w-full !bg-[#211257] py-2 text-center text-white"
        style={{
          boxShadow: "0px 0px 9.2px 0px #9F44D3",
        }}
      >
        Loading crypto prices...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="w-full !bg-[#211257] py-2 text-center text-red-500"
        style={{
          boxShadow: "0px 0px 9.2px 0px #9F44D3",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden !bg-[#211257] py-2"
      style={{
        boxShadow: "0px 0px 9.2px 0px #9F44D3",
      }}
    >
      <div className="animate-scroll flex items-center gap-4 px-4 whitespace-nowrap">
        {coins.map((coin) => renderCoinItem(coin, coin.id))}
        {coins.map((coin) => renderCoinItem(coin, `duplicate-${coin.id}`))}
      </div>
    </div>
  );
}
