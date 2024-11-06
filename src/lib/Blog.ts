/**
 * Blog data class
 */
export default class Blog {
  // ID
  id: number = 0

  // 表題
  subject: string = ''

  // ブログ日時
  blogAt: string = ''

  // 本文
  body: string = ''

  prevId: number = 0
  nextId: number = 0

  createdAt: string = ''
  updatedAt: string = ''
  deletedAt: string = ''

  constructor(blog: any = {}) {
    this.id = blog.id ?? 0
    this.subject = blog.subject
    this.blogAt = blog.blogAt
    this.body = blog.body
    this.prevId = blog.prevId
    this.nextId = blog.nextId
    this.createdAt = blog.createdAt
    this.updatedAt = blog.updatedAt
    this.deletedAt = blog.deletedAt
  }
}
