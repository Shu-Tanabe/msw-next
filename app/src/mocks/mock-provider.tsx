"use client";

import { useEffect, useState } from "react";

// ブラウザで実行している場合は、ワーカーを開始
const mockingEnabledPromise = (mockedApis: string[]) =>
  typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        await worker({
          mockedApis,
        }).start({
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
  mockedApis,
}: Readonly<{
  children: React.ReactNode;
  mockedApis: string[];
}>) => {
  return (
    <MSWProviderWrapper mockedApis={mockedApis}>{children}</MSWProviderWrapper>
  );
};

function MSWProviderWrapper({
  children,
  mockedApis,
}: Readonly<{
  children: React.ReactNode;
  mockedApis: string[];
}>) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    mockingEnabledPromise(mockedApis).then(() => {
      setIsReady(true); // ワーカーの準備が完了したらフラグを立てる
    });
  }, [mockedApis]);

  if (!isReady) {
    return null; // ワーカーが準備できていない間は何も表示しない
  }
  return children;
}
