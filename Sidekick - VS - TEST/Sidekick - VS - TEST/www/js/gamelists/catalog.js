var Game = (function () {
    this.name = '';
    this.developer = '';
    this.release = '';
    this.players = '';
    this.category = '';
    this.type = '';
    this.order = '';
    this.alternativeName = '';
    this.version = '';
    this.parent = ''
});

var gameCatalog = [];

gameCatalog['Alien vs Predator'] = new Game();
gameCatalog['Alien vs Predator'].name = 'Alien vs Predator';
gameCatalog['Alien vs Predator'].developer = 'Capcom';
gameCatalog['Alien vs Predator'].release = '1994';
gameCatalog['Alien vs Predator'].players = '3';
gameCatalog['Alien vs Predator'].category = 'beatemup';

gameCatalog['Altered Beast'] = new Game();
gameCatalog['Altered Beast'].name = 'Altered Beast';
gameCatalog['Altered Beast'].developer = 'Sega';
gameCatalog['Altered Beast'].release = '1998';
gameCatalog['Altered Beast'].players = '2';
gameCatalog['Altered Beast'].category = 'beatemup';

gameCatalog['Arabian Fight'] = new Game();
gameCatalog['Arabian Fight'].name = 'Arabian Fight';
gameCatalog['Arabian Fight'].developer = 'Sega';
gameCatalog['Arabian Fight'].release = '1992';
gameCatalog['Arabian Fight'].players = '4';
gameCatalog['Arabian Fight'].category = 'beatemup';

gameCatalog['Bad Dudes Vs Dragon Ninja'] = new Game();
gameCatalog['Bad Dudes Vs Dragon Ninja'].name = 'Bad Dudes Vs Dragon Ninja';
gameCatalog['Bad Dudes Vs Dragon Ninja'].developer = 'Data East';
gameCatalog['Bad Dudes Vs Dragon Ninja'].release = 'April 1988';
gameCatalog['Bad Dudes Vs Dragon Ninja'].players = '2';
gameCatalog['Bad Dudes Vs Dragon Ninja'].category = 'beatemup';

gameCatalog['Double Dragon'] = new Game();
gameCatalog['Double Dragon'].name = 'Double Dragon';
gameCatalog['Double Dragon'].developer = 'Technos Japan';
gameCatalog['Double Dragon'].release = 'July 1987';
gameCatalog['Double Dragon'].players = '2';
gameCatalog['Double Dragon'].category = 'beatemup';

gameCatalog['Final Fight'] = new Game();
gameCatalog['Final Fight'].name = 'Final Fight';
gameCatalog['Final Fight'].developer = 'Capcom';
gameCatalog['Final Fight'].release = 'December 1989';
gameCatalog['Final Fight'].players = '2';
gameCatalog['Final Fight'].category = 'beatemup';

gameCatalog['Golden Axe'] = new Game();
gameCatalog['Golden Axe'].name = 'Golden Axe';
gameCatalog['Golden Axe'].developer = 'Sega';
gameCatalog['Golden Axe'].release = 'May 1989';
gameCatalog['Golden Axe'].players = '2';
gameCatalog['Golden Axe'].category = 'beatemup';

gameCatalog['Indiana Jones and The Temple of Doom'] = new Game();
gameCatalog['Indiana Jones and The Temple of Doom'].name = 'Indiana Jones and The Temple of Doom';
gameCatalog['Indiana Jones and The Temple of Doom'].developer = 'Atari';
gameCatalog['Indiana Jones and The Temple of Doom'].release = 'August 1985';
gameCatalog['Indiana Jones and The Temple of Doom'].players = '2';
gameCatalog['Indiana Jones and The Temple of Doom'].category = 'beatemup';

gameCatalog['Karnov'] = new Game();
gameCatalog['Karnov'].name = 'Karnov';
gameCatalog['Karnov'].developer = 'Nihon Bussan';
gameCatalog['Karnov'].release = '1987';
gameCatalog['Karnov'].players = '2';
gameCatalog['Karnov'].category = 'beatemup';

gameCatalog['Kung-Fu Master'] = new Game();
gameCatalog['Kung-Fu Master'].name = 'Kung-Fu Master';
gameCatalog['Kung-Fu Master'].developer = 'Irem';
gameCatalog['Kung-Fu Master'].release = 'December 1984';
gameCatalog['Kung-Fu Master'].players = '2';
gameCatalog['Kung-Fu Master'].category = 'beatemup';

gameCatalog['Ninja Warriors'] = new Game();
gameCatalog['Ninja Warriors'].name = 'Ninja Warriors';
gameCatalog['Ninja Warriors'].developer = 'Taito';
gameCatalog['Ninja Warriors'].release = '1987';
gameCatalog['Ninja Warriors'].players = '1';
gameCatalog['Ninja Warriors'].category = 'beatemup';

gameCatalog['Rygar'] = new Game();
gameCatalog['Rygar'].name = 'Rygar';
gameCatalog['Rygar'].developer = 'Tecmo';
gameCatalog['Rygar'].release = '1986';
gameCatalog['Rygar'].players = '2';
gameCatalog['Rygar'].category = 'beatemup';

gameCatalog['Shadow Warriors'] = new Game();
gameCatalog['Shadow Warriors'].name = 'Shadow Warriors';
gameCatalog['Shadow Warriors'].developer = 'Tecmo';
gameCatalog['Shadow Warriors'].release = '1988';
gameCatalog['Shadow Warriors'].players = '2';
gameCatalog['Shadow Warriors'].category = 'beatemup';

gameCatalog['Shinobi'] = new Game();
gameCatalog['Shinobi'].name = 'Shinobi';
gameCatalog['Shinobi'].developer = 'Sega';
gameCatalog['Shinobi'].release = 'November 1987';
gameCatalog['Shinobi'].players = '2';
gameCatalog['Shinobi'].category = 'beatemup';

gameCatalog['Simpsons'] = new Game();
gameCatalog['Simpsons'].name = 'Simpsons';
gameCatalog['Simpsons'].developer = 'Konami';
gameCatalog['Simpsons'].release = 'MArch 1991';
gameCatalog['Simpsons'].players = '4';
gameCatalog['Simpsons'].category = 'beatemup';

gameCatalog['Splatterhouse'] = new Game();
gameCatalog['Splatterhouse'].name = 'Splatterhouse';
gameCatalog['Splatterhouse'].developer = 'Namco';
gameCatalog['Splatterhouse'].release = '1988';
gameCatalog['Splatterhouse'].players = '2';
gameCatalog['Splatterhouse'].category = 'beatemup';

gameCatalog['Teenage Mutant Ninja Turtles'] = new Game();
gameCatalog['Teenage Mutant Ninja Turtles'].name = 'Teenage Mutant Ninja Turtles';
gameCatalog['Teenage Mutant Ninja Turtles'].developer = 'Konami';
gameCatalog['Teenage Mutant Ninja Turtles'].release = '1989';
gameCatalog['Teenage Mutant Ninja Turtles'].players = '4';
gameCatalog['Teenage Mutant Ninja Turtles'].category = 'beatemup';

gameCatalog['Vendetta'] = new Game();
gameCatalog['Vendetta'].name = 'Vendetta';
gameCatalog['Vendetta'].developer = 'Konami';
gameCatalog['Vendetta'].release = '1991';
gameCatalog['Vendetta'].players = '4';
gameCatalog['Vendetta'].category = 'beatemup';

gameCatalog['X-Men'] = new Game();
gameCatalog['X-Men'].name = 'X-Men';
gameCatalog['X-Men'].developer = 'Komani';
gameCatalog['X-Men'].release = '1992';
gameCatalog['X-Men'].players = '6';
gameCatalog['X-Men'].category = 'beatemup';

gameCatalog['Art Of Fighting 2'] = new Game();
gameCatalog['Art Of Fighting 2'].name = 'Art Of Fighting 2';
gameCatalog['Art Of Fighting 2'].developer = 'SNK';
gameCatalog['Art Of Fighting 2'].release = '1994';
gameCatalog['Art Of Fighting 2'].players = '2';
gameCatalog['Art Of Fighting 2'].category = 'fighting';

gameCatalog['Art Of Fighting 3'] = new Game();
gameCatalog['Art Of Fighting 3'].name = 'Art Of Fighting 3';
gameCatalog['Art Of Fighting 3'].developer = 'SNK';
gameCatalog['Art Of Fighting 3'].release = '1996';
gameCatalog['Art Of Fighting 3'].players = '2';
gameCatalog['Art Of Fighting 3'].category = 'fighting';

gameCatalog['Art Of Fighting'] = new Game();
gameCatalog['Art Of Fighting'].name = 'Art Of Fighting';
gameCatalog['Art Of Fighting'].developer = 'SNK';
gameCatalog['Art Of Fighting'].release = '1992';
gameCatalog['Art Of Fighting'].players = '2';
gameCatalog['Art Of Fighting'].category = 'fighting';

gameCatalog['Karate Champ'] = new Game();
gameCatalog['Karate Champ'].name = 'Karate Champ';
gameCatalog['Karate Champ'].developer = 'Technos Japan';
gameCatalog['Karate Champ'].release = '1984';
gameCatalog['Karate Champ'].players = '2';
gameCatalog['Karate Champ'].category = 'fighting';

gameCatalog['Killer Instinct'] = new Game();
gameCatalog['Killer Instinct'].name = 'Killer Instinct';
gameCatalog['Killer Instinct'].developer = 'Rare';
gameCatalog['Killer Instinct'].release = 'October 1994';
gameCatalog['Killer Instinct'].players = '2';
gameCatalog['Killer Instinct'].category = 'fighting';

gameCatalog['Mortal Kombat 4'] = new Game();
gameCatalog['Mortal Kombat 4'].name = 'Mortal Kombat 4';
gameCatalog['Mortal Kombat 4'].developer = 'Midway';
gameCatalog['Mortal Kombat 4'].release = 'October 1997';
gameCatalog['Mortal Kombat 4'].players = '2';
gameCatalog['Mortal Kombat 4'].category = 'fighting';

gameCatalog['Mortal Kombat II'] = new Game();
gameCatalog['Mortal Kombat II'].name = 'Mortal Kombat II';
gameCatalog['Mortal Kombat II'].developer = 'Midway ames';
gameCatalog['Mortal Kombat II'].release = 'April 1993';
gameCatalog['Mortal Kombat II'].players = '2';
gameCatalog['Mortal Kombat II'].category = 'fighting';

gameCatalog['Soul Calibur'] = new Game();
gameCatalog['Soul Calibur'].name = 'Soul Calibur';
gameCatalog['Soul Calibur'].developer = 'Namco';
gameCatalog['Soul Calibur'].release = '1998';
gameCatalog['Soul Calibur'].players = '2';
gameCatalog['Soul Calibur'].category = 'fighting';

gameCatalog['Street fighter EX 2'] = new Game();
gameCatalog['Street fighter EX 2'].name = 'Street fighter EX 2';
gameCatalog['Street fighter EX 2'].developer = 'Arika';
gameCatalog['Street fighter EX 2'].release = 'May 1996';
gameCatalog['Street fighter EX 2'].players = '2';
gameCatalog['Street fighter EX 2'].category = 'fighting';

gameCatalog['Street fighter II Turbo (Hyperfighting)'] = new Game();
gameCatalog['Street fighter II Turbo (Hyperfighting)'].name = 'Street fighter II Turbo (Hyperfighting)';
gameCatalog['Street fighter II Turbo (Hyperfighting)'].developer = 'Capcom';
gameCatalog['Street fighter II Turbo (Hyperfighting)'].release = 'December 1992';
gameCatalog['Street fighter II Turbo (Hyperfighting)'].players = '2';
gameCatalog['Street fighter II Turbo (Hyperfighting)'].category = 'fighting';

gameCatalog['Street fighter III 3rd Strike'] = new Game();
gameCatalog['Street fighter III 3rd Strike'].name = 'Street fighter III 3rd Strike';
gameCatalog['Street fighter III 3rd Strike'].developer = 'Capcom';
gameCatalog['Street fighter III 3rd Strike'].release = 'May 1999';
gameCatalog['Street fighter III 3rd Strike'].players = '2';
gameCatalog['Street fighter III 3rd Strike'].category = 'fighting';

gameCatalog['Street Fighter IV Arcade Edition'] = new Game();
gameCatalog['Street Fighter IV Arcade Edition'].name = 'Street Fighter IV Arcade Edition';
gameCatalog['Street Fighter IV Arcade Edition'].developer = 'Capcom';
gameCatalog['Street Fighter IV Arcade Edition'].release = 'December 2010';
gameCatalog['Street Fighter IV Arcade Edition'].players = '2';
gameCatalog['Street Fighter IV Arcade Edition'].category = 'fighting';

gameCatalog['Street fighter Zero 2'] = new Game();
gameCatalog['Street fighter Zero 2'].name = 'Street fighter Zero 2';
gameCatalog['Street fighter Zero 2'].developer = 'Capcom';
gameCatalog['Street fighter Zero 2'].release = 'February 1996';
gameCatalog['Street fighter Zero 2'].players = '2';
gameCatalog['Street fighter Zero 2'].category = 'fighting';

gameCatalog['Super Street Fighter II X Grand Master Challenge'] = new Game();
gameCatalog['Super Street Fighter II X Grand Master Challenge'].name = 'Super Street Fighter II X Grand Master Challenge';
gameCatalog['Super Street Fighter II X Grand Master Challenge'].developer = 'Capcom';
gameCatalog['Super Street Fighter II X Grand Master Challenge'].release = '1994';
gameCatalog['Super Street Fighter II X Grand Master Challenge'].players = '2';
gameCatalog['Super Street Fighter II X Grand Master Challenge'].category = 'fighting';

gameCatalog['Tekken 3'] = new Game();
gameCatalog['Tekken 3'].name = 'Tekken 3';
gameCatalog['Tekken 3'].developer = 'Namco';
gameCatalog['Tekken 3'].release = 'March 1997';
gameCatalog['Tekken 3'].players = '2';
gameCatalog['Tekken 3'].category = 'fighting';

gameCatalog['Tekken Tag Tournament'] = new Game();
gameCatalog['Tekken Tag Tournament'].name = 'Tekken Tag Tournament';
gameCatalog['Tekken Tag Tournament'].developer = 'Namco';
gameCatalog['Tekken Tag Tournament'].release = '1999';
gameCatalog['Tekken Tag Tournament'].players = '2';
gameCatalog['Tekken Tag Tournament'].category = 'fighting';

gameCatalog['Virtua Fighter'] = new Game();
gameCatalog['Virtua Fighter'].name = 'Virtua Fighter';
gameCatalog['Virtua Fighter'].developer = 'Sega';
gameCatalog['Virtua Fighter'].release = 'October 1993';
gameCatalog['Virtua Fighter'].players = '2';
gameCatalog['Virtua Fighter'].category = 'fighting';

gameCatalog['WWF Wrestlefest'] = new Game();
gameCatalog['WWF Wrestlefest'].name = 'WWF Wrestlefest';
gameCatalog['WWF Wrestlefest'].developer = 'Technos Japan';
gameCatalog['WWF Wrestlefest'].release = 'June 1991';
gameCatalog['WWF Wrestlefest'].players = '4';
gameCatalog['WWF Wrestlefest'].category = 'fighting';

gameCatalog['Yie Ar Kung Fu'] = new Game();
gameCatalog['Yie Ar Kung Fu'].name = 'Yie Ar Kung Fu';
gameCatalog['Yie Ar Kung Fu'].developer = 'Konami';
gameCatalog['Yie Ar Kung Fu'].release = '1985';
gameCatalog['Yie Ar Kung Fu'].players = '2';
gameCatalog['Yie Ar Kung Fu'].category = 'fighting';

gameCatalog['Alien 3 The Gun'] = new Game();
gameCatalog['Alien 3 The Gun'].name = 'Alien 3 The Gun';
gameCatalog['Alien 3 The Gun'].developer = 'Sega';
gameCatalog['Alien 3 The Gun'].release = '1993';
gameCatalog['Alien 3 The Gun'].players = '2';
gameCatalog['Alien 3 The Gun'].category = 'guns';

gameCatalog['Area 51'] = new Game();
gameCatalog['Area 51'].name = 'Area 51';
gameCatalog['Area 51'].developer = 'Mesa Logic';
gameCatalog['Area 51'].release = '1995';
gameCatalog['Area 51'].players = '2';
gameCatalog['Area 51'].category = 'guns';

gameCatalog['Crisis Zone'] = new Game();
gameCatalog['Crisis Zone'].name = 'Crisis Zone';
gameCatalog['Crisis Zone'].developer = 'Namco';
gameCatalog['Crisis Zone'].release = 'March 1999';
gameCatalog['Crisis Zone'].players = '1';
gameCatalog['Crisis Zone'].category = 'guns';

gameCatalog['Crossbow'] = new Game();
gameCatalog['Crossbow'].name = 'Crossbow';
gameCatalog['Crossbow'].developer = 'Exidy';
gameCatalog['Crossbow'].release = '1983';
gameCatalog['Crossbow'].players = '2';
gameCatalog['Crossbow'].category = 'guns';

gameCatalog['House of the dead 2'] = new Game();
gameCatalog['House of the dead 2'].name = 'House of the dead 2';
gameCatalog['House of the dead 2'].developer = 'Wow Entertainment';
gameCatalog['House of the dead 2'].release = 'November 1998';
gameCatalog['House of the dead 2'].players = '2';
gameCatalog['House of the dead 2'].category = 'guns';

gameCatalog['House of the dead 4'] = new Game();
gameCatalog['House of the dead 4'].name = 'House of the dead 4';
gameCatalog['House of the dead 4'].developer = 'Wow Entertainment';
gameCatalog['House of the dead 4'].release = '2005';
gameCatalog['House of the dead 4'].players = '2';
gameCatalog['House of the dead 4'].category = 'guns';

gameCatalog['Lethal Enforcers'] = new Game();
gameCatalog['Lethal Enforcers'].name = 'Lethal Enforcers';
gameCatalog['Lethal Enforcers'].developer = 'Konami';
gameCatalog['Lethal Enforcers'].release = 'October 1992';
gameCatalog['Lethal Enforcers'].players = '2';
gameCatalog['Lethal Enforcers'].category = 'guns';

gameCatalog['Mechanized Attack'] = new Game();
gameCatalog['Mechanized Attack'].name = 'Mechanized Attack';
gameCatalog['Mechanized Attack'].developer = 'SNK';
gameCatalog['Mechanized Attack'].release = '1989';
gameCatalog['Mechanized Attack'].players = '1';
gameCatalog['Mechanized Attack'].category = 'guns';

gameCatalog['Operation Thunderbolt'] = new Game();
gameCatalog['Operation Thunderbolt'].name = 'Operation Thunderbolt';
gameCatalog['Operation Thunderbolt'].developer = 'Taito';
gameCatalog['Operation Thunderbolt'].release = '1988';
gameCatalog['Operation Thunderbolt'].players = '2';
gameCatalog['Operation Thunderbolt'].category = 'guns';

gameCatalog['Operation Wolf'] = new Game();
gameCatalog['Operation Wolf'].name = 'Operation Wolf';
gameCatalog['Operation Wolf'].developer = 'Taito';
gameCatalog['Operation Wolf'].release = '1987';
gameCatalog['Operation Wolf'].players = '1';
gameCatalog['Operation Wolf'].category = 'guns';

gameCatalog['Point Blank 2'] = new Game();
gameCatalog['Point Blank 2'].name = 'Point Blank 2';
gameCatalog['Point Blank 2'].developer = 'Namco';
gameCatalog['Point Blank 2'].release = '1999';
gameCatalog['Point Blank 2'].players = '2';
gameCatalog['Point Blank 2'].category = 'guns';

gameCatalog['Point Blank'] = new Game();
gameCatalog['Point Blank'].name = 'Point Blank';
gameCatalog['Point Blank'].developer = 'Namco';
gameCatalog['Point Blank'].release = 'October 1994';
gameCatalog['Point Blank'].players = '2';
gameCatalog['Point Blank'].category = 'guns';

gameCatalog['Police Trainer'] = new Game();
gameCatalog['Police Trainer'].name = 'Police Trainer';
gameCatalog['Police Trainer'].developer = 'P&P Marketing';
gameCatalog['Police Trainer'].release = '1997';
gameCatalog['Police Trainer'].players = '2';
gameCatalog['Police Trainer'].category = 'guns';

gameCatalog['Quick and Crash'] = new Game();
gameCatalog['Quick and Crash'].name = 'Quick and Crash';
gameCatalog['Quick and Crash'].developer = 'Namco';
gameCatalog['Quick and Crash'].release = '1999';
gameCatalog['Quick and Crash'].players = '1';
gameCatalog['Quick and Crash'].category = 'guns';
gameCatalog['Quick and Crash'].type = 'time';
gameCatalog['Quick and Crash'].order = 'lowest';

gameCatalog['Silent Scope'] = new Game();
gameCatalog['Silent Scope'].name = 'Silent Scope';
gameCatalog['Silent Scope'].developer = 'Konami';
gameCatalog['Silent Scope'].release = '1999';
gameCatalog['Silent Scope'].players = '1';
gameCatalog['Silent Scope'].category = 'guns';

gameCatalog['Terminator 2 Judgement Day'] = new Game();
gameCatalog['Terminator 2 Judgement Day'].name = 'Terminator 2 Judgement Day';
gameCatalog['Terminator 2 Judgement Day'].developer = 'Midway';
gameCatalog['Terminator 2 Judgement Day'].release = '1991';
gameCatalog['Terminator 2 Judgement Day'].players = '2';
gameCatalog['Terminator 2 Judgement Day'].category = 'guns';

gameCatalog['Time Crisis II'] = new Game();
gameCatalog['Time Crisis II'].name = 'Time Crisis II';
gameCatalog['Time Crisis II'].developer = 'Namco';
gameCatalog['Time Crisis II'].release = '1997';
gameCatalog['Time Crisis II'].players = '2';
gameCatalog['Time Crisis II'].category = 'guns';

gameCatalog['Time Crisis'] = new Game();
gameCatalog['Time Crisis'].name = 'Time Crisis';
gameCatalog['Time Crisis'].developer = 'Namco';
gameCatalog['Time Crisis'].release = '1996';
gameCatalog['Time Crisis'].players = '1';
gameCatalog['Time Crisis'].category = 'guns';

gameCatalog['Black Tiger'] = new Game();
gameCatalog['Black Tiger'].name = 'Black Tiger';
gameCatalog['Black Tiger'].developer = 'Capcom';
gameCatalog['Black Tiger'].release = '1987';
gameCatalog['Black Tiger'].players = '2';
gameCatalog['Black Tiger'].category = 'hackandslash';

gameCatalog['Gauntlet II'] = new Game();
gameCatalog['Gauntlet II'].name = 'Gauntlet II';
gameCatalog['Gauntlet II'].developer = 'Atari';
gameCatalog['Gauntlet II'].release = '1986';
gameCatalog['Gauntlet II'].players = '4';
gameCatalog['Gauntlet II'].category = 'hackandslash';

gameCatalog['Gauntlet Legends'] = new Game();
gameCatalog['Gauntlet Legends'].name = 'Gauntlet Legends';
gameCatalog['Gauntlet Legends'].developer = 'Atari';
gameCatalog['Gauntlet Legends'].release = 'October 1998';
gameCatalog['Gauntlet Legends'].players = '4';
gameCatalog['Gauntlet Legends'].category = 'hackandslash';

gameCatalog['Gauntlet'] = new Game();
gameCatalog['Gauntlet'].name = 'Gauntlet';
gameCatalog['Gauntlet'].developer = 'Atari';
gameCatalog['Gauntlet'].release = 'October 1985';
gameCatalog['Gauntlet'].players = '4';
gameCatalog['Gauntlet'].category = 'hackandslash';

gameCatalog['Rastan Saga'] = new Game();
gameCatalog['Rastan Saga'].name = 'Rastan Saga';
gameCatalog['Rastan Saga'].developer = 'Taito';
gameCatalog['Rastan Saga'].release = '1987';
gameCatalog['Rastan Saga'].players = '1';
gameCatalog['Rastan Saga'].category = 'hackandslash';

gameCatalog['Adventures of Robby Roto'] = new Game();
gameCatalog['Adventures of Robby Roto'].name = 'Adventures of Robby Roto';
gameCatalog['Adventures of Robby Roto'].developer = 'Bally Midway';
gameCatalog['Adventures of Robby Roto'].release = '1981';
gameCatalog['Adventures of Robby Roto'].players = '2';
gameCatalog['Adventures of Robby Roto'].category = 'maze';

gameCatalog['Amidar'] = new Game();
gameCatalog['Amidar'].name = 'Amidar';
gameCatalog['Amidar'].developer = 'Konami';
gameCatalog['Amidar'].release = '1981';
gameCatalog['Amidar'].players = '2';
gameCatalog['Amidar'].category = 'maze';

gameCatalog['AntEater'] = new Game();
gameCatalog['AntEater'].name = 'AntEater';
gameCatalog['AntEater'].developer = 'Stern Electronics';
gameCatalog['AntEater'].release = '1982';
gameCatalog['AntEater'].players = '2';
gameCatalog['AntEater'].category = 'maze';

gameCatalog['Crystal Castles'] = new Game();
gameCatalog['Crystal Castles'].name = 'Crystal Castles';
gameCatalog['Crystal Castles'].developer = 'Atari';
gameCatalog['Crystal Castles'].release = '1983';
gameCatalog['Crystal Castles'].players = '2';
gameCatalog['Crystal Castles'].category = 'maze';

gameCatalog['Dig Dug II'] = new Game();
gameCatalog['Dig Dug II'].name = 'Dig Dug II';
gameCatalog['Dig Dug II'].developer = 'Namco';
gameCatalog['Dig Dug II'].release = '1985';
gameCatalog['Dig Dug II'].players = '2';
gameCatalog['Dig Dug II'].category = 'maze';

gameCatalog['Dig Dug'] = new Game();
gameCatalog['Dig Dug'].name = 'Dig Dug';
gameCatalog['Dig Dug'].developer = 'Namco';
gameCatalog['Dig Dug'].release = 'April 1982';
gameCatalog['Dig Dug'].players = '2';
gameCatalog['Dig Dug'].category = 'maze';

gameCatalog['Eyes'] = new Game();
gameCatalog['Eyes'].name = 'Eyes';
gameCatalog['Eyes'].developer = 'Digitrex Techstar';
gameCatalog['Eyes'].release = '1982';
gameCatalog['Eyes'].players = '2';
gameCatalog['Eyes'].category = 'maze';

gameCatalog['Jr Pac-Man'] = new Game();
gameCatalog['Jr Pac-Man'].name = 'Jr Pac-Man';
gameCatalog['Jr Pac-Man'].developer = 'Namco';
gameCatalog['Jr Pac-Man'].release = '1983';
gameCatalog['Jr Pac-Man'].players = '2';
gameCatalog['Jr Pac-Man'].category = 'maze';

gameCatalog['Jr Pac-Man - Speed up hack'] = new Game();
gameCatalog['Jr Pac-Man - Speed up hack'].name = 'Jr Pac-Man - Speed up hack';
gameCatalog['Jr Pac-Man - Speed up hack'].developer = 'Namco';
gameCatalog['Jr Pac-Man - Speed up hack'].release = '1983';
gameCatalog['Jr Pac-Man - Speed up hack'].players = '2';
gameCatalog['Jr Pac-Man - Speed up hack'].category = 'maze';
gameCatalog['Jr Pac-Man - Speed up hack'].version = 'Speed up hack';
gameCatalog['Jr Pac-Man - Speed up hack'].parent = 'Jr Pac-Man';

gameCatalog['Ladybug'] = new Game();
gameCatalog['Ladybug'].name = 'Ladybug';
gameCatalog['Ladybug'].developer = 'Universal';
gameCatalog['Ladybug'].release = '1981';
gameCatalog['Ladybug'].players = '2';
gameCatalog['Ladybug'].category = 'maze';

gameCatalog['Macho Mouse'] = new Game();
gameCatalog['Macho Mouse'].name = 'Macho Mouse';
gameCatalog['Macho Mouse'].developer = 'Techstar';
gameCatalog['Macho Mouse'].release = '1982';
gameCatalog['Macho Mouse'].players = '2';
gameCatalog['Macho Mouse'].category = 'maze';

gameCatalog['Make Trax'] = new Game();
gameCatalog['Make Trax'].name = 'Make Trax';
gameCatalog['Make Trax'].developer = 'Alpha Denshi';
gameCatalog['Make Trax'].release = '1981';
gameCatalog['Make Trax'].players = '2';
gameCatalog['Make Trax'].category = 'maze';

gameCatalog['Mr Do!'] = new Game();
gameCatalog['Mr Do!'].name = 'Mr Do!';
gameCatalog['Mr Do!'].developer = 'Universal';
gameCatalog['Mr Do!'].release = 'October 1982';
gameCatalog['Mr Do!'].players = '1';
gameCatalog['Mr Do!'].category = 'maze';

gameCatalog['Ms Pac-Man'] = new Game();
gameCatalog['Ms Pac-Man'].name = 'Ms Pac-Man';
gameCatalog['Ms Pac-Man'].developer = 'Bally-Midway';
gameCatalog['Ms Pac-Man'].release = 'January 1981';
gameCatalog['Ms Pac-Man'].players = '2';
gameCatalog['Ms Pac-Man'].category = 'maze';

gameCatalog['Ms Pac-Man'] = new Game();
gameCatalog['Ms Pac-Man'].name = 'Ms Pac-Man';
gameCatalog['Ms Pac-Man'].developer = 'Bally-Midway';
gameCatalog['Ms Pac-Man'].release = 'January 1981';
gameCatalog['Ms Pac-Man'].players = '2';
gameCatalog['Ms Pac-Man'].category = 'maze';

gameCatalog['Ms Pac-Man - Speed up hack'] = new Game();
gameCatalog['Ms Pac-Man - Speed up hack'].name = 'Ms Pac-Man - Speed up hack';
gameCatalog['Ms Pac-Man - Speed up hack'].developer = 'Bally-Midway';
gameCatalog['Ms Pac-Man - Speed up hack'].release = 'January 1981';
gameCatalog['Ms Pac-Man - Speed up hack'].players = '2';
gameCatalog['Ms Pac-Man - Speed up hack'].category = 'maze';
gameCatalog['Ms Pac-Man - Speed up hack'].version = 'Speed up hack';
gameCatalog['Ms Pac-Man - Speed up hack'].parent = 'Ms Pac-Man';

gameCatalog['New Rally X'] = new Game();
gameCatalog['New Rally X'].name = 'New Rally X';
gameCatalog['New Rally X'].developer = 'Namco';
gameCatalog['New Rally X'].release = '1981';
gameCatalog['New Rally X'].players = '2';
gameCatalog['New Rally X'].category = 'maze';

gameCatalog['Pac-man Battle Royale'] = new Game();
gameCatalog['Pac-man Battle Royale'].name = 'Pac-man Battle Royale';
gameCatalog['Pac-man Battle Royale'].developer = 'Namco';
gameCatalog['Pac-man Battle Royale'].release = '2011';
gameCatalog['Pac-man Battle Royale'].players = '4';
gameCatalog['Pac-man Battle Royale'].category = 'maze';

gameCatalog['Pac-Man'] = new Game();
gameCatalog['Pac-Man'].name = 'Pac-Man';
gameCatalog['Pac-Man'].developer = 'Namco';
gameCatalog['Pac-Man'].release = 'May 1980';
gameCatalog['Pac-Man'].players = '1';
gameCatalog['Pac-Man'].category = 'maze';

gameCatalog['Pac-Man - Speed up hack'] = new Game();
gameCatalog['Pac-Man - Speed up hack'].name = 'Pac-Man - Speed up hack';
gameCatalog['Pac-Man - Speed up hack'].developer = 'Namco';
gameCatalog['Pac-Man - Speed up hack'].release = 'May 1980';
gameCatalog['Pac-Man - Speed up hack'].players = '1';
gameCatalog['Pac-Man - Speed up hack'].category = 'maze';
gameCatalog['Pac-Man - Speed up hack'].version = 'Speed up hack';
gameCatalog['Pac-Man - Speed up hack'].parent = 'Pac-Man';

gameCatalog['Pac-mania'] = new Game();
gameCatalog['Pac-mania'].name = 'Pac-mania';
gameCatalog['Pac-mania'].developer = 'Namco';
gameCatalog['Pac-mania'].release = 'November 1987';
gameCatalog['Pac-mania'].players = '2';
gameCatalog['Pac-mania'].category = 'maze';

gameCatalog['Pac And Paint'] = new Game();
gameCatalog['Pac And Paint'].name = 'Pac And Paint';
gameCatalog['Pac And Paint'].developer = 'Kural electronics';
gameCatalog['Pac And Paint'].release = '1986';
gameCatalog['Pac And Paint'].players = '2';
gameCatalog['Pac And Paint'].category = 'maze';

gameCatalog['Pengo'] = new Game();
gameCatalog['Pengo'].name = 'Pengo';
gameCatalog['Pengo'].developer = 'Sega';
gameCatalog['Pengo'].release = '1982';
gameCatalog['Pengo'].players = '2';
gameCatalog['Pengo'].category = 'maze';

gameCatalog['Pepper II'] = new Game();
gameCatalog['Pepper II'].name = 'Pepper II';
gameCatalog['Pepper II'].developer = 'Exidy';
gameCatalog['Pepper II'].release = '1982';
gameCatalog['Pepper II'].players = '2';
gameCatalog['Pepper II'].category = 'maze';

gameCatalog['Rally X'] = new Game();
gameCatalog['Rally X'].name = 'Rally X';
gameCatalog['Rally X'].developer = 'Namco';
gameCatalog['Rally X'].release = 'November 1980';
gameCatalog['Rally X'].players = '2';
gameCatalog['Rally X'].category = 'maze';

gameCatalog['Sindbad Mystery'] = new Game();
gameCatalog['Sindbad Mystery'].name = 'Sindbad Mystery';
gameCatalog['Sindbad Mystery'].developer = 'Sega';
gameCatalog['Sindbad Mystery'].release = '1983';
gameCatalog['Sindbad Mystery'].players = '2';
gameCatalog['Sindbad Mystery'].category = 'maze';

gameCatalog['Super Pac-Man'] = new Game();
gameCatalog['Super Pac-Man'].name = 'Super Pac-Man';
gameCatalog['Super Pac-Man'].developer = 'Namco';
gameCatalog['Super Pac-Man'].release = '1982';
gameCatalog['Super Pac-Man'].players = '2';
gameCatalog['Super Pac-Man'].category = 'maze';

gameCatalog['Tank Battalion'] = new Game();
gameCatalog['Tank Battalion'].name = 'Tank Battalion';
gameCatalog['Tank Battalion'].developer = 'Namco';
gameCatalog['Tank Battalion'].release = '1981';
gameCatalog['Tank Battalion'].players = '2';
gameCatalog['Tank Battalion'].category = 'maze';

gameCatalog['The Pit'] = new Game();
gameCatalog['The Pit'].name = 'The Pit';
gameCatalog['The Pit'].developer = 'Centuri';
gameCatalog['The Pit'].release = '1981';
gameCatalog['The Pit'].players = '2';
gameCatalog['The Pit'].category = 'maze';

gameCatalog['Tutankham'] = new Game();
gameCatalog['Tutankham'].name = 'Tutankham';
gameCatalog['Tutankham'].developer = 'Konami';
gameCatalog['Tutankham'].release = '1982';
gameCatalog['Tutankham'].players = '2';
gameCatalog['Tutankham'].category = 'maze';

gameCatalog['Van Van Car'] = new Game();
gameCatalog['Van Van Car'].name = 'Van Van Car';
gameCatalog['Van Van Car'].developer = 'Karateco';
gameCatalog['Van Van Car'].release = '1983';
gameCatalog['Van Van Car'].players = '2';
gameCatalog['Van Van Car'].category = 'maze';

gameCatalog['Arkanoid Revenge of Doh'] = new Game();
gameCatalog['Arkanoid Revenge of Doh'].name = 'Arkanoid Revenge of Doh';
gameCatalog['Arkanoid Revenge of Doh'].developer = 'Taito';
gameCatalog['Arkanoid Revenge of Doh'].release = '1987';
gameCatalog['Arkanoid Revenge of Doh'].players = '2';
gameCatalog['Arkanoid Revenge of Doh'].category = 'misc';

gameCatalog['Arkanoid'] = new Game();
gameCatalog['Arkanoid'].name = 'Arkanoid';
gameCatalog['Arkanoid'].developer = 'Taito';
gameCatalog['Arkanoid'].release = '1986';
gameCatalog['Arkanoid'].players = '2';
gameCatalog['Arkanoid'].category = 'misc';

gameCatalog['Balloon Fight'] = new Game();
gameCatalog['Balloon Fight'].name = 'Balloon Fight';
gameCatalog['Balloon Fight'].developer = 'Nintendo';
gameCatalog['Balloon Fight'].release = '1984';
gameCatalog['Balloon Fight'].players = '2';
gameCatalog['Balloon Fight'].category = 'misc';

gameCatalog['Ice Cold Beer'] = new Game();
gameCatalog['Ice Cold Beer'].name = 'Ice Cold Beer';
gameCatalog['Ice Cold Beer'].developer = 'Taito';
gameCatalog['Ice Cold Beer'].release = '1983';
gameCatalog['Ice Cold Beer'].players = '1';
gameCatalog['Ice Cold Beer'].category = 'misc';

gameCatalog['Marble Madness'] = new Game();
gameCatalog['Marble Madness'].name = 'Marble Madness';
gameCatalog['Marble Madness'].developer = 'Atari';
gameCatalog['Marble Madness'].release = 'November 1984';
gameCatalog['Marble Madness'].players = '2';
gameCatalog['Marble Madness'].category = 'misc';

gameCatalog['Michael Jacksons Moonwalker'] = new Game();
gameCatalog['Michael Jacksons Moonwalker'].name = 'Michael Jacksons Moonwalker';
gameCatalog['Michael Jacksons Moonwalker'].developer = 'Emerald,Keypunch';
gameCatalog['Michael Jacksons Moonwalker'].release = 'July 1990';
gameCatalog['Michael Jacksons Moonwalker'].players = '1';
gameCatalog['Michael Jacksons Moonwalker'].category = 'misc';

gameCatalog['Monkey Mole Panic'] = new Game();
gameCatalog['Monkey Mole Panic'].name = 'Monkey Mole Panic';
gameCatalog['Monkey Mole Panic'].developer = 'Taito';
gameCatalog['Monkey Mole Panic'].release = '1992';
gameCatalog['Monkey Mole Panic'].players = '2';
gameCatalog['Monkey Mole Panic'].category = 'misc';

gameCatalog['Paperboy'] = new Game();
gameCatalog['Paperboy'].name = 'Paperboy';
gameCatalog['Paperboy'].developer = 'Atari';
gameCatalog['Paperboy'].release = 'April 1985';
gameCatalog['Paperboy'].players = '2';
gameCatalog['Paperboy'].category = 'misc';

gameCatalog['Qix'] = new Game();
gameCatalog['Qix'].name = 'Qix';
gameCatalog['Qix'].developer = 'Taito';
gameCatalog['Qix'].release = '1981';
gameCatalog['Qix'].players = '2';
gameCatalog['Qix'].category = 'misc';

gameCatalog['Super Bishi Bashi Champ'] = new Game();
gameCatalog['Super Bishi Bashi Champ'].name = 'Super Bishi Bashi Champ';
gameCatalog['Super Bishi Bashi Champ'].developer = 'Konami';
gameCatalog['Super Bishi Bashi Champ'].release = '1998';
gameCatalog['Super Bishi Bashi Champ'].players = '2';
gameCatalog['Super Bishi Bashi Champ'].category = 'misc';

gameCatalog['Super Table Flip 2'] = new Game();
gameCatalog['Super Table Flip 2'].name = 'Super Table Flip 2';
gameCatalog['Super Table Flip 2'].developer = 'Taito';
gameCatalog['Super Table Flip 2'].release = '2010';
gameCatalog['Super Table Flip 2'].players = '2';
gameCatalog['Super Table Flip 2'].category = 'misc';

gameCatalog['Swimmer'] = new Game();
gameCatalog['Swimmer'].name = 'Swimmer';
gameCatalog['Swimmer'].developer = 'Tehkan';
gameCatalog['Swimmer'].release = '1982';
gameCatalog['Swimmer'].players = '2';
gameCatalog['Swimmer'].category = 'misc';

gameCatalog['Tapper'] = new Game();
gameCatalog['Tapper'].name = 'Tapper';
gameCatalog['Tapper'].developer = 'Marvin Glass';
gameCatalog['Tapper'].release = '1983';
gameCatalog['Tapper'].players = '2';
gameCatalog['Tapper'].category = 'misc';

gameCatalog['Thunder and Lightning'] = new Game();
gameCatalog['Thunder and Lightning'].name = 'Thunder and Lightning';
gameCatalog['Thunder and Lightning'].developer = 'Seta';
gameCatalog['Thunder and Lightning'].release = '1990';
gameCatalog['Thunder and Lightning'].players = '2';
gameCatalog['Thunder and Lightning'].category = 'misc';

gameCatalog['Venture'] = new Game();
gameCatalog['Venture'].name = 'Venture';
gameCatalog['Venture'].developer = 'Exidy';
gameCatalog['Venture'].release = '1981';
gameCatalog['Venture'].players = '2';
gameCatalog['Venture'].category = 'misc';

gameCatalog['Arabian'] = new Game();
gameCatalog['Arabian'].name = 'Arabian';
gameCatalog['Arabian'].developer = 'Atari';
gameCatalog['Arabian'].release = '1983';
gameCatalog['Arabian'].players = '2';
gameCatalog['Arabian'].category = 'platformer';

gameCatalog['Bomb Jack'] = new Game();
gameCatalog['Bomb Jack'].name = 'Bomb Jack';
gameCatalog['Bomb Jack'].developer = 'Tehkan';
gameCatalog['Bomb Jack'].release = '1984';
gameCatalog['Bomb Jack'].players = '2';
gameCatalog['Bomb Jack'].category = 'platformer';

gameCatalog['Bubble Bobble'] = new Game();
gameCatalog['Bubble Bobble'].name = 'Bubble Bobble';
gameCatalog['Bubble Bobble'].developer = 'Taito';
gameCatalog['Bubble Bobble'].release = 'August 1986';
gameCatalog['Bubble Bobble'].players = '2';
gameCatalog['Bubble Bobble'].category = 'platformer';

gameCatalog['Burger Time'] = new Game();
gameCatalog['Burger Time'].name = 'Burger Time';
gameCatalog['Burger Time'].developer = 'Data East';
gameCatalog['Burger Time'].release = 'June 1982';
gameCatalog['Burger Time'].players = '2';
gameCatalog['Burger Time'].category = 'platformer';

gameCatalog['Crazy Kong'] = new Game();
gameCatalog['Crazy Kong'].name = 'Crazy Kong';
gameCatalog['Crazy Kong'].developer = 'Falcon';
gameCatalog['Crazy Kong'].release = '1981';
gameCatalog['Crazy Kong'].players = '2';
gameCatalog['Crazy Kong'].category = 'platformer';

gameCatalog['Donkey Kong 3'] = new Game();
gameCatalog['Donkey Kong 3'].name = 'Donkey Kong 3';
gameCatalog['Donkey Kong 3'].developer = 'Nintendo';
gameCatalog['Donkey Kong 3'].release = '1983';
gameCatalog['Donkey Kong 3'].players = '2';
gameCatalog['Donkey Kong 3'].category = 'platformer';

gameCatalog['Donkey Kong Jr'] = new Game();
gameCatalog['Donkey Kong Jr'].name = 'Donkey Kong Jr';
gameCatalog['Donkey Kong Jr'].developer = 'Nintendo';
gameCatalog['Donkey Kong Jr'].release = '1982';
gameCatalog['Donkey Kong Jr'].players = '2';
gameCatalog['Donkey Kong Jr'].category = 'platformer';

gameCatalog['Donkey Kong'] = new Game();
gameCatalog['Donkey Kong'].name = 'Donkey Kong';
gameCatalog['Donkey Kong'].developer = 'Nintendo';
gameCatalog['Donkey Kong'].release = 'July 1981';
gameCatalog['Donkey Kong'].players = '2';
gameCatalog['Donkey Kong'].category = 'platformer';

gameCatalog['Flicky'] = new Game();
gameCatalog['Flicky'].name = 'Flicky';
gameCatalog['Flicky'].developer = 'Sega';
gameCatalog['Flicky'].release = '1984';
gameCatalog['Flicky'].players = '1';
gameCatalog['Flicky'].category = 'platformer';

gameCatalog['Frogger'] = new Game();
gameCatalog['Frogger'].name = 'Frogger';
gameCatalog['Frogger'].developer = 'Konami';
gameCatalog['Frogger'].release = 'June 1981';
gameCatalog['Frogger'].players = '2';
gameCatalog['Frogger'].category = 'platformer';

gameCatalog['Ghouls n Ghosts'] = new Game();
gameCatalog['Ghouls n Ghosts'].name = 'Ghouls n Ghosts';
gameCatalog['Ghouls n Ghosts'].developer = 'Capcom';
gameCatalog['Ghouls n Ghosts'].release = 'December 1988';
gameCatalog['Ghouls n Ghosts'].players = '2';
gameCatalog['Ghouls n Ghosts'].category = 'platformer';

gameCatalog['Hunchback'] = new Game();
gameCatalog['Hunchback'].name = 'Hunchback';
gameCatalog['Hunchback'].developer = 'Century Electronics';
gameCatalog['Hunchback'].release = '1983';
gameCatalog['Hunchback'].players = '2';
gameCatalog['Hunchback'].category = 'platformer';

gameCatalog['Joust 2'] = new Game();
gameCatalog['Joust 2'].name = 'Joust 2';
gameCatalog['Joust 2'].developer = 'Williams Electronics';
gameCatalog['Joust 2'].release = 'July 1986';
gameCatalog['Joust 2'].players = '2';
gameCatalog['Joust 2'].category = 'platformer';

gameCatalog['Joust'] = new Game();
gameCatalog['Joust'].name = 'Joust';
gameCatalog['Joust'].developer = 'Williams Electronics';
gameCatalog['Joust'].release = 'July 1982';
gameCatalog['Joust'].players = '2';
gameCatalog['Joust'].category = 'platformer';

gameCatalog['Jungle Hunt'] = new Game();
gameCatalog['Jungle Hunt'].name = 'Jungle Hunt';
gameCatalog['Jungle Hunt'].developer = 'Atari';
gameCatalog['Jungle Hunt'].release = '1982';
gameCatalog['Jungle Hunt'].players = '2';
gameCatalog['Jungle Hunt'].category = 'platformer';

gameCatalog['Kangaroo'] = new Game();
gameCatalog['Kangaroo'].name = 'Kangaroo';
gameCatalog['Kangaroo'].developer = 'Atari';
gameCatalog['Kangaroo'].release = '1982';
gameCatalog['Kangaroo'].players = '1';
gameCatalog['Kangaroo'].category = 'platformer';

gameCatalog['Kaos'] = new Game();
gameCatalog['Kaos'].name = 'Kaos';
gameCatalog['Kaos'].developer = 'Taito';
gameCatalog['Kaos'].release = '1981';
gameCatalog['Kaos'].players = '2';
gameCatalog['Kaos'].category = 'platformer';

gameCatalog['Mappy'] = new Game();
gameCatalog['Mappy'].name = 'Mappy';
gameCatalog['Mappy'].developer = 'Namco';
gameCatalog['Mappy'].release = 'March 1983';
gameCatalog['Mappy'].players = '2';
gameCatalog['Mappy'].category = 'platformer';

gameCatalog['Mario-bros'] = new Game();
gameCatalog['Mario-bros'].name = 'Mario-bros';
gameCatalog['Mario-bros'].developer = 'Nintendo';
gameCatalog['Mario-bros'].release = 'June 1983';
gameCatalog['Mario-bros'].players = '2';
gameCatalog['Mario-bros'].category = 'platformer';

gameCatalog['Mighty Pang'] = new Game();
gameCatalog['Mighty Pang'].name = 'Mighty Pang';
gameCatalog['Mighty Pang'].developer = 'Capcom';
gameCatalog['Mighty Pang'].release = '2000';
gameCatalog['Mighty Pang'].players = '1';
gameCatalog['Mighty Pang'].category = 'platformer';

gameCatalog['Monkey Ball'] = new Game();
gameCatalog['Monkey Ball'].name = 'Monkey Ball';
gameCatalog['Monkey Ball'].developer = 'Sega';
gameCatalog['Monkey Ball'].release = '2000';
gameCatalog['Monkey Ball'].players = '2';
gameCatalog['Monkey Ball'].category = 'platformer';

gameCatalog['Mr Dos Castle'] = new Game();
gameCatalog['Mr Dos Castle'].name = 'Mr Dos Castle';
gameCatalog['Mr Dos Castle'].developer = 'Universal';
gameCatalog['Mr Dos Castle'].release = '1983';
gameCatalog['Mr Dos Castle'].players = '2';
gameCatalog['Mr Dos Castle'].category = 'platformer';

gameCatalog['New Zealand Story'] = new Game();
gameCatalog['New Zealand Story'].name = 'New Zealand Story';
gameCatalog['New Zealand Story'].developer = 'Taito';
gameCatalog['New Zealand Story'].release = 'September 1988';
gameCatalog['New Zealand Story'].players = '2';
gameCatalog['New Zealand Story'].category = 'platformer';

gameCatalog['Ninja Spirit'] = new Game();
gameCatalog['Ninja Spirit'].name = 'Ninja Spirit';
gameCatalog['Ninja Spirit'].developer = 'Irem';
gameCatalog['Ninja Spirit'].release = '1988';
gameCatalog['Ninja Spirit'].players = '1';
gameCatalog['Ninja Spirit'].category = 'platformer';

gameCatalog['Osman'] = new Game();
gameCatalog['Osman'].name = 'Osman';
gameCatalog['Osman'].developer = 'Mitchell Corporation';
gameCatalog['Osman'].release = '1996';
gameCatalog['Osman'].players = '1';
gameCatalog['Osman'].category = 'platformer';

gameCatalog['Pac-Land'] = new Game();
gameCatalog['Pac-Land'].name = 'Pac-Land';
gameCatalog['Pac-Land'].developer = 'Namco';
gameCatalog['Pac-Land'].release = 'August 1984';
gameCatalog['Pac-Land'].players = '2';
gameCatalog['Pac-Land'].category = 'platformer';

gameCatalog['Popeye'] = new Game();
gameCatalog['Popeye'].name = 'Popeye';
gameCatalog['Popeye'].developer = 'Nintendo';
gameCatalog['Popeye'].release = '1983';
gameCatalog['Popeye'].players = '2';
gameCatalog['Popeye'].category = 'platformer';

gameCatalog['Quartet'] = new Game();
gameCatalog['Quartet'].name = 'Quartet';
gameCatalog['Quartet'].developer = 'Sega';
gameCatalog['Quartet'].release = 'April 1986';
gameCatalog['Quartet'].players = '4';
gameCatalog['Quartet'].category = 'platformer';

gameCatalog['Rainbow Islands'] = new Game();
gameCatalog['Rainbow Islands'].name = 'Rainbow Islands';
gameCatalog['Rainbow Islands'].developer = 'Taito';
gameCatalog['Rainbow Islands'].release = '1987';
gameCatalog['Rainbow Islands'].players = '2';
gameCatalog['Rainbow Islands'].category = 'platformer';

gameCatalog['Rampage'] = new Game();
gameCatalog['Rampage'].name = 'Rampage';
gameCatalog['Rampage'].developer = 'Bally Midway';
gameCatalog['Rampage'].release = '1986';
gameCatalog['Rampage'].players = '3';
gameCatalog['Rampage'].category = 'platformer';

gameCatalog['Snow Bros'] = new Game();
gameCatalog['Snow Bros'].name = 'Snow Bros';
gameCatalog['Snow Bros'].developer = 'Toaplan';
gameCatalog['Snow Bros'].release = '1990';
gameCatalog['Snow Bros'].players = '2';
gameCatalog['Snow Bros'].category = 'platformer';

gameCatalog['Strider'] = new Game();
gameCatalog['Strider'].name = 'Strider';
gameCatalog['Strider'].developer = 'Capcom';
gameCatalog['Strider'].release = '1989';
gameCatalog['Strider'].players = '2';
gameCatalog['Strider'].category = 'platformer';

gameCatalog['The Goonies'] = new Game();
gameCatalog['The Goonies'].name = 'The Goonies';
gameCatalog['The Goonies'].developer = 'Konami';
gameCatalog['The Goonies'].release = '1986';
gameCatalog['The Goonies'].players = '1';
gameCatalog['The Goonies'].category = 'platformer';

gameCatalog['The Wiz'] = new Game();
gameCatalog['The Wiz'].name = 'The Wiz';
gameCatalog['The Wiz'].developer = 'Seibu Kaihatsu';
gameCatalog['The Wiz'].release = '1985';
gameCatalog['The Wiz'].players = '2';
gameCatalog['The Wiz'].category = 'platformer';

gameCatalog['Wardner'] = new Game();
gameCatalog['Wardner'].name = 'Wardner';
gameCatalog['Wardner'].developer = 'Taito';
gameCatalog['Wardner'].release = '1987';
gameCatalog['Wardner'].players = '2';
gameCatalog['Wardner'].category = 'platformer';

gameCatalog['Wonderboy in Monsterland'] = new Game();
gameCatalog['Wonderboy in Monsterland'].name = 'Wonderboy in Monsterland';
gameCatalog['Wonderboy in Monsterland'].developer = 'Sega';
gameCatalog['Wonderboy in Monsterland'].release = '1987';
gameCatalog['Wonderboy in Monsterland'].players = '2';
gameCatalog['Wonderboy in Monsterland'].category = 'platformer';

gameCatalog['Wonderboy'] = new Game();
gameCatalog['Wonderboy'].name = 'Wonderboy';
gameCatalog['Wonderboy'].developer = 'Escape';
gameCatalog['Wonderboy'].release = 'April 1986';
gameCatalog['Wonderboy'].players = '1';
gameCatalog['Wonderboy'].category = 'platformer';

gameCatalog['Zoo Keeper'] = new Game();
gameCatalog['Zoo Keeper'].name = 'Zoo Keeper';
gameCatalog['Zoo Keeper'].developer = 'Taito';
gameCatalog['Zoo Keeper'].release = '1982';
gameCatalog['Zoo Keeper'].players = '2';
gameCatalog['Zoo Keeper'].category = 'platformer';

gameCatalog['Atomic Punk 2 Global Quest'] = new Game();
gameCatalog['Atomic Punk 2 Global Quest'].name = 'Atomic Punk 2 Global Quest';
gameCatalog['Atomic Punk 2 Global Quest'].developer = 'Irem';
gameCatalog['Atomic Punk 2 Global Quest'].release = '1992';
gameCatalog['Atomic Punk 2 Global Quest'].players = '4';
gameCatalog['Atomic Punk 2 Global Quest'].category = 'puzzle';

gameCatalog['Bubbles'] = new Game();
gameCatalog['Bubbles'].name = 'Bubbles';
gameCatalog['Bubbles'].developer = 'Williams';
gameCatalog['Bubbles'].release = '1982';
gameCatalog['Bubbles'].players = '2';
gameCatalog['Bubbles'].category = 'puzzle';

gameCatalog['Faster Harder More Challenging Q-Bert'] = new Game();
gameCatalog['Faster Harder More Challenging Q-Bert'].name = 'Faster Harder More Challenging Q-Bert';
gameCatalog['Faster Harder More Challenging Q-Bert'].developer = 'Mylstar';
gameCatalog['Faster Harder More Challenging Q-Bert'].release = '1983';
gameCatalog['Faster Harder More Challenging Q-Bert'].players = '2';
gameCatalog['Faster Harder More Challenging Q-Bert'].category = 'puzzle';

gameCatalog['KLAX'] = new Game();
gameCatalog['KLAX'].name = 'KLAX';
gameCatalog['KLAX'].developer = 'Atari';
gameCatalog['KLAX'].release = '1989';
gameCatalog['KLAX'].players = '2';
gameCatalog['KLAX'].category = 'puzzle';

gameCatalog['Minky Monkey'] = new Game();
gameCatalog['Minky Monkey'].name = 'Minky Monkey';
gameCatalog['Minky Monkey'].developer = 'Technos';
gameCatalog['Minky Monkey'].release = '1982';
gameCatalog['Minky Monkey'].players = '2';
gameCatalog['Minky Monkey'].category = 'puzzle';

gameCatalog['Puzzle Bobble'] = new Game();
gameCatalog['Puzzle Bobble'].name = 'Puzzle Bobble';
gameCatalog['Puzzle Bobble'].developer = 'Taito';
gameCatalog['Puzzle Bobble'].release = '1994';
gameCatalog['Puzzle Bobble'].players = '2';
gameCatalog['Puzzle Bobble'].category = 'puzzle';

gameCatalog['Q-Bert'] = new Game();
gameCatalog['Q-Bert'].name = 'Q-Bert';
gameCatalog['Q-Bert'].developer = 'Gottlieb';
gameCatalog['Q-Bert'].release = 'October 1982';
gameCatalog['Q-Bert'].players = '2';
gameCatalog['Q-Bert'].category = 'puzzle';

gameCatalog['Super Puzzle Fighter II Turbo'] = new Game();
gameCatalog['Super Puzzle Fighter II Turbo'].name = 'Super Puzzle Fighter II Turbo';
gameCatalog['Super Puzzle Fighter II Turbo'].developer = 'Capcom';
gameCatalog['Super Puzzle Fighter II Turbo'].release = '1996';
gameCatalog['Super Puzzle Fighter II Turbo'].players = '2';
gameCatalog['Super Puzzle Fighter II Turbo'].category = 'puzzle';

gameCatalog['Tetris'] = new Game();
gameCatalog['Tetris'].name = 'Tetris';
gameCatalog['Tetris'].developer = 'List';
gameCatalog['Tetris'].release = 'June 1984';
gameCatalog['Tetris'].players = '2';
gameCatalog['Tetris'].category = 'puzzle';

gameCatalog['18 Wheeler american Pro Trucker'] = new Game();
gameCatalog['18 Wheeler american Pro Trucker'].name = '18 Wheeler american Pro Trucker';
gameCatalog['18 Wheeler american Pro Trucker'].developer = 'Sega';
gameCatalog['18 Wheeler american Pro Trucker'].release = 'July 2000';
gameCatalog['18 Wheeler american Pro Trucker'].players = '1';
gameCatalog['18 Wheeler american Pro Trucker'].category = 'racing';

gameCatalog['A. B. Cop'] = new Game();
gameCatalog['A. B. Cop'].name = 'A. B. Cop';
gameCatalog['A. B. Cop'].developer = 'Aicom';
gameCatalog['A. B. Cop'].release = '1990';
gameCatalog['A. B. Cop'].players = '1';
gameCatalog['A. B. Cop'].category = 'racing';

gameCatalog['All Points Bulletin'] = new Game();
gameCatalog['All Points Bulletin'].name = 'All Points Bulletin';
gameCatalog['All Points Bulletin'].developer = 'Atari';
gameCatalog['All Points Bulletin'].release = '1987';
gameCatalog['All Points Bulletin'].players = '1';
gameCatalog['All Points Bulletin'].category = 'racing';

gameCatalog['Badlands'] = new Game();
gameCatalog['Badlands'].name = 'Badlands';
gameCatalog['Badlands'].developer = 'Atari';
gameCatalog['Badlands'].release = '1989';
gameCatalog['Badlands'].players = '2';
gameCatalog['Badlands'].category = 'racing';

gameCatalog['Buggy Boy'] = new Game();
gameCatalog['Buggy Boy'].name = 'Buggy Boy';
gameCatalog['Buggy Boy'].developer = 'Tatsumi';
gameCatalog['Buggy Boy'].release = '1985';
gameCatalog['Buggy Boy'].players = '1';
gameCatalog['Buggy Boy'].category = 'racing';

gameCatalog['Bump n Jump'] = new Game();
gameCatalog['Bump n Jump'].name = 'Bump n Jump';
gameCatalog['Bump n Jump'].developer = 'Data East';
gameCatalog['Bump n Jump'].release = '1982';
gameCatalog['Bump n Jump'].players = '2';
gameCatalog['Bump n Jump'].category = 'racing';

gameCatalog['Championship Sprint'] = new Game();
gameCatalog['Championship Sprint'].name = 'Championship Sprint';
gameCatalog['Championship Sprint'].developer = 'Atari';
gameCatalog['Championship Sprint'].release = '1986';
gameCatalog['Championship Sprint'].players = '2';
gameCatalog['Championship Sprint'].category = 'racing';

gameCatalog['Chase H Q'] = new Game();
gameCatalog['Chase H Q'].name = 'Chase H Q';
gameCatalog['Chase H Q'].developer = 'Taito';
gameCatalog['Chase H Q'].release = 'October 1988';
gameCatalog['Chase H Q'].players = '1';
gameCatalog['Chase H Q'].category = 'racing';

gameCatalog['Crazy Taxi'] = new Game();
gameCatalog['Crazy Taxi'].name = 'Crazy Taxi';
gameCatalog['Crazy Taxi'].developer = 'Sega';
gameCatalog['Crazy Taxi'].release = '1999';
gameCatalog['Crazy Taxi'].players = '1';
gameCatalog['Crazy Taxi'].category = 'racing';

gameCatalog['Cruisn World'] = new Game();
gameCatalog['Cruisn World'].name = 'Cruisn World';
gameCatalog['Cruisn World'].developer = 'Midway';
gameCatalog['Cruisn World'].release = '1996';
gameCatalog['Cruisn World'].players = '4';
gameCatalog['Cruisn World'].category = 'racing';

gameCatalog['Daytona USA'] = new Game();
gameCatalog['Daytona USA'].name = 'Daytona USA';
gameCatalog['Daytona USA'].developer = 'Sega';
gameCatalog['Daytona USA'].release = 'August 1993';
gameCatalog['Daytona USA'].players = '1';
gameCatalog['Daytona USA'].category = 'racing';

gameCatalog['Enduro Racer'] = new Game();
gameCatalog['Enduro Racer'].name = 'Enduro Racer';
gameCatalog['Enduro Racer'].developer = 'Sega';
gameCatalog['Enduro Racer'].release = '1986';
gameCatalog['Enduro Racer'].players = '1';
gameCatalog['Enduro Racer'].category = 'racing';

gameCatalog['Hard Drivin'] = new Game();
gameCatalog['Hard Drivin'].name = 'Hard Drivin';
gameCatalog['Hard Drivin'].developer = 'Atari';
gameCatalog['Hard Drivin'].release = 'February 1989';
gameCatalog['Hard Drivin'].players = '2';
gameCatalog['Hard Drivin'].category = 'racing';

gameCatalog['Hot Rod'] = new Game();
gameCatalog['Hot Rod'].name = 'Hot Rod';
gameCatalog['Hot Rod'].developer = 'Sega';
gameCatalog['Hot Rod'].release = '1988';
gameCatalog['Hot Rod'].players = '4';
gameCatalog['Hot Rod'].category = 'racing';

gameCatalog['Indy 500'] = new Game();
gameCatalog['Indy 500'].name = 'Indy 500';
gameCatalog['Indy 500'].developer = 'Sega';
gameCatalog['Indy 500'].release = 'July 1995';
gameCatalog['Indy 500'].players = '2';
gameCatalog['Indy 500'].category = 'racing';

gameCatalog['Initial D8'] = new Game();
gameCatalog['Initial D8'].name = 'Initial D8';
gameCatalog['Initial D8'].developer = 'Sega';
gameCatalog['Initial D8'].release = '2014';
gameCatalog['Initial D8'].players = '2';
gameCatalog['Initial D8'].category = 'racing';

gameCatalog['Motocross Go'] = new Game();
gameCatalog['Motocross Go'].name = 'Motocross Go';
gameCatalog['Motocross Go'].developer = 'Namco';
gameCatalog['Motocross Go'].release = '1998';
gameCatalog['Motocross Go'].players = '1';
gameCatalog['Motocross Go'].category = 'racing';

gameCatalog['Neo Drift Out New Technology'] = new Game();
gameCatalog['Neo Drift Out New Technology'].name = 'Neo Drift Out New Technology';
gameCatalog['Neo Drift Out New Technology'].developer = 'SNK';
gameCatalog['Neo Drift Out New Technology'].release = '1996';
gameCatalog['Neo Drift Out New Technology'].players = '1';
gameCatalog['Neo Drift Out New Technology'].category = 'racing';
gameCatalog['Neo Drift Out New Technology'].type = 'time';
gameCatalog['Neo Drift Out New Technology'].order = 'lowest';

gameCatalog['Out Run 2'] = new Game();
gameCatalog['Out Run 2'].name = 'Out Run 2';
gameCatalog['Out Run 2'].developer = 'Sega';
gameCatalog['Out Run 2'].release = 'December 2001';
gameCatalog['Out Run 2'].players = '2';
gameCatalog['Out Run 2'].category = 'racing';

gameCatalog['Out Run'] = new Game();
gameCatalog['Out Run'].name = 'Out Run';
gameCatalog['Out Run'].developer = 'Sega';
gameCatalog['Out Run'].release = 'September 1986';
gameCatalog['Out Run'].players = '1';
gameCatalog['Out Run'].category = 'racing';

gameCatalog['Outrunners'] = new Game();
gameCatalog['Outrunners'].name = 'Outrunners';
gameCatalog['Outrunners'].developer = 'Sega';
gameCatalog['Outrunners'].release = 'May 1992';
gameCatalog['Outrunners'].players = '1';
gameCatalog['Outrunners'].category = 'racing';

gameCatalog['Pole Position'] = new Game();
gameCatalog['Pole Position'].name = 'Pole Position';
gameCatalog['Pole Position'].developer = 'Namco';
gameCatalog['Pole Position'].release = 'July 1982';
gameCatalog['Pole Position'].players = '1';
gameCatalog['Pole Position'].category = 'racing';

gameCatalog['Power Drift'] = new Game();
gameCatalog['Power Drift'].name = 'Power Drift';
gameCatalog['Power Drift'].developer = 'Sega';
gameCatalog['Power Drift'].release = '1988';
gameCatalog['Power Drift'].players = '1';
gameCatalog['Power Drift'].category = 'racing';

gameCatalog['Rave Racer'] = new Game();
gameCatalog['Rave Racer'].name = 'Rave Racer';
gameCatalog['Rave Racer'].developer = 'Namco';
gameCatalog['Rave Racer'].release = 'July 1995';
gameCatalog['Rave Racer'].players = '2';
gameCatalog['Rave Racer'].category = 'racing';

gameCatalog['Road Blasters'] = new Game();
gameCatalog['Road Blasters'].name = 'Road Blasters';
gameCatalog['Road Blasters'].developer = 'Atari';
gameCatalog['Road Blasters'].release = '1984';
gameCatalog['Road Blasters'].players = '1';
gameCatalog['Road Blasters'].category = 'racing';

gameCatalog['Round Up 5 Super Delta Force'] = new Game();
gameCatalog['Round Up 5 Super Delta Force'].name = 'Round Up 5 Super Delta Force';
gameCatalog['Round Up 5 Super Delta Force'].developer = 'Data East';
gameCatalog['Round Up 5 Super Delta Force'].release = '1988';
gameCatalog['Round Up 5 Super Delta Force'].players = '1';
gameCatalog['Round Up 5 Super Delta Force'].category = 'racing';

gameCatalog['S.T.U.N. Runner'] = new Game();
gameCatalog['S.T.U.N. Runner'].name = 'S.T.U.N. Runner';
gameCatalog['S.T.U.N. Runner'].developer = 'Atari';
gameCatalog['S.T.U.N. Runner'].release = 'September 1989';
gameCatalog['S.T.U.N. Runner'].players = '1';
gameCatalog['S.T.U.N. Runner'].category = 'racing';

gameCatalog['Sega Rally'] = new Game();
gameCatalog['Sega Rally'].name = 'Sega Rally';
gameCatalog['Sega Rally'].developer = 'Sega';
gameCatalog['Sega Rally'].release = '1994';
gameCatalog['Sega Rally'].players = '2';
gameCatalog['Sega Rally'].category = 'racing';

gameCatalog['Special criminal Investigation'] = new Game();
gameCatalog['Special criminal Investigation'].name = 'Special criminal Investigation';
gameCatalog['Special criminal Investigation'].developer = 'Taito';
gameCatalog['Special criminal Investigation'].release = '1989';
gameCatalog['Special criminal Investigation'].players = '1';
gameCatalog['Special criminal Investigation'].category = 'racing';

gameCatalog['Speed Buggy'] = new Game();
gameCatalog['Speed Buggy'].name = 'Speed Buggy';
gameCatalog['Speed Buggy'].developer = 'Tatsumi';
gameCatalog['Speed Buggy'].release = '1985';
gameCatalog['Speed Buggy'].players = '1';
gameCatalog['Speed Buggy'].category = 'racing';

gameCatalog['Spy Hunter'] = new Game();
gameCatalog['Spy Hunter'].name = 'Spy Hunter';
gameCatalog['Spy Hunter'].developer = 'Bally Midway';
gameCatalog['Spy Hunter'].release = '1983';
gameCatalog['Spy Hunter'].players = '1';
gameCatalog['Spy Hunter'].category = 'racing';

gameCatalog['Super bug'] = new Game();
gameCatalog['Super bug'].name = 'Super bug';
gameCatalog['Super bug'].developer = 'Atari';
gameCatalog['Super bug'].release = 'September 1977';
gameCatalog['Super bug'].players = '1';
gameCatalog['Super bug'].category = 'racing';

gameCatalog['Super chase Criminal Termination'] = new Game();
gameCatalog['Super chase Criminal Termination'].name = 'Super chase Criminal Termination';
gameCatalog['Super chase Criminal Termination'].developer = 'Taito';
gameCatalog['Super chase Criminal Termination'].release = '1992';
gameCatalog['Super chase Criminal Termination'].players = '1';
gameCatalog['Super chase Criminal Termination'].category = 'racing';

gameCatalog['Super Hang On'] = new Game();
gameCatalog['Super Hang On'].name = 'Super Hang On';
gameCatalog['Super Hang On'].developer = 'Sega';
gameCatalog['Super Hang On'].release = '1987';
gameCatalog['Super Hang On'].players = '1';
gameCatalog['Super Hang On'].category = 'racing';

gameCatalog['Super Off Road'] = new Game();
gameCatalog['Super Off Road'].name = 'Super Off Road';
gameCatalog['Super Off Road'].developer = 'Rare';
gameCatalog['Super Off Road'].release = '1989';
gameCatalog['Super Off Road'].players = '3';
gameCatalog['Super Off Road'].category = 'racing';

gameCatalog['The Fast And The Furious'] = new Game();
gameCatalog['The Fast And The Furious'].name = 'The Fast And The Furious';
gameCatalog['The Fast And The Furious'].developer = 'Raw Thrills/Taito';
gameCatalog['The Fast And The Furious'].release = '2004';
gameCatalog['The Fast And The Furious'].players = '1';
gameCatalog['The Fast And The Furious'].category = 'racing';

gameCatalog['Turbo Out Run'] = new Game();
gameCatalog['Turbo Out Run'].name = 'Turbo Out Run';
gameCatalog['Turbo Out Run'].developer = 'Sega';
gameCatalog['Turbo Out Run'].release = 'February 1989';
gameCatalog['Turbo Out Run'].players = '1';
gameCatalog['Turbo Out Run'].category = 'racing';

gameCatalog['WEC Le Mans'] = new Game();
gameCatalog['WEC Le Mans'].name = 'WEC Le Mans';
gameCatalog['WEC Le Mans'].developer = 'Konami';
gameCatalog['WEC Le Mans'].release = 'September 1986';
gameCatalog['WEC Le Mans'].players = '1';
gameCatalog['WEC Le Mans'].category = 'racing';

gameCatalog['Wild Riders'] = new Game();
gameCatalog['Wild Riders'].name = 'Wild Riders';
gameCatalog['Wild Riders'].developer = 'Sega';
gameCatalog['Wild Riders'].release = '2001';
gameCatalog['Wild Riders'].players = '1';
gameCatalog['Wild Riders'].category = 'racing';

gameCatalog['World Rally'] = new Game();
gameCatalog['World Rally'].name = 'World Rally';
gameCatalog['World Rally'].developer = 'Atari';
gameCatalog['World Rally'].release = '1993';
gameCatalog['World Rally'].players = '1';
gameCatalog['World Rally'].category = 'racing';

gameCatalog['Dance Stage Euromix'] = new Game();
gameCatalog['Dance Stage Euromix'].name = 'Dance Stage Euromix';
gameCatalog['Dance Stage Euromix'].developer = 'Konami';
gameCatalog['Dance Stage Euromix'].release = '1999';
gameCatalog['Dance Stage Euromix'].players = '2';
gameCatalog['Dance Stage Euromix'].category = 'rhythm';

gameCatalog['Drum Master'] = new Game();
gameCatalog['Drum Master'].name = 'Drum Master';
gameCatalog['Drum Master'].developer = 'Namco';
gameCatalog['Drum Master'].release = '2004';
gameCatalog['Drum Master'].players = '2';
gameCatalog['Drum Master'].category = 'rhythm';

gameCatalog['Future Tomtom'] = new Game();
gameCatalog['Future Tomtom'].name = 'Future Tomtom';
gameCatalog['Future Tomtom'].developer = 'Konami';
gameCatalog['Future Tomtom'].release = '2013';
gameCatalog['Future Tomtom'].players = '2';
gameCatalog['Future Tomtom'].category = 'rhythm';

gameCatalog['Groove Coaster 3'] = new Game();
gameCatalog['Groove Coaster 3'].name = 'Groove Coaster 3';
gameCatalog['Groove Coaster 3'].developer = 'Taito';
gameCatalog['Groove Coaster 3'].release = '2016';
gameCatalog['Groove Coaster 3'].players = '1';
gameCatalog['Groove Coaster 3'].category = 'rhythm';

gameCatalog['Groove coaster'] = new Game();
gameCatalog['Groove coaster'].name = 'Groove coaster';
gameCatalog['Groove coaster'].developer = 'Matrix Software';
gameCatalog['Groove coaster'].release = '2011';
gameCatalog['Groove coaster'].players = '1';
gameCatalog['Groove coaster'].category = 'rhythm';

gameCatalog['Guitar Hero'] = new Game();
gameCatalog['Guitar Hero'].name = 'Guitar Hero';
gameCatalog['Guitar Hero'].developer = 'Williams';
gameCatalog['Guitar Hero'].release = '2009';
gameCatalog['Guitar Hero'].players = '2';
gameCatalog['Guitar Hero'].category = 'rhythm';

gameCatalog['Jubeat Qubell'] = new Game();
gameCatalog['Jubeat Qubell'].name = 'Jubeat Qubell';
gameCatalog['Jubeat Qubell'].developer = 'Konami';
gameCatalog['Jubeat Qubell'].release = '2016';
gameCatalog['Jubeat Qubell'].players = '2';
gameCatalog['Jubeat Qubell'].category = 'rhythm';

gameCatalog['Museca'] = new Game();
gameCatalog['Museca'].name = 'Museca';
gameCatalog['Museca'].developer = 'Konami';
gameCatalog['Museca'].release = '2015';
gameCatalog['Museca'].players = '1';
gameCatalog['Museca'].category = 'rhythm';

gameCatalog['Pop n Music Party'] = new Game();
gameCatalog['Pop n Music Party'].name = 'Pop n Music Party';
gameCatalog['Pop n Music Party'].developer = 'Konami';
gameCatalog['Pop n Music Party'].release = '2008';
gameCatalog['Pop n Music Party'].players = '2';
gameCatalog['Pop n Music Party'].category = 'rhythm';

gameCatalog['Pump It Up Fiesta 2'] = new Game();
gameCatalog['Pump It Up Fiesta 2'].name = 'Pump It Up Fiesta 2';
gameCatalog['Pump It Up Fiesta 2'].developer = 'Andamiro';
gameCatalog['Pump It Up Fiesta 2'].release = 'November 2012';
gameCatalog['Pump It Up Fiesta 2'].players = '2';
gameCatalog['Pump It Up Fiesta 2'].category = 'rhythm';

gameCatalog['Reflec Beat Volzza'] = new Game();
gameCatalog['Reflec Beat Volzza'].name = 'Reflec Beat Volzza';
gameCatalog['Reflec Beat Volzza'].developer = 'Konami';
gameCatalog['Reflec Beat Volzza'].release = '2015';
gameCatalog['Reflec Beat Volzza'].players = '1';
gameCatalog['Reflec Beat Volzza'].category = 'rhythm';

gameCatalog['Rhythm Tengoku'] = new Game();
gameCatalog['Rhythm Tengoku'].name = 'Rhythm Tengoku';
gameCatalog['Rhythm Tengoku'].developer = 'Nintendo';
gameCatalog['Rhythm Tengoku'].release = '2006';
gameCatalog['Rhythm Tengoku'].players = '2';
gameCatalog['Rhythm Tengoku'].category = 'rhythm';

gameCatalog['Alien Storm'] = new Game();
gameCatalog['Alien Storm'].name = 'Alien Storm';
gameCatalog['Alien Storm'].developer = 'Sega';
gameCatalog['Alien Storm'].release = '1990';
gameCatalog['Alien Storm'].players = '3';
gameCatalog['Alien Storm'].category = 'runandgun';

gameCatalog['Aliens'] = new Game();
gameCatalog['Aliens'].name = 'Aliens';
gameCatalog['Aliens'].developer = 'Komani';
gameCatalog['Aliens'].release = '1990';
gameCatalog['Aliens'].players = '2';
gameCatalog['Aliens'].category = 'runandgun';

gameCatalog['Commando'] = new Game();
gameCatalog['Commando'].name = 'Commando';
gameCatalog['Commando'].developer = 'Capcom';
gameCatalog['Commando'].release = 'May 1985';
gameCatalog['Commando'].players = '1';
gameCatalog['Commando'].category = 'runandgun';

gameCatalog['Crack Down'] = new Game();
gameCatalog['Crack Down'].name = 'Crack Down';
gameCatalog['Crack Down'].developer = 'Sega';
gameCatalog['Crack Down'].release = '1989';
gameCatalog['Crack Down'].players = '2';
gameCatalog['Crack Down'].category = 'runandgun';

gameCatalog['Gryzor'] = new Game();
gameCatalog['Gryzor'].name = 'Gryzor';
gameCatalog['Gryzor'].developer = 'Konami';
gameCatalog['Gryzor'].release = '1987';
gameCatalog['Gryzor'].players = '2';
gameCatalog['Gryzor'].category = 'runandgun';

gameCatalog['Ikari Warriors'] = new Game();
gameCatalog['Ikari Warriors'].name = 'Ikari Warriors';
gameCatalog['Ikari Warriors'].developer = 'SNK';
gameCatalog['Ikari Warriors'].release = '1986';
gameCatalog['Ikari Warriors'].players = '2';
gameCatalog['Ikari Warriors'].category = 'runandgun';

gameCatalog['Mercs'] = new Game();
gameCatalog['Mercs'].name = 'Mercs';
gameCatalog['Mercs'].developer = 'Capcom';
gameCatalog['Mercs'].release = '1990';
gameCatalog['Mercs'].players = '2';
gameCatalog['Mercs'].category = 'runandgun';

gameCatalog['Metal Slug 3'] = new Game();
gameCatalog['Metal Slug 3'].name = 'Metal Slug 3';
gameCatalog['Metal Slug 3'].developer = 'SNK';
gameCatalog['Metal Slug 3'].release = '2000';
gameCatalog['Metal Slug 3'].players = '2';
gameCatalog['Metal Slug 3'].category = 'runandgun';

gameCatalog['Metal Slug 6'] = new Game();
gameCatalog['Metal Slug 6'].name = 'Metal Slug 6';
gameCatalog['Metal Slug 6'].developer = 'Sega';
gameCatalog['Metal Slug 6'].release = '2006';
gameCatalog['Metal Slug 6'].players = '2';
gameCatalog['Metal Slug 6'].category = 'runandgun';

gameCatalog['Metal Slug'] = new Game();
gameCatalog['Metal Slug'].name = 'Metal Slug';
gameCatalog['Metal Slug'].developer = 'SNK';
gameCatalog['Metal Slug'].release = '1996';
gameCatalog['Metal Slug'].players = '2';
gameCatalog['Metal Slug'].category = 'runandgun';

gameCatalog['Midnight Resistance'] = new Game();
gameCatalog['Midnight Resistance'].name = 'Midnight Resistance';
gameCatalog['Midnight Resistance'].developer = 'Data East';
gameCatalog['Midnight Resistance'].release = '1989';
gameCatalog['Midnight Resistance'].players = '2';
gameCatalog['Midnight Resistance'].category = 'runandgun';

gameCatalog['Rolling Thunder'] = new Game();
gameCatalog['Rolling Thunder'].name = 'Rolling Thunder';
gameCatalog['Rolling Thunder'].developer = 'Namco';
gameCatalog['Rolling Thunder'].release = 'December 1986';
gameCatalog['Rolling Thunder'].players = '2';
gameCatalog['Rolling Thunder'].category = 'runandgun';

gameCatalog['Rush N Attack'] = new Game();
gameCatalog['Rush N Attack'].name = 'Rush N Attack';
gameCatalog['Rush N Attack'].developer = 'Konami';
gameCatalog['Rush N Attack'].release = '1985';
gameCatalog['Rush N Attack'].players = '2';
gameCatalog['Rush N Attack'].category = 'runandgun';
gameCatalog['Rush N Attack'].alternativeName = "Green Beret";

gameCatalog['Sunset Riders'] = new Game();
gameCatalog['Sunset Riders'].name = 'Sunset Riders';
gameCatalog['Sunset Riders'].developer = 'Konami';
gameCatalog['Sunset Riders'].release = 'September 1991';
gameCatalog['Sunset Riders'].players = '2';
gameCatalog['Sunset Riders'].category = 'runandgun';

gameCatalog['1942'] = new Game();
gameCatalog['1942'].name = '1942';
gameCatalog['1942'].developer = 'Capcom';
gameCatalog['1942'].release = 'December 1984';
gameCatalog['1942'].players = '1';
gameCatalog['1942'].category = 'shooter';

gameCatalog['1943'] = new Game();
gameCatalog['1943'].name = '1943';
gameCatalog['1943'].developer = 'Capcom';
gameCatalog['1943'].release = 'June 1987';
gameCatalog['1943'].players = '2';
gameCatalog['1943'].category = 'shooter';

gameCatalog['19XX'] = new Game();
gameCatalog['19XX'].name = '19XX';
gameCatalog['19XX'].developer = 'Capcom';
gameCatalog['19XX'].release = 'January 1996';
gameCatalog['19XX'].players = '2';
gameCatalog['19XX'].category = 'shooter';

gameCatalog['Aero Fighters 2'] = new Game();
gameCatalog['Aero Fighters 2'].name = 'Aero Fighters 2';
gameCatalog['Aero Fighters 2'].developer = 'Video System';
gameCatalog['Aero Fighters 2'].release = '1994';
gameCatalog['Aero Fighters 2'].players = '2';
gameCatalog['Aero Fighters 2'].category = 'shooter';

gameCatalog['Aero Fighters 3'] = new Game();
gameCatalog['Aero Fighters 3'].name = 'Aero Fighters 3';
gameCatalog['Aero Fighters 3'].developer = 'Video System';
gameCatalog['Aero Fighters 3'].release = '1995';
gameCatalog['Aero Fighters 3'].players = '2';
gameCatalog['Aero Fighters 3'].category = 'shooter';

gameCatalog['Aero Fighters Special'] = new Game();
gameCatalog['Aero Fighters Special'].name = 'Aero Fighters Special';
gameCatalog['Aero Fighters Special'].developer = 'Video System';
gameCatalog['Aero Fighters Special'].release = '1997';
gameCatalog['Aero Fighters Special'].players = '2';
gameCatalog['Aero Fighters Special'].category = 'shooter';

gameCatalog['Aero Fighters'] = new Game();
gameCatalog['Aero Fighters'].name = 'Aero Fighters';
gameCatalog['Aero Fighters'].developer = 'Video System';
gameCatalog['Aero Fighters'].release = '1992';
gameCatalog['Aero Fighters'].players = '2';
gameCatalog['Aero Fighters'].category = 'shooter';

gameCatalog['After Burner II'] = new Game();
gameCatalog['After Burner II'].name = 'After Burner II';
gameCatalog['After Burner II'].developer = 'Sega';
gameCatalog['After Burner II'].release = '1987';
gameCatalog['After Burner II'].players = '1';
gameCatalog['After Burner II'].category = 'shooter';

gameCatalog['Air Buster'] = new Game();
gameCatalog['Air Buster'].name = 'Air Buster';
gameCatalog['Air Buster'].developer = 'Kaneko';
gameCatalog['Air Buster'].release = '1990';
gameCatalog['Air Buster'].players = '2';
gameCatalog['Air Buster'].category = 'shooter';

gameCatalog['Alcon'] = new Game();
gameCatalog['Alcon'].name = 'Alcon';
gameCatalog['Alcon'].developer = 'Taito';
gameCatalog['Alcon'].release = '1986';
gameCatalog['Alcon'].players = '2';
gameCatalog['Alcon'].category = 'shooter';
gameCatalog['Alcon'].alternativeName = 'Slap Fight';

gameCatalog['Apache 3'] = new Game();
gameCatalog['Apache 3'].name = 'Apache 3';
gameCatalog['Apache 3'].developer = 'Tatsumi';
gameCatalog['Apache 3'].release = '1998';
gameCatalog['Apache 3'].players = '1';
gameCatalog['Apache 3'].category = 'shooter';

gameCatalog['Aqua Jack'] = new Game();
gameCatalog['Aqua Jack'].name = 'Aqua Jack';
gameCatalog['Aqua Jack'].developer = 'Tatsumi';
gameCatalog['Aqua Jack'].release = '1989';
gameCatalog['Aqua Jack'].players = '1';
gameCatalog['Aqua Jack'].category = 'shooter';

gameCatalog['Argus'] = new Game();
gameCatalog['Argus'].name = 'Argus';
gameCatalog['Argus'].developer = 'NMK';
gameCatalog['Argus'].release = '1986';
gameCatalog['Argus'].players = '2';
gameCatalog['Argus'].category = 'shooter';

gameCatalog['Armed Police Batrider'] = new Game();
gameCatalog['Armed Police Batrider'].name = 'Armed Police Batrider';
gameCatalog['Armed Police Batrider'].developer = 'Raizing';
gameCatalog['Armed Police Batrider'].release = '1998';
gameCatalog['Armed Police Batrider'].players = '2';
gameCatalog['Armed Police Batrider'].category = 'shooter';

gameCatalog['Armor Attack'] = new Game();
gameCatalog['Armor Attack'].name = 'Armor Attack';
gameCatalog['Armor Attack'].developer = 'Cinematronics';
gameCatalog['Armor Attack'].release = '1980';
gameCatalog['Armor Attack'].players = '2';
gameCatalog['Armor Attack'].category = 'shooter';

gameCatalog['Assault'] = new Game();
gameCatalog['Assault'].name = 'Assault';
gameCatalog['Assault'].developer = 'Namco';
gameCatalog['Assault'].release = 'April 1988';
gameCatalog['Assault'].players = '1';
gameCatalog['Assault'].category = 'shooter';

gameCatalog['Asteroids Deluxe'] = new Game();
gameCatalog['Asteroids Deluxe'].name = 'Asteroids Deluxe';
gameCatalog['Asteroids Deluxe'].developer = 'Atari';
gameCatalog['Asteroids Deluxe'].release = '1981';
gameCatalog['Asteroids Deluxe'].players = '2';
gameCatalog['Asteroids Deluxe'].category = 'shooter';

gameCatalog['Asteroids'] = new Game();
gameCatalog['Asteroids'].name = 'Asteroids';
gameCatalog['Asteroids'].developer = 'Atari';
gameCatalog['Asteroids'].release = 'November 1979';
gameCatalog['Asteroids'].players = '2';
gameCatalog['Asteroids'].category = 'shooter';

gameCatalog['Astro Blaster'] = new Game();
gameCatalog['Astro Blaster'].name = 'Astro Blaster';
gameCatalog['Astro Blaster'].developer = 'Sega';
gameCatalog['Astro Blaster'].release = '1981';
gameCatalog['Astro Blaster'].players = '2';
gameCatalog['Astro Blaster'].category = 'shooter';

gameCatalog['Astro Fighter'] = new Game();
gameCatalog['Astro Fighter'].name = 'Astro Fighter';
gameCatalog['Astro Fighter'].developer = 'Data East';
gameCatalog['Astro Fighter'].release = '1980';
gameCatalog['Astro Fighter'].players = '2';
gameCatalog['Astro Fighter'].category = 'shooter';

gameCatalog['Astro Invader'] = new Game();
gameCatalog['Astro Invader'].name = 'Astro Invader';
gameCatalog['Astro Invader'].developer = 'Konami';
gameCatalog['Astro Invader'].release = '1979';
gameCatalog['Astro Invader'].players = '2';
gameCatalog['Astro Invader'].category = 'shooter';

gameCatalog['Aurail'] = new Game();
gameCatalog['Aurail'].name = 'Aurail';
gameCatalog['Aurail'].developer = 'Sega';
gameCatalog['Aurail'].release = '1990';
gameCatalog['Aurail'].players = '2';
gameCatalog['Aurail'].category = 'shooter';

gameCatalog['Batsugan'] = new Game();
gameCatalog['Batsugan'].name = 'Batsugan';
gameCatalog['Batsugan'].developer = 'Toaplan';
gameCatalog['Batsugan'].release = '1993';
gameCatalog['Batsugan'].players = '2';
gameCatalog['Batsugan'].category = 'shooter';

gameCatalog['Battlezone'] = new Game();
gameCatalog['Battlezone'].name = 'Battlezone';
gameCatalog['Battlezone'].developer = 'Atari';
gameCatalog['Battlezone'].release = 'November 1980';
gameCatalog['Battlezone'].players = '1';
gameCatalog['Battlezone'].category = 'shooter';

gameCatalog['Black Widow'] = new Game();
gameCatalog['Black Widow'].name = 'Black Widow';
gameCatalog['Black Widow'].developer = 'Atari';
gameCatalog['Black Widow'].release = '1982';
gameCatalog['Black Widow'].players = '1';
gameCatalog['Black Widow'].category = 'shooter';

gameCatalog['Blasteroids'] = new Game();
gameCatalog['Blasteroids'].name = 'Blasteroids';
gameCatalog['Blasteroids'].developer = 'Atari';
gameCatalog['Blasteroids'].release = '1987';
gameCatalog['Blasteroids'].players = '2';
gameCatalog['Blasteroids'].category = 'shooter';

gameCatalog['Carnival'] = new Game();
gameCatalog['Carnival'].name = 'Carnival';
gameCatalog['Carnival'].developer = 'Sega';
gameCatalog['Carnival'].release = '1980';
gameCatalog['Carnival'].players = '2';
gameCatalog['Carnival'].category = 'shooter';

gameCatalog['Centipede'] = new Game();
gameCatalog['Centipede'].name = 'Centipede';
gameCatalog['Centipede'].developer = 'Atari';
gameCatalog['Centipede'].release = '1980';
gameCatalog['Centipede'].players = '2';
gameCatalog['Centipede'].category = 'shooter';

gameCatalog['Colony 7'] = new Game();
gameCatalog['Colony 7'].name = 'Colony 7';
gameCatalog['Colony 7'].developer = 'Taito';
gameCatalog['Colony 7'].release = '1981';
gameCatalog['Colony 7'].players = '1';
gameCatalog['Colony 7'].category = 'shooter';

gameCatalog['Cosmic Avenger'] = new Game();
gameCatalog['Cosmic Avenger'].name = 'Cosmic Avenger';
gameCatalog['Cosmic Avenger'].developer = 'Universal';
gameCatalog['Cosmic Avenger'].release = 'July 1981';
gameCatalog['Cosmic Avenger'].players = '2';
gameCatalog['Cosmic Avenger'].category = 'shooter';

gameCatalog['Cosmic Guerilla'] = new Game();
gameCatalog['Cosmic Guerilla'].name = 'Cosmic Guerilla';
gameCatalog['Cosmic Guerilla'].developer = 'Universal';
gameCatalog['Cosmic Guerilla'].release = '1979';
gameCatalog['Cosmic Guerilla'].players = '2';
gameCatalog['Cosmic Guerilla'].category = 'shooter';

gameCatalog['Cosmo Gang the Video'] = new Game();
gameCatalog['Cosmo Gang the Video'].name = 'Cosmo Gang the Video';
gameCatalog['Cosmo Gang the Video'].developer = 'Namco';
gameCatalog['Cosmo Gang the Video'].release = '1991';
gameCatalog['Cosmo Gang the Video'].players = '2';
gameCatalog['Cosmo Gang the Video'].category = 'shooter';

gameCatalog['Cyvern'] = new Game();
gameCatalog['Cyvern'].name = 'Cyvern';
gameCatalog['Cyvern'].developer = 'Kaneko';
gameCatalog['Cyvern'].release = '1988';
gameCatalog['Cyvern'].players = '2';
gameCatalog['Cyvern'].category = 'shooter';

gameCatalog['Defender'] = new Game();
gameCatalog['Defender'].name = 'Defender';
gameCatalog['Defender'].developer = 'Williams Electronics';
gameCatalog['Defender'].release = 'February 1981';
gameCatalog['Defender'].players = '2';
gameCatalog['Defender'].category = 'shooter';

gameCatalog['Dodonpachi Dai-Ou-Jou White Label'] = new Game();
gameCatalog['Dodonpachi Dai-Ou-Jou White Label'].name = 'Dodonpachi Dai-Ou-Jou White Label';
gameCatalog['Dodonpachi Dai-Ou-Jou White Label'].developer = 'Cave';
gameCatalog['Dodonpachi Dai-Ou-Jou White Label'].release = '2002';
gameCatalog['Dodonpachi Dai-Ou-Jou White Label'].players = '2';
gameCatalog['Dodonpachi Dai-Ou-Jou White Label'].category = 'shooter';

gameCatalog['Dodonpachi SaiDaiOuJou'] = new Game();
gameCatalog['Dodonpachi SaiDaiOuJou'].name = 'Dodonpachi SaiDaiOuJou';
gameCatalog['Dodonpachi SaiDaiOuJou'].developer = 'Cave';
gameCatalog['Dodonpachi SaiDaiOuJou'].release = '2002';
gameCatalog['Dodonpachi SaiDaiOuJou'].players = '2';
gameCatalog['Dodonpachi SaiDaiOuJou'].category = 'shooter';

gameCatalog['Escape From The Planet Of The Robot Monsters'] = new Game();
gameCatalog['Escape From The Planet Of The Robot Monsters'].name = 'Escape From The Planet Of The Robot Monsters';
gameCatalog['Escape From The Planet Of The Robot Monsters'].developer = 'Atari';
gameCatalog['Escape From The Planet Of The Robot Monsters'].release = '1989';
gameCatalog['Escape From The Planet Of The Robot Monsters'].players = '2';
gameCatalog['Escape From The Planet Of The Robot Monsters'].category = 'shooter';

gameCatalog['Galaga 88'] = new Game();
gameCatalog['Galaga 88'].name = 'Galaga 88';
gameCatalog['Galaga 88'].developer = 'Namco';
gameCatalog['Galaga 88'].release = 'December 1987';
gameCatalog['Galaga 88'].players = '2';
gameCatalog['Galaga 88'].category = 'shooter';

gameCatalog['Galaga'] = new Game();
gameCatalog['Galaga'].name = 'Galaga';
gameCatalog['Galaga'].developer = 'Namco';
gameCatalog['Galaga'].release = 'September 1981';
gameCatalog['Galaga'].players = '2';
gameCatalog['Galaga'].category = 'shooter';

gameCatalog['Galaga - Fast shoot hack'] = new Game();
gameCatalog['Galaga - Fast shoot hack'].name = 'Galaga - Fast shoot hack';
gameCatalog['Galaga - Fast shoot hack'].developer = 'Namco';
gameCatalog['Galaga - Fast shoot hack'].release = 'September 1981';
gameCatalog['Galaga - Fast shoot hack'].players = '2';
gameCatalog['Galaga - Fast shoot hack'].category = 'shooter';
gameCatalog['Galaga - Fast shoot hack'].version = 'Fast shoot hack';
gameCatalog['Galaga - Fast shoot hack'].parent = 'Galaga';

gameCatalog['Galaxian'] = new Game();
gameCatalog['Galaxian'].name = 'Galaxian';
gameCatalog['Galaxian'].developer = 'Namco';
gameCatalog['Galaxian'].release = 'October 1979';
gameCatalog['Galaxian'].players = '2';
gameCatalog['Galaxian'].category = 'shooter';

gameCatalog['Galaxy Rescue'] = new Game();
gameCatalog['Galaxy Rescue'].name = 'Galaxy Rescue';
gameCatalog['Galaxy Rescue'].developer = 'Taito';
gameCatalog['Galaxy Rescue'].release = '1979';
gameCatalog['Galaxy Rescue'].players = '2';
gameCatalog['Galaxy Rescue'].category = 'shooter';

gameCatalog['Gorf'] = new Game();
gameCatalog['Gorf'].name = 'Gorf';
gameCatalog['Gorf'].developer = 'Dave Nutting Associates';
gameCatalog['Gorf'].release = '1981';
gameCatalog['Gorf'].players = '2';
gameCatalog['Gorf'].category = 'shooter';

gameCatalog['Gun Frontier'] = new Game();
gameCatalog['Gun Frontier'].name = 'Gun Frontier';
gameCatalog['Gun Frontier'].developer = 'Taito';
gameCatalog['Gun Frontier'].release = '1990';
gameCatalog['Gun Frontier'].players = '2';
gameCatalog['Gun Frontier'].category = 'shooter';

gameCatalog['Gun Smoke'] = new Game();
gameCatalog['Gun Smoke'].name = 'Gun Smoke';
gameCatalog['Gun Smoke'].developer = 'Capcom';
gameCatalog['Gun Smoke'].release = '1985';
gameCatalog['Gun Smoke'].players = '2';
gameCatalog['Gun Smoke'].category = 'shooter';

gameCatalog['Gyruss'] = new Game();
gameCatalog['Gyruss'].name = 'Gyruss';
gameCatalog['Gyruss'].developer = 'Konami';
gameCatalog['Gyruss'].release = '1983';
gameCatalog['Gyruss'].players = '2';
gameCatalog['Gyruss'].category = 'shooter';

gameCatalog['Ikaruga'] = new Game();
gameCatalog['Ikaruga'].name = 'Ikaruga';
gameCatalog['Ikaruga'].developer = 'Treasure';
gameCatalog['Ikaruga'].release = 'December 2001';
gameCatalog['Ikaruga'].players = '2';
gameCatalog['Ikaruga'].category = 'shooter';

gameCatalog['Juno First'] = new Game();
gameCatalog['Juno First'].name = 'Juno First';
gameCatalog['Juno First'].developer = 'Konami';
gameCatalog['Juno First'].release = '1983';
gameCatalog['Juno First'].players = '2';
gameCatalog['Juno First'].category = 'shooter';

gameCatalog['Ketsui'] = new Game();
gameCatalog['Ketsui'].name = 'Ketsui';
gameCatalog['Ketsui'].developer = 'Cave';
gameCatalog['Ketsui'].release = '2003';
gameCatalog['Ketsui'].players = '2';
gameCatalog['Ketsui'].category = 'shooter';

gameCatalog['Lizard Wizard'] = new Game();
gameCatalog['Lizard Wizard'].name = 'Lizard Wizard';
gameCatalog['Lizard Wizard'].developer = 'Sunn';
gameCatalog['Lizard Wizard'].release = '1985';
gameCatalog['Lizard Wizard'].players = '2';
gameCatalog['Lizard Wizard'].category = 'shooter';

gameCatalog['Lunar Rescue'] = new Game();
gameCatalog['Lunar Rescue'].name = 'Lunar Rescue';
gameCatalog['Lunar Rescue'].developer = 'Taito';
gameCatalog['Lunar Rescue'].release = '1979';
gameCatalog['Lunar Rescue'].players = '2';
gameCatalog['Lunar Rescue'].category = 'shooter';

gameCatalog['Millipede'] = new Game();
gameCatalog['Millipede'].name = 'Millipede';
gameCatalog['Millipede'].developer = 'Atari';
gameCatalog['Millipede'].release = '1982';
gameCatalog['Millipede'].players = '2';
gameCatalog['Millipede'].category = 'shooter';

gameCatalog['Missile Command'] = new Game();
gameCatalog['Missile Command'].name = 'Missile Command';
gameCatalog['Missile Command'].developer = 'Atari';
gameCatalog['Missile Command'].release = 'July 1980';
gameCatalog['Missile Command'].players = '2';
gameCatalog['Missile Command'].category = 'shooter';

gameCatalog['Moon Alien Part 2'] = new Game();
gameCatalog['Moon Alien Part 2'].name = 'Moon Alien Part 2';
gameCatalog['Moon Alien Part 2'].developer = 'Nichibutsu';
gameCatalog['Moon Alien Part 2'].release = '1980';
gameCatalog['Moon Alien Part 2'].players = '2';
gameCatalog['Moon Alien Part 2'].category = 'shooter';

gameCatalog['Moon Cresta'] = new Game();
gameCatalog['Moon Cresta'].name = 'Moon Cresta';
gameCatalog['Moon Cresta'].developer = 'Nichibutsu/Taito';
gameCatalog['Moon Cresta'].release = '1980';
gameCatalog['Moon Cresta'].players = '2';
gameCatalog['Moon Cresta'].category = 'shooter';

gameCatalog['Moon Patrol'] = new Game();
gameCatalog['Moon Patrol'].name = 'Moon Patrol';
gameCatalog['Moon Patrol'].developer = 'Irem';
gameCatalog['Moon Patrol'].release = '1982';
gameCatalog['Moon Patrol'].players = '2';
gameCatalog['Moon Patrol'].category = 'shooter';

gameCatalog['Nemesis'] = new Game();
gameCatalog['Nemesis'].name = 'Nemesis';
gameCatalog['Nemesis'].developer = 'Konami';
gameCatalog['Nemesis'].release = 'May 1985';
gameCatalog['Nemesis'].players = '2';
gameCatalog['Nemesis'].category = 'shooter';

gameCatalog['Outzone'] = new Game();
gameCatalog['Outzone'].name = 'Outzone';
gameCatalog['Outzone'].developer = 'Toaplan';
gameCatalog['Outzone'].release = '1990';
gameCatalog['Outzone'].players = '2';
gameCatalog['Outzone'].category = 'shooter';

gameCatalog['Phoenix'] = new Game();
gameCatalog['Phoenix'].name = 'Phoenix';
gameCatalog['Phoenix'].developer = 'Atari';
gameCatalog['Phoenix'].release = '1980';
gameCatalog['Phoenix'].players = '2';
gameCatalog['Phoenix'].category = 'shooter';

gameCatalog['Pleiades'] = new Game();
gameCatalog['Pleiades'].name = 'Pleiades';
gameCatalog['Pleiades'].developer = 'Centuri';
gameCatalog['Pleiades'].release = '1981';
gameCatalog['Pleiades'].players = '2';
gameCatalog['Pleiades'].category = 'shooter';

gameCatalog['Pooyan'] = new Game();
gameCatalog['Pooyan'].name = 'Pooyan';
gameCatalog['Pooyan'].developer = 'Stern';
gameCatalog['Pooyan'].release = '1982';
gameCatalog['Pooyan'].players = '2';
gameCatalog['Pooyan'].category = 'shooter';

gameCatalog['Progear'] = new Game();
gameCatalog['Progear'].name = 'Progear';
gameCatalog['Progear'].developer = 'Cave';
gameCatalog['Progear'].release = '2001';
gameCatalog['Progear'].players = '2';
gameCatalog['Progear'].category = 'shooter';

gameCatalog['R-Type 2'] = new Game();
gameCatalog['R-Type 2'].name = 'R-Type 2';
gameCatalog['R-Type 2'].developer = 'Irem';
gameCatalog['R-Type 2'].release = 'December 1989';
gameCatalog['R-Type 2'].players = '2';
gameCatalog['R-Type 2'].category = 'shooter';

gameCatalog['R-Type Leo'] = new Game();
gameCatalog['R-Type Leo'].name = 'R-Type Leo';
gameCatalog['R-Type Leo'].developer = 'Irem';
gameCatalog['R-Type Leo'].release = 'December 1992';
gameCatalog['R-Type Leo'].players = '2';
gameCatalog['R-Type Leo'].category = 'shooter';

gameCatalog['R-Type'] = new Game();
gameCatalog['R-Type'].name = 'R-Type';
gameCatalog['R-Type'].developer = 'Irem';
gameCatalog['R-Type'].release = 'July 1987';
gameCatalog['R-Type'].players = '2';
gameCatalog['R-Type'].category = 'shooter';

gameCatalog['Raiden III'] = new Game();
gameCatalog['Raiden III'].name = 'Raiden III';
gameCatalog['Raiden III'].developer = 'MOSS';
gameCatalog['Raiden III'].release = '2005';
gameCatalog['Raiden III'].players = '2';
gameCatalog['Raiden III'].category = 'shooter';

gameCatalog['Return of the Invaders'] = new Game();
gameCatalog['Return of the Invaders'].name = 'Return of the Invaders';
gameCatalog['Return of the Invaders'].developer = 'Taito';
gameCatalog['Return of the Invaders'].release = '1985';
gameCatalog['Return of the Invaders'].players = '2';
gameCatalog['Return of the Invaders'].category = 'shooter';

gameCatalog['Return of The Jedi'] = new Game();
gameCatalog['Return of The Jedi'].name = 'Return of The Jedi';
gameCatalog['Return of The Jedi'].developer = 'Atari';
gameCatalog['Return of The Jedi'].release = '1984';
gameCatalog['Return of The Jedi'].players = '1';
gameCatalog['Return of The Jedi'].category = 'shooter';

gameCatalog['Robotron 2084'] = new Game();
gameCatalog['Robotron 2084'].name = 'Robotron 2084';
gameCatalog['Robotron 2084'].developer = 'Vid Kidz';
gameCatalog['Robotron 2084'].release = '1982';
gameCatalog['Robotron 2084'].players = '1';
gameCatalog['Robotron 2084'].category = 'shooter';

gameCatalog['Salamander 2'] = new Game();
gameCatalog['Salamander 2'].name = 'Salamander 2';
gameCatalog['Salamander 2'].developer = 'Konami';
gameCatalog['Salamander 2'].release = 'January 1996';
gameCatalog['Salamander 2'].players = '2';
gameCatalog['Salamander 2'].category = 'shooter';

gameCatalog['Salamander'] = new Game();
gameCatalog['Salamander'].name = 'Salamander';
gameCatalog['Salamander'].developer = 'Konami';
gameCatalog['Salamander'].release = 'July 1986';
gameCatalog['Salamander'].players = '2';
gameCatalog['Salamander'].category = 'shooter';

gameCatalog['Scramble'] = new Game();
gameCatalog['Scramble'].name = 'Scramble';
gameCatalog['Scramble'].developer = 'Konami';
gameCatalog['Scramble'].release = 'February 1981';
gameCatalog['Scramble'].players = '2';
gameCatalog['Scramble'].category = 'shooter';

gameCatalog['Sexy Parodius'] = new Game();
gameCatalog['Sexy Parodius'].name = 'Sexy Parodius';
gameCatalog['Sexy Parodius'].developer = 'Konami';
gameCatalog['Sexy Parodius'].release = '1996';
gameCatalog['Sexy Parodius'].players = '2';
gameCatalog['Sexy Parodius'].category = 'shooter';

gameCatalog['Sinistar'] = new Game();
gameCatalog['Sinistar'].name = 'Sinistar';
gameCatalog['Sinistar'].developer = 'Williams Electronics';
gameCatalog['Sinistar'].release = '1983';
gameCatalog['Sinistar'].players = '2';
gameCatalog['Sinistar'].category = 'shooter';

gameCatalog['Smash TV'] = new Game();
gameCatalog['Smash TV'].name = 'Smash TV';
gameCatalog['Smash TV'].developer = 'Williams';
gameCatalog['Smash TV'].release = 'April 1990';
gameCatalog['Smash TV'].players = '2';
gameCatalog['Smash TV'].category = 'shooter';

gameCatalog['Space Duel'] = new Game();
gameCatalog['Space Duel'].name = 'Space Duel';
gameCatalog['Space Duel'].developer = 'Atari';
gameCatalog['Space Duel'].release = '1982';
gameCatalog['Space Duel'].players = '2';
gameCatalog['Space Duel'].category = 'shooter';

gameCatalog['Space Encounters'] = new Game();
gameCatalog['Space Encounters'].name = 'Space Encounters';
gameCatalog['Space Encounters'].developer = 'Midway';
gameCatalog['Space Encounters'].release = '1980';
gameCatalog['Space Encounters'].players = '2';
gameCatalog['Space Encounters'].category = 'shooter';

gameCatalog['Space Harrier'] = new Game();
gameCatalog['Space Harrier'].name = 'Space Harrier';
gameCatalog['Space Harrier'].developer = 'Sega';
gameCatalog['Space Harrier'].release = 'December 1985';
gameCatalog['Space Harrier'].players = '1';
gameCatalog['Space Harrier'].category = 'shooter';

gameCatalog['Space invaders part II'] = new Game();
gameCatalog['Space invaders part II'].name = 'Space invaders part II';
gameCatalog['Space invaders part II'].developer = 'Taito';
gameCatalog['Space invaders part II'].release = '1979';
gameCatalog['Space invaders part II'].players = '2';
gameCatalog['Space invaders part II'].category = 'shooter';

gameCatalog['Space Invaders'] = new Game();
gameCatalog['Space Invaders'].name = 'Space Invaders';
gameCatalog['Space Invaders'].developer = 'Taito';
gameCatalog['Space Invaders'].release = 'June 1978';
gameCatalog['Space Invaders'].players = '2';
gameCatalog['Space Invaders'].category = 'shooter';

gameCatalog['Space Launcher'] = new Game();
gameCatalog['Space Launcher'].name = 'Space Launcher';
gameCatalog['Space Launcher'].developer = 'Nintendo';
gameCatalog['Space Launcher'].release = '1979';
gameCatalog['Space Launcher'].players = '2';
gameCatalog['Space Launcher'].category = 'shooter';

gameCatalog['Space Zap'] = new Game();
gameCatalog['Space Zap'].name = 'Space Zap';
gameCatalog['Space Zap'].developer = 'Game-A-Tron';
gameCatalog['Space Zap'].release = '1980';
gameCatalog['Space Zap'].players = '2';
gameCatalog['Space Zap'].category = 'shooter';

gameCatalog['Splat'] = new Game();
gameCatalog['Splat'].name = 'Splat';
gameCatalog['Splat'].developer = 'Williams';
gameCatalog['Splat'].release = '1982';
gameCatalog['Splat'].players = '2';
gameCatalog['Splat'].category = 'shooter';

gameCatalog['Star Castle'] = new Game();
gameCatalog['Star Castle'].name = 'Star Castle';
gameCatalog['Star Castle'].developer = 'Cinematronics';
gameCatalog['Star Castle'].release = '1980';
gameCatalog['Star Castle'].players = '2';
gameCatalog['Star Castle'].category = 'shooter';

gameCatalog['Star Force'] = new Game();
gameCatalog['Star Force'].name = 'Star Force';
gameCatalog['Star Force'].developer = 'Tehkan';
gameCatalog['Star Force'].release = '1984';
gameCatalog['Star Force'].players = '2';
gameCatalog['Star Force'].category = 'shooter';

gameCatalog['Star Wars Trilogy'] = new Game();
gameCatalog['Star Wars Trilogy'].name = 'Star Wars Trilogy';
gameCatalog['Star Wars Trilogy'].developer = 'Sega';
gameCatalog['Star Wars Trilogy'].release = '1999';
gameCatalog['Star Wars Trilogy'].players = '1';
gameCatalog['Star Wars Trilogy'].category = 'shooter';

gameCatalog['Star Wars'] = new Game();
gameCatalog['Star Wars'].name = 'Star Wars';
gameCatalog['Star Wars'].developer = 'Atari';
gameCatalog['Star Wars'].release = 'May 1983';
gameCatalog['Star Wars'].players = '1';
gameCatalog['Star Wars'].category = 'shooter';

gameCatalog['Stargate'] = new Game();
gameCatalog['Stargate'].name = 'Stargate';
gameCatalog['Stargate'].developer = 'Vid Kidz';
gameCatalog['Stargate'].release = '1981';
gameCatalog['Stargate'].players = '2';
gameCatalog['Stargate'].category = 'shooter';

gameCatalog['Strike Force'] = new Game();
gameCatalog['Strike Force'].name = 'Strike Force';
gameCatalog['Strike Force'].developer = 'Midway';
gameCatalog['Strike Force'].release = '1991';
gameCatalog['Strike Force'].players = '2';
gameCatalog['Strike Force'].category = 'shooter';

gameCatalog['Super Cobra'] = new Game();
gameCatalog['Super Cobra'].name = 'Super Cobra';
gameCatalog['Super Cobra'].developer = 'Konami';
gameCatalog['Super Cobra'].release = '1981';
gameCatalog['Super Cobra'].players = '2';
gameCatalog['Super Cobra'].category = 'shooter';

gameCatalog['Super Spacefortress Macross'] = new Game();
gameCatalog['Super Spacefortress Macross'].name = 'Super Spacefortress Macross';
gameCatalog['Super Spacefortress Macross'].developer = 'Fabtek';
gameCatalog['Super Spacefortress Macross'].release = '1992';
gameCatalog['Super Spacefortress Macross'].players = '2';
gameCatalog['Super Spacefortress Macross'].category = 'shooter';

gameCatalog['Tempest'] = new Game();
gameCatalog['Tempest'].name = 'Tempest';
gameCatalog['Tempest'].developer = 'Atari';
gameCatalog['Tempest'].release = 'October 1981';
gameCatalog['Tempest'].players = '2';
gameCatalog['Tempest'].category = 'shooter';

gameCatalog['Terra Cresta'] = new Game();
gameCatalog['Terra Cresta'].name = 'Terra Cresta';
gameCatalog['Terra Cresta'].developer = 'Nichibutsu';
gameCatalog['Terra Cresta'].release = '1985';
gameCatalog['Terra Cresta'].players = '2';
gameCatalog['Terra Cresta'].category = 'shooter';

gameCatalog['The End'] = new Game();
gameCatalog['The End'].name = 'The End';
gameCatalog['The End'].developer = 'Stern';
gameCatalog['The End'].release = '1980';
gameCatalog['The End'].players = '2';
gameCatalog['The End'].category = 'shooter';

gameCatalog['Thunder Blade'] = new Game();
gameCatalog['Thunder Blade'].name = 'Thunder Blade';
gameCatalog['Thunder Blade'].developer = 'Sega';
gameCatalog['Thunder Blade'].release = '1987';
gameCatalog['Thunder Blade'].players = '1';
gameCatalog['Thunder Blade'].category = 'shooter';

gameCatalog['Tiger Heli'] = new Game();
gameCatalog['Tiger Heli'].name = 'Tiger Heli';
gameCatalog['Tiger Heli'].developer = 'Taito';
gameCatalog['Tiger Heli'].release = '1985';
gameCatalog['Tiger Heli'].players = '2';
gameCatalog['Tiger Heli'].category = 'shooter';

gameCatalog['Time Pilot'] = new Game();
gameCatalog['Time Pilot'].name = 'Time Pilot';
gameCatalog['Time Pilot'].developer = 'Konami';
gameCatalog['Time Pilot'].release = 'November 1982';
gameCatalog['Time Pilot'].players = '2';
gameCatalog['Time Pilot'].category = 'shooter';

gameCatalog['Truxton II'] = new Game();
gameCatalog['Truxton II'].name = 'Truxton II';
gameCatalog['Truxton II'].developer = 'Toaplan';
gameCatalog['Truxton II'].release = '1992';
gameCatalog['Truxton II'].players = '2';
gameCatalog['Truxton II'].category = 'shooter';

gameCatalog['Truxton'] = new Game();
gameCatalog['Truxton'].name = 'Truxton';
gameCatalog['Truxton'].developer = 'Taito';
gameCatalog['Truxton'].release = '1988';
gameCatalog['Truxton'].players = '2';
gameCatalog['Truxton'].category = 'shooter';

gameCatalog['Vanguard'] = new Game();
gameCatalog['Vanguard'].name = 'Vanguard';
gameCatalog['Vanguard'].developer = 'TOSE';
gameCatalog['Vanguard'].release = '1981';
gameCatalog['Vanguard'].players = '1';
gameCatalog['Vanguard'].category = 'shooter';

gameCatalog['Viewpoint'] = new Game();
gameCatalog['Viewpoint'].name = 'Viewpoint';
gameCatalog['Viewpoint'].developer = 'Aicom';
gameCatalog['Viewpoint'].release = '1992';
gameCatalog['Viewpoint'].players = '2';
gameCatalog['Viewpoint'].category = 'shooter';

gameCatalog['Vulcan Venture'] = new Game();
gameCatalog['Vulcan Venture'].name = 'Vulcan Venture';
gameCatalog['Vulcan Venture'].developer = 'Konami';
gameCatalog['Vulcan Venture'].release = 'March 1988';
gameCatalog['Vulcan Venture'].players = '1';
gameCatalog['Vulcan Venture'].category = 'shooter';

gameCatalog['War of the Bugs'] = new Game();
gameCatalog['War of the Bugs'].name = 'War of the Bugs';
gameCatalog['War of the Bugs'].developer = 'Food and Fun Corp';
gameCatalog['War of the Bugs'].release = '1981';
gameCatalog['War of the Bugs'].players = '2';
gameCatalog['War of the Bugs'].category = 'shooter';

gameCatalog['Warlords'] = new Game();
gameCatalog['Warlords'].name = 'Warlords';
gameCatalog['Warlords'].developer = 'Atari';
gameCatalog['Warlords'].release = '1980';
gameCatalog['Warlords'].players = '4';
gameCatalog['Warlords'].category = 'shooter';

gameCatalog['Warp and Warp'] = new Game();
gameCatalog['Warp and Warp'].name = 'Warp and Warp';
gameCatalog['Warp and Warp'].developer = 'Namco';
gameCatalog['Warp and Warp'].release = '1981';
gameCatalog['Warp and Warp'].players = '2';
gameCatalog['Warp and Warp'].category = 'shooter';

gameCatalog['Xenophobe'] = new Game();
gameCatalog['Xenophobe'].name = 'Xenophobe';
gameCatalog['Xenophobe'].developer = 'Bally Midway';
gameCatalog['Xenophobe'].release = '1987';
gameCatalog['Xenophobe'].players = '2';
gameCatalog['Xenophobe'].category = 'shooter';

gameCatalog['Xevious'] = new Game();
gameCatalog['Xevious'].name = 'Xevious';
gameCatalog['Xevious'].developer = 'Atari';
gameCatalog['Xevious'].release = '1982';
gameCatalog['Xevious'].players = '2';
gameCatalog['Xevious'].category = 'shooter';

gameCatalog['Zaxxon'] = new Game();
gameCatalog['Zaxxon'].name = 'Zaxxon';
gameCatalog['Zaxxon'].developer = 'Sega';
gameCatalog['Zaxxon'].release = '1982';
gameCatalog['Zaxxon'].players = '2';
gameCatalog['Zaxxon'].category = 'shooter';

gameCatalog['720 Degrees'] = new Game();
gameCatalog['720 Degrees'].name = '720 Degrees';
gameCatalog['720 Degrees'].developer = 'Atari';
gameCatalog['720 Degrees'].release = '1986';
gameCatalog['720 Degrees'].players = '2';
gameCatalog['720 Degrees'].category = 'sports';

gameCatalog['Alpine Ski'] = new Game();
gameCatalog['Alpine Ski'].name = 'Alpine Ski';
gameCatalog['Alpine Ski'].developer = 'Taito';
gameCatalog['Alpine Ski'].release = '1981';
gameCatalog['Alpine Ski'].players = '2';
gameCatalog['Alpine Ski'].category = 'sports';

gameCatalog['Arch Rivals'] = new Game();
gameCatalog['Arch Rivals'].name = 'Arch Rivals';
gameCatalog['Arch Rivals'].developer = 'Bally Midway';
gameCatalog['Arch Rivals'].release = '1989';
gameCatalog['Arch Rivals'].players = '2';
gameCatalog['Arch Rivals'].category = 'sports';

gameCatalog['Arm Wrestling'] = new Game();
gameCatalog['Arm Wrestling'].name = 'Arm Wrestling';
gameCatalog['Arm Wrestling'].developer = 'Nintendo';
gameCatalog['Arm Wrestling'].release = '1985';
gameCatalog['Arm Wrestling'].players = '2';
gameCatalog['Arm Wrestling'].category = 'sports';

gameCatalog['Hypersports'] = new Game();
gameCatalog['Hypersports'].name = 'Hypersports';
gameCatalog['Hypersports'].developer = 'Konami';
gameCatalog['Hypersports'].release = '1984';
gameCatalog['Hypersports'].players = '4';
gameCatalog['Hypersports'].category = 'sports';

gameCatalog['NBA Jam Tournament Edition'] = new Game();
gameCatalog['NBA Jam Tournament Edition'].name = 'NBA Jam Tournament Edition';
gameCatalog['NBA Jam Tournament Edition'].developer = 'Midway-Iguana';
gameCatalog['NBA Jam Tournament Edition'].release = '1993';
gameCatalog['NBA Jam Tournament Edition'].players = '4';
gameCatalog['NBA Jam Tournament Edition'].category = 'sports';

gameCatalog['RBI Baseball'] = new Game();
gameCatalog['RBI Baseball'].name = 'RBI Baseball';
gameCatalog['RBI Baseball'].developer = 'Atari';
gameCatalog['RBI Baseball'].release = '1986';
gameCatalog['RBI Baseball'].players = '1';
gameCatalog['RBI Baseball'].category = 'sports';

gameCatalog['Super Punch Out'] = new Game();
gameCatalog['Super Punch Out'].name = 'Super Punch Out';
gameCatalog['Super Punch Out'].developer = 'Nintendo';
gameCatalog['Super Punch Out'].release = 'September 1984';
gameCatalog['Super Punch Out'].players = '1';
gameCatalog['Super Punch Out'].category = 'sports';

gameCatalog['Tehkan World Cup'] = new Game();
gameCatalog['Tehkan World Cup'].name = 'Tehkan World Cup';
gameCatalog['Tehkan World Cup'].developer = 'Tehkan';
gameCatalog['Tehkan World Cup'].release = '1985';
gameCatalog['Tehkan World Cup'].players = '2';
gameCatalog['Tehkan World Cup'].category = 'sports';

gameCatalog['Track and field'] = new Game();
gameCatalog['Track and field'].name = 'Track and field';
gameCatalog['Track and field'].developer = 'Konami';
gameCatalog['Track and field'].release = '1983';
gameCatalog['Track and field'].players = '4';
gameCatalog['Track and field'].category = 'sports';

gameCatalog['Virtua Striker'] = new Game();
gameCatalog['Virtua Striker'].name = 'Virtua Striker';
gameCatalog['Virtua Striker'].developer = 'Sega';
gameCatalog['Virtua Striker'].release = '1994';
gameCatalog['Virtua Striker'].players = '2';
gameCatalog['Virtua Striker'].category = 'sports';

gameCatalog['Virtua Tennis'] = new Game();
gameCatalog['Virtua Tennis'].name = 'Virtua Tennis';
gameCatalog['Virtua Tennis'].developer = 'Sega';
gameCatalog['Virtua Tennis'].release = '1999';
gameCatalog['Virtua Tennis'].players = '2';
gameCatalog['Virtua Tennis'].category = 'sports';

gameCatalog['Windjammers'] = new Game();
gameCatalog['Windjammers'].name = 'Windjammers';
gameCatalog['Windjammers'].developer = 'Data East';
gameCatalog['Windjammers'].release = '1994';
gameCatalog['Windjammers'].players = '2';
gameCatalog['Windjammers'].category = 'sports';

gameCatalog['Ali Baba And The 40 Thieves'] = new Game();
gameCatalog['Ali Baba And The 40 Thieves'].name = 'Ali Baba And The 40 Thieves';
gameCatalog['Ali Baba And The 40 Thieves'].developer = 'Sega';
gameCatalog['Ali Baba And The 40 Thieves'].release = '1982';
gameCatalog['Ali Baba And The 40 Thieves'].players = '2';
gameCatalog['Ali Baba And The 40 Thieves'].category = 'maze';

gameCatalog['Armored Car'] = new Game();
gameCatalog['Armored Car'].name = 'Armored Car';
gameCatalog['Armored Car'].developer = 'Stern Electronics';
gameCatalog['Armored Car'].release = '1981';
gameCatalog['Armored Car'].players = '2';
gameCatalog['Armored Car'].category = 'maze';

gameCatalog['Go Go Mile Smile'] = new Game();
gameCatalog['Go Go Mile Smile'].name = 'Go Go Mile Smile';
gameCatalog['Go Go Mile Smile'].developer = 'Fuuki Co Ltd';
gameCatalog['Go Go Mile Smile'].release = '1995';
gameCatalog['Go Go Mile Smile'].players = '2';
gameCatalog['Go Go Mile Smile'].category = 'maze';

gameCatalog['Trog'] = new Game();
gameCatalog['Trog'].name = 'Trog';
gameCatalog['Trog'].developer = 'Midway';
gameCatalog['Trog'].release = '1990';
gameCatalog['Trog'].players = '2';
gameCatalog['Trog'].category = 'maze';

gameCatalog['Discs Of Tron'] = new Game();
gameCatalog['Discs Of Tron'].name = 'Discs Of Tron';
gameCatalog['Discs Of Tron'].developer = 'Bally Midway';
gameCatalog['Discs Of Tron'].release = '1983';
gameCatalog['Discs Of Tron'].players = '1';
gameCatalog['Discs Of Tron'].category = 'misc';

gameCatalog['Journey'] = new Game();
gameCatalog['Journey'].name = 'Journey';
gameCatalog['Journey'].developer = 'Bally Midway';
gameCatalog['Journey'].release = '1983';
gameCatalog['Journey'].players = '1';
gameCatalog['Journey'].category = 'misc';

gameCatalog['Tron'] = new Game();
gameCatalog['Tron'].name = 'Tron';
gameCatalog['Tron'].developer = 'Bally Midway';
gameCatalog['Tron'].release = '1982';
gameCatalog['Tron'].players = '2';
gameCatalog['Tron'].category = 'misc';

gameCatalog['Baluba Louk No Densetsu'] = new Game();
gameCatalog['Baluba Louk No Densetsu'].name = 'Baluba Louk No Densetsu';
gameCatalog['Baluba Louk No Densetsu'].developer = 'AbleCorp';
gameCatalog['Baluba Louk No Densetsu'].release = '1986';
gameCatalog['Baluba Louk No Densetsu'].players = '2';
gameCatalog['Baluba Louk No Densetsu'].category = 'platformer';

gameCatalog['Congo Bongo'] = new Game();
gameCatalog['Congo Bongo'].name = 'Congo Bongo';
gameCatalog['Congo Bongo'].developer = 'Sega';
gameCatalog['Congo Bongo'].release = '1983';
gameCatalog['Congo Bongo'].players = '2';
gameCatalog['Congo Bongo'].category = 'platformer';

gameCatalog['Kid Niki'] = new Game();
gameCatalog['Kid Niki'].name = 'Kid Niki';
gameCatalog['Kid Niki'].developer = 'Irem Data East';
gameCatalog['Kid Niki'].release = '1986';
gameCatalog['Kid Niki'].players = '2';
gameCatalog['Kid Niki'].category = 'platformer';

gameCatalog['Vs Super Mario Bros'] = new Game();
gameCatalog['Vs Super Mario Bros'].name = 'Vs Super Mario Bros';
gameCatalog['Vs Super Mario Bros'].developer = 'Nintendo';
gameCatalog['Vs Super Mario Bros'].release = '1986';
gameCatalog['Vs Super Mario Bros'].players = '2';
gameCatalog['Vs Super Mario Bros'].category = 'platformer';

gameCatalog['Pop n Music Eclale'] = new Game();
gameCatalog['Pop n Music Eclale'].name = 'Pop n Music Eclale';
gameCatalog['Pop n Music Eclale'].developer = 'Konami';
gameCatalog['Pop n Music Eclale'].release = '2015';
gameCatalog['Pop n Music Eclale'].players = '1';
gameCatalog['Pop n Music Eclale'].category = 'rhythm';

gameCatalog['Alien Syndrome'] = new Game();
gameCatalog['Alien Syndrome'].name = 'Alien Syndrome';
gameCatalog['Alien Syndrome'].developer = 'Sega';
gameCatalog['Alien Syndrome'].release = '1986';
gameCatalog['Alien Syndrome'].players = '2';
gameCatalog['Alien Syndrome'].category = 'runandgun';

gameCatalog['Berzerk'] = new Game();
gameCatalog['Berzerk'].name = 'Berzerk';
gameCatalog['Berzerk'].developer = 'Stern Electronics';
gameCatalog['Berzerk'].release = 'November 1980';
gameCatalog['Berzerk'].players = '2';
gameCatalog['Berzerk'].category = 'runandgun';

gameCatalog['Berzerk - Slow Bullets'] = new Game();
gameCatalog['Berzerk - Slow Bullets'].name = 'Berzerk - Slow Bullets';
gameCatalog['Berzerk - Slow Bullets'].developer = 'Stern Electronics';
gameCatalog['Berzerk - Slow Bullets'].release = 'November 1980';
gameCatalog['Berzerk - Slow Bullets'].players = '2';
gameCatalog['Berzerk - Slow Bullets'].category = 'runandgun';
gameCatalog['Berzerk - Slow Bullets'].version = 'Slow Bullets';
gameCatalog['Berzerk - Slow Bullets'].parent = 'Berzerk';

gameCatalog['The Real Ghostbusters'] = new Game();
gameCatalog['The Real Ghostbusters'].name = 'The Real Ghostbusters';
gameCatalog['The Real Ghostbusters'].developer = 'Data East';
gameCatalog['The Real Ghostbusters'].release = '1987';
gameCatalog['The Real Ghostbusters'].players = '3';
gameCatalog['The Real Ghostbusters'].category = 'runandgun';

gameCatalog['After Burner'] = new Game();
gameCatalog['After Burner'].name = 'After Burner';
gameCatalog['After Burner'].developer = 'Sega';
gameCatalog['After Burner'].release = 'July 1987';
gameCatalog['After Burner'].players = '1';
gameCatalog['After Burner'].category = 'shooter';

gameCatalog['Bank Panic'] = new Game();
gameCatalog['Bank Panic'].name = 'Bank Panic';
gameCatalog['Bank Panic'].developer = 'Sega';
gameCatalog['Bank Panic'].release = '1985';
gameCatalog['Bank Panic'].players = '2';
gameCatalog['Bank Panic'].category = 'shooter';

gameCatalog['Battle Bakraid'] = new Game();
gameCatalog['Battle Bakraid'].name = 'Battle Bakraid';
gameCatalog['Battle Bakraid'].developer = '8ing';
gameCatalog['Battle Bakraid'].release = '1999';
gameCatalog['Battle Bakraid'].players = '2';
gameCatalog['Battle Bakraid'].category = 'shooter';

gameCatalog['Flying Shark'] = new Game();
gameCatalog['Flying Shark'].name = 'Flying Shark';
gameCatalog['Flying Shark'].developer = 'Taito';
gameCatalog['Flying Shark'].release = '1987';
gameCatalog['Flying Shark'].players = '2';
gameCatalog['Flying Shark'].category = 'shooter';

gameCatalog['Food Fight'] = new Game();
gameCatalog['Food Fight'].name = 'Food Fight';
gameCatalog['Food Fight'].developer = 'Atari';
gameCatalog['Food Fight'].release = 'March 1983';
gameCatalog['Food Fight'].players = '2';
gameCatalog['Food Fight'].category = 'shooter';

gameCatalog['Giga Wing'] = new Game();
gameCatalog['Giga Wing'].name = 'Giga Wing';
gameCatalog['Giga Wing'].developer = 'Capcom';
gameCatalog['Giga Wing'].release = '1999';
gameCatalog['Giga Wing'].players = '2';
gameCatalog['Giga Wing'].category = 'shooter';

gameCatalog['Halleys Comet'] = new Game();
gameCatalog['Halleys Comet'].name = 'Halleys Comet';
gameCatalog['Halleys Comet'].developer = 'Taito';
gameCatalog['Halleys Comet'].release = '1986';
gameCatalog['Halleys Comet'].players = '2';
gameCatalog['Halleys Comet'].category = 'shooter';

gameCatalog['Parodius'] = new Game();
gameCatalog['Parodius'].name = 'Parodius';
gameCatalog['Parodius'].developer = 'Konami';
gameCatalog['Parodius'].release = '1990';
gameCatalog['Parodius'].players = '2';
gameCatalog['Parodius'].category = 'shooter';

gameCatalog['In The Groove 2'] = new Game();
gameCatalog['In The Groove 2'].name = 'In The Groove 2';
gameCatalog['In The Groove 2'].developer = 'Roxor Games';
gameCatalog['In The Groove 2'].release = '2005';
gameCatalog['In The Groove 2'].players = '2';
gameCatalog['In The Groove 2'].category = 'rhythm';

gameCatalog['Spatter'] = new Game();
gameCatalog['Spatter'].name = 'Spatter';
gameCatalog['Spatter'].developer = 'Sega';
gameCatalog['Spatter'].release = '1984';
gameCatalog['Spatter'].players = '2';
gameCatalog['Spatter'].category = 'maze';

gameCatalog['Toy Pop'] = new Game();
gameCatalog['Toy Pop'].name = 'Toy Pop';
gameCatalog['Toy Pop'].developer = 'Namco';
gameCatalog['Toy Pop'].release = '1986';
gameCatalog['Toy Pop'].players = '2';
gameCatalog['Toy Pop'].category = 'maze';

gameCatalog['Turtles'] = new Game();
gameCatalog['Turtles'].name = 'Turtles';
gameCatalog['Turtles'].developer = 'Stern';
gameCatalog['Turtles'].release = '1981';
gameCatalog['Turtles'].players = '2';
gameCatalog['Turtles'].category = 'maze';

gameCatalog['Uncle Poo'] = new Game();
gameCatalog['Uncle Poo'].name = 'Uncle Poo';
gameCatalog['Uncle Poo'].developer = 'Diatec';
gameCatalog['Uncle Poo'].release = '1983';
gameCatalog['Uncle Poo'].players = '2';
gameCatalog['Uncle Poo'].category = 'maze';

gameCatalog['Sonson'] = new Game();
gameCatalog['Sonson'].name = 'Sonson';
gameCatalog['Sonson'].developer = 'Capcom';
gameCatalog['Sonson'].release = '1984';
gameCatalog['Sonson'].players = '2';
gameCatalog['Sonson'].category = 'platformer';

gameCatalog['Super Glob'] = new Game();
gameCatalog['Super Glob'].name = 'Super Glob';
gameCatalog['Super Glob'].developer = 'Epos Corporation';
gameCatalog['Super Glob'].release = '1983';
gameCatalog['Super Glob'].players = '2';
gameCatalog['Super Glob'].category = 'platformer';

gameCatalog['Teddy Boy Blues'] = new Game();
gameCatalog['Teddy Boy Blues'].name = 'Teddy Boy Blues';
gameCatalog['Teddy Boy Blues'].developer = 'Sega';
gameCatalog['Teddy Boy Blues'].release = '1985';
gameCatalog['Teddy Boy Blues'].players = '2';
gameCatalog['Teddy Boy Blues'].category = 'platformer';

gameCatalog['Xaind Sleena'] = new Game();
gameCatalog['Xaind Sleena'].name = 'Xaind Sleena';
gameCatalog['Xaind Sleena'].developer = 'Technos Japan';
gameCatalog['Xaind Sleena'].release = '1986';
gameCatalog['Xaind Sleena'].players = '2';
gameCatalog['Xaind Sleena'].category = 'platformer';

gameCatalog['Solomons Key'] = new Game();
gameCatalog['Solomons Key'].name = 'Solomons Key';
gameCatalog['Solomons Key'].developer = 'Tecmo';
gameCatalog['Solomons Key'].release = '1986';
gameCatalog['Solomons Key'].players = '2';
gameCatalog['Solomons Key'].category = 'puzzle';

gameCatalog['Uo Poko'] = new Game();
gameCatalog['Uo Poko'].name = 'Uo Poko';
gameCatalog['Uo Poko'].developer = 'Cave';
gameCatalog['Uo Poko'].release = '1998';
gameCatalog['Uo Poko'].players = '2';
gameCatalog['Uo Poko'].category = 'puzzle';

gameCatalog['Volfied'] = new Game();
gameCatalog['Volfied'].name = 'Volfied';
gameCatalog['Volfied'].developer = 'Taito';
gameCatalog['Volfied'].release = '1989';
gameCatalog['Volfied'].players = '2';
gameCatalog['Volfied'].category = 'puzzle';

gameCatalog['Vs Dr Mario'] = new Game();
gameCatalog['Vs Dr Mario'].name = 'Vs Dr Mario';
gameCatalog['Vs Dr Mario'].developer = 'Nintendo';
gameCatalog['Vs Dr Mario'].release = '1990';
gameCatalog['Vs Dr Mario'].players = '2';
gameCatalog['Vs Dr Mario'].category = 'puzzle';

gameCatalog['Robocop'] = new Game();
gameCatalog['Robocop'].name = 'Robocop';
gameCatalog['Robocop'].developer = 'Data East';
gameCatalog['Robocop'].release = '1988';
gameCatalog['Robocop'].players = '2';
gameCatalog['Robocop'].category = 'runandgun';

gameCatalog['Sky Kid'] = new Game();
gameCatalog['Sky Kid'].name = 'Sky Kid';
gameCatalog['Sky Kid'].developer = 'Namco';
gameCatalog['Sky Kid'].release = '1985';
gameCatalog['Sky Kid'].players = '2';
gameCatalog['Sky Kid'].category = 'shooter';

gameCatalog['Sky Skipper'] = new Game();
gameCatalog['Sky Skipper'].name = 'Sky Skipper';
gameCatalog['Sky Skipper'].developer = 'Nintendo';
gameCatalog['Sky Skipper'].release = '1981';
gameCatalog['Sky Skipper'].players = '2';
gameCatalog['Sky Skipper'].category = 'shooter';

gameCatalog['Space Firebird'] = new Game();
gameCatalog['Space Firebird'].name = 'Space Firebird';
gameCatalog['Space Firebird'].developer = 'Gremlin/Sega';
gameCatalog['Space Firebird'].release = '1980';
gameCatalog['Space Firebird'].players = '2';
gameCatalog['Space Firebird'].category = 'shooter';

gameCatalog['Strikers 1945 III'] = new Game();
gameCatalog['Strikers 1945 III'].name = 'Strikers 1945 III';
gameCatalog['Strikers 1945 III'].developer = 'Psikyo';
gameCatalog['Strikers 1945 III'].release = '1999';
gameCatalog['Strikers 1945 III'].players = '2';
gameCatalog['Strikers 1945 III'].category = 'shooter';

gameCatalog['Thunder Cross'] = new Game();
gameCatalog['Thunder Cross'].name = 'Thunder Cross';
gameCatalog['Thunder Cross'].developer = 'Konami';
gameCatalog['Thunder Cross'].release = '1988';
gameCatalog['Thunder Cross'].players = '2';
gameCatalog['Thunder Cross'].category = 'shooter';

gameCatalog['Thundercade'] = new Game();
gameCatalog['Thundercade'].name = 'Thundercade';
gameCatalog['Thundercade'].developer = 'Seta';
gameCatalog['Thundercade'].release = '1987';
gameCatalog['Thundercade'].players = '2';
gameCatalog['Thundercade'].category = 'shooter';

gameCatalog['U.N Defense Force Earth Joker'] = new Game();
gameCatalog['U.N Defense Force Earth Joker'].name = 'U.N Defense Force Earth Joker';
gameCatalog['U.N Defense Force Earth Joker'].developer = 'Visco';
gameCatalog['U.N Defense Force Earth Joker'].release = '1993';
gameCatalog['U.N Defense Force Earth Joker'].players = '2';
gameCatalog['U.N Defense Force Earth Joker'].category = 'shooter';

gameCatalog['Ghosts n Goblins'] = new Game();
gameCatalog['Ghosts n Goblins'].name = 'Ghosts n Goblins';
gameCatalog['Ghosts n Goblins'].developer = 'Capcom';
gameCatalog['Ghosts n Goblins'].release = '1985';
gameCatalog['Ghosts n Goblins'].players = '2';
gameCatalog['Ghosts n Goblins'].category = 'platformer';

gameCatalog['Motos'] = new Game();
gameCatalog['Motos'].name = 'Motos';
gameCatalog['Motos'].developer = 'Namco';
gameCatalog['Motos'].release = '1985';
gameCatalog['Motos'].players = '2';
gameCatalog['Motos'].category = 'puzzle';

gameCatalog['Ajax'] = new Game();
gameCatalog['Ajax'].name = 'Ajax';
gameCatalog['Ajax'].developer = 'Konami';
gameCatalog['Ajax'].release = '1987';
gameCatalog['Ajax'].players = '2';
gameCatalog['Ajax'].category = 'shooter';
gameCatalog['Ajax'].alternativeName = "Typhoon";

gameCatalog['Bermuda Triangle'] = new Game();
gameCatalog['Bermuda Triangle'].name = 'Bermuda Triangle';
gameCatalog['Bermuda Triangle'].developer = 'SNK';
gameCatalog['Bermuda Triangle'].release = '1987';
gameCatalog['Bermuda Triangle'].players = '2';
gameCatalog['Bermuda Triangle'].category = 'shooter';

gameCatalog['I Robot'] = new Game();
gameCatalog['I Robot'].name = 'I Robot';
gameCatalog['I Robot'].developer = 'Atari';
gameCatalog['I Robot'].release = '1983';
gameCatalog['I Robot'].players = '2';
gameCatalog['I Robot'].category = 'shooter';

gameCatalog['Plus Alpha'] = new Game();
gameCatalog['Plus Alpha'].name = 'Plus Alpha';
gameCatalog['Plus Alpha'].developer = 'Jaleco';
gameCatalog['Plus Alpha'].release = '1989';
gameCatalog['Plus Alpha'].players = '2';
gameCatalog['Plus Alpha'].category = 'shooter';

gameCatalog['Satans Hollow'] = new Game();
gameCatalog['Satans Hollow'].name = 'Satans Hollow';
gameCatalog['Satans Hollow'].developer = 'Bally Midway';
gameCatalog['Satans Hollow'].release = '1982';
gameCatalog['Satans Hollow'].players = '2';
gameCatalog['Satans Hollow'].category = 'shooter';

gameCatalog['Pang'] = new Game();
gameCatalog['Pang'].name = 'Pang';
gameCatalog['Pang'].developer = 'Mitchell / Capcom';
gameCatalog['Pang'].release = '1989';
gameCatalog['Pang'].players = '2';
gameCatalog['Pang'].category = 'platformer';
gameCatalog['Pang'].alternativeName = "Buster Bros";

gameCatalog['Super Pang'] = new Game();
gameCatalog['Super Pang'].name = 'Super Pang';
gameCatalog['Super Pang'].developer = 'Mitchell / Capcom';
gameCatalog['Super Pang'].release = '1990';
gameCatalog['Super Pang'].players = '2';
gameCatalog['Super Pang'].category = 'platformer';
gameCatalog['Super Pang'].alternativeName = "Super Buster Bros";

gameCatalog['Im Sorry'] = new Game();
gameCatalog['Im Sorry'].name = 'Im Sorry';
gameCatalog['Im Sorry'].developer = 'Sega';
gameCatalog['Im Sorry'].release = '1985';
gameCatalog['Im Sorry'].players = '2';
gameCatalog['Im Sorry'].category = 'maze';

gameCatalog['Pac And Pal'] = new Game();
gameCatalog['Pac And Pal'].name = 'Pac And Pal';
gameCatalog['Pac And Pal'].developer = 'Namco';
gameCatalog['Pac And Pal'].release = '30 July 1983';
gameCatalog['Pac And Pal'].players = '2';
gameCatalog['Pac And Pal'].category = 'maze';
gameCatalog['Pac And Pal'].alternativeName = "Pac-man and Chomp Chomp";

gameCatalog['Dragon Blaze'] = new Game();
gameCatalog['Dragon Blaze'].name = 'Dragon Blaze';
gameCatalog['Dragon Blaze'].developer = 'Psikyo';
gameCatalog['Dragon Blaze'].release = '2000';
gameCatalog['Dragon Blaze'].players = '2';
gameCatalog['Dragon Blaze'].category = 'shooter';

gameCatalog['Rabbit Punch'] = new Game();
gameCatalog['Rabbit Punch'].name = 'Rabbit Punch';
gameCatalog['Rabbit Punch'].developer = 'V-System';
gameCatalog['Rabbit Punch'].release = '1987';
gameCatalog['Rabbit Punch'].players = '2';
gameCatalog['Rabbit Punch'].category = 'shooter';

gameCatalog['Crime City'] = new Game();
gameCatalog['Crime City'].name = 'Crime City';
gameCatalog['Crime City'].developer = 'Taito';
gameCatalog['Crime City'].release = '1989';
gameCatalog['Crime City'].players = '2';
gameCatalog['Crime City'].category = 'beatemup';

gameCatalog['Eswat Cyber Police'] = new Game();
gameCatalog['Eswat Cyber Police'].name = 'Eswat Cyber Police';
gameCatalog['Eswat Cyber Police'].developer = 'Sega';
gameCatalog['Eswat Cyber Police'].release = '1989';
gameCatalog['Eswat Cyber Police'].players = '2';
gameCatalog['Eswat Cyber Police'].category = 'beatemup';

gameCatalog['Renegade'] = new Game();
gameCatalog['Renegade'].name = 'Renegade';
gameCatalog['Renegade'].developer = 'Taito';
gameCatalog['Renegade'].release = '1986';
gameCatalog['Renegade'].players = '2';
gameCatalog['Renegade'].category = 'beatemup';

gameCatalog['Sly Spy'] = new Game();
gameCatalog['Sly Spy'].name = 'Sly Spy';
gameCatalog['Sly Spy'].developer = 'Nihon Bussan/AV Japan';
gameCatalog['Sly Spy'].release = '1989';
gameCatalog['Sly Spy'].players = '1';
gameCatalog['Sly Spy'].category = 'beatemup';
gameCatalog['Sly Spy'].alternativeName = 'Secret Agent';

gameCatalog['Waku Waku 7'] = new Game();
gameCatalog['Waku Waku 7'].name = 'Waku Waku 7';
gameCatalog['Waku Waku 7'].developer = 'Sunsoft';
gameCatalog['Waku Waku 7'].release = '1996';
gameCatalog['Waku Waku 7'].players = '2';
gameCatalog['Waku Waku 7'].category = 'fighting';

gameCatalog['Knights Of The Round'] = new Game();
gameCatalog['Knights Of The Round'].name = 'Knights Of The Round';
gameCatalog['Knights Of The Round'].developer = 'Capcom';
gameCatalog['Knights Of The Round'].release = '1992';
gameCatalog['Knights Of The Round'].players = '3';
gameCatalog['Knights Of The Round'].category = 'hackandslash';

gameCatalog['Frenzy'] = new Game();
gameCatalog['Frenzy'].name = 'Frenzy';
gameCatalog['Frenzy'].developer = 'Stern';
gameCatalog['Frenzy'].release = '1982';
gameCatalog['Frenzy'].players = '2';
gameCatalog['Frenzy'].category = 'maze';

gameCatalog['Bagman'] = new Game();
gameCatalog['Bagman'].name = 'Bagman';
gameCatalog['Bagman'].developer = 'Valadon Automation';
gameCatalog['Bagman'].release = '1982';
gameCatalog['Bagman'].players = '2';
gameCatalog['Bagman'].category = 'platformer';

gameCatalog['Circus Charlie'] = new Game();
gameCatalog['Circus Charlie'].name = 'Circus Charlie';
gameCatalog['Circus Charlie'].developer = 'Konami';
gameCatalog['Circus Charlie'].release = '1984';
gameCatalog['Circus Charlie'].players = '2';
gameCatalog['Circus Charlie'].category = 'platformer';

gameCatalog['Kicker'] = new Game();
gameCatalog['Kicker'].name = 'Kicker';
gameCatalog['Kicker'].developer = 'Konami';
gameCatalog['Kicker'].release = '1985';
gameCatalog['Kicker'].players = '2';
gameCatalog['Kicker'].category = 'platformer';

gameCatalog['Pandoras Palace'] = new Game();
gameCatalog['Pandoras Palace'].name = 'Pandoras Palace';
gameCatalog['Pandoras Palace'].developer = 'Konami';
gameCatalog['Pandoras Palace'].release = '1984';
gameCatalog['Pandoras Palace'].players = '2';
gameCatalog['Pandoras Palace'].category = 'platformer';

gameCatalog['Continental Circus'] = new Game();
gameCatalog['Continental Circus'].name = 'Continental Circus';
gameCatalog['Continental Circus'].developer = 'Taito';
gameCatalog['Continental Circus'].release = '1988';
gameCatalog['Continental Circus'].players = '1';
gameCatalog['Continental Circus'].category = 'racing';

gameCatalog['Heavy Barrel'] = new Game();
gameCatalog['Heavy Barrel'].name = 'Heavy Barrel';
gameCatalog['Heavy Barrel'].developer = 'Dataeast';
gameCatalog['Heavy Barrel'].release = '1987';
gameCatalog['Heavy Barrel'].players = '2';
gameCatalog['Heavy Barrel'].category = 'runandgun';

gameCatalog['Metal Slug X'] = new Game();
gameCatalog['Metal Slug X'].name = 'Metal Slug X';
gameCatalog['Metal Slug X'].developer = 'SNK';
gameCatalog['Metal Slug X'].release = '1999';
gameCatalog['Metal Slug X'].players = '2';
gameCatalog['Metal Slug X'].category = 'runandgun';

gameCatalog['Super Contra'] = new Game();
gameCatalog['Super Contra'].name = 'Super Contra';
gameCatalog['Super Contra'].developer = 'Konami';
gameCatalog['Super Contra'].release = '1988';
gameCatalog['Super Contra'].players = '2';
gameCatalog['Super Contra'].category = 'runandgun';

gameCatalog['Blazing Star'] = new Game();
gameCatalog['Blazing Star'].name = 'Blazing Star';
gameCatalog['Blazing Star'].developer = 'Yumekobo';
gameCatalog['Blazing Star'].release = '1998';
gameCatalog['Blazing Star'].players = '2';
gameCatalog['Blazing Star'].category = 'shooter';

gameCatalog['Darius Gaiden'] = new Game();
gameCatalog['Darius Gaiden'].name = 'Darius Gaiden';
gameCatalog['Darius Gaiden'].developer = 'Taito';
gameCatalog['Darius Gaiden'].release = '1994';
gameCatalog['Darius Gaiden'].players = '2';
gameCatalog['Darius Gaiden'].category = 'shooter';

gameCatalog['Darius'] = new Game();
gameCatalog['Darius'].name = 'Darius';
gameCatalog['Darius'].developer = 'Taito';
gameCatalog['Darius'].release = '1986';
gameCatalog['Darius'].players = '2';
gameCatalog['Darius'].category = 'shooter';

gameCatalog['DoDonpachi'] = new Game();
gameCatalog['DoDonpachi'].name = 'DoDonpachi';
gameCatalog['DoDonpachi'].developer = 'Cave';
gameCatalog['DoDonpachi'].release = '2000';
gameCatalog['DoDonpachi'].players = '2';
gameCatalog['DoDonpachi'].category = 'shooter';

gameCatalog['DonPachi'] = new Game();
gameCatalog['DonPachi'].name = 'DonPachi';
gameCatalog['DonPachi'].developer = 'Cave';
gameCatalog['DonPachi'].release = '1995';
gameCatalog['DonPachi'].players = '2';
gameCatalog['DonPachi'].category = 'shooter';

gameCatalog['Fixeight'] = new Game();
gameCatalog['Fixeight'].name = 'Fixeight';
gameCatalog['Fixeight'].developer = 'Toaplan';
gameCatalog['Fixeight'].release = '1992';
gameCatalog['Fixeight'].players = '2';
gameCatalog['Fixeight'].category = 'shooter';

gameCatalog['Gunbird 2'] = new Game();
gameCatalog['Gunbird 2'].name = 'Gunbird 2';
gameCatalog['Gunbird 2'].developer = 'Psikyo';
gameCatalog['Gunbird 2'].release = '1998';
gameCatalog['Gunbird 2'].players = '2';
gameCatalog['Gunbird 2'].category = 'shooter';

gameCatalog['Gunbird'] = new Game();
gameCatalog['Gunbird'].name = 'Gunbird';
gameCatalog['Gunbird'].developer = 'Psikyo';
gameCatalog['Gunbird'].release = '1994';
gameCatalog['Gunbird'].players = '2';
gameCatalog['Gunbird'].category = 'shooter';

gameCatalog['Raiden Fighters'] = new Game();
gameCatalog['Raiden Fighters'].name = 'Raiden Fighters';
gameCatalog['Raiden Fighters'].developer = 'Seibu Kaihatsu';
gameCatalog['Raiden Fighters'].release = '1996';
gameCatalog['Raiden Fighters'].players = '2';
gameCatalog['Raiden Fighters'].category = 'shooter';

gameCatalog['Raiden'] = new Game();
gameCatalog['Raiden'].name = 'Raiden';
gameCatalog['Raiden'].developer = 'Seibu Kaihatsu';
gameCatalog['Raiden'].release = '1990';
gameCatalog['Raiden'].players = '2';
gameCatalog['Raiden'].category = 'shooter';

gameCatalog['Sheriff'] = new Game();
gameCatalog['Sheriff'].name = 'Sheriff';
gameCatalog['Sheriff'].developer = 'Nintendo';
gameCatalog['Sheriff'].release = '1980';
gameCatalog['Sheriff'].players = '2';
gameCatalog['Sheriff'].category = 'shooter';

gameCatalog['Vulgus'] = new Game();
gameCatalog['Vulgus'].name = 'Vulgus';
gameCatalog['Vulgus'].developer = 'Capcom';
gameCatalog['Vulgus'].release = '1984';
gameCatalog['Vulgus'].players = '2';
gameCatalog['Vulgus'].category = 'shooter';

gameCatalog['Up N Down'] = new Game();
gameCatalog['Up N Down'].name = 'Up N Down';
gameCatalog['Up N Down'].developer = 'Sega';
gameCatalog['Up N Down'].release = '1983';
gameCatalog['Up N Down'].players = '2';
gameCatalog['Up N Down'].category = 'racing';

gameCatalog['Lode Runner'] = new Game();
gameCatalog['Lode Runner'].name = 'Lode Runner';
gameCatalog['Lode Runner'].developer = 'Irem';
gameCatalog['Lode Runner'].release = '1984';
gameCatalog['Lode Runner'].players = '1';
gameCatalog['Lode Runner'].category = 'platformer';

gameCatalog['Elevator Action'] = new Game();
gameCatalog['Elevator Action'].name = 'Elevator Action';
gameCatalog['Elevator Action'].developer = 'Taito';
gameCatalog['Elevator Action'].release = '1983';
gameCatalog['Elevator Action'].players = '2';
gameCatalog['Elevator Action'].category = 'platformer';

gameCatalog['Act Fancer'] = new Game();
gameCatalog['Act Fancer'].name = 'Act Fancer';
gameCatalog['Act Fancer'].developer = 'Data East';
gameCatalog['Act Fancer'].release = '1989';
gameCatalog['Act Fancer'].players = '2';
gameCatalog['Act Fancer'].category = 'runandgun';

gameCatalog['Baby Pac-Man'] = new Game();
gameCatalog['Baby Pac-Man'].name = 'Baby Pac-Man';
gameCatalog['Baby Pac-Man'].developer = 'Bally Midway';
gameCatalog['Baby Pac-Man'].release = '1982';
gameCatalog['Baby Pac-Man'].players = '2';
gameCatalog['Baby Pac-Man'].category = 'maze';