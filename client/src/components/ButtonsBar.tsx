import { AddMemberButton } from './AddMemberButton';
import { UpdateMemberButton } from './UpdateMemberButton';
import { ButtonsBarProps } from '../types/types';
import { DeleteMemberButton } from './DeleteMemberButton';

export const ButtonsBar: React.FC<ButtonsBarProps> = ({ members }) => {
  return (
    <div className="flex flex-col items-center gap-3 mb-5">
      <AddMemberButton members={members} />
      <UpdateMemberButton members={members} />
      <DeleteMemberButton members={members} />
    </div>
  );
};
