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

export default router