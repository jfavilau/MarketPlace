# EcoFood - MarketPlace

## Manual de instalación

### Introducción

Este manual describe el proceso de instalación y despliegue en un ambiente local del proyecto.

Se asume que se tiene instalado:

* Python versión 3.6 instalado localmente - vea las guias de instalación para [OS X](http://docs.python-guide.org/en/latest/starting/install3/osx/) , [Windows](http://docs.python-guide.org/en/latest/starting/install3/win/), o [Linux](http://docs.python-guide.org/en/latest/starting/install3/linux/).
* Pipenv instalado localmente. Ejecute el comando: `pip install pipenv`.
* Postgres instalado localmente - [Descargar](https://www.postgresql.org/download/).

### Clonar el proyecto

En este paso, se descarga de Internet una copia del código fuente de la aplicación para ejecutarla localmente.

Para clonar la aplicación, ejecute los siguientes comandos en el shell de comandos o el terminal de su computador.

```engine='sh'
$ git clone https://github.com/ejcoral/MarketPlace.git
$ cd MarketPlace
```
Esta copia además del código, trae un Pipfile, para usar con Pip, el administrador de dependencias de Python.

### Declarar dependencias localmente

Para descargar localmente las dependencias del proyecto, utilice Pipenv para crear un ambiente virtual:
```engine='sh'
$ pipenv --three
$ pipenv install
```
Ahora, active el ambiente virtual:
```engine='sh'
$ pipenv shell
```
Una vez las dependencias esten instaladas, el proyecto podrá ejecutarse localmente.

Django utiliza recursos locales, por lo que es necesario ejecutar el comando `collectstatic`
```engine='sh'
$ python manage.py collectstatic
```
Responda “yes” cuando se le solicite.

### Conectar la base de datos

Para copiar el modelo de datos de la aplicación en la base de datos local, se debe crear el usuario de Postgres con la configuración del archivo `/MarketPlace/gettingstarted/settings.py`.
```
DATABASES = {
        'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'marketplace',
        'USER': 'postgres',
        'PASSWORD': 'catalogobio',
        'HOST': '127.0.0.1',
      }
}
```
Las migraciones son la forma como Django propaga los cambios realizados a los modelos. Para crear el esquema en la base de datos local, ejecute el siguiente comando:
```engine='sh'
$ python manage.py migrate
```

Finalmente, para desplegar la aplicación localmente, ejecute el comando:
```engine='sh'
$ python manage.py runserver
```

Abra un navegador web e ingrese a la dirección:

`http://localhost:8000/`
