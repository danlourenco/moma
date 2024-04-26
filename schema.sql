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
VALUES ('seed1.jpg', 'R.A. Lourenço', 'Acquired from Storyheights Montessori Preschool', 'Ennui', 2023, 'Crayon on Construction Paper', 'In this emotively provocative oeuvre, the artist delves into the rawest corners of the human experience, juxtaposing the viridity of innocence with the profound complexities of maturation. At its core, the piece serves as a visceral repudiation of the socio-political paradigms that bind our collective consciousness, rendered through a primal exploration of chromatic synergy and textural discord. Each stroke is laden with the existential weight of an unvoiced narrative, challenging the spectator to excavate the deeper truths entangled within this tableau of unfiltered expressionist fervor.', 'seed1.mp3');

