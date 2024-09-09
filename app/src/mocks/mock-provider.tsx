"use client";

import { Suspense, use } from "react";

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
  // MSW が有効な場合は、ワーカーが開始するまで待つ必要があるため、
  //ワーカーの準備が完了するまで、サスペンドする
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper mockedApis={mockedApis}>
        {children}
      </MSWProviderWrapper>
    </Suspense>
  );
};

function MSWProviderWrapper({
  children,
  mockedApis,
}: Readonly<{
  children: React.ReactNode;
  mockedApis: string[];
}>) {
  use(mockingEnabledPromise(mockedApis));
  return children;
}
