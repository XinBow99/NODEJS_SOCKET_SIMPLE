const Mdb = require('./dbformat');
const moment = require('moment');

class SocketHander {

    constructor() {
        this.db;
    }

    connect() {
        this.db = require('mongoose').connect('mongodb://localhost:27017/NodeJsChatRoom', { useNewUrlParser: true });
        this.db.Promise = global.Promise;
    }

    getMessages() {
        return entry.find();
    }

    storeEntry(data) {
        const newUser = new Mdb.entry({
            ip: data.name,
            agent: data.msg,
            action: data.action,
            time: moment().valueOf(),
        });
        newUser.save();
        console.log('進入者保存成功'.blue);
    }
}

module.exports = SocketHander;