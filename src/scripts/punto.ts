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

const setValue = (x: number, y: number, value: string) => {
    const cell = grid[x][y]
    cell.textContent = value
}   

const getValue = (x: number, y: number) => {
    const cell = grid[x][y]
    return cell.textContent
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
    return getValue(x, y) === ''
}


const isCorrectAdjacency = (x: number, y: number) => {
    for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, GRID_SIZE - 1); i++) {
        for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, GRID_SIZE - 1); j++) {
            if ((i !== x || j !== y) && !isEmpty(i, j)) {
                return true
            }
        }
    }
    return false
}

// TESTS
const testSetValue = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            setValue(i, j, 'x')
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
            setValue(i, j, '')
            console.log(`(${i}, ${j}): ${isEmpty(i, j)}`)
            setValue(i, j, 'x')
            console.log(`(${i}, ${j}): ${isEmpty(i, j)}`)
        }
    }
}

const testIsCorrectAdjacency = () => {
    const testCross = [[3, 2], [4, 2], [4, 3]]

    for (const [i, j] of testCross) {
        setValue(i, j, 'x')
    }

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (isCorrectAdjacency(i, j) && testCross.find(([x, y]) => x === i && y === j) === undefined) {
                setColor(i, j, 'green')
            }
        }
    }
}


const main = () => {
    // testSetValue()
    // testGetValue()
    // testSetColor()
    // testGetColor()
    // testIsEmpty()
    testIsCorrectAdjacency()
    setListeners()
}

main()