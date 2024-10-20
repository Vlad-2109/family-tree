import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import { MemberService } from '../services/member.service';
import { useAppSelector } from '../redux/hook';
import { IMember } from '../types/types';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
};

export const DeleteMemberButton: React.FC = () => {

  const members: IMember[] = useAppSelector(state => state.member.members);

  const [open, setOpen] = useState<boolean>(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const handleClickDelete = async () => {
    try {
      const data = await MemberService.deleteMember(selectedMemberId);
      if (data) {
        toast.success('Successfully deleted');
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
    setSelectedMemberId(null);
  };

  const handleSelectMember = (e: SelectChangeEvent) => {
    setSelectedMemberId(e.target.value);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        size="medium"
        onClick={handleClickOpen}
      >
        Delete member
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
            Delete member
          </p>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="member-select-label">Member</InputLabel>
            <Select
              labelId="member-select-label"
              id="select-member"
              label="member"
              value={selectedMemberId ? selectedMemberId : ''}
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
        </DialogContent>
        <div className="flex flex-row justify-center gap-7 items-center pb-2">
          <Button
            onClick={handleClickDelete}
            autoFocus
            color="success"
            disabled={!selectedMemberId}
          >
            Delete
          </Button>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
