//----------------MULTER------------------------------
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({
  storage,
});

//----------------__DIRNAME------------------------------
import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//----------------MONGO------------------------------
import { connect, Schema, model } from 'mongoose';
import faker from 'faker';
import { UserModel } from './DAO/models/users.model.js';
import { OrderModel } from './DAO/models/order.model.js';
export async function connectMongo() {
  try {
    await connect('mongodb+srv://guillermofergnani:AdKFB89Q0rn6B99u@51395.qrp9dhg.mongodb.net/');
    console.log('plug to mongo');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

//----------------SOCKET------------------------------
import { Server } from 'socket.io';
import { MsgModel } from './DAO/models/msgs.model.js';
import { StudentsModel } from './DAO/models/students.model.js';
import { CoursesModel } from './DAO/models/courses.model.js';
export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await MsgModel.create(msg);
      const msgs = await MsgModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });
  });
}

import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);
