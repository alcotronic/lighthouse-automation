import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@lighthouse-automation/backend/user';

@Injectable()
export class AuthenticationService {
    private readonly logger = new Logger(AuthenticationService.name);

    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<unknown | null> {
      const user = await this.userService.findByUsername(username);
      if (user && user.activated) {
        const match = await this.userService.comparePasswords(password, user.password);
        if (match) {
          const { password, ...result } = user;
          return result;
        }
      }
      return null;
    }

    async login(user: { _doc: { _id: string; username: string; }; }) {
      const payload = { userId: user._doc._id, username: user._doc.username };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '5m' });
      const renewToken = this.jwtService.sign(payload, { expiresIn: '10m' });
      this.userService.updateRenewToken(payload.userId, renewToken);
      return {
        username: payload.username,
        accessToken: accessToken,
      };
    }

    async logout(user: { userId: string; }) {
      await this.userService.updateRenewToken(user.userId);
      return {
        success: true
      };
    }

}
