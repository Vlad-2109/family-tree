import { Router } from 'express';
import { createMember, getMembers, updateMember, deleteMember } from '../controllers/member.controller';

const router = Router();

router.get('/get-members', getMembers);
router.post('/create', createMember);
router.put('/update/:memberId', updateMember);
router.delete('/delete/:memberId', deleteMember);

export default router;
