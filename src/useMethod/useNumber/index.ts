import { IMethod, useMethod } from '..';


const numberMethods: IMethod<number> = {
  increment: s => s + 1,
  decrement: s => s - 1,
  add: (s, a: number) => {
    let r1: number, r2: number, m: number

    try { r1 = s.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = a.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));

    return (s * m + a * m) / m
  },
  subtract: (s, a: number) => {
    let r1: number, r2: number, m: number, n: number;

    try { r1 = s.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = a.toString().split(".")[1].length } catch (e) { r2 = 0 }

    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;

    return Number(((s * m - a * m) / m).toFixed(n));
  },
  multiply: (s, a: number) => {
    let m=0, s1= s.toString(), s2=a.toString();
    
    try{ m += s1.split(".")[1].length } catch(e) {}
    try{ m += s2.split(".")[1].length } catch(e) {}

    return Number(s1.replace(".","")) * Number(s2.replace(".",""))/Math.pow(10,m);
  },
  divide: (s, a: number) => {
    let t1,t2,r1,r2;
    try{ t1 = s.toString().split('.')[1].length } catch(e) { t1 = 0 }
    try{ t2 = a.toString().split(".")[1].length } catch(e) { t2 = 0 }
    r1 = Number(s.toString().replace(".",""));
    r2 = Number(a.toString().replace(".",""));

    return (r1 / r2) * Math.pow(10, t2-t1);
  },
  set: (s, n: number) => n,
};

export type TActions = {
  increment: () => void,
  decrement: () => void,
  add: (a: number) => void,
  subtract: (a: number) => void,
  multiply: (a: number) => void,
  divide: (a: number) => void,
  set: (a: number) => void,
}

export function useNumber(initialValue: number = 0) {
  return useMethod<number, TActions>(initialValue, numberMethods);
}
