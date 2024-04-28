DROP TABLE IF EXISTS exhibits;
CREATE TABLE IF NOT EXISTS exhibits (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  image_key TEXT, 
  artist TEXT,
  details TEXT,
  title TEXT, 
  year INTEGER,
  medium TEXT,
  artist_statement TEXT, 
  audio_key TEXT
);
INSERT INTO exhibits (image_key, artist, details, title, year, medium, artist_statement, audio_key) 
VALUES ('seed1.jpg', 'R.A. Lourenço', 'Acquired from Storyheights Montessori Preschool', 'Untitled', 2023, 'Crayon on Construction Paper', 'In this avant-garde exploration of the post postmodern psyche, the artist aggressively confronts the existential ennui permeating the zeitgeist of our contemporary epoch. Through a deconstructed labyrinth of line and color, the work subversively critiques the constructs of order and chaos, inviting the viewer to contemplate the Sisyphean struggle inherent in the search for meaning within the quixotic tableau of the human condition. Aptly untitled, the piece embodies a raw and unfettered canvas, daring to juxtapose the innocuousness of its medium with the profound depth of its unspoken narrative.', 'seed1.mp3');
INSERT INTO exhibits (image_key, artist, details, title, year, medium, artist_statement, audio_key) 
VALUES ('seed2.jpg', 'R.A. Lourenço', 'Acquired from Storyheights Montessori Preschool', 'Test2', 2023, 'Crayon on Construction Paper', 'Second artist statement.', 'seed2.mp3');

