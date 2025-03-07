

const grid = document.querySelector('#punto-grid')

const GRID_SIZE = 11


const createGrid = () => {
    for (let i = 0; i < GRID_SIZE; i++) {
        const tr = document.createElement('tr')
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = document.createElement('td')

            const middle = Math.floor(GRID_SIZE / 2)

            if (i <= middle + 1 && i >= middle - 1 && j <= middle + 1 && j >= middle - 1 && (i !== middle || j !== middle)) {
                cell.classList.add('grey')
            }

            tr.appendChild(cell)
        }
        grid?.appendChild(tr)
    }
}

createGrid()