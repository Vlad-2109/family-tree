import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/error';
import Member from '../models/member.model';

export const getMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const members = await Member.find().sort({ age: -1 }).populate('parents');

    res.status(200).json(members);
  } catch (err) {
    next(err);
  }
};

export const createMember = async (req: Request, res: Response | any, next: NextFunction) => {
  const { name, age, parents } = req.body;

  if (!name || !age) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  if (parents && parents.length > 0) {
    try {
      const existingParents = await Member.find({ _id: { $in: parents } });

      if (existingParents.length !== parents.length) {
        return res
          .status(400)
          .json({ message: 'Some parent IDs do not exist' });
      }
    } catch (err) {
      next(err);
    }
  }

  const newMember = new Member({ name, age, parents: parents || [] });

  try {
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    next(err);
  }
};

export const updateMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.memberId,
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
        },
      },
      { new: true },
    );

    if (!updatedMember) {
      return next(errorHandler(404, 'Member not found'));
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    next(error);
  }
};

export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.memberId);

    if (!deletedMember) {
      return next(errorHandler(404, 'Member not found'));
    }

    res.status(200).json({ message: 'The member has been deleted' });
  } catch (error) {
    next(error);
  }
};
