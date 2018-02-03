const express = require(`express`)
const app = express()
const port = process.argv[2] || 8080
const bodyParser = require('body-parser')

app.use(express.static('Public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


function Infos(name, username, email) {
    this.name = name,
    this.username = username,
    this.email = email
}

function History(game) {
    this.game = []
    
}
function Games(score, guess, difficulty) {
    this.state=state,
        this.guess=guess,
            this.difficulty=difficulty
}

let Players = {};

let game = {
    player: "",
    gamestate:
        {
            state: "",
            guess: 0,
            difficulty: "easy"
        }
}

app.get('/', (req, res) => {
    // const name = 'Andrew'
    response.send(`<h1> Hello, my name is </h1>`)

})

// app.get('/sign', (req, res) => {
//     res.send('hello')

// })

app.post('/sign', function (req, res) {
    let {name, username, email} = req.body

    Players[username] = new Infos(name, username, email)

    res.json({
        name,
        username,
        email
    })
    console.log(Players)
})

app.post('/game', function (req, res) {
    let {Cplayer, state, guess, difficulty} = req.body
    console.log(Cplayer)
    Players[Cplayer] = new History()

    Pplayer[Cplayer][history].push(Object.assign({}, game.gamestate));

    res.json({
        Cplayer,
        state,
        guess,
        diffcutlty
    })
    console.log(Players)
})

app.listen(port, () => {

    console.log(`Iam listening on Port ${port}`)

})  