/** Read Item */
import express, { NextFunction, Request, Response} from 'express';
import { userController } from '../controllers/UserController';
import { noteController } from '../controllers/NoteController';
import crypto from 'crypto';

/** Retrieves all the notes */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    noteController.findAll()
    .then((data: any) => {
        res.status(200).json(data);
    }).catch((err: any) => {
        res.status(500).json(err);
    });
}

/** Retrieves one note by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.noteId;
    noteController.findById(req_id)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err:any) => {
            res.status(500).json(err);
        });
}

/** Create new note in DB */
const createNote = (req: Request, res: Response, next: NextFunction) => {
    var user_id = req.params.userId;
    // find user
    userController.findById(user_id)
        .then((user: any) => {
            if(!user){
                return res.status(500).send("User not found");
            }
            // prepare content of note obj
            var noteData = req.body;
            noteData.id = crypto.randomUUID();
            noteData.userId = user.userId;
            // create new note obj
            noteController.create(noteData)
                .then((data: any) => {
                    // push note into itemList
                    user.noteIdList.push(data?.noteId);
                    user.save();
                    // set response
                    res.status(200).json(data);
                })
                .catch((err: any) => {
                    res.status(500).json(err);
                })
        })
        .catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Update note by ID */
const updateNote = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.noteId;
    var updates = req.body;
    noteController.updateById(req_id, updates)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Delete note by ID */
const deleteNote = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.noteId;
    // find note
    noteController.findById(req_id)
        .then((data: any) => {
            // find user and delete noteId from noteIdList
            userController.findById(data.userId)
                .then((user: any) => {
                    if (!user) {
                        console.log('User not found');
                    }else{
                        // remove note from noteIdList
                        user.noteIdList.pull(data.noteId);
                        user.save();
                    }
                })
        })
        .catch((err: any) => {
            res.status(500).json(err);
        });
    
    // delete note
    noteController.deleteById(req_id)
        .then((data: any) => {
            res.status(200).json({ deletedNoteId: req_id});
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
}


/** Define routes */
const router = express.Router();
router.get('/', readAll);
router.get('/:noteId', readById);
router.post('/:userId', createNote);
router.put('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);
export = router;
