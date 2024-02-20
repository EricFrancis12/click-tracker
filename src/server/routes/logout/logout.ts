import { logout } from '../../middleware/auth/auth';

import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    logout();
    res.redirect('/login');
});

export { router };
