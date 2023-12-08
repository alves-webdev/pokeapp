import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class Treinador {

   constructor(userName: string, team: number[], password: string) {
       this.userName = userName;
       this.team = team;
       this.password = password;
   }

   @BeforeInsert()
   async hashPassword() {
      try {
          this.password = await bcrypt.hash(this.password, 10);
      } catch (err) {
          console.error(err);
      }
   }

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   userName: string;

   @Column({ nullable: false })
   password: string;

   @Column("int", { array: true })
   team: number[];
}
