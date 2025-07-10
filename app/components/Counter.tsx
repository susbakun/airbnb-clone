"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

function Counter({ name }: { name: string }) {
  const [amount, setAmount] = useState(0);

  const increase = () => {
    setAmount((prev) => prev + 1);
  };

  const decrease = () => {
    if (amount === 0) return;
    setAmount((prev) => prev - 1);
  };

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={amount} />
      <Button variant="outline" size="icon" type="button" onClick={decrease}>
        <Minus className="h-4 w-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{amount}</p>
      <Button variant="outline" size="icon" type="button" onClick={increase}>
        <Plus className="w-4 h-4 text-primary" />
      </Button>
    </div>
  );
}

export default Counter;
