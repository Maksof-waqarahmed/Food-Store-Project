// import { userInfo } from 'os';
// import { createUser } from '../controller/userController';
import userRouter from './userRoutes';
import { Router } from 'express';
const routes = Router()

routes.use("/", userRouter);

export default routes;
