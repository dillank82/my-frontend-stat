import { model, Schema } from "mongoose";

const ProjectsDataSchema = new Schema({
    _id: {
        type: String,
        default: 'projects_count'
    },
    projects: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Число не должно быть отрицательным']
    }
}, {
    collection: 'projectsdata'
})

export default model('Projects', ProjectsDataSchema)