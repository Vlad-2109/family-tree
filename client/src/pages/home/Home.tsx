import { useEffect } from 'react';
import { ButtonsBar } from '../../components/ButtonsBar';
import { MemberAccordion } from '../../components/MemberAccordion';
import { useAppDispatch } from '../../redux/hook';
import { getMembers } from '../../redux/memberSlice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

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
        <ButtonsBar />
        <MemberAccordion />
      </div>
    </>
  );
};
