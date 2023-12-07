import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Treinador {

    constructor(userName: string, team: number[]){
        this.userName = userName
        this.team = team
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userName: string

    @Column("int", {array: true})
    team: number[]


}
