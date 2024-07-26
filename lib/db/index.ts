import * as firebase from '@/lib/db/firebase';
import { Db } from '@/types/db';

const { DB_TYPE } = process.env;

let db:Db;

db = {};

export default db;
