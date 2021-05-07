
/**
 * 像素转数字
 * '2px' => 2
 * ['1px', '2px'] => 3
 */
export function pxToNum(px: string | string[]): number {
  if (Array.isArray(px)) {
    return px
      .map(p => pxToNum(p))
      .reduce((res, current) => {
        return (res += current);
      }, 0);
  }
  return Number.parseInt(px, 10);
}

/**
 * 保留小数位并四舍五入
 * @param num 数字
 * @param fraction 保留几位小数
 */
export function toFixed(num: number, fraction: number = 2) {
  const c = Math.pow(10, fraction);

  return Math.round((num + Number.EPSILON) * c) / c;
}

