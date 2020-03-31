import hash_sum from 'hash-sum'
import { Hash1, Hash2, Hash3, Hash4, Hash5, Hash6 } from 'types/utilities'

export function makeHash<T1>(t1: T1): Hash1<T1>

export function makeHash<T1, T2>(t1: T1, t2: T2): Hash2<T1, T2>

export function makeHash<T1, T2, T3>(t1: T1, t2: T2, t3: T3): Hash3<T1, T2, T3>

export function makeHash<T1, T2, T3, T4>(
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
): Hash4<T1, T2, T3, T4>

export function makeHash<T1, T2, T3, T4, T5>(
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
): Hash5<T1, T2, T3, T4, T5>

export function makeHash<T1, T2, T3, T4, T5, T6>(
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
): Hash6<T1, T2, T3, T4, T5, T6>

export function makeHash(...t: any[]) {
  return hash_sum(t)
}
