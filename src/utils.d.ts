/**
 * 像素转数字
 * '2px' => 2
 * ['1px', '2px'] => 3
 */
export declare function pxToNum(px: string | string[]): number;
/**
 * 保留小数位并四舍五入
 * @param num 数字
 * @param fraction 保留几位小数
 */
export declare function toFixed(num: number, fraction?: number): number;
