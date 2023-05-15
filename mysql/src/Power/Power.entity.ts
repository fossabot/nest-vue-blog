import { Column, Entity, Tree, TreeParent } from 'typeorm';
import { BaseState, PowerModel } from '@app/mysql/common';

@Entity()
@Tree('closure-table')
export class Power extends PowerModel {
  @TreeParent() pid: Power;

  @TreeParent() children: Power[];

  @Column({ comment: '名称' }) name: string;

  @Column({ comment: '标识' }) keys: string;

  @Column({ length: 100, comment: '名称' }) tags: string;

  @Column({ length: 255, comment: '内容', nullable: true }) values: string;

  @Column({ type: 'enum', enum: BaseState, default: BaseState.Disable, comment: '状态' }) state: BaseState;

  static async of_create(body) {
    const target = new Power();
    //
    return target;
  }
}
