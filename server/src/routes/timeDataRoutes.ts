import { Router } from "express";
import TimeData from "../models/TimeData/TimeData.js";

const router: Router = Router()

router.get('/', async (req, res) => {
    try {
        const timeData = await TimeData.findById('time')
        if (timeData !== null) {
            return res.json({ minutes: timeData.minutes })
        } else {
            return res.status(404).json({ message: 'Данные о времени не найдены' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error })
    }
})

export default router