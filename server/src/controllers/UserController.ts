import { userModel } from "../model/UserModel";

/** Retrieve all */
const findAll = (): Promise<any> => {
    return userModel.model.find()
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Retrieve one by ID */
const findById = (id: string): Promise<any> => {
    return userModel.model.findOne({userId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Retrieve one by OauthID */
const findByOauthId = (id: string): Promise<any> => {
    return userModel.model.findOne({oauthId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Create new obj */
const create = (obj: any): Promise<any> => {
    return userModel.model.create(obj)
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Update by ID */
const updateById = (id: string, obj: any): Promise<any> => {
    return userModel.model.findOneAndUpdate({userId: id}, obj, { new: true, runValidators: true  })
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

/** Delete by ID */
const deleteById = (id: string): Promise<any> => {
    return userModel.model.findOneAndDelete({userId: id})
        .then((data: any) => {
            return data;
        })
        .catch((err: any) => {
            throw err;
        });
}

export const userController = {findAll, findById, create, updateById, deleteById, findByOauthId};