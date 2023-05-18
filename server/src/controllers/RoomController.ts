import { roomModel } from "../model/RoomModel";

/** Retrieve all */
const findAll = (): Promise<any> => {
    return roomModel.model.find()
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Retrieve one by ID */
const findById = (id: string): Promise<any> => {
    return roomModel.model.findOne({roomId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Create new obj */
const create = (obj: any): Promise<any> => {
    return roomModel.model.create(obj)
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Update by ID */
const updateById = (id: string, obj: any): Promise<any> => {
    return roomModel.model.findOneAndUpdate({roomId: id}, obj, { new: true, runValidators: true })
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Delete by ID */
const deleteById = (id: string): Promise<any> => {
    return roomModel.model.findOneAndDelete({roomId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

export const roomController = {findAll, findById, create, updateById, deleteById};