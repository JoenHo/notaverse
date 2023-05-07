/** Read Item */
import express, { NextFunction, Request, Response} from 'express';
import { roomItemController } from '../controllers/RoomItemController';
import { roomController } from '../controllers/RoomController';
import crypto from 'crypto';

/** Retrieves all the roomItems */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    roomItemController.findAll()
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Retrieves one roomItem by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.roomItemId;
    roomItemController.findById(req_id)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err:any) => {
            res.status(500).json(err);
        });
}

/** Create new roomItem in DB */
const createRoomItem = (req: Request, res: Response, next: NextFunction) => {
    var room_id = req.params.roomId;

    // verify room exist
    roomController.findById(room_id)
        .then((room: any) => {
            if(!room){
                return res.status(500).send("Room not found");
            }
            // create roomItem
            var newObj = req.body;
            newObj.roomItemId = crypto.randomUUID();
            newObj.roomId = room_id;
            roomItemController.create(newObj)
                .then((data: any) => {
                    // push roomItem into roomItemList
                    room.roomItemIdList.push(data.roomItemId);
                    room.save();
                    // set response
                    res.status(200).json(data);
                }).catch((err: any) => {
                    res.status(500).json(err);
                });
        }).catch((err: any) => {
            return res.status(500).json(err);
        });
}

/** Update roomItem by ID */
const updateRoomItem = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.roomItemId;
    var updates = req.body;
    roomItemController.updateById(req_id, updates)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Delete roomItem by ID */
const deleteRoomItem = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.roomItemId;
    // find roomItem
    roomItemController.findById(req_id)
        .then((roomItem: any) => {
            // find room
            roomController.findById(roomItem.roomId)
                .then((room: any) => {
                    if(room){
                        // delete roomItem from roomItemList of room
                        room.roomItemIdList.pull(req_id);
                        room.save();    
                    }                    
                    // delete roomItem
                    roomItemController.deleteById(req_id)
                        .then((data: any) => {
                            res.status(200).json({ deletedId: req_id});
                        })
                        .catch((err: any) => {
                            res.status(500).json(err);
                        })
                    })
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}


/** Define routes */
const router = express.Router();
router.get('/', readAll);
router.get('/:roomItemId', readById);
router.post('/:roomId', createRoomItem);
router.put('/:roomItemId', updateRoomItem);
router.delete('/:roomItemId', deleteRoomItem);
export = router;
