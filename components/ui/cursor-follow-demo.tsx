"use client";

import React from "react";
import CursorFollow from "@/components/ui/cursor-follow";

const images = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    label: "Visualize suas finanças",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    label: "Conecte seus bancos",
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    label: "Receba insights inteligentes",
  },
];

const CursorFollowDemo = () => {
  return (
    <CursorFollow>
      <div className="flex flex-row items-center justify-center gap-8 py-8">
        {images.map((img, i) => (
          <div key={i} className="flex flex-col items-center">
            <img
              src={img.src}
              alt={img.label}
              data-cursor-text={img.label}
              className="h-48 w-48 rounded-xl object-cover transition-transform duration-200 hover:scale-105 border border-[var(--color-neutral-border)]"
              style={{ cursor: "none" }}
            />
          </div>
        ))}
      </div>
    </CursorFollow>
  );
};

export default CursorFollowDemo;

