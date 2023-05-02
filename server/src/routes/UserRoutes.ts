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


/** Define routes */
const router = express.Router();
router.get('/', readAll);
router.get('/:userId', readById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
export = router;
