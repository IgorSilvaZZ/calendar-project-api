/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */
import { randomInt } from "node:crypto";

export class CalendarUtils {
	private static chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private static sizeCode = 6;

	/* Geração de codigo alfa-númerico */
	public static generatedCode(): string {
		let result = "";

		for (let i = 0; i < CalendarUtils.sizeCode; i++) {
			result += CalendarUtils.chars[randomInt(CalendarUtils.chars.length)];
		}

		return result;
	}

	public static validateCode(code: string) {
		return /^[A-log0-9{5}]+$/i.test(code);
	}
}
