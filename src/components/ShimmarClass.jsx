import React from "react";

const ShimmarClass = () => {
  const shimmerCards = [];
  for (let i = 0; i < 6; i++) {
    shimmerCards.push(
      <div
        key={i}
        className="animate-pulse p-4 border border-purple-900 rounded-xl shadow-sm space-y-4 bg-violet-900 mt-2"
      >
        <div className="h-32 w-full rounded-md bg-purple-700" />
        <div className="h-4 rounded-md bg-purple-700 w-3/4" />
        <div className="h-4 rounded-md bg-purple-700 w-1/2" />
        <div className="h-4 rounded-md bg-purple-700 w-2/3" />
      </div>
    );
  }
  return (
    <div className="grid gap-6 px-2 grid-cols-1 md:grid-cols-2">
      {shimmerCards}
    </div>
  );
};

export default ShimmarClass;
