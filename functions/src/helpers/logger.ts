import * as fs from "fs";
import * as path from "path";

// ログレベルのタイプ定義
type LogLevel = "error" | "warn" | "info" | "debug";

// ロガーのクラス
class Logger {
  private logLevel: LogLevel;
  private logFilePath: string;

  constructor(logLevel: LogLevel = "info", logFileName: string = "app.log") {
    this.logLevel = logLevel;
    this.logFilePath = path.join(__dirname, logFileName);
  }

  // ログレベルに応じてメッセージを記録する
  private log(level: LogLevel, message: string): void {
    const timestamp = new Date().toISOString();
    const formattedMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;

    // コンソールに出力
    console.log(formattedMessage);

    // ファイルに出力
    fs.appendFileSync(this.logFilePath, formattedMessage + "\n", "utf8");
  }

  // エラーログ
  error(message: string): void {
    if (["error"].includes(this.logLevel)) {
      this.log("error", message);
    }
  }

  // 警告ログ
  warn(message: string): void {
    if (["error", "warn"].includes(this.logLevel)) {
      this.log("warn", message);
    }
  }

  // 情報ログ
  info(message: string): void {
    if (["error", "warn", "info"].includes(this.logLevel)) {
      this.log("info", message);
    }
  }

  // デバッグログ
  debug(message: string): void {
    if (["error", "warn", "info", "debug"].includes(this.logLevel)) {
      this.log("debug", message);
    }
  }
}

// カスタムエラークラス AuthError
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

// デフォルトのロガーインスタンスをエクスポート
export const logger = new Logger("debug"); // 必要に応じてログレベルを変更
