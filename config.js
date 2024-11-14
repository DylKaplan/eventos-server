import dotenv from 'dotenv'

dotenv.config()

const PORT=process.env.PORT
const STRCNX=process.env.STRCNX
const BASE=process.env.BASE

export default {
    PORT,
    STRCNX,
    BASE
}
