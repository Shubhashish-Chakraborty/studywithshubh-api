import { Router } from 'express';
import { signup , login } from '../controllers/authControllers';

export const swsRouter = Router();

swsRouter.route('/signup').post(signup);
swsRouter.route('/login').post(login);