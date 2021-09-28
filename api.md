Comme décrit au début du document, notre API doit gérer des données personnelles, autour des
films issus de la base de données publique themoviedb.org.  

****Dans notre API, un film peut être décrit par trois propriétés :****

● Un identifiant (issue de themoviedb.org)  

● Une note  

● Un commentaire  

****Une liste de films peut aussi être décrite par trois propriétés :**** 

● Un identifiant  

● Un libellé  

● La liste ordonnée des identifiants des films contenus dans cette liste  



|Nom de methode  | Qu'est ce que ça fait        | Route |Description en détail| 
| :--------------- |:---------------:| -----:| -----:|
| Get |   recuperer la liste des films    | **GET /movies**| None | 
|Post  | creer un nouveau film               |  **POST    /movies**|**Body Parameters**<br/>``id``   integer <br/>The id of the movie.<br/>``name``   string <br/>The name of the movie <br/>``rating``   integer <br/>The rating of the movie<br/>  | 
| Put  | modifier un film     |**PUT /movie/{id}**| **Path Parameters**<br/>``id``  integer    required<br/>**BODY Parameters**<br/>``name``   string <br/>The name of the movie<br/> <br/>``rating``   string <br/>The rating of the movie<br/>``comment``   string <br/>The comment of the movies<br/>   | 
| Delete  | supprimer un film     |**DELETE /movie/{id}**|**Path Parameters**<br/>``id``   integer <br/>required. |




```node
const movies = require('./movie.json')

app.get('/movies', (req, res) => {
res.send("Liste des films")
});
```
Maintenant que notre route fonctionne et est capable de recevoir la requête entrante,
nous allons pouvoir renvoyer la donnée des moviess au lieu d'avoir simplement une chaîne de caractères:  

```node
const movies = require('./movie.json')

app.get('/movies/{movie_id}', (req,res) => {
    const id = parseInt(req.params.id)
    const movie = movies.find(movie => movie.id === id)
    res.status(200).json(movie)
})
```
Si je veux creer un nouveau film :  

```node
const movies = require('./movie.json')

app.post('/movies', (req,res) => {
movies.push(req.body)
res.status(200).json(movies)
})
```

Si je veux modifier un film : 

```node
const movies = require('./movie.json')

app.put('/movies/{movie_id}', (req,res) => {
    const id = parseInt(req.params.id)
    const movie = movies.find(movie => movie.id === id)
    movies.name =req.body.name,
    movies.city =req.body.city,
    movies.type =req.body.type,
    res.status(200).json(movies)
})
```

Pour supprimer un film : 

```node
const movies = require('./movie.json')

app.delete('/movies/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let movie = movies.find(movie => movie.id === id)
    movies.splice(movies.indexOf(movie),1)
    res.status(200).json(movies)
})
```