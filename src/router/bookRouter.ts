import { Router } from 'express'
import { createBooks, viewBooks } from '../controllers/bookController'
import { roleVerify } from '../middleware/roleVerify'
import { UserRole } from '../models/userModel'
import { authMiddlware } from '../middleware/authMiddleware'

const router = Router()


router.post("/",authMiddlware,roleVerify([UserRole.CREATOR]),createBooks)


router.get("/",authMiddlware,roleVerify([UserRole.VIEWER,UserRole.VIEW_ALL]),viewBooks)

export {router as BookRouter}

