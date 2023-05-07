/** Read Item */
import express, { NextFunction, Request, Response} from 'express';
import { userController } from '../controllers/UserController';
import { roomController } from '../controllers/RoomController';
import { roomItemController } from '../controllers/RoomItemController';
import crypto from 'crypto';

/** Retrieves all the rooms */
const readAll = (req: Request, res: Response, next: NextFunction) => {
    roomController.findAll()
    .then((data: any) => {
        res.status(200).json(data);
    }).catch((err: any) => {
        res.status(500).json(err);
    });
}

/** Retrieves one room by ID */
const readById = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.roomId;
    roomController.findById(req_id)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err:any) => {
            res.status(500).json(err);
        });
}

/** Create new room in DB */
const createRoom = (req: Request, res: Response, next: NextFunction) => {
    var user_id = req.params.userId;
    // find user
    userController.findById(user_id)
        .then((user: any) => {
            if(!user){
                return res.status(500).send("User not found");
            }
            // prepare content of room obj
            var roomData = req.body;
            roomData.id = crypto.randomUUID();
            roomData.userId = user.userId;
            // create new room obj
            roomController.create(roomData)
                .then((data: any) => {
                    // push room into itemList
                    user.roomIdList.push(data?.roomId);
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

/** Update room by ID */
const updateRoom = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.roomId;
    var updates = req.body;
    roomController.updateById(req_id, updates)
        .then((data: any) => {
            res.status(200).json(data);
        }).catch((err: any) => {
            res.status(500).json(err);
        });
}

/** Delete room by ID */
const deleteRoom = (req: Request, res: Response, next: NextFunction) => {
    var req_id = req.params.roomId;
    // find room
    roomController.findById(req_id)
        .then((room: any) => {
            // find user and delete roomId from roomIdList
            userController.findById(room.userId)
                .then((user: any) => {
                    if (user) {
                        // remove room from roomIdList
                        user.roomIdList.pull(room.roomId);
                        user.save();
                    }
                    
                    // delete all roomItem from roomItemIdList
                    const deleteRoomItemPromise = room.roomItemIdList.map((roomItemId: any) => {
                        return roomItemController.deleteById(roomItemId)
                            .then((roomItem: any) => {
                            }).catch((err: any) => {
                                console.log('Failed to delete roomItem: ', roomItemId);
                            });
                    });
                    // delete room
                    Promise.all(deleteRoomItemPromise)
                        .then(() => {
                            roomController.deleteById(req_id)
                                .then((data: any) => {
                                    res.status(200).json({ deletedRoomId: req_id});
                                })
                                .catch((err: any) => {
                                    res.status(500).json(err);
                                })
                    });    
                })
        })
        .catch((err: any) => {
            res.status(500).json(err);
        });
}


/** Define routes */
const router = express.Router();
router.get('/', readAll);
router.get('/:roomId', readById);
router.post('/:userId', createRoom);
router.put('/:roomId', updateRoom);
router.delete('/:roomId', deleteRoom);
export = router;
