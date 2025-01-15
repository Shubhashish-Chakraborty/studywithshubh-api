import { Router } from 'express';
import { signup , login, adminLogin } from '../controllers/authControllers';
import { addCourse, getCourse } from '../controllers/courseController';

export const swsRouter = Router();

swsRouter.route('/signup').post(signup);
swsRouter.route('/login').post(login);
swsRouter.route('/login/admin').post(adminLogin);
swsRouter.route('/courses').post(addCourse);
swsRouter.route('/courses/:courseName').get(getCourse);