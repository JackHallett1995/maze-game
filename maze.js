//Global player object with properties
let player = {
    x: 1,
    y: 0,
    treasure: 0,
    name: ''
};
//Checks JSON file for any validation errors and runs game if none,
//or error logs to the console if invalid data is being loaded
fetch("/js/layout.json")
    .then(response => response.json())
    .then(data => startGame(data))
    .catch(error => {
        console.error('Something went wrong', error);
    });

//Starts the game
function startGame(mazedata) {
    let maze = startMaze(mazedata);
    initMaze();
    Draw(maze);
    inputHandler(maze);
    drawPlayer(player.x, player.y);
    nextLevel(mazedata);
}

//Adds player name from input field to player-name class or if empty shows validation message
//Removes hidden class from the game container and adds hidden class to the welcome container
function initMaze() {
    jQuery('input#submit-button').click(function () {
        player.name = jQuery('#name').val();
        jQuery('.player-name').html(player.name);
        if(jQuery('#name').val() === 'Geoff Linton') {
            jQuery('.geoff-linton').removeClass('hidden');
            jQuery('.welcome-maze-container').addClass('hidden');
        } else {
            if (player.name) {
                jQuery('.maze-game-container.hidden').removeClass('hidden');
                jQuery('.welcome-maze-container').addClass('hidden');
            } else {
                jQuery('.validation-msg.hidden').removeClass('hidden');
            }
        }
    })
}
//Adds the class of player to the x & y coordinates listed in the player object
function drawPlayer(x, y) {
    jQuery('.row[data-y="' + y + '"] .cell[data-x="' + x + '"]').append('<div class="player"></div>');
}

//Adds the movement functions through adding click handlers to the directional buttons
function inputHandler(maze) {
    jQuery('button.up').click(function () {
        moveUp(maze);
    })
    jQuery('button.down').click(function () {
        moveDown(maze);
    })
    jQuery('button.right').click(function () {
        moveRight(maze);
    })
    jQuery('button.left').click(function () {
        moveLeft(maze);
    })
}

//Checks if the players position is equal to 2 and removes the class of treasure
//Changes the treasure square to a normal path (0)
//Increases the players treasure and adds to the counter
function checkForTreasure(maze) {
    if (maze[player.y][player.x] === 2) {
        jQuery('[data-y="' + player.y + '"] [data-x="' + player.x + '"] .treasure').remove();
        maze[player.y][player.x] = 0
        player.treasure++;
        jQuery('.score span').html(player.treasure);
    }
}

//Checks if the player position is equal to 3 meaning they have reached the goal
//Adds the hidden class to the game container and removes the hidden class from the success container
function checkForWin(maze) {
    if (maze[player.y][player.x] === 3) {
        jQuery('.maze-game-container').addClass('hidden');
        jQuery('.success-msg.hidden').removeClass('hidden');
    }
}

//Adds a click handler to the play again button
//Adds hidden class back to success container
//Removes the hidden class from the game container
//Resets player position back to the starting point
//Removes the click handler from the directional arrows, so the code doesn't run twice
//Restarts the maze
function nextLevel(mazedata) {
    jQuery('button.play-again').click(function () {
        jQuery('.success-msg').addClass('hidden');
        jQuery('.maze-game-container').removeClass('hidden');
        player.x = 1;
        player.y = 0;
        jQuery('button.up').off('click');
        jQuery('button.down').off('click');
        jQuery('button.left').off('click');
        jQuery('button.right').off('click');
        jQuery('#maze-layout').html('');
        startGame(mazedata);
    })
}
//Checks if the player y position is greater than or equal to 0 if true run code below
//Set next player position variables
//States what the next step is
//If the next step equals a 0, 1, 3 then the y position is subtracted by 1
//The player class is removed from the old square and redrawn at the new position
function moveUp(maze) {
    if (player.y >= 0) {
        const playerPosNextX = player.x;
        const playerPosNextY = player.y - 1;
        const nextStep = maze[playerPosNextY][playerPosNextX];
        if (nextStep == 0 || nextStep == 2 || nextStep == 3) {
            player.y--;
            jQuery('.player').remove();
            drawPlayer(player.x, player.y);
            checkForWin(maze);
            checkForTreasure(maze);
        }
    };
}

//Checks if the player y position is less than the length of the maze if true run code below
//Set next player position variables
//States what the next step is
//If the next step equals a 0, 1, 3 then the y position is increased by 1
//The player class is removed from the old square and redrawn at the new position
function moveDown(maze) {
    if (player.y < maze.length - 1) {
        const playerPosNextX = player.x;
        const playerPosNextY = player.y + 1;
        const nextStep = maze[playerPosNextY][playerPosNextX];
        if (nextStep == 0 || nextStep == 2 || nextStep == 3) {
            player.y++;
            jQuery('.player').remove();
            drawPlayer(player.x, player.y);
            checkForWin(maze);
            checkForTreasure(maze);
        }
    };
}

//Checks if the player x position is less than the length of the maze if true run code below
//Set next player position variables
//States what the next step is
//If the next step equals a 0, 1, 3 then the x position is increased by 1
//The player class is removed from the old square and redrawn at the new position
function moveRight(maze) {
    if (player.x < maze.length - 1) {
        const playerPosNextX = player.x + 1;
        const playerPosNextY = player.y;
        const nextStep = maze[playerPosNextY][playerPosNextX];
        if (nextStep == 0 || nextStep == 2 || nextStep == 3) {
            player.x++;
            jQuery('.player').remove();
            drawPlayer(player.x, player.y);
            checkForWin(maze);
            checkForTreasure(maze);
        }
    };
}

//Checks if the player x position is greater than or equal to 0 if true run code below
//Set next player position variables
//States what the next step is
//If the next step equals a 0, 1, 3 then the x position is subtracted by 1
//The player class is removed from the old square and redrawn at the new position
function moveLeft(maze) {
    if (player.x >= 0) {
        const playerPosNextX = player.x - 1;
        const playerPosNextY = player.y;
        const nextStep = maze[playerPosNextY][playerPosNextX];
        if (nextStep == 0 || nextStep == 2 || nextStep == 3) {
            player.x--;
            jQuery('.player').remove();
            drawPlayer(player.x, player.y);
            checkForWin(maze);
            checkForTreasure(maze);
        }
    };
}

//Loops through the rows in the maze array and in each row loop through the cells to create an HTML element to represent each cell base on the value in that cell in the multidimensional array.
function Draw(maze) {
    maze.forEach((row, index) => {
        var rowEl = jQuery('<div class="row" data-y="' + index + '"></div>').appendTo('#maze-layout');
        row.forEach((cell, index) => {
            switch (cell) {
                case 0:
                    rowEl.append('<div class="path cell" data-x="' + index + '"></div>');
                    break;

                case 1:
                    rowEl.append('<div class="wall cell" data-x="' + index + '"></div>');
                    break;

                case 2:
                    rowEl.append('<div class="path cell" data-x="' + index + '"><div class="treasure"></div></div>');
                    break;

                case 3:
                    rowEl.append('<div class="path cell" data-x="' + index + '"><div class="goal"></div></div>');
                    break;

                default:
                    break;
            }
        });
    });
}

//Chooses a random room from maze array and returns that room as the layout for the start of the game.
function startMaze(mazedata) {
    const maze = mazedata.rooms[Math.floor(Math.random() * mazedata.rooms.length)];
    return maze.layout;
}