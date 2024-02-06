import { person1, person2 } from "@/_data/fake/properties"

export async function ServiceGetUsers(){
    try {
        const users = [person1, person2]

        return users
    } catch (error) {
        throw error
    }
}