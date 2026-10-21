import { Router } from "express";
import SiteStatistic from "../models/SiteStatistic/SiteStatistic.js";

const router: Router = Router()

router.get('/', async (req, res) => {
    try {
        const sitesData = await SiteStatistic.find({})
        return res.json(sitesData)
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const siteData = await SiteStatistic.findOne({ siteId: req.params.id })
        if (!siteData) {
            return res.status(404).json({ message: 'Сайт с указанным идентификтаром не найден' })
        }
        return res.json(siteData)
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error })
    }
})

export default router