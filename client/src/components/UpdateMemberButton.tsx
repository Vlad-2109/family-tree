import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import { MemberService } from '../services/member.service';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { getMembers } from '../redux/memberSlice';
import { IMember } from '../types/types';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

export const UpdateMemberButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const members: IMember[] = useAppSelector((state) => state.member.members);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<IMember | null>(null);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);

  const handleClickUpdate = async () => {
    const memberId = selectedMember?._id;
    const payload = { name, age };
    try {
      const data = await MemberService.updateMember(memberId, payload);
      if (data) {
        dispatch(getMembers());
        toast.success('Successfully updated');
      }
      setOpen(false);
      resetForm();
    } catch (err: any) {
      toast.error(err.response.data.message || 'Something went wrong');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedMember(null);
    setName('');
    setAge(0);
  };

  const handleSelectMember = (e: SelectChangeEvent) => {
    const memberId = e.target.value;
    const member = members.find((m) => m._id === memberId) || null;
    if (member) {
      setName(member.name);
      setAge(member.age);
      setSelectedMember(member);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        size="medium"
        onClick={handleClickOpen}
      >
        Update member
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ maxWidth: '360px', margin: '0 auto' }}
      >
        <DialogTitle id="alert-dialog-title">
          <p className="text-xl text-neutral-900 font-primary font-medium text-center">
            Update member
          </p>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="member-select-label">Member</InputLabel>
            <Select
              labelId="member-select-label"
              id="select-member"
              label="member"
              value={selectedMember ? selectedMember._id : ''}
              onChange={handleSelectMember}
              MenuProps={MenuProps}
            >
              {members.map((member) => (
                <MenuItem key={member._id} value={member._id}>
                  {member.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            disabled={!selectedMember}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            variant="outlined"
            value={age}
            name="age"
            onChange={(e) => setAge(+e.target.value)}
            disabled={!selectedMember}
          />
        </DialogContent>
        <div className="flex flex-row justify-center gap-7 items-center pb-2">
          <Button
            onClick={handleClickUpdate}
            autoFocus
            color="success"
            disabled={!selectedMember}
          >
            Update
          </Button>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
