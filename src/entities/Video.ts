import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("videos")
class Video{
    @PrimaryColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    url: string;

    @Column()
    owner: number;

    @Column()
    visualizacoes: number;

    @Column()
    like: number;

    @Column()
    deslike: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export { Video }