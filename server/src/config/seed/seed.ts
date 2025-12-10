import { seedProjectsSingleton } from "./projectsSingleton.js"
import { seedTimeSingleton } from "./timeSingleton.js"

export const seed = async() => {
    try {
        await seedProjectsSingleton()
        await seedTimeSingleton()
    }
    catch (error) {
        console.log('Не удалось гарантировать наличие необходимых данных', error)
    }
}