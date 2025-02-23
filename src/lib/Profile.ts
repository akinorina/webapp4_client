export default class Profile {
  // ユーザー ID
  id: number = 0

  // ユーザー 表示名
  username: string = ''

  // ユーザー メールアドレス
  email: string = ''

  // サインイン日時
  iat: number = 0

  // サインイン有効期限日時
  exp: number = 0

  // Roles
  roles: string[] = []

  constructor(profile: any = {}) {
    this.id = profile.id ?? 0
    this.username = profile.username ?? ''
    this.email = profile.email ?? ''
    this.iat = profile.iat ?? 0
    this.exp = profile.exp ?? 0
    this.roles = profile.roles ?? []
  }

  set(profile: any = {}) {
    this.id = profile.id ?? 0
    this.username = profile.username ?? ''
    this.email = profile.email ?? ''
    this.iat = profile.iat ?? 0
    this.exp = profile.exp ?? 0
    this.roles = profile.roles ?? []
  }

  clear() {
    this.id = 0
    this.username = ''
    this.email = ''
    this.iat = 0
    this.exp = 0
    this.roles = []
  }
}
