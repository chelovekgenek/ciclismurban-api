import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { User } from "../entities"

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly permissions: string[]

  constructor(...permissions: string[]) {
    this.permissions = permissions
  }

  canActivate(context: ExecutionContext): boolean {
    if (!this.permissions.length) {
      return true
    }
    const user: User = context.switchToHttp().getRequest().user
    return user && user.permissions && user.permissions.some(permission => this.permissions.includes(permission))
  }
}
