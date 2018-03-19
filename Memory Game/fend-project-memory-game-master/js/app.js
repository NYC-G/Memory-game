/*
 * Create a list that holds all of your cards
 */
(function() {
    "use strict";
    var list = [
        "fa-diamond",
        "fa-paper-plane-o",
        "fa-anchor",
        "fa-bolt",
        "fa-cube",
        "fa-anchor",
        "fa-leaf",
        "fa-bicycle",
        "fa-diamond",
        "fa-bomb",
        "fa-leaf",
        "fa-bomb",
        "fa-bolt",
        "fa-bicycle",
        "fa-paper-plane-o",
        "fa-cube"
    ];

  // Shuffle the list of cards function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    // Loop through each card and create its HTML <li> after shuffle the card.
    function add_list(list) {
        for (var i = 0; i < list.length; i++) {
            $("#cards").append("<li class='card'><i class='fa " + list[i] + "'></i></li>");
        }
    }

   // Reset card, stars, moves, timer
    function reset_game(the_timer) {
        $(".fa-repeat").click(function() {
            $("ul#cards").children().remove("li");
            $(".stars").children().remove("li");
            $(".stars").append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>");
            $(".moves").text("0");
            clearInterval(the_timer);
            $("#timer").text("0.000");
            startGame();
        });
    }

    function score_ratings(moves, matched, the_timer, finished_time) {
        var all_stars = $(".stars");

        if (matched === 8) {
            $("#timer").text(finished_time);
            clearInterval(the_timer);

            setTimeout(function() {
                alert("!You are the Winer!");
                alert(" You made  " + moves + " shots and " + finished_time + " second to goal!\nYour ratio is " + $(".fa-star").length + " out of 3-star ratio!");
                if (confirm("Do you want to play one more time?") === true) {
                    $(".fa-repeat").click(); // Click reset
                } else {
                    alert("The Game is over, see you soon!");
                }


            }, 500);

        } else {
            if ((moves > 12) && (moves <= 15)) {
                all_stars.children().remove("li");
                all_stars.append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li>"); // Two stars
            } else if (moves > 17) {
                all_stars.children().remove("li");
                all_stars.append("<li><i class='fa fa-star'></i></li><li><i class='fa fa-star-o'></i></li><li><i class='fa fa-star-o'></i></li>"); // One star
            }
        }
    }

    function startGame() {
        list = shuffle(list);
        add_list(list);

        // Initial parameters
        var previous_card_selector = "";
        var previous_card_icon = "";
        var move_count = 0;
        var card_selected = false;
        var timer = 0;
        var the_timer;
        var matched = 0;
        var finished_time = 0;

        $(".card").on("click", function() {
            timer++; // Activation the timer/stop
            var current_card = $(this).attr("class");
            var current_card_icon = $(this).children().attr("class");

            // Matching card and set up listener when the card is clicked
            if (current_card === "card") {
                if ((current_card_icon === previous_card_icon) && (card_selected === true)) {
                  // Locking the cards when two cards are matched
                    $(this).addClass("match");
                    previous_card_selector.removeClass("open show").addClass("match");
                    card_selected = false;
                    matched++;
                    move_count++;

                } else if ((card_selected === true)) {
                // When the cards not matched, the cards are locked in the visible position and blocking opening another card. Cards are removed from the list, hiding the card symbol and switch on to click other cards.
                    $(this).addClass("open show");
                    $(".card").addClass("disabled");
                    setTimeout(function() {
                        $(".open.show").removeClass("open show");
                        $(".card").removeClass("disabled");
                    }, 800);
                    card_selected = false;
                    move_count++;

                } else {
                  // Click and show the card
                    $(this).addClass("open show");
                    previous_card_icon = current_card_icon;
                    previous_card_selector = $(this);
                    card_selected = true;
                }
                 // Update moves counting on the website
                $(".moves").text(move_count);

                // Stars rating from 3 to 1
                score_ratings(move_count, matched, the_timer, finished_time);

                // The timer
                if (timer === 1) {
                    var startTime = Date.now();
                    the_timer = setInterval(function() {
                        var elapsedTime = Date.now() - startTime;
                        finished_time = (elapsedTime / 1000).toFixed(3);
                        $("#timer").text(finished_time);
                    }, 44);

                }

                // The reset
                reset_game(the_timer);
            }

        });
    }

    startGame();

}());
