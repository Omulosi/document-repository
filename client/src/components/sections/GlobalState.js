import React, { useEffect } from "react";
import userStore from "stores/userStore";
import homeStore from "stores/homeStore";

export default function GlobalState({ children }) {
  const current = userStore((state) => state.current);
  const inc = homeStore((state) => state.increment);

  useEffect(() => {
    if (current) {
    }
  }, [current, inc]);

  return <>{children}</>;
}
