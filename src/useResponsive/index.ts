import { useEffect, useState } from 'react';

type Subscriber = () => void;

// 配置类型
interface ResponsiveConfig {
  [key: string]: number;
}

// 返回值类型
interface ResponsiveInfo {
  [key: string]: boolean;
}

// ***********************上面是类型检查*************************

const subscribers = new Set<Subscriber>();

// 返回的信息
let info: ResponsiveInfo;

let responsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// 初始化 设置监听函数
function init() {
  if (info) return;
  info = {};
  calculate();
  window.addEventListener('resize', () => {
    const oldInfo = info;
    calculate();
    // 经过计算之后如果oldInfo还是info
    if (oldInfo === info) return;
    for (const subscriber of subscribers) {
      subscriber();
    }
  });
}

function calculate() {
  const width = window.innerWidth;
  const newInfo = {} as ResponsiveInfo;
  let shouldUpdate = false;
  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width >= responsiveConfig[key];
    // 如果有一个不一样，那就需要更新
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true;
    }
  }
  if (shouldUpdate) {
    info = newInfo;
  }
}

export function configResponsive(config: ResponsiveConfig) {
  // 采用的是一次性覆盖
  responsiveConfig = config;
  if (info) calculate();
}

export function useResponsive() {
  init();
  const [state, setState] = useState<ResponsiveInfo>(info);

  useEffect(() => {
    const subscriber = () => {
      setState(info);
    };
    subscribers.add(subscriber);
    return () => {
      subscribers.delete(subscriber);
    };
  }, []);

  return state;
}
