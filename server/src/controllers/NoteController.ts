import { noteModel } from "../model/NoteModel";

/** Retrieve all */
const findAll = (): Promise<any> => {
    return noteModel.model.find()
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Retrieve one by ID */
const findById = (id: string): Promise<any> => {
    return noteModel.model.findOne({noteId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Create new obj */
const create = (obj: any): Promise<any> => {
    return noteModel.model.create(obj)
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Update by ID */
const updateById = (id: string, obj: any): Promise<any> => {
    return noteModel.model.findOneAndUpdate({noteId: id}, obj, { new: true })
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Delete by ID */
const deleteById = (id: string): Promise<any> => {
    return noteModel.model.findOneAndDelete({noteId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

export const noteController = {findAll, findById, create, updateById, deleteById};