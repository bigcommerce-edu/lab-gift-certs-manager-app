import * as firebase from '@/lib/db/firebase';
import { Db } from '@/types/db';

const { DB_TYPE } = process.env;

let db:Db;

switch (DB_TYPE) {
  case 'firebase':
  default:
    db = firebase;
}

export default db;
