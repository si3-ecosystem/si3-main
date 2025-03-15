"use client";

import { Button } from "@/components/atoms/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/atoms/dialog";
import Image from "next/image";
import Link from "next/link";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  title: string;
  description: string;
  ctaLink: string;
  ctaTitle: string;
}

export function SuccessDialog({
  open,
  onOpenChange,
  imageSrc,
  title,
  description,
  ctaLink,
  ctaTitle,
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-lg p-6">
        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
          <Image src={imageSrc} alt="Success Icon" width={96} height={96} />
        </div>

        <h2 className="mb-2 text-center text-xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mb-6 text-center text-sm text-gray-600">{description}</p>

        <DialogFooter className="flex justify-center">
          <Button asChild className="mx-auto w-fit" showGradient>
            <Link href={ctaLink}>{ctaTitle}</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
