import express, { NextFunction, Request, Response} from 'express';
import { elementController } from '../controllers/ElementController';
import crypto from 'crypto';

/** Retrieves all the elements */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    elementController.findAll()
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Retrieves one element by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.userId;
    elementController.findById(req_id)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err:any) => {
            res.status(500).json(err);
        });
}

/** Create new element in DB */
const createElement = (req: Request, res: Response, next: NextFunction) => {    
    var elementObj = req.body;
    elementObj.elementId = crypto.randomUUID();
    elementController.create(elementObj)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Update element by ID */
const updateElement = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.elementId;
    var elementObj = req.body;
    elementController.updateById(req_id, elementObj)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Delete element by ID */
const deleteElement = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.elementId;

    // delete element
    elementController.deleteById(req_id)
    .then((data: any) => {
        res.status(200).json({ deletedId: req_id});
    })
    .catch((err: any) => {
        res.status(500).json(err);
    });
}


/** Define routes */
const router = express.Router();
router.get('/', readAll);
router.get('/:elementId', readById);
router.post('/', createElement);
router.put('/:elementId', updateElement);
router.delete('/:elementId', deleteElement);
export default router;
