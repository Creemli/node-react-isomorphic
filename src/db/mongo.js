/**
 * Created by lixiaoxi on 2017/3/3.
 * @description
 */

import { MongClient } from 'mongodb';

const url = 'mongodb://localhost:27017/';

MongClient.connect(url, (err, db) => {
     console.log(err, db);
});

export {};

