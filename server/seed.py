from app import app, db
from models import Player, Location, Event
import random

def seed_database():
    print("Seeding database...")

    # Clear existing data
    db.drop_all()
    db.create_all()

    # Seed Characters
    characters = [
        {"name": "Media", "strengths": "Access to information, neutral perspective", "weaknesses": "Limited authority, can be targeted", "equipment": "Camera, microphone"},
        {"name": "Rookie Officer", "strengths": "Enthusiasm, training in crowd control", "weaknesses": "Lack of experience, indecisiveness", "equipment": "Tear gas, baton"},
        {"name": "Veteran Officer", "strengths": "Years of experience, leadership skills", "weaknesses": "Physically slower, rigid tactics", "equipment": "Riot shield, radio"},
        {"name": "Protestor", "strengths": "Passion, strong beliefs", "weaknesses": "Limited protection, vulnerability to law enforcement", "equipment": "Placards, banners"},
        {"name": "Politician", "strengths": "Influence, negotiation skills", "weaknesses": "Public scrutiny, divided loyalties", "equipment": "Speeches, bodyguards"}
    ]
    
    for character in characters:
        new_character = Player(
            name=character["name"],
            strengths=character["strengths"],
            weaknesses=character["weaknesses"],
            equipment=character["equipment"],
            score=0
        )
        db.session.add(new_character)
    
    db.session.commit()

    # Seed Locations
    locations = [
        Location(name="Uhuru Park", description="A large recreational park in central Nairobi"),
        Location(name="Kenyatta International Convention Centre", description="An iconic building in Nairobi's skyline"),
        Location(name="Jevanjee Gardens", description="A public park popular with protesters"),
        Location(name="Kamukunji Grounds", description="Historic site for political rallies and protests"),
        Location(name="Harambee Avenue", description="Street near government offices, popular for demonstrations"),
        Location(name="Nyayo House", description="Government building often seen in protests"),
        Location(name="Nairobi Railway Station", description="Major transport hub with political gatherings"),
        Location(name="City Hall Way", description="Government district, scene of many protests"),
        Location(name="Freedom Corner", description="Historic protest site in Uhuru Park"),
        Location(name="KICC Grounds", description="Site for official gatherings and protests"),
        Location(name="Moi Avenue", description="Busy commercial street, often a site of protests"),
        Location(name="Tom Mboya Street", description="Street with frequent protests due to heavy foot traffic"),
        Location(name="Madaraka Estate", description="Neighborhood that has witnessed protests"),
        Location(name="Mathare", description="Residential area prone to political and social unrest"),
        Location(name="Eastleigh", description="Bustling area known for demonstrations"),
        Location(name="Kibera", description="One of the largest informal settlements with frequent protests"),
        Location(name="Westlands", description="Commercial area sometimes impacted by protests"),
        Location(name="Lang'ata", description="Residential area with organized protests"),
        Location(name="University of Nairobi", description="Site of student protests"),
        Location(name="GPO Roundabout", description="Major city center, protest site")
    ]
    
    db.session.add_all(locations)
    db.session.commit()

    # Seed Events
    events = [
        Event(description="A peaceful protest is forming", location_id=1),
        Event(description="Political rally against government reforms", location_id=2),
        Event(description="Student strike at the University of Nairobi", location_id=19),
        Event(description="Police confrontation with protesters", location_id=4),
        Event(description="Civil society group meeting", location_id=5),
        Event(description="Media covering a press conference", location_id=2),
        Event(description="Violence erupts between protestors and law enforcement", location_id=6),
        Event(description="Protest march along Moi Avenue", location_id=11),
        Event(description="Political figures give speeches at KICC", location_id=2),
        Event(description="Environmental activists hold sit-in at Karura Forest", location_id=18),
        Event(description="Activists occupy Kamukunji Grounds", location_id=4),
        Event(description="Police presence intensifies at City Hall Way", location_id=8),
        Event(description="Journalists covering breaking news", location_id=7),
        Event(description="Demonstration in support of education reform", location_id=19),
        Event(description="Protestors demanding better healthcare services", location_id=13),
        Event(description="Unrest in Kibera due to rising food prices", location_id=16),
        Event(description="Protests disrupt traffic at the Nairobi Railway Station", location_id=7),
        Event(description="Clashes between rival political groups", location_id=14),
        Event(description="Protesters demand government accountability", location_id=1),
        Event(description="Teachers strike for higher wages", location_id=15)
    ]
    
    db.session.add_all(events)
    db.session.commit()

    print("Database seeded successfully!")

if __name__ == '__main__':
    with app.app_context():
        seed_database()
