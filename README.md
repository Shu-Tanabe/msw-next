# msw-next

## 開始方法

```
# モジュールインストール
yarn install

# プロジェクトの開始
yarn dev
```

## モック対象を変更する

```tsx:layout.tsx
- <MSWProvider mockApis={["AllPeople"]}>{children}</MSWProvider>
+ <MSWProvider mockApis={["AllPeople", "AllFilms"]}>{children}</MSWProvider>
```
