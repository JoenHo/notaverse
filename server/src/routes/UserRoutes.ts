import express, { NextFunction, Request, Response} from 'express';
import { userModel } from '../model/UserModel';
import { noteModel } from '../model/NoteModel';
import crypto from 'crypto';

/** Retrieves all the users */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    userModel.model.find()
        .then((data: any) => res.status(200).json(data))
        .catch((err: any) => res.status(500).json(err));
}

/** Retrieves one user by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.userId;
    userModel.model.findOne({userId: id})
        .then((data: any) => res.status(200).json(data))
        .catch((err: any) => res.status(500).json(err));
}

/** Create new user in DB */
const createUser = (req: Request, res: Response, next: NextFunction) => {    
    var userObj = req.body;
    userObj.userId = crypto.randomUUID();

    userModel.model.create(userObj)
        .then((newUser: any) => {
            res.status(200).json(newUser);
        })
        .catch((err: any) => {
            console.log('Object creation failed');
            res.status(500).send(err.message);
        });
}

/** Update user by ID */
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.userId;
    var userObj = req.body;
  
    userModel.model.findOneAndUpdate({userId: id}, userObj, { new: true })
        .then((userObj: any) => {
            if(userObj){
                res.status(200).json(userObj);
            }else{
                res.status(500).send("User not found");
            }
        })
        .catch((err: any) => {
            console.log('Update failed');
            res.status(500).send(err.message);
        });
}

/** Delete user by ID */
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.userId;

    // find user
    userModel.model.findOne({userId: id})
        .then((user: any) => {
            // delete all items associated with this user
            const deleteNotePromises = user.noteIdList.map((note_id: any) => {
                return noteModel.model.findOneAndDelete({noteId: note_id});
            });

            // delete user only after deleting all items
            Promise.all(deleteNotePromises).then(() => {
                userModel.model.findOneAndDelete({userId: id})
                .then((data: any) => {
                    if(data){
                        res.status(200).json({deletedId: id});
                    }else{
                        res.status(500).send("User not found");
                    }
                })
                .catch((err: any) => {
                    res.status(500).send(err.message);
                });
            });
        })
        .catch((err: any) => {
            return res.status(500).send(err.message);
        });
}


/** Define routes */
const router = express.Router();
router.get('/', readAll);
router.get('/:userId', readById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
export = router;
