/** Read Item */
import express, { NextFunction, Request, Response} from 'express';
import { noteModel } from '../model/NoteModel';
import { userModel } from '../model/UserModel';
import crypto from 'crypto';

/** Retrieves all the notes */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    noteModel.model.find()
        .then((data: any) => res.status(200).json(data))
        .catch((err: any) => res.status(500).json(err));
}

/** Retrieves one note by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.noteId;
    noteModel.model.findOne({noteId: id})
        .then((data: any) => res.status(200).json(data))
        .catch((err: any) => res.status(500).json(err));
}

/** Create new note in DB */
const createNote = (req: Request, res: Response, next: NextFunction) => {
    var user_id = req.params.userId;
    // find user
    userModel.model.findOne({userId: user_id})
        .then((user: any) => {
            if (user) {
                // prepare content of note obj
                var noteData = req.body;
                noteData.id = crypto.randomUUID();
                noteData.userId = user.userId;
                // create new note obj
                noteModel.model.create(noteData)
                    .then((newObj: any) => {
                        // push note into itemList
                        user.noteIdList.push(newObj?.noteId);
                        user.save();
                        // set response
                        res.status(200).json(newObj);
                    })
                    .catch((err: any) => {
                        console.log('Object creation failed');
                        res.status(500).send(err.message);
                    })
            }else{
                console.log('User not found: ', user_id);
                res.status(500).send("User not found");
            }   
        })
        .catch((err: any) => {
            console.log('Error creating note:', err);
            res.status(500).send(err.message);
        });
}

/** Update note by ID */
const updateNote = (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.noteId;
    var updatedObj = req.body;
    noteModel.model.findOneAndUpdate({noteId: id}, updatedObj, { new: true })
        .then((updatedObj: any) => {
            if(updatedObj){
                res.status(200).json(updatedObj);
            }else{
                res.status(500).json('Note not found');
            }
        })
        .catch((err: any) => {
            console.log('Update failed');
            res.status(500).json(err);
        });
}

/** Delete note by ID */
const deleteNote = (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.noteId;

    // find note
    noteModel.model.findOne({noteId: id})
        .then((noteData: any) => {
            // find user and delete noteId from noteIdList
            userModel.model.findOne({userId: noteData.userId})
            .then((user: any) => {
                if (user) {
                    // remove note from noteIdList
                    user.noteIdList.pull(noteData.noteId);
                    user.save();
                }
            })
        })
        .catch((err: any) => {
            return res.status(500).json(err.message);
        });
    
    // delete note
    noteModel.model.findOneAndDelete({noteId: id})
        .then((data: any) => {
            if(data){
                res.status(200).json({ deletedNoteId: id});
            }else{
                res.status(500).send("Note not found");
            }
        })
        .catch((err: any) => {
            console.log('Deletion failed');
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
