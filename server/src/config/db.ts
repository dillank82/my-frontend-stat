import { connect } from 'mongoose'

const connectDB = async() => {
    const uri = process.env.URI || 'mongodb://localhost:27017/my-frontend-stat'
    try {
       await connect(uri)
       console.log('MongoDB connected.')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default connectDB