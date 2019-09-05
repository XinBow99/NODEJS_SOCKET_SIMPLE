class User {
    constructor(db) {
        this.db = db;
        this.logger = () => {
        };
    }

    getAllBureaus(p = 1) {
        //page 1, 2~n
        //從第skip_rows項開始取得10筆資料
        const skip_rows = (p - 1) * 10;
        return this.db.collection('bureaus')
            .find().limit(10).skip(skip_rows).toArray();
    }

    addBureau(name) {
        return this.db.collection('bureaus')
            .insertOne({
                'name': name
            });
    }

    editBureau(bid, name) {
        return this.db.collection('cases')
            .update({
                //query
                '_id': this.db.ObjectId(bid)
            }, {
                //update Bureau Name
                'name': name
            });
    }

    getAllUsers(p = 1) {
        //page 1, 2~n
        //從第skip_rows項開始取得10筆資料
        const skip_rows = (p - 1) * 10;
        return this.db.collection('users')
            .find().limit(10).skip(skip_rows).toArray();
    }

    //新增使用者
    addUser(name, bureau, user, pass, confirm_pass, group, email, phone) {
        if (confirm_pass === pass) {
            return this.db.collection('users')
                .insertOne({
                    'name': name,
                    'bureau': bureau,
                    'user': user,
                    'pass': pass,
                    'group': group,
                    'email': email,
                    'phone': phone
                });
        } else {
            return {
                'message': '兩次密碼不相同~'
            }
        }
    }

    //編輯使用者
    editUser(uid, name, bureau, pass, confirm_pass, group, email, phone) {
        let User = this.db.getCollection('users');
        const this_uid = this.db.ObjectId(uid);
        
        const old_pass = User.findOne({'_id': this_uid}).pass;

        if (confirm_pass === old_pass) {
            return User
                .update({
                    //query
                    '_id': this_uid
                }, {
                    //update User Name
                    'name': name,
                    'bureau': bureau,
                    'pass': pass,
                    'group': group,
                    'email': email,
                    'phone': phone
                });
        } else {
            return {
                'message': '兩次密碼不相同~'
            }
        }
    }
}

module.exports = User;
