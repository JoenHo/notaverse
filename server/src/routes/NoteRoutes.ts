/** Read Item */
import express, { NextFunction, Request, Response} from 'express';
import { noteModel } from '../model/NoteModel';

/** Retrieves all the notes */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return noteModel.model.find()
        .then((data: any) => res.status(200).json({ data }))
        .catch((err: any) => res.status(500).json( err ));
}

/** Retrieves one note by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var id = req.params.noteId;
    console.log('Query single Note with id: ' + id);
    return noteModel.model.findById(id)
        .then((data: any) => res.status(200).json({ data }))
        .catch((err: any) => res.status(500).json( err ));
}

/** Create new note in DB */
const createNote = (req: Request, res: Response, next: NextFunction) => {
    var jsonObj = req.body;
    noteModel.model.create(jsonObj)
        .then((newObj: any) => {
            res.status(200).json({ id: newObj._id})
        })
        .catch((err: any) => {
            console.log('Object creation failed');
            res.status(500).send(err.message);
        })
}

/** Update note by ID */
const updateNote = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.noteId;
    const updatedObj = req.body;
    noteModel.model.findByIdAndUpdate(id, updatedObj, { new: true })
        .then((updatedObj: any) => {
            console.log("Note updated successfully");
            res.status(200).json(updatedObj);
        })
        .catch((err: any) => {
            console.log('Update failed');
            res.status(500).send(err.message);
        });
}

/** Delete note by ID */
const deleteNote = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.noteId;
    noteModel.model.findByIdAndDelete(id)
        .then(() => {
            console.log("Note deleted successfully")
            res.status(200).json({ deletedId: id});
        })
        .catch((err: any) => {
            console.log('Deletion failed');
            res.status(500).send(err.message);
        });
}

/** Define routes */
const router = express.Router();
router.get('/', readAll);
router.get('/:noteId', readById);
router.post('/', createNote);
router.put('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);
export = router;
