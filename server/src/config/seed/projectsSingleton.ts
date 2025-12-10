import ProjectsData from "../../models/ProjectsData/ProjectsData.js"

export const seedProjectsSingleton = async() => {
    await ProjectsData.updateOne(
        { _id: 'projects_count' },
        { $set: {}, new: true },
        { upsert: true, setDefaultsOnInsert: true }
    )
}