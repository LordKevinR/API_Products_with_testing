import { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");

describe("connectDB", () => {
  it("should handler database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Database connection error"));
    const consoleSpy = jest.spyOn(console, "log");
    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Database connection error")
    );
  });
});
