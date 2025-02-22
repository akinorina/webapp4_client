/**
 * Blog data class
 */
export default class Webapp4Error {
  // code
  code: number = 0

  // 名称
  name: string = ''

  // type
  type: Webapp4ErrorTypeType = ''

  // メッセージ
  message: string = ''

  constructor(err: Webapp4ErrorConstructorType) {
    this.code = err.code ?? 0
    this.type = err.type ?? ''
    this.name = err.name ?? ''
    this.message = err.message ?? ''
  }
}

export type Webapp4ErrorTypeType = 'system' | 'application' | ''

export interface Webapp4ErrorConstructorType {
  type: 'system' | 'application' | ''
  message: string
  code?: number
  name?: string
}
