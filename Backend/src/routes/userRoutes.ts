import {createUser, updateUser, deleteUser, findUser} from '../controller/userController'
import {Router} from 'express';
const router = Router()

router.post('/login', findUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;