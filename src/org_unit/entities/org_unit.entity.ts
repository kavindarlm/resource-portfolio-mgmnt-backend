import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'org_unit' })
export class OrgUnit {

    @PrimaryGeneratedColumn()
    unitId: number;

    @Column({ unique: true })
    unitName: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    parentId: number;

    @Column()
    createdAt: Date;

}