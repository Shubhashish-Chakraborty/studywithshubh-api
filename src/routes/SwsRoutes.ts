import { Router } from 'express';
import { signup , login } from '../controllers/authControllers';
import { addCourse, getCourse } from '../controllers/courseController';

export const swsRouter = Router();

swsRouter.route('/signup').post(signup);
swsRouter.route('/login').post(login);
swsRouter.route('/courses').post(addCourse);
swsRouter.route('/courses/:courseName').get(getCourse);