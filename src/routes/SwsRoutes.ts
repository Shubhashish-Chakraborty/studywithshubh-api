import { Router } from 'express';
import { signup , login, adminLogin } from '../controllers/authControllers';
import { addCourse, getCourse, updateCourse } from '../controllers/courseController';
import { authenticate } from '../middlewares/auth';

export const swsRouter = Router();

swsRouter.route('/signup').post(signup);
swsRouter.route('/login').post(login);
swsRouter.route('/login/admin').post(adminLogin);
swsRouter.route('/courses').post(authenticate , addCourse);
swsRouter.route('/courses/update').patch(authenticate , updateCourse);
swsRouter.route('/courses/:courseName').get(authenticate , getCourse);