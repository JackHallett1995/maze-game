# Maze Game

## Project Overview
This project is a **Maze Game** developed as part of my Level 3 Software Development final project. The game is built using **JavaScript** and **jQuery**, allowing players to navigate through a dynamically created maze while gathering treasure and reaching the exit.

## Features
- **Player Movement** – Use arrow keys or on-screen buttons to move through the maze.
- **Collision Detection** – Prevents players from passing through walls.
- **Victory Condition** – Players must navigate to the exit point to complete the maze.
- **Score System** – A score tracking system, tracking the treasure you grab along the way.
- **Interactive UI** – Styled using CSS for a polished game interface.
- **Predefined Maze Rooms** – Two predefined maze layouts stored in JSON format for reference.

## Technologies Used
- **HTML5** – For structuring the game layout.
- **CSS3** – For styling the game elements.
- **JavaScript (ES6)** – Core game logic and interactivity.
- **jQuery** – Simplifying DOM manipulation and event handling.
- **JSON** – Storing predefined maze rooms.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/JackHallett1995/maze-game.git
   ```
2. Open `index.html` in a web browser.
3. Play the game!

## How to Play
1. Use arrow keys (or touch controls if applicable) to move the player.
2. Navigate through the maze without touching the walls.
3. Reach the exit to win the game.
4. Try to complete the maze as quickly as possible and collect the treaure along th way for a high score!

## Maze Room Reference
The game includes two predefined maze rooms stored in JSON format. Below is an example structure:
```json
{
    "rooms": [{
            "layout": [
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1],
                ...
            ]
        },
        {
            "layout": [
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2, 1, 2, 1],
                ...
            ]
        }
    ]
}
```

## Future Improvements
- Add **mobile touch controls** for better accessibility.
- Implement **multiple maze themes** for visual variety.
- Introduce **power-ups and obstacles** to enhance gameplay.
- Save high scores using **local storage**.

## Credits
Developed by **Me** as part of my Level 3 Software Development final project.

## License
This project is open-source and available under the [MIT License](LICENSE).

