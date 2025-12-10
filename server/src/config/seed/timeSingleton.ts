import TimeData from "../../models/TimeData/TimeData.js"

export const seedTimeSingleton = async() => {
    await TimeData.updateOne(
        { _id: 'time' },
        { $set: {}, new: true },
        { upsert: true, setDefaultsOnInsert: true }
    )
}