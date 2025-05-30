"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/atoms/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import { CoinGeckoClient } from "coingecko-api-v3";

type CryptoTickerProps = {
  coinId?: string;
  vsCurrency?: string;
  showChange?: boolean;
};

export function TokenValue({
  coinId = "ethereum",
  vsCurrency = "usd",
  showChange = true,
}: CryptoTickerProps) {
  const [price, setPrice] = useState<string>("0");
  const [change24h, setChange24h] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("/home/Ellipse.svg");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const client = new CoinGeckoClient({
      timeout: 10000,
      autoRetry: true,
    });

    const fetchPriceAndImage = async () => {
      try {
        setIsLoading(true);
        // Fetch coin data including price, 24h change, and image
        const data = await client.coinId({
          id: coinId,
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        });

        if (data.market_data) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setPrice(data.market_data.current_price[vsCurrency].toFixed(2));
          setChange24h(data.market_data.price_change_percentage_24h || 0);
          setImageUrl(data.image?.thumb || "/home/Ellipse.svg");
        }
      } catch (error) {
        console.error("Error fetching token data:", error);
        setImageUrl("/home/Ellipse.svg");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceAndImage();
    const interval = setInterval(fetchPriceAndImage, 60000);

    return () => clearInterval(interval);
  }, [coinId, vsCurrency]);

  if (isLoading) {
    return (
      <Card className="rounded-lg border-none !bg-[#211257] px-3 py-2 max-xl:hidden">
        <div className="h-6 w-24 animate-pulse rounded bg-gray-600" />
      </Card>
    );
  }

  const isPositive = change24h >= 0;
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;

  return (
    <Card className="rounded-lg border-none !bg-[#211257] px-3 py-2 max-xl:hidden">
      <CardContent className="flex items-center gap-2 p-0">
        <div className="flex items-center gap-1">
          <Image
            src={imageUrl}
            alt={coinId}
            width={20}
            height={20}
            className="h-4 w-4 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/home/Ellipse.svg";
            }}
          />
          <span className="text-xs font-medium text-white">{price}</span>
          <span className="text-xs font-medium text-[#848484]">
            {vsCurrency.toUpperCase()}
          </span>
        </div>
        {showChange && (
          <span
            className={`flex items-center gap-1 text-xs ${
              isPositive ? "text-[#00A208]" : "text-[#FF3B30]"
            }`}
          >
            <ChangeIcon className="size-3" /> {Math.abs(change24h).toFixed(2)}%
          </span>
        )}
      </CardContent>
    </Card>
  );
}
