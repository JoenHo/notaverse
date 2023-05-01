import express, { NextFunction, Request, Response} from 'express';
import { userModel } from '../model/UserModel';
import { noteModel } from '../model/NoteModel';

/** Retrieves all the users */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return userModel.model.find()
        .then((data: any) => res.status(200).json({ data }))
        .catch((err: any) => res.status(500).json( err ));
}

/** Retrieves one user by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.userId;
    console.log('Query single User with id: ' + id);
    return userModel.model.findById(id)
        .then((data: any) => res.status(200).json({ data }))
        .catch((err: any) => res.status(500).json( err ));
}

/** Create new user in DB */
const createUser = (req: Request, res: Response, next: NextFunction) => {    
    var jsonObj = req.body;
    userModel.model.create(jsonObj)
        .then((newUser: any) => {
            res.status(200).json({ id: newUser._id });
        })
        .catch((err: any) => {
            console.log('Object creation failed');
            res.status(500).send(err.message);
        });
}

/** Update user by ID */
const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId;
    const updatedObj = req.body;
  
    userModel.model.findByIdAndUpdate(id, updatedObj, { new: true })
        .then((updatedObj: any) => {
            console.log("User updated successfully");
            res.status(200).json(updatedObj);
        })
        .catch((err: any) => {
            console.log('Update failed');
            res.status(500).send(err.message);
        });
}

/** Delete user by ID */
const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.userId;
    userModel.model.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ deletedId: id});
        })
        .catch((err: any) => {
            console.log('Deletion failed');
            res.status(500).send(err.message);
        });
}

/** Create note for user */
const createNoteForUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const noteData = req.body;
    noteData.user = userId;

    // find user by id
    userModel.model.findById(userId)
        .then((user: any) => {
            if (user) {
                // create new note obj
                noteModel.model.create(noteData)
                    .then((newObj: any) => {
                        // push note id into itemList
                        user.itemList.push(newObj._id);
                        user.save();
                        // set JSON response
                        res.status(200).json({ id: newObj._id})
                    })
                    .catch((err: any) => {
                        console.log('Object creation failed');
                        res.status(500).send(err.message);
                    })
            }else{
                console.log('User not found: ', userId);
            }   
        })
        .catch((err: any) => {
            console.log('Error creating note:', err);
            res.status(500).send(err.message);
        });
}; 

/** Delete note for user */
const deleteNoteForUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    // find user by id
    userModel.model.findById(userId)
        .then((user: any) => {
            if (user) {
                // remove note id from itemList
                user.itemList.pull(noteId);
                user.save();
                // delete note by id
                noteModel.model.findByIdAndDelete(noteId)
                    .then(() => {
                        res.status(200).json({ deletedId: noteId });
                    })
                    .catch((err: any) => {
                        console.log('Deletion failed');
                        res.status(500).send(err.message);
                    })
            } else {
                console.log('User not found: ', userId);
            }
        })
        .catch((err: any) => {
            console.log('Error deleting note:', err);
            res.status(500).send(err.message);
        });
}; 


/** Define routes */
const router = express.Router();
router.get('/', readAll);
router.get('/:userId', readById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.put('/createNote/:userId', createNoteForUser)
router.put('/deleteNote/:userId/:noteId', deleteNoteForUser)
router.delete('/:userId', deleteUser);
export = router;
