import { Router } from "express";
import SiteStatistic from "../models/SiteStatistic/SiteStatistic.js";

const router: Router = Router()

router.post('/', async (req, res) => {
    const { siteId, name, solved, failed, orderIndex } = req.body
    if (!siteId || !name || !orderIndex) {
        return res.status(400).json({ message: 'Необходимо указать поля siteId, name и orderIndex' })
    }

    try {
        const newSiteData = await SiteStatistic.create({
            siteId, name, solved, failed, orderIndex
        })
        return res.status(201).json({ message: 'Сайт успешно добавлен', data: newSiteData })
    } catch (error: unknown) {
        if ((error as { code: number }).code === 11000) {
            return res.status(409).json({ message: 'Сайт с таким name или siteId уже существует' })
        }
        return res.status(500).json({ message: 'Ошибка сервера' })
    }
})

router.put('/:id', async (req, res) => {
    const updateData = req.body
    if (!updateData.name || !updateData.orderIndex) {
        return res.status(400).json({ message: 'Необходимо указать поля name и orderIndex' })
    }
    if (!updateData.siteId) {
        updateData.siteId = req.params.id
    }

    try {
        const newSiteData = await SiteStatistic.findOneAndReplace(
            { siteId: req.params.id },
            updateData,
            { new: true }
        )

        if (!newSiteData) {
            return res.status(404).json({ message: 'Обновлённый сайт не найден' })
        }

        return res.status(200).json({ message: 'Сайт успешно обновлён', data: newSiteData })
    } catch (error: unknown) {
        if ((error as { code: number }).code === 11000) {
            return res.status(409).json({ message: 'Сайт с таким name или siteId уже существует' })
        }
        return res.status(500).json({ message: 'Ошибка сервера' })
    }
})

router.patch('/:id', async (req, res) => {
    const updateData = req.body

    try {
        const updatedSiteData = await SiteStatistic.findOneAndUpdate(
            { siteId: req.params.id },
            { $set: updateData },
            { new: true, runValidators: true }
        )

        if (!updatedSiteData) {
            return res.status(404).json({ message: 'Обновлённый сайт не найден' })
        }

        return res.status(200).json({ message: 'Сайт успешно обновлён', data: updatedSiteData })
    } catch (error: unknown) {
        if ((error as { code: number }).code === 11000) {
            return res.status(409).json({ message: 'Сайт с таким name или siteId уже существует' })
        }
        return res.status(500).json({ message: 'Ошибка сервера' })
    }
})

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

router.delete('/:id', async (req, res) => {
    try {
        const deletedData = await SiteStatistic.findOneAndDelete({ siteId: req.params.id })
        if (!deletedData) {
            return res.status(404).json({ message: 'Сайт с указанным идентификтаром не найден и не удалён' })
        }
        return res.status(200).json({ message: 'Сайт успешно удалён', deletedData: deletedData })
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error })
    }
})

export default router