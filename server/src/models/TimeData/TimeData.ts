import { model, Schema } from "mongoose";

const TimeDataSchema = new Schema({
    _id: {
        type: String,
        default: 'time'
    },
    minutes: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Число не должно быть отрицательным']
    }
}, {
    collection: 'timedata'
})

export default model('TimeData', TimeDataSchema)