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

router.patch('/', async(req, res) => {
    const update = req.body
    if (!update.minutes) return res.status(400).json({ message: 'Запрос должен содержать поле minutes с новым количеством минут' })
    const newMinutes = parseInt(update.minutes)
    if (isNaN(newMinutes)) return res.status(400).json({ message: 'Значение должно быть целым числом' })
    try {
        const updatedMinutes = await TimeData.findOneAndUpdate(
            {_id: 'time'},
            {minutes: newMinutes},
            {new: true, runValidators: true}
        )
        if (!updatedMinutes) return res.status(404).json({ message: 'Обновлённый объект не найден' })
        return res.status(200).json(updatedMinutes?.toJSON())
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error })
    }
})

export default router