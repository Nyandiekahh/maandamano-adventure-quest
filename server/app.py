from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from dotenv import load_dotenv
import os
from models import db, Player, Location, Event
from config import Config
import random
import json

def create_app(config_class=Config):
    # Load environment variables from .env file
    load_dotenv()
    
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)
    api = Api(app)
    CORS(app)
    
    class PlayerResource(Resource):
        def get(self, id=None):
            if id:
                player = Player.query.get_or_404(id)
                return player.to_dict()
            else:
                players = Player.query.all()
                return [player.to_dict() for player in players]
        
        def post(self):
            data = request.json
            new_player = Player(name=data['name'], background=data['background'])
            db.session.add(new_player)
            db.session.commit()
            return new_player.to_dict(), 201
        
        def patch(self, id):
            player = Player.query.get_or_404(id)
            data = request.json
            for key, value in data.items():
                setattr(player, key, value)
            db.session.commit()
            return player.to_dict()
        
        def delete(self, id):
            player = Player.query.get_or_404(id)
            db.session.delete(player)
            db.session.commit()
            return '', 204

    class LocationResource(Resource):
        def get(self):
            locations = Location.query.all()
            return [location.to_dict() for location in locations]
        
        def post(self):
            data = request.json
            new_location = Location(name=data['name'], description=data['description'])
            db.session.add(new_location)
            db.session.commit()
            return new_location.to_dict(), 201

    class EventResource(Resource):
        def get(self):
            events = Event.query.all()
            return [event.to_dict() for event in events]
        
        def post(self):
            data = request.json
            new_event = Event(description=data['description'], location_id=data['location_id'])
            db.session.add(new_event)
            db.session.commit()
            return new_event.to_dict(), 201
    
    api.add_resource(PlayerResource, '/players', '/players/<int:id>')
    api.add_resource(LocationResource, '/locations')
    api.add_resource(EventResource, '/events')
    
    @app.route('/')
    def home():
        return "Welcome to Maandamano Adventure Quest API!"
    
    @app.route('/random-location')
    def random_location():
        locations = Location.query.all()
        if locations:
            location = random.choice(locations)
            return jsonify({
                'name': location.name,
                'description': location.description
            })
        return jsonify({}), 404

    @app.route('/random-event')
    def random_event():
        events = Event.query.all()
        if events:
            event = random.choice(events)
            return jsonify({
                'description': event.description
            })
        return jsonify({}), 404
    
    @app.route('/storylines', methods=['GET'])
    def get_storylines():
        try:
            # Load storylines from the JSON file
            with open('data/storylines.json') as f:
                storylines = json.load(f)
            return jsonify(storylines)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @app.route('/storylines/<character>', methods=['GET'])
    def get_storyline_by_character(character):
        try:
            # Load storylines from the JSON file
            with open('data/storylines.json') as f:
                storylines = json.load(f)

            # Handle URL encoding for spaces
            character_name = character.replace("%20", " ")

            # Search for the character in the 'characters' array
            for char in storylines['characters']:
                if char['name'].lower() == character_name.lower():  # Case-insensitive comparison
                    return jsonify(char)

            # If the character is not found
            return jsonify({"error": f"Storyline not found for character: {character_name}"}), 404

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return app

app = create_app()

if __name__ == '__main__':
    app.run()
