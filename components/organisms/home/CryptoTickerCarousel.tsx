"use client";

import { useEffect, useState } from "react";
import { CoinGeckoClient } from "coingecko-api-v3";
import Image from "next/image";

interface CoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: {
    price: string;
    price_btc: string;
    price_change_percentage_24h: {
      [key: string]: number;
    };
    market_cap: string;
    market_cap_btc: string;
    total_volume: string;
    total_volume_btc: string;
    sparkline: string;
    content: null;
  };
}

interface TrendingResponse {
  coins: Array<{
    item: CoinItem;
  }>;
}

interface SimplePriceResponse {
  [key: string]: {
    usd?: number;
    usd_24h_change?: number;
  };
}

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change24h: string;
  market_cap_rank: number;
  imageUrl: string;
}

export function CryptoTickerCarousel() {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const client = new CoinGeckoClient({
      timeout: 10000,
      autoRetry: true,
    });

    const fetchTrendingCoins = async () => {
      try {
        setIsLoading(true);
        const trending =
          (await client.trending()) as unknown as TrendingResponse;

        const topCoins = trending.coins
          .filter((coin) => coin.item.market_cap_rank <= 8) // Get top 8 coins
          .map((coin) => ({
            id: coin.item.id,
            symbol: coin.item.symbol.toUpperCase(),
            name: coin.item.name,
            price: coin.item.price_btc.toString(), // Will be formatted later
            change24h:
              coin.item.data.price_change_percentage_24h?.usd?.toFixed(2) ||
              "0.00",
            market_cap_rank: coin.item.market_cap_rank,
            imageUrl: coin.item.small || "/home/Ellipse.svg",
          }));

        // Get more detailed price data for the coins
        const coinIds = topCoins.map((coin) => coin.id).join(",");
        const simplePriceData = (await client.simplePrice({
          ids: coinIds,
          vs_currencies: "usd",
          include_24hr_change: true,
        })) as unknown as SimplePriceResponse;

        // Merge the data
        const coinsWithPrices = topCoins.map((coin) => {
          const priceData = simplePriceData[coin.id] || {};
          return {
            ...coin,
            price: `$${
              priceData.usd?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) || "0.00"
            }`,
            change24h: priceData.usd_24h_change?.toFixed(2) || coin.change24h,
          };
        });

        setCoins(coinsWithPrices);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchTrendingCoins();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchTrendingCoins, 30000);

    return () => clearInterval(interval);
  }, []);

  const renderCoinItem = (coin: CoinData, key: string) => {
    const isPositive = parseFloat(coin.change24h) >= 0;

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
          className={`flex items-center gap-1 text-xs ${
            isPositive ? "text-[#00A208]" : "text-[#FF3B30]"
          }`}
        >
          {isPositive ? "↑" : "↓"}{" "}
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
        Loading trending crypto prices...
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
        {/* Duplicate items for seamless looping */}
        {coins.map((coin) => renderCoinItem(coin, `duplicate-${coin.id}`))}
      </div>
    </div>
  );
}
