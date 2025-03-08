const gridElement = document.querySelector('#punto-grid')

const GRID_SIZE = 11

const grid: HTMLTableCellElement[][] = []

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

const setValue = (x: number, y: number, value: number | null) => {
    const cell = grid[x][y]
    cell.textContent = value === null ? '' : String(value)
}   

const getValue = (x: number, y: number): number | null => {
    const cell = grid[x][y]
    return cell.textContent === '' ? null : Number(cell.textContent)
}

const setColor = (x: number, y: number, color: string) => {
    const cell = grid[x][y]
    cell.style.backgroundColor = color
}

const middle = Math.floor(GRID_SIZE / 2)

for (let i = middle - 1; i <= middle + 1; i++) {
    for (let j = middle - 1; j <= middle + 1; j++) {
        if (i !== middle || j !== middle) {
            setColor(i, j, 'grey')
        }
    }
}

const getColor = (x: number, y: number) => {
    const cell = grid[x][y]
    return cell.style.backgroundColor
}

const clickedOnCell = (x: number, y: number) => {
    console.log(`Click on (${x}, ${y}) cell`)
}

const setListeners = () => {
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

const isCorrectPlacement = (x: number, y: number, value: number) => {
    const cellValue = getValue(x, y)
    return isCorrectAdjacency(x, y) || cellValue && cellValue < value
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

// TESTS
const testSetValue = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            setValue(i, j, 0)
        }
    }
}

const testGetValue = () => {    
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            console.log(`(${i}, ${j}): ${getValue(i, j)}`)
        }
    }
}

const testSetColor = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            setColor(i, j, 'red')
        }
    }
}

const testGetColor = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            console.log(`(${i}, ${j}): ${getColor(i, j)}`)
        }
    }
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



const main = () => {
    // testSetValue()
    // testGetValue()
    // testSetColor()
    // testGetColor()
    // testIsEmpty()
    // testIsCorrectAdjacency()
    // testIsCorrectPlacement()
    // testGetAndRemoveRandomCard()
    setListeners()

    const redList = getDefaultCardSet()
    const greenList = getDefaultCardSet()
    const yellowList = getDefaultCardSet()
    const blueList = getDefaultCardSet()


}

main()