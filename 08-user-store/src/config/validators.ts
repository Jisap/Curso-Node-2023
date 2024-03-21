import mongoose from "mongoose";




export class Validators {

  static isMongoID( id: String ){
    return mongoose.isValidObjectId(id)
  }
}