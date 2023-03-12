import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("specifications")
class Specification {
    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Specification };
