
        const car = document.getElementById('car');
        const gameContainer = document.getElementById('game-container');
        const scoreElement = document.getElementById('score');
        const gameOverElement = document.getElementById('game-over');

        let carPosition = 30; // initial position
        let score = 0;
        let isGameOver = false;
        let obstacleSpeed = 7;

        document.addEventListener('keydown', (event) => {
            if (isGameOver && event.key === 'R') {
                resetGame();
            }

            if (!isGameOver) {
                if (event.key === 'ArrowLeft' && carPosition > 0) {
                    carPosition -= 10;
                } else if (event.key === 'ArrowRight' && carPosition < 100) {
                    carPosition += 10;
                }

                car.style.left = carPosition + '%';
            }
        });

        function createObstacle() {
            const obstacle = document.createElement('div');
            obstacle.className = 'obstacle';
            obstacle.style.left = Math.floor(Math.random() * 80) + '%';
            gameContainer.appendChild(obstacle);
        }

        function moveObstacles() {
            const obstacles = document.getElementsByClassName('obstacle');

            for (let obstacle of obstacles) {
                const currentPosition = parseInt(getComputedStyle(obstacle).getPropertyValue('top'));

                if (currentPosition >= window.innerHeight) {
                    // Reset obstacle position when it goes beyond the screen
                    obstacle.style.top = '-50px';
                    obstacle.style.left = Math.floor(Math.random() * 80) + '%';
                    score++;
                    scoreElement.textContent = 'Score: ' + score;

                    // Increase speed every 30 points
                    if (score % 30 === 0) {
                        obstacleSpeed += 1;
                    }
                } else {
                    obstacle.style.top = currentPosition + obstacleSpeed + 'px';
                }
            }
        }

        function checkCollision() {
            const carRect = car.getBoundingClientRect();
            const obstacles = document.getElementsByClassName('obstacle');

            for (let obstacle of obstacles) {
                const obstacleRect = obstacle.getBoundingClientRect();

                if (
                    carRect.bottom > obstacleRect.top &&
                    carRect.top < obstacleRect.bottom &&
                    carRect.right > obstacleRect.left &&
                    carRect.left < obstacleRect.right
                ) {
                    endGame();
                }
            }
        }

        function resetGame() {
            while (gameContainer.firstChild) {
                gameContainer.removeChild(gameContainer.firstChild);
            }

            carPosition = 50;
            score = 0;
            obstacleSpeed = 5;
            isGameOver = false;
            gameOverElement.style.display = 'none';
            scoreElement.textContent = 'Score: 0';
            car.style.left = carPosition + '%';

            // Start with initial obstacles
            createObstacle();
            createObstacle();
            createObstacle();
        }

        function endGame() {
            isGameOver = true;
            gameOverElement.style.display = 'block';
        }

        function gameLoop() {
            moveObstacles();
            checkCollision();

            if (!isGameOver) {
                requestAnimationFrame(gameLoop);
            }
        }

        // Initial obstacles
        createObstacle();
        createObstacle();
        createObstacle();

        // Start the game loop
        gameLoop();
    