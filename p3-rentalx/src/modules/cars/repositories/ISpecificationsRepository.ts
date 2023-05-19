import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { type Specification } from "../entities/Specification";



interface ISpecificationsRepository {
    findByName: (name: string) => Promise<Specification>;
    list: () => Promise<Specification[]>;
    create: ({ name, description }: ICreateSpecificationDTO) => Promise<Specification>;
    findByIds: (ids: string[]) => Promise<Specification[]>;
}

export type { ISpecificationsRepository };
