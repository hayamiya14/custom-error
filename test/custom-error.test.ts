import { CustomError } from "../src/custom-error.js";

describe("CustomError", () => {
  it("指定したメッセージでインスタンスを生成できる", () => {
    const message = "テストエラーメッセージ";
    const error = new CustomError(message);

    expect(error.message).toBe(message);
    expect(error.type).toBe(CustomError.NAME);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CustomError);
  });

  it("is メソッドを使用してインスタンスを判定できる", () => {
    const error = new CustomError("テストエラー");
    expect(CustomError.is(error)).toBe(true);
  });

  it("is メソッドで純粋な Error を判定できる", () => {
    const error = new Error("一般的なエラー");
    expect(CustomError.is(error)).toBe(false);
  });

  it("is メソッドで非エラーオブジェクトを判定できる", () => {
    const error = { message: "Fake error", type: "CustomError" };
    expect(CustomError.is(error)).toBe(false);
  });

  it("is メソッドで null を判定できる", () => {
    expect(CustomError.is(null)).toBe(false);
  });

  it("is メソッドで undefined を判定できる", () => {
    expect(CustomError.is(undefined)).toBe(false);
  });

  it("is メソッドで文字列を判定できる", () => {
    expect(CustomError.is("エラー文字列")).toBe(false);
  });

  it("is メソッドで数値を判定できる", () => {
    expect(CustomError.is(123)).toBe(false);
  });

  it("is メソッドで配列を判定できる", () => {
    const error = [1, 2, 3];
    expect(CustomError.is(error)).toBe(false);
  });

  it("is メソッドでオブジェクトを判定できる", () => {
    const error = { message: "Fake error" };
    expect(CustomError.is(error)).toBe(false);
  });
});
