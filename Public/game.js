let game = {
    player: "",
    gamestate:
    {
        state: "",
        guess: 0,
        difficulty: "easy"
    }
}

console.log(game.gamestate)

function Game() {
    this.player="",
    this.gamestate=
    {
        state :"",
        guess:0,
        difficulty:""
    }
}
function User(name, username, email, history) {
    this.name = name,
        this.username = username,
        this.email = email,
        this.history = []
}

let player = {};
console.log(player)

let Secretnumber = {
    secret: ""
}
console.log(Secretnumber)

let maxguess = 5;
console.log(maxguess)



$(function () {
    $("#easy").click(() => {
        maxguess = 4;
        game.gamestate.difficulty = "Easy";

        return maxguess

    })

    $("#medium").click(() => {
        maxguess = 3;
        game.gamestate.difficulty = "Medium";
        return maxguess

    })

    $("#hard").click(() => {
        maxguess = 2;
        game.gamestate.difficulty = "Hard";

        return maxguess

    })
    function empty() {
        $("#set").empty();
        $("#lab1").empty();
        $("#setguess").empty();
        $("#message").empty();
        $("#message2").empty();
        $(".high").css("background-color", "white");
        $(".low").css("background-color", "white");
        $(".high_text").empty();
        $(".low_text").empty();
        $("#maxguess").empty();


    }

    function show() {
        $("#Inumber").show();
        $("#guess").hide()
        $("#set").show()
        $("#easy").show()
        $("#medium").show()
        $("#hard").show()
        $("#setguess").hide()
    }

    function hide() {
        $("#easy").hide()
        $("#medium").hide()
        $("#hard").hide()

    }

    function add() {
        $("#lab1").append("Choose a number");
        $("#setguess").append("Guess");
        $("#set").append("Set a Number");
    }
    $("#Sign_in").on("click", function () {
        function effect() {
            $("#login").hide();

            return $("#Sign_in").fadeOut(500);
        };
        $.when(effect()).done(function () {
            $("#register").fadeIn(1000);
        });
    });

    $("#login").on("click", function () {
        function effect() {
            $("#Sign_in").hide();

            return $("#login").fadeOut(500);
        };
        $.when(effect()).done(function () {
            $("#enter").fadeIn(1000);
        });
    });

    $("#target").click(function () {
        var name = $("#name").val()
        var username = $("#username").val()
        var email = $("#email").val()
        $.post('/sign', {
            name,
            username,
            email
        }, (res=>{
            // console.log(res)
        }))
        game.player = username;
        player[username] = new User(name, username, email)
        

        function effect() {
            return $("#register").fadeOut(500);
        };
        $.when(effect()).done(function () {
            empty();
            add();
            $("#message").append("Hi " + name + ", Welcome to our Guessing Game");
            $("#Inumber").show();
            $("#set").show();
            $("#guess").hide();
            $("#setguess").hide();
            $("#setgame").fadeIn(1000);

        })

    });

    $("#target2").click(function () {

        let username2 = $("#username2").val()
        if (player[username2]) {
            game.player = username2;


            function effect() {
                return $("#enter").fadeOut(500);
            };
            $.when(effect()).done(function () {
                empty();
                add();
                $("#message").append("Welcome back " + player[username2].name)
                $("#Inumber").show();
                $("#set").show();
                $("#guess").hide()
                $("#setguess").hide()
                $("#setgame").fadeIn(1000);

            })
        } else {
            alert("OOps could find you")


        }




    });

    $("#set").click(function secretNumber() {
        var num = Number($("#Inumber").val());

        Secretnumber.secret = Math.floor(Math.random() * (num - 1 + 1)) + 1;
        console.log(Secretnumber.secret)
    })



    $("#set").on("click", function () {
        game.gamestate.guess = 0;
        game.gamestate.state = "";

        var num = Number($("#Inumber").val());
        if (num === 0) {
            $("#message").empty()
            $("#message").append("Ohh " + name + ", why don't you wanna play with me Nasty Boy!")
            $("#Sign_in").fadeIn(1000);
            $("#login").fadeIn(1000);
            $("#setgame").fadeOut(500);


        } else {
            $("#message").empty()

            $("#message").append("Let's Play Now")
            $("#message2").append("you have chosen the number " + $("#Inumber").val())

        }

        empty()

        function reset() {
            show()
            $("#lab1").append('Choose a number between 1 and ' + $("#Inumber").val())
            $("#Inumber").hide();
            $("#guess").show()
            $("#set").hide()
            hide()
            $("#setguess").show()
            $("#setguess").append("Guess")
            $("#maxguess").append("The max guesses are " + maxguess)
        }
        $.when(reset()).done(function () {



        })

    })



    $("#setguess").click(function () {
        $("#setguess").empty()
        $("#text_low").empty()
        $("#text_High").empty()

        hide()
        game.gamestate.guess++

        check()
        $("#setgame").trigger('reset');
        $("#setguess").append(game.gamestate.guess + " Guess")

        console.log(game.gamestate.guess)

    });


    function check() {

        var goal = Secretnumber.secret;

        var guess = Number($("#guess").val());

        if (game.gamestate.guess === maxguess) {
            alert("You lost")

            game.gamestate.state = "LOST";
            console.log(game.gamestate)
            game.player= Cplayer
            
            $.post('/game', {
                Cplayer,
                state:game.gamestate.state,
                guess,
                difficulty:game.gamestate.difficulty
            }, (res=>{
                // console.log(res)
            }))
            player[game.player].history.push(Object.assign({}, game.gamestate));
            var r = confirm("Do you still want to play ?!");
            if (r === true) {
                function effect() {
                    return $("#setgame").fadeOut(200);
                };
                $.when(effect()).done(function () {
                    show()
                    empty()
                    add()
                    $("#setgame").fadeIn(1000);

                })
            } else {
                empty()
                $("#setgame").fadeOut(200);
                $("#Sign_in").fadeIn(200);
                $("#login").fadeIn(200);

            }

        } else {
            if (guess < goal) {
                $(".high").css("background-color", "white");
                $(".high_text").empty();
                $(".low").css("background-color", "green");
                $(".low_text").append("Text");


            }
            else if (guess > goal) {
                $(".low").css("background-color", "white");
                $(".low_text").empty();
                $(".high").css("background-color", "red");
                $(".high_text").append("Text");
            }
            else if (guess === goal) {

                alert("You WIN")
                game.gamestate.state = "WIN";
                player[game.player].history.push(Object.assign({}, game.gamestate));
                var r = confirm("Do you still want to play ?!");
                if (r === true) {
                    function effect() {
                        return $("#setgame").fadeOut(200);
                    };
                    $.when(effect()).done(function () {
                        $("#setgame").fadeIn(1000);
                        empty();
                        show();
                        add();
                        $("#message").append("Let's Play Now")


                    })
                } else {


                    $("#setgame").fadeOut(200);
                    $("#Sign_in").fadeIn(200);
                    $("#login").fadeIn(200);

                }

            }
        }

    }

    console.log(player)

})