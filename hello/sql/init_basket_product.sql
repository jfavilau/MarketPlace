DO
$do$
BEGIN
--CREATE CITY
  IF NOT EXISTS (SELECT * FROM "hello_city" WHERE id = 1) THEN
    INSERT INTO "hello_city" (
      "name",
      "shortName"
    )
    VALUES (
      'Bogota',
      'BOG'
    );
  END IF;
-- CREATE COOPERATIVE
  IF NOT EXISTS (SELECT * FROM "hello_cooperative" WHERE id = 1) THEN
    INSERT INTO "hello_cooperative" (
      "name",
      "active",
      "city_id"
    )
    VALUES (
      'Corporacion de Vegetales',
      't',
      1
    );
  END IF;

-- CREATE BASKET PRODUCER
  IF NOT EXISTS (SELECT * FROM "hello_producer" WHERE id = 1) THEN
    INSERT INTO "hello_producer" (
      "identificationNumber",
      "name",
      "address",
      "latitude",
      "longitude",
      "phoneNumber",
      "active",
      "cooperative_id",
      "city",
      "typeIdentification",
      "image"
    )
    VALUES (
      1,
      'Productor Cooperativa',
      'Km 1 avenida Cota',
      1,
      2,
      '4789456',
      't',
      1,
      'Bogotá',
      'Cedula de Ciudadania',
      'https://definicion.mx/wp-content/uploads/2013/11/usuario.jpg'
    );
  END IF;

-- CREATE BASKET CATEGORY
  IF NOT EXISTS (SELECT * FROM "hello_category" WHERE id = 1) THEN
    INSERT INTO "hello_category" (
      "shortName",
      "name"
    )
    VALUES (
      'BSK',
      'Basket'
    );
  END IF;
END
$do$
