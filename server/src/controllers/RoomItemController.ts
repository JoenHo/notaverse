import { roomItemModel } from "../model/RoomItemModel";

/** Retrieve all */
const findAll = (): Promise<any> => {
    return roomItemModel.model.find()
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Retrieve one by ID */
const findById = (id: string): Promise<any> => {
    return roomItemModel.model.findOne({roomItemId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Create new obj */
const create = (obj: any): Promise<any> => {
    return roomItemModel.model.create(obj)
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Update by ID */
const updateById = (id: string, obj: any): Promise<any> => {
    return roomItemModel.model.findOneAndUpdate({roomItemId: id}, obj, { new: true, runValidators: true })
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Delete by ID */
const deleteById = (id: string): Promise<any> => {
    return roomItemModel.model.findOneAndDelete({roomItemId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

export const roomItemController = {findAll, findById, create, updateById, deleteById};