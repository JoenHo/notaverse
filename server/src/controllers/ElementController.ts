import { elementModel } from "../model/ElementModel";

/** Retrieve all */
const findAll = (): Promise<any> => {
    return elementModel.model.find()
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Retrieve one by ID */
const findById = (id: string): Promise<any> => {
    return elementModel.model.findOne({noteId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Create new obj */
const create = (obj: any): Promise<any> => {
    return elementModel.model.create(obj)
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Update by ID */
const updateById = (id: string, obj: any): Promise<any> => {
    return elementModel.model.findOneAndUpdate({elementId: id}, obj, { new: true, runValidators: true })
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Delete by ID */
const deleteById = (id: string): Promise<any> => {
    return elementModel.model.findOneAndDelete({elementId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

export const elementController = {findAll, findById, create, updateById, deleteById};