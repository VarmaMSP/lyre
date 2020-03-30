import { NextComponentType, NextPageContext as Page } from 'next'
import { NextJSContext as Wrapper } from 'next-redux-wrapper'
import { AppContext as App } from 'next/app'
import { AppState } from 'store'
import { AppActions } from './actions'

//
// Extend NextJs Context interfaces with Context Pages in by next redux wrapper
//
export interface PageContext extends Page, Wrapper<AppState, AppActions> {}

export interface AppContext extends App {
  ctx: PageContext
  Component: NextComponentType<PageContext> & {
    loadPropsIntoStore?: (context: PageContext) => void
  }
}

// Phantom Types

// For Entities
export type $Id<_E> = string

export type $HashId<_E> = string

export type MapById<E> = { [id: string]: E }

export type MapOneToOne<_E1, E2> = { [id: string]: E2 }

export type MapOneToMany<_E1, E2> = { [id: string]: $Id<E2>[] }

// For generic values
export type Obj<_K, V> = {
  [key: string]: V
}

export type Hash1<_T1> = string

export type Hash2<_T1, _T2> = string

export type Hash3<_T1, _T2, _T3> = string

export type Hash4<_T1, _T2, _T3, _T4> = string
