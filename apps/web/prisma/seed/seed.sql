INSERT INTO public."Species" ("id", "commonName", "classification", "scientificName")
VALUES
	('ckvf81jgp000001ytn5jmbkzy', 'Pardal', 'BIRD', 'Passer domesticus'),
	('ckvf81jgp000101ytg5kkfs4y', 'Papagaio', 'BIRD', 'Amazona aestiva'),
	('ckvf81jgp000201ytnmqwsxzy', 'Gavião', 'BIRD', 'Buteo jamaicensis'),
	('ckvf81jgp000301ytf9jdlrzy', 'Coruja', 'BIRD', 'Tyto alba'),
	('ckvf81jgp000401yt5zx2jizy', 'Canário', 'BIRD', 'Serinus canaria'),
	('ckvf81jgp000501ytw6zwzsyy', 'Jacaré', 'REPTILE', 'Alligator mississippiensis'),
	('ckvf81jgp000601yt4ngxtizy', 'Lagarto', 'REPTILE', 'Iguana iguana'),
	('ckvf81jgp000701yt1jxczmzy', 'Tartaruga', 'REPTILE', 'Chelonia mydas'),
	('ckvf81jgp000801ytng5rjvzy', 'Cobra', 'REPTILE', 'Serpentes'),
	('ckvf81jgp000901yt0jxtmwzy', 'Iguana', 'REPTILE', 'Iguana iguana'),
	('ckvf81jgp000a01yt4jdt6czy', 'Leão', 'MAMMAL', 'Panthera leo'),
	('ckvf81jgp000b01ytm3jdhzzy', 'Elefante', 'MAMMAL', 'Loxodonta africana'),
	('ckvf81jgp000c01yt0jknxzyy', 'Gato', 'MAMMAL', 'Felis catus'),
	('ckvf81jgp000d01ytngdnbyzy', 'Cachorro', 'MAMMAL', 'Canis lupus familiaris'),
	('ckvf81jgp000e01ytwgxwqzzy', 'Cavalo', 'MAMMAL', 'Equus ferus caballus'),
	('ckvf81jgp000f01ytwj5jwfzy', 'Vaca', 'MAMMAL', 'Bos taurus'),
	('ckvf81jgp000g01yt5gzwjtzy', 'Macaco', 'MAMMAL', 'Macaca fascicularis'),
	('ckvf81jgp000h01ytm4gqtjzy', 'Rato', 'MAMMAL', 'Rattus norvegicus'),
	('ckvf81jgp000i01yt0njsjzzy', 'Porco', 'MAMMAL', 'Sus scrofa domesticus'),
	('ckvf81jgp000j01yt6zwbqkzy', 'Coelho', 'MAMMAL', 'Oryctolagus cuniculus');

INSERT INTO public."Animal" ("id", "name", "trackingMark", "markType", "age", "gender", "speciesId")
VALUES
	('ckvf8g4jv000101ytg1qx2mkz', 'Max', '123456789', 'MICROCHIP', 'ADULT', 'MALE', 'ckvf81jgp000d01ytngdnbyzy'),
	('ckvf8g4jv000201ytgxjtwrkz', 'Bella', NULL, 'UNMARKED', 'YOUNG', 'FEMALE', 'ckvf81jgp000c01yt0jknxzyy'),
	('ckvf8g4jv000301yt5zx9tvkz', 'Luna', '987654321', 'WASHER', 'ADULT', 'FEMALE', 'ckvf81jgp000a01yt4jdt6czy'),
	('ckvf8g4jv000401ytj3xnmjkz', 'Charlie', '654321987', 'MICROCHIP', 'YOUNG', 'MALE', 'ckvf81jgp000c01yt0jknxzyy'),
	('ckvf8g4jv000501ytk5jxfrkz', 'Lucy', NULL, 'UNMARKED', 'ELDERLY', 'FEMALE', 'ckvf81jgp000e01ytwgxwqzzy'),
	('ckvf8g4jv000601ytj4xnjmkz', 'Simba', '123654789', 'MICROCHIP', 'CUB', 'MALE', 'ckvf81jgp000a01yt4jdt6czy'),
	('ckvf8g4jv000701yt4jxmxrkz', 'Milo', NULL, 'UNMARKED', 'YOUNG', 'MALE', 'ckvf81jgp000c01yt0jknxzyy'),
	('ckvf8g4jv000801ytp2jxtykz', 'Lola', '321456987', 'WASHER', 'ADULT', 'FEMALE', 'ckvf81jgp000d01ytngdnbyzy'),
	('ckvf8g4jv000901yt8zxfnvkz', 'Buddy', '654987321', 'MICROCHIP', 'ADULT', 'MALE', 'ckvf81jgp000d01ytngdnbyzy'),
	('ckvf8g4jv000a01yt4xjnfykz', 'Daisy', NULL, 'UNMARKED', 'YOUNG', 'FEMALE', 'ckvf81jgp000f01ytwj5jwfzy'),
	('ckvf8g4jv000b01yt9jxmvrkz', 'Rocky', '987321654', 'MICROCHIP', 'ADULT', 'MALE', 'ckvf81jgp000g01yt5gzwjtzy'),
	('ckvf8g4jv000c01ytw3xnjzkz', 'Maggie', '321987654', 'WASHER', 'YOUNG', 'FEMALE', 'ckvf81jgp000j01yt6zwbqkzy'),
	('ckvf8g4jv000d01yt6zxfnlkz', 'Oscar', '987654123', 'MICROCHIP', 'ELDERLY', 'MALE', 'ckvf81jgp000g01yt5gzwjtzy'),
	('ckvf8g4jv000e01yt1jxmnzkz', 'Chloe', NULL, 'UNMARKED', 'ADULT', 'FEMALE', 'ckvf81jgp000h01ytm4gqtjzy'),
	('ckvf8g4jv000f01yt5zxrnmkz', 'Coco', '456123987', 'WASHER', 'YOUNG', 'FEMALE', 'ckvf81jgp000f01ytwj5jwfzy'),
	('ckvf8g4jv000g01yt4jxntlkz', 'Jack', '123987654', 'MICROCHIP', 'ADULT', 'MALE', 'ckvf81jgp000g01yt5gzwjtzy'),
	('ckvf8g4jv000h01yt9jxqfnkz', 'Rosie', NULL, 'UNMARKED', 'YOUNG', 'FEMALE', 'ckvf81jgp000f01ytwj5jwfzy'),
	('ckvf8g4jv000i01yt4jxqtzkz', 'Toby', '654321789', 'WASHER', 'ADULT', 'MALE', 'ckvf81jgp000d01ytngdnbyzy'),
	('ckvf8g4jv000j01yt5zxqvzkz', 'Lily', '789456123', 'MICROCHIP', 'CUB', 'FEMALE', 'ckvf81jgp000a01yt4jdt6czy'),
	('ckvf8g4jv000k01yt6zxfnzkz', 'Buster', '321654987', 'WASHER', 'ELDERLY', 'MALE', 'ckvf81jgp000d01ytngdnbyzy');
