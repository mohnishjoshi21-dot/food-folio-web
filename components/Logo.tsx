"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function Logo() {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    const newCount = clicks + 1;
    setClicks(newCount);

    // Reset timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setClicks(0);
    }, 1500); // 1.5 sec window

    if (newCount === 3) {
      router.push("/admin");
      setClicks(0);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer select-none"
      title="FoodFolio"
    >
      <span className="text-lg font-semibold">
        Food<span className="text-emerald-600">Folio</span>
      </span>
    </div>
  );
}