import { Router } from "express";
import ProjectsData from "../models/ProjectsData/ProjectsData.js";

const router: Router = Router()

router.get('/', async(req, res) => {
    try {
        const projectsData = await ProjectsData.findById('projects_count')
        if (projectsData !== null) {
            return res.json({ projectsCount: projectsData.projects })
        } else {
            return res.status(404).json({ message: 'Проекты не найдены' })
        }
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка сервера', error })
    }
})

router.patch('/', async(req, res) => {
    const update = req.body
    if (!update.projects) return res.status(400).json({ message: 'Запрос должен содержать поле projects с новым числом проектов' })
    const newProjectsCount = parseInt(update.projects)
    if (isNaN(newProjectsCount)) return res.status(400).json({ message: 'Значение должно быть целым числом' })
    try {
        const updatedProjects = await ProjectsData.findOneAndUpdate(
            {_id: 'projects_count'},
            {projects: newProjectsCount},
            {new: true, runValidators: true}
        )
        if (!updatedProjects) return res.status(404).json({ message: 'Обновлённый объект не найден' })
        return res.status(200).json(updatedProjects?.toJSON())
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка сервера', error })
    }
})

export default router