"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/atoms/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import { CoinGeckoClient } from "coingecko-api-v3";

interface TrendingResponse {
  coins: Array<{
    item: {
      id: string;
      symbol: string;
      name: string;
      market_cap_rank: number;
      thumb: string;
      small: string;
      price_btc: number;
      data: {
        price_change_percentage_24h: {
          usd: number;
        };
      };
    };
  }>;
}

interface CoinData {
  id: string;
  symbol: string;
  price: number;
  change24h: number;
  imageUrl: string;
}

export function TokenValue() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const client = useMemo(
    () =>
      new CoinGeckoClient({
        timeout: 10000,
        autoRetry: true,
      }),
    [],
  );

  const fetchTrendingCoins = useCallback(async () => {
    try {
      setIsLoading(true);
      const trending = (await client.trending()) as unknown as TrendingResponse;

      const topCoins = trending.coins
        .filter((coin) => coin.item.market_cap_rank <= 5) // Get top 5 coins
        .map((coin) => ({
          id: coin.item.id,
          symbol: coin.item.symbol.toUpperCase(),
          price: 0, // Will be updated from simplePrice
          change24h: coin.item.data.price_change_percentage_24h?.usd || 0,
          imageUrl: coin.item.small || "/home/Ellipse.svg",
        }));

      // Get current prices
      const coinIds = topCoins.map((coin) => coin.id).join(",");
      const simplePriceData = await client.simplePrice({
        ids: coinIds,
        vs_currencies: "usd",
        include_24hr_change: true,
      });

      const coinsWithPrices = topCoins.map((coin) => {
        const priceData = simplePriceData[coin.id] || {};
        return {
          ...coin,
          price: priceData.usd || 0,
          change24h: Number(priceData.usd_24h_change) || coin.change24h,
        };
      });

      setCoins(coinsWithPrices);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  useEffect(() => {
    let isMounted = true;
    let refreshInterval: NodeJS.Timeout;

    const fetchData = async () => {
      await fetchTrendingCoins();
      if (isMounted) {
        refreshInterval = setInterval(fetchTrendingCoins, 30000);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [fetchTrendingCoins]);

  // Set up carousel rotation every 3 seconds
  useEffect(() => {
    if (coins.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % coins.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [coins.length]);

  if (isLoading || coins.length === 0) {
    return (
      <Card className="w-[220px] rounded-lg border-none !bg-[#211257] px-3 py-2 max-xl:hidden">
        <div className="h-6 w-full animate-pulse rounded bg-gray-600" />
      </Card>
    );
  }

  const currentCoin = coins[currentIndex];
  const isPositive = currentCoin.change24h >= 0;
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <Card className="w-[180px] overflow-hidden rounded-lg border-none !bg-[#211257] px-3 py-2 max-xl:hidden">
      <CardContent className="flex items-center justify-between gap-2 p-0">
        <div className="flex items-center gap-1">
          <div className="relative h-4 w-4">
            <Image
              src={currentCoin.imageUrl}
              alt={currentCoin.symbol}
              fill
              className="object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/home/Ellipse.svg";
              }}
            />
          </div>
          <span className="text-xs font-medium text-white">
            $
            {currentCoin.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-xs font-medium text-[#848484]">USD</span>
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs ${
            isPositive ? "text-[#00A208]" : "text-[#FF3B30]"
          }`}
        >
          <ChangeIcon className="size-3" />
          {Math.abs(currentCoin.change24h).toFixed(2)}%
        </span>
      </CardContent>
    </Card>
  );
}
