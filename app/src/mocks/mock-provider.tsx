"use client";

import { useEffect, useState } from "react";

// ブラウザで実行している場合は、ワーカーを開始
const mockingEnabledPromise = () =>
  typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) {
              return;
            }
            print.warning();
          },
        });
      })
    : Promise.resolve();

export const MSWProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MSWProviderWrapper>{children}</MSWProviderWrapper>;
};

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    mockingEnabledPromise().then(() => {
      setIsReady(true); // ワーカーの準備が完了したらフラグを立てる
    });
  }, []);

  if (!isReady) {
    return null; // ワーカーが準備できていない間は何も表示しない
  }
  return children;
}
