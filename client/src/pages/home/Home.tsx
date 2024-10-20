import { useEffect, useState } from 'react';
import { ButtonsBar } from '../../components/ButtonsBar';
import { IMember } from '../../types/types';
import { MemberService } from '../../services/member.service';
import { MemberAccordion } from '../../components/MemberAccordion';

export const Home: React.FC = () => {
  const [members, setMembers] = useState<IMember[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await MemberService.getAllMembers();
        if (data) {
          setMembers(data);
        }
      } catch (error) {
        //помилку вивести нормально
        console.log(error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <>
      <div className="max-w-[360px] mx-auto my-10 ">
        <div className="flex flex-row justify-center items-center gap-2 mb-5 ">
          <h1 className="text-3xl text-neutral-900 font-primary font-bold text-center">
            Family tree
          </h1>
          <img
            className="block w-9 h-9"
            src="/family-tree.svg"
            alt="family-tree"
          />
        </div>
        <ButtonsBar members={members} />
        <MemberAccordion members={members} />
      </div>
    </>
  );
};
