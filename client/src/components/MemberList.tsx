import { useEffect, useState } from 'react';
import { IMember } from '../types/types';
import { MemberService } from '../services/member.service';
import { MemberAccordion } from './MemberAccordion';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { getMembers } from '../redux/memberSlice';

export const MemberList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [members, setMembers] = useState<IMember[]>([]);
  const [myId, setMyId] = useState<string>('');

  const dispatch = useAppDispatch();
  const membersNew = useAppSelector((state) => state.member.members);
  console.log('membersFromRedux', membersNew);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await MemberService.getAllMembers();
        if (!data) {
          setError(true);
          setLoading(false);
          return;
        }
        if (data) {
          setMembers(data);
          setMyId(data[data.length - 1]._id);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);
  
  return (
    <div>
      <MemberAccordion members={members} />
    </div>
  );
};
