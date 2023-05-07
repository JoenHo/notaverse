import express, { NextFunction, Request, Response} from 'express';
import { userController } from '../controllers/UserController';
import { noteController } from '../controllers/NoteController';
import crypto from 'crypto';

/** Retrieves all the users */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    userController.findAll()
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Retrieves one user by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.userId;
    userController.findById(req_id)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err:any) => {
            res.status(500).json(err);
        });
}

/** Create new user in DB */
const createUser = (req: Request, res: Response, next: NextFunction) => {    
    var userObj = req.body;
    userObj.userId = crypto.randomUUID();
    userController.create(userObj)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Update user by ID */
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.userId;
    var userObj = req.body;
    userController.updateById(req_id, userObj)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Delete user by ID */
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.userId;

    // find user
    userController.findById(req_id)
        .then((user: any) => {
            // delete all items associated with this user
            const deleteNotePromises = user.noteIdList.map((note_id: any) => {
                return noteController.deleteById(note_id)
                    .then((result: any) => {
                    }).catch((err: any) => {
                        console.log('Failed to delete note: ', note_id);
                    });
            });
            // delete user only after deleting all items
            Promise.all(deleteNotePromises)
                .then(() => {
                    userController.deleteById(req_id)
                        .then((data: any) => {
                            res.status(200).json({deletedId: req_id});
                        }).catch((err: any) => {
                            res.status(500).json(err);
                        });
                });
        }).catch((err: any) => {
            res.status(500).json(err);
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
