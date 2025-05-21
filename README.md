## Overview

自作エラーを判定するための基底エラークラスを提供します。

## How To Use

### Base

```typescript
function doSomethingRisky() {
  // 何らかのエラーが発生した場合に CustomError を投げる
  throw new CustomError("エラーが発生しました");
}

try {
  doSomethingRisky();
} catch (err) {
  if (CustomError.is(err)) {
    // CustomError として安全に扱える
    console.error(`CustomError: ${err.message}`);
    console.error(`type: ${err.type}`);
  } else {
    // その他のエラー／例外
    console.error("Unknown error:", err);
  }
}
```

### Extends

各プロジェクト固有のエラーを定義するには、`CustomError` を継承してください。
以下はバリデーションエラーを例にしたパターンです。

```typescript
import { CustomError } from "custom-error";

export class ValidationError extends CustomError {
  // 独自のエラー名を設定
  static readonly NAME = "ValidationError";
  readonly type = ValidationError.NAME;

  // 追加プロパティも自由に定義できる
  constructor(
    message: string,
    public readonly field: string,
  ) {
    super(message);
  }

  // 型ガードをオーバーライド
  static is(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
  }
}
```

```typescript
try {
  // ...フォーム値チェックなど
  throw new ValidationError("値が不正です", "email");
} catch (err) {
  if (ValidationError.is(err)) {
    console.warn(`Field: ${err.field} — ${err.message}`);
  } else if (CustomError.is(err)) {
    console.error(`[CustomError] ${err.message}`);
  } else {
    console.error("Unknown error:", err);
  }
}
```

## API

`class CustomError extends Error`

- `static readonly NAME: string`
  デフォルトのエラー名。内部的には `CustomError` が設定されています。

- `readonly type: string`
  インスタンスプロパティとして `NAME` と同じ値を保持します。

- `constructor(message: string)`
  標準の `Error` と同様に、エラーメッセージを受け取ります。

- `static is(error: unknown): error is CustomError`
  与えられたオブジェクトが `CustomError` インスタンスかどうかを判定します。

```typescript
// 型ガードとして使える
if (CustomError.is(err)) {
  // err は CustomError 型として扱える
}
```
