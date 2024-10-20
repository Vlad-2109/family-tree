import { AddMemberButton } from './AddMemberButton';
import { UpdateMemberButton } from './UpdateMemberButton';
import { DeleteMemberButton } from './DeleteMemberButton';

export const ButtonsBar: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-3 mb-5">
      <AddMemberButton/>
      <UpdateMemberButton/>
      <DeleteMemberButton/>
    </div>
  );
};
