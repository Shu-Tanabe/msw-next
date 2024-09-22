"use client";

import { useEffect, useState } from "react";

// ブラウザで実行している場合は、ワーカーを開始
const mockingEnabledPromise = (mockApis: string[]) =>
  typeof window !== "undefined" && process.env.NODE_ENV === "development"
    ? import("@/mocks/browser").then(async ({ worker }) => {
        await worker({
          mockApis,
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

export function MSWProvider({
  children,
  mockApis,
}: Readonly<{
  children: React.ReactNode;
  mockApis: string[];
}>) {
  return (
    <MSWProviderWrapper mockApis={mockApis}>{children}</MSWProviderWrapper>
  );
}

function MSWProviderWrapper({
  children,
  mockApis,
}: Readonly<{
  children: React.ReactNode;
  mockApis: string[];
}>) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    mockingEnabledPromise(mockApis).then(() => {
      setIsReady(true); // ワーカーの準備が完了したらフラグを立てる
    });
  }, [mockApis]);

  if (!isReady) {
    return null; // ワーカーが準備できていない間は何も表示しない
  }
  return children;
}
