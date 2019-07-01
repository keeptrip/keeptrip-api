import { ObjectType, Field, Int, ClassType } from "type-graphql";

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedResponseClass {
        @Field(type => [TItemClass])
        items: TItem[]

        @Field(type => Int)
        total: number
    }

    return PaginatedResponseClass
}