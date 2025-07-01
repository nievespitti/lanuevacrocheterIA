"use client";

import { useState, useEffect } from "react";

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="py-6 px-4 md:px-8 mt-auto border-t border-border/50 bg-card">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {year} La CrocheterIA. info@lacrocheteria.com</p>
      </div>
    </footer>
  );
}
