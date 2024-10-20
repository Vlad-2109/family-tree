import { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../redux/hook';
import { IMember } from '../types/types';

export const MemberAccordion: React.FC = () => {

  const members:IMember[] = useAppSelector((state) => state.member.members);

  const [tree, setTree] = useState<IMember | null>(null);

  useEffect(() => {
    if (members.length > 0) {
      const youngestMember = members[members.length - 1]; 
      setTree(buildTree(youngestMember));
    }
  }, [members]);

  const buildTree = (member: IMember): IMember => {
    if (!member.parents || member.parents.length === 0) {
      return member; 
    }

    const parents = member.parents
      .map((parent) => members.find((m) => m._id === parent._id))
      .filter(Boolean) as IMember[];

    return { ...member, parents: parents.map(buildTree) };
  };

  const renderTree = (member: IMember) => {
    const hasParents: boolean = member.parents && member.parents.length > 0;

    return (
      <Accordion key={member._id}>
        <AccordionSummary expandIcon={hasParents && <ExpandMoreIcon />}>
          <Typography>
            {member.name} (Age: {member.age})
          </Typography>
        </AccordionSummary>
        {hasParents && (
          <AccordionDetails>
            {member.parents.map((parent) => renderTree(parent))}
          </AccordionDetails>
        )}
      </Accordion>
    );
  };

  return <div>{tree && renderTree(tree)}</div>;
};
