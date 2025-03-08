

const gridElement = document.querySelector('#punto-grid')

const GRID_SIZE = 11

const grid: HTMLTableCellElement[][] = []

for (let i = 0; i < GRID_SIZE; i++) {
    const tr = document.createElement('tr')
    const row = []
    for (let j = 0; j < GRID_SIZE; j++) {
        const cell = document.createElement('td')

        const middle = Math.floor(GRID_SIZE / 2)

        if (i <= middle + 1 && i >= middle - 1 && j <= middle + 1 && j >= middle - 1 && (i !== middle || j !== middle)) {
            cell.classList.add('grey')
        }

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

const getColor = (x: number, y: number) => {
    const cell = grid[x][y]
    return cell.style.backgroundColor
}

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

const main = () => {
    testSetValue()
    testGetValue()
    testSetColor()
    testGetColor()
}

main()