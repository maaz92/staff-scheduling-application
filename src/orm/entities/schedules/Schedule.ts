import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import {User} from "../users/User";

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date'
    })
    date: string;

    @Column({
        nullable: false,
    })
    length: number;

    @Column({ name: 'staff_id' })
    staffId: number;

    @ManyToOne(type => User, user => user.schedules, { nullable: false}) staff: User;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}
