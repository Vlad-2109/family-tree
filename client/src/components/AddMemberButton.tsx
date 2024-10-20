import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
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

export const AddMemberButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const members: IMember[] = useAppSelector((state) => state.member.members);

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [selectedParents, setSelectedParents] = useState<string[]>([]);

  const handleClickAdd = async () => {
    const payload = { name, age, parents: selectedParents };
    try {
      const data = await MemberService.createMember(payload);
      if (data) {
        dispatch(getMembers());
        toast.success('Successfully created');
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
    setName('');
    setAge(0);
    setSelectedParents([]);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        size="medium"
        onClick={handleClickOpen}
      >
        Add member
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
            Add member
          </p>
        </DialogTitle>
        <DialogContent>
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
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="parents-select-label">Parents</InputLabel>
            <Select
              labelId="parents-select-label"
              label="parents"
              id="demo-multiple-name"
              multiple
              value={selectedParents}
              onChange={(e) => setSelectedParents(e.target.value as string[])}
              MenuProps={MenuProps}
            >
              {members.map((parent) => (
                <MenuItem key={parent._id} value={parent._id}>
                  {parent.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <div className="flex flex-row justify-center gap-7 items-center pb-2">
          <Button onClick={handleClickAdd} autoFocus color="success">
            Add
          </Button>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
