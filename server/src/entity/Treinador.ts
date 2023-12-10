import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(["userName"])
export class Treinador {

    constructor(userName: string, team: number[], password: string) {
        this.userName = userName;
        this.team = team;
        this.password = password;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column({ nullable: false })
    password: string;

    @Column("int", { array: true })
    team: number[];
    setTeam(team: number[]) {
        // Ensure the team has a maximum of 6 integers
        this.team = team.slice(0, 6);
    }
}
