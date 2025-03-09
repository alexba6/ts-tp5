
const GRID_SIZE = 11
const MIDDLE_GRID = Math.floor(GRID_SIZE / 2)

const grid: HTMLTableCellElement[][] = []

enum ColorPlayer {
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue'
}


const resetGrid = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = grid[i][j]
            cell.textContent = ''
            cell.style.backgroundColor = ''
        }
    }
}

const setValue = (x: number, y: number, value: number | null) => {
    const cell = grid[x][y]
    cell.textContent = value === null ? '' : String(value)
}   

const testSetValue = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            setValue(i, j, 0)
        }
    }
}

const getValue = (x: number, y: number): number | null => {
    const cell = grid[x][y]
    return cell.textContent === '' ? null : Number(cell.textContent)
}

const testGetValue = () => {    
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            console.log(`(${i}, ${j}): ${getValue(i, j)}`)
        }
    }
}

const setColor = (x: number, y: number, color: ColorPlayer | null) => {
    const cell = grid[x][y]
    cell.style.backgroundColor = color ? color.toString() : ''
}

const testSetColor = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            setColor(i, j, 'red')
        }
    }
}

const getColor = (x: number, y: number): ColorPlayer | null  => {
    const cell = grid[x][y]
    const players = Object.values(ColorPlayer)
    const player = players.find(player => cell.style.backgroundColor === player)
    return player || null
}

const testGetColor = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            console.log(`(${i}, ${j}): ${getColor(i, j)}`)
        }
    }
}

const setListeners = (clickedOnCell: (x: number, y: number) => void) => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = grid[i][j]
            cell.addEventListener('click', () => clickedOnCell(i, j))
        }
    }
}

const isEmpty = (x: number, y: number) => {
    return getValue(x, y) === null
}

const testIsEmpty = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            setValue(i, j, null)
            console.log(`(${i}, ${j}): ${isEmpty(i, j)}`)
            setValue(i, j, 1)
            console.log(`(${i}, ${j}): ${isEmpty(i, j)}`)
        }
    }
}

const isEmptyGrid = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (!isEmpty(i, j)) {
                return false
            }
        }
    }
    return true
}

const isCorrectAdjacency = (x: number, y: number) => {
    if (!isEmpty(x, y)) {
        return false
    }
    for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, GRID_SIZE - 1); i++) {
        for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, GRID_SIZE - 1); j++) {
            if ((i !== x || j !== y) && !isEmpty(i, j)) {
                return true
            }
        }
    }
    return false
}

const testIsCorrectAdjacency = () => {
    const testCross = [[3, 2], [4, 2], [4, 3]]

    for (const [i, j] of testCross) {
        setValue(i, j, 1)
    }

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (isCorrectAdjacency(i, j)) {
                setColor(i, j, 'green')
            }
        }
    }
}

const isCorrectPlacement = (x: number, y: number, value: number) => {
    if (isEmptyGrid() && x == Math.floor(GRID_SIZE / 2) && y == Math.floor(GRID_SIZE / 2)) {
        return true
    }
    const cellValue = getValue(x, y)
    return isCorrectAdjacency(x, y) || cellValue && cellValue < value
}

const testIsCorrectPlacement = () => {
    const testCross = [[3, 2, 5], [4, 2, 5], [4, 3, 5]]

    for (const [i, j, v] of testCross) {
        setValue(i, j, v)
    }

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cross = testCross.find(([x, y, _]) => x === i && y === j)
            if (cross) {
                if (isCorrectPlacement(i, j, cross[2] + 1)) {
                    setColor(i, j, 'green')
                }
                if (isCorrectPlacement(i, j, cross[2])) {
                    setColor(i, j, 'red')
                }
            } 
            else {
                if (isCorrectPlacement(i, j, 0)) {
                    setColor(i, j, 'green')
                }
                else {
                    setColor(i, j, 'red')
                }
            }
            
        }
    }
}

const getDefaultCardSet = () => {
    return [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
}

const getAndRemoveRandomCard = (cardSet: number[]) => {
    const index = Math.floor(Math.random() * (cardSet.length - 1))
    const card = cardSet[index]
    cardSet.splice(index, 1)
    return card
}

const testGetAndRemoveRandomCard = () => {
    const cardSet = getDefaultCardSet()
    const pickedCards = []
    for (let i = 0; i < 18; i++) {
        pickedCards.push(getAndRemoveRandomCard(cardSet))
    }
    if (cardSet.length !== 0) {
        throw new Error('Card set is not empty')
    }
    for (let i = 1; i <= 9; i++) {
        if (pickedCards.filter(card => card === i).length !== 2) {
            throw new Error(`Card ${i} is not picked twice`)
        }
    }
}

const getNextPlayer = (currentPlayer: ColorPlayer) => {
    const players = Object.values(ColorPlayer)
    const index = players.indexOf(currentPlayer)
    console.log(players, index, currentPlayer)
    return players[(index + 1) % players.length]
}


const hasWon = (color: ColorPlayer) => {
    const checkNearCell = (x: number, y: number, dx: number, dy: number) => {
        for (let i=0;i<4;i++) {
            if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
                return false
            }
            if (getColor(x, y) !== color) {
                return false
            }
            x += dx
            y += dy
        }
        return true
    }

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (getColor(i, j) === color) {
                // Check all directions
                const vertical = checkNearCell(i, j, 1, 0)
                const horizontal = checkNearCell(i, j, 0, 1)
                const diagonal1 = checkNearCell(i, j, 1, 1)
                const diagonal2 = checkNearCell(i, j, 1, -1)

                if (vertical || horizontal || diagonal1 || diagonal2) {
                    return true
                }
            }
        }
    }
    return false
}

const testHasWon = () => {
    for (let i = 0; i < 4; i++) {
        setValue(MIDDLE_GRID + i, MIDDLE_GRID, 1)
        setColor(MIDDLE_GRID + i, MIDDLE_GRID, ColorPlayer.RED)
    }
    if (!hasWon(ColorPlayer.RED) || hasWon(ColorPlayer.GREEN) || hasWon(ColorPlayer.YELLOW) || hasWon(ColorPlayer.BLUE)) {
        throw new Error('Error in hasWon')
    }
    resetGrid()
    for (let i = 0; i < 4; i++) {
        setValue(MIDDLE_GRID, MIDDLE_GRID + i, 1)
        setColor(MIDDLE_GRID , MIDDLE_GRID + i, ColorPlayer.GREEN)
    }
    if (!hasWon(ColorPlayer.GREEN) || hasWon(ColorPlayer.RED) || hasWon(ColorPlayer.YELLOW) || hasWon(ColorPlayer.BLUE)) {
        throw new Error('Error in hasWon')
    }
    resetGrid()
    for (let i = 0; i < 4; i++) {
        setValue(MIDDLE_GRID + i, MIDDLE_GRID + i, 1)
        setColor(MIDDLE_GRID + i, MIDDLE_GRID + i, ColorPlayer.YELLOW)
    }
    if (!hasWon(ColorPlayer.YELLOW) || hasWon(ColorPlayer.RED) || hasWon(ColorPlayer.GREEN) || hasWon(ColorPlayer.BLUE)) {
        throw new Error('Error in hasWon')
    }
    resetGrid()
    for (let i = 0; i < 4; i++) {
        setValue(MIDDLE_GRID + i, MIDDLE_GRID - i, 1)
        setColor(MIDDLE_GRID + i, MIDDLE_GRID - i, ColorPlayer.BLUE)
    }
    if (!hasWon(ColorPlayer.BLUE) || hasWon(ColorPlayer.RED) || hasWon(ColorPlayer.GREEN) || hasWon(ColorPlayer.YELLOW)) {
        throw new Error('Error in hasWon')
    }
}

const main = () => {
    const gridElement = document.querySelector('#punto-grid')
    // Create grid
    for (let i = 0; i < GRID_SIZE; i++) {
        const tr = document.createElement('tr')
        const row = []
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = document.createElement('td')
    
            tr.appendChild(cell)
            row.push(cell)
        }
        gridElement?.appendChild(tr)
        grid.push(row)
    }

    // Paint the middle of the grid
    for (let i = MIDDLE_GRID - 1; i <= MIDDLE_GRID + 1; i++) {
        for (let j = MIDDLE_GRID - 1; j <= MIDDLE_GRID + 1; j++) {
            if (i !== MIDDLE_GRID || j !== MIDDLE_GRID) {
                grid[i][j].classList.add('grey')
            }
        }
    }

    // // TESTS
    // testSetValue()
    // testGetValue()
    // testSetColor()
    // testGetColor()
    // testIsEmpty()
    // testIsCorrectAdjacency()
    // testIsCorrectPlacement()
    // testGetAndRemoveRandomCard()

    testHasWon()

    // const playerLists = Object.fromEntries(Object.values(ColorPlayer).map(color => [color, getDefaultCardSet()]))

    // let currentPlayer = ColorPlayer.RED
    // let cardToPlay = getAndRemoveRandomCard(playerLists[currentPlayer])

    // console.log(`Player ${currentPlayer} plays card ${cardToPlay}`)

    // setListeners((x, y) => {
    //     console.log(`Clicked on cell (${x}, ${y})`)
    //     if (isCorrectPlacement(x, y, cardToPlay)) {
    //         setValue(x, y, cardToPlay)
    //         setColor(x, y, currentPlayer)

    //         currentPlayer = getNextPlayer(currentPlayer)
    //         cardToPlay = getAndRemoveRandomCard(playerLists[currentPlayer])
    //         console.log(`Player ${currentPlayer} plays card ${cardToPlay}`)
    //     }
    // })
}

main()