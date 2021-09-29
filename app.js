const express = require('express');
const app = express();
const port = (parseInt(process.env.PORT || '3000'));
const level = require('level');
const db = level('./db', {valueEncoding: 'json'})


app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

//pour les movies !!!


app.post('/movies', async (req, res) => {
    await db.put(req.body.id, req.body)  //await db.put(req.body)
    res.status(200).json(req.body)
});


app.put('/movies/:id', async (req, res) => {
    await db.put(req.body.id, req.body)  //await db.put(req.body)
    res.status(200).json(req.body)
});


app.delete('/movies/:id', async (req, res) => {
    await db.del(req.params.id)  //await db.put(req.body)
    res.status(200).json("supprimé")
});

//Pour les listes !!

app.get('/movies/:id', async (req, res) => {
        try {
            let movie = await db.get(req.params.id)
            res.status(200).json(movie)
        } catch (err) {
            res.status(404).end();
        }
    }
)
;

app.post('/list/add', (req, res) => {
    db.put(req.body.id, req.body)
    res.status(200).json(req.body)
});

app.get('/list/:id', async (req, res) => {
    let movies_id = parseInt(req.params.id)
    let list = await db.get(movies_id)
    res.status(200).json(list)
});

app.put('/list/:id/update', async (req, res) => {
    // const id = parseInt(req.params.id)
    // const movie = await db.get(id)
    //  movie.id = req.body.id
    //  movies_id.language = req.body.movies_id,
    //  movie.description = req.body.description
    await db.put(req.body.id, req.body)
    res.status(200).json(req.body)
});



app.delete('/list/:id/delete', async (req,res) => {
    await db.del(req.params.id)  //await db.put(req.body)
    res.status(200).json("supprimé")
});



//pour la liste de la collection


app.post('/list/:id/movies/add', async (req, res) => {

    let list_id = parseInt(req.params.id)
    let list = await db.get(list_id)
    let movie_id = req.body.movies_id
    list.movies_id.push(movie_id)
    db.put(list_id,list)
    res.status(200).json(list)
});

app.put('/list/:id/movies/:movie_id/update', async (req, res) => {
    let list_id = parseInt(req.params.id)

    let list = await db.get(list_id) //recuperation de l'id de ma liste

    let movie_id = parseInt(req.params.movie_id)

    let movieindex =list.movies_id.indexOf(movie_id)// recuperation de l'id de mon tableau movies_id

    //objectif : changer la valeur de mon tableau

    let bodyReq = req.body.movies_id

    list.movies_id[movieindex] = bodyReq

   // list.movies_id.splice( l'index de ce que je veux remplacer', 1,ce que je veux mettre )

    db.put(list_id,list)

    res.status(200).json(list)
});

app.delete('/list/:id/movies/:movie_id/delete', async (req,res) => {
    let list_id = parseInt(req.params.id)

    let list = await db.get(list_id) //recuperation de l'id de ma liste

    let movie_id = parseInt(req.params.movie_id)

    let movieindex =list.movies_id.indexOf(movie_id)// recuperation de l'id de mon tableau movies_id

    list.movies_id.splice(movieindex, 1)

    db.put(list_id,list)

    res.status(200).json("film supprimé dans ma liste")
});

app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`)
});

/*
app.get('/', (req, res) => {
    res.send('Hello World!')
});
*/

