export interface IGetMember {
  _id: string;
  name: string;
  age: number;
  parents: IMember[];
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

export interface IPostMember {
  name: string;
  age: number;
  parents: string[];
}

export interface IUpdateMember {
  name: string;
  age: number;
}

export interface IMember {
  _id: string;
  name: string;
  age: number;
  parents: IMember[];
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
}

export interface MemberAccordionProps {
  members: IMember[];
}

export interface AddMemberButtonsProps {
  members: IMember[];
}

export interface UpdateMemberButtonProps {
  members: IMember[];
}

export interface DeleteMemberButtonProps {
  members: IMember[];
}

export interface ButtonsBarProps {
  members: IMember[];
}
