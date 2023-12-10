import { Column, Entity, ILike, Index, Like } from 'typeorm';
import { BaseModel } from '../Common/Base.entity';

export enum UserState {
  Check = -2, // 审核/检查
  Freeze = -1, // 冻结
  Disable = 0, // 禁用
  Enable = 1, // 启用
  Delete = 2, // 删除
  Lock = 4, // 锁定
}

@Entity()
@Index('unique', ['uid', 'name', 'email'], { unique: true })
export class Users extends BaseModel {
  @Column({ /* uid */ length: 100 }) uid: string;

  @Column({ /* 昵称 */ length: 50 }) name: string;

  @Column({ /* 密码 */ length: 64 }) pass: string;

  @Column({ /* 邮箱 */ length: 100 }) email: string;

  @Column({ /* 头像 */ nullable: true }) avatar: string;

  @Column({ /* 角色 */ type: 'simple-array', nullable: true }) role: string[];

  @Column({ /* 状态 */ type: 'enum', enum: UserState, default: UserState.Disable }) state: UserState;

  protected handleWhere(): { [p: string]: { name?: string; handle?: any } } {
    return {
      uid: { name: 'uid' },
      name: { name: 'name', handle: Like },
      email: { name: 'email', handle: ILike },
    };
  }
}
