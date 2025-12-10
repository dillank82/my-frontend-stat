import { model, Schema } from "mongoose";

const SiteStatisticSchema = new Schema({
    siteId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    solved: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Число не должно быть отрицательным']
    },
    failed: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Число не должно быть отрицательным']
    },
    orderIndex: {
        type: Number,
        required: true,
        unique: true,
        min: [1, 'Число должно быть больше нуля']
    }
})

export default model('SiteStatistic', SiteStatisticSchema) 