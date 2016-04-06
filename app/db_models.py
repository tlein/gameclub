from app import db

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True, unique=True)

    def __repr__(self):
        return '<Group {0}>'.format(self.name)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<User {0}>'.format(self.id)

class UserInGroup(db.Model):
    userId = db.Column(db.Integer, primary_key=True)
    groupId = db.Column(db.Integer, primary_key=True)

    def __repr__(self):
        return '<User {0} in Group {1}>'.format(self.userId, self.groupId)
