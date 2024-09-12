from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()
ma = Marshmallow()

player_location = db.Table('player_location',
    db.Column('player_id', db.Integer, db.ForeignKey('players.id')),
    db.Column('location_id', db.Integer, db.ForeignKey('locations.id'))
)

class Player(db.Model, SerializerMixin):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    strengths = db.Column(db.String(100), nullable=False)
    weaknesses = db.Column(db.String(100), nullable=False)
    equipment = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Integer, default=0)
    locations = relationship('Location', secondary=player_location, back_populates='players')
    
    serialize_rules = ('-locations',)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'strengths': self.strengths,
            'weaknesses': self.weaknesses,
            'equipment': self.equipment,
            'score': self.score,
            'locations': [loc.to_dict() for loc in self.locations]
        }

class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    events = relationship('Event', back_populates='location')
    players = relationship('Player', secondary=player_location, back_populates='locations')

    serialize_rules = ('-events',)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'events': [event.to_dict() for event in self.events]
        }

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255))
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    location = relationship('Location', back_populates='events')

    serialize_rules = ('-location',)

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description
        }
