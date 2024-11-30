let board = document.querySelector(".board")
let whitePawns = []
let blackPawns = []
let whiteRooks = []
let blackRooks = []
let whiteKnights = []
let blackKnights = []
let whiteQueen
let blackQueen
let whiteKing
let blackKing

let activeTile
let potentialTiles = []

let shouldResetListeners = false

console.log(board)


let createTiles = () => {
    for(let i =0; i<8; i++) {
        let row = document.createElement("div")
        row.classList.add("row")
        row.setAttribute("id", "row" + (i+1).toString())
        board.appendChild(row)
        for(let j =8; j>0; j--) {
            let tile = document.createElement("div")
            tile.classList.add("tile")
            let tileName = (i+10).toString(36).toUpperCase() + (j).toString()
            tile.setAttribute("id", tileName)
            if(i%2 == 0) {
                if(j%2 == 0) {
                    tile.classList.add("white")
                } else {
                    tile.classList.add("black")
                }
            } else {
                if(j%2 == 0) {
                    tile.classList.add("black")
                } else {
                    tile.classList.add("white")
                }
            }
            row.appendChild(tile)
        }
    }
}

let addGridCharacters = (placing) => {
    let gridStringRow = document.createElement("div")
    gridStringRow.classList.add("grid-string-row")
    gridStringRow.classList.add(placing + "-grid-string")
    board.appendChild(gridStringRow)

    for(i=1; i<=8; i++) {
        let gridString = document.createElement("p")
        gridString.innerHTML = (i + 9).toString(36).toUpperCase()
        gridString.classList.add("grid-string")
        
        gridStringRow.appendChild(gridString)
    }

}

let addGridNumbers = (placing) => {
    let gridStringRow = document.createElement("div")
    gridStringRow.classList.add("grid-string-column")
    gridStringRow.classList.add(placing + "-grid-string")
    board.appendChild(gridStringRow)

    for(i=8; i>0; i--) {
        let gridString = document.createElement("p")
        
        gridString.classList.add("grid-character")
        gridString.innerHTML = i.toString()
        gridStringRow.appendChild(gridString)
    }

}

let setPieces = () => {
   let A1 = document.getElementById("A1")
   A1.innerHTML = "R"
   let B1 = document.getElementById("B1")
   B1.innerHTML = "N"
   let C1 = document.getElementById("C1")
   C1.innerHTML = "B"
   let D1 = document.getElementById("D1")
   D1.innerHTML = "Q"
   let E1 = document.getElementById("E1")
   E1.innerHTML = "K"
   let F1 = document.getElementById("F1")
   F1.innerHTML = "B"
   let G1 = document.getElementById("G1")
   G1.innerHTML = "N"
   let H1 = document.getElementById("H1")
   H1.innerHTML = "R"

   
   let A2 = document.getElementById("A2")
   let B2 = document.getElementById("B2")
   let C2 = document.getElementById("C2")
   let D2 = document.getElementById("D2")
   let E2 = document.getElementById("E2")
   let F2 = document.getElementById("F2")
   let G2 = document.getElementById("G2")
   let H2 = document.getElementById("H2")

   whitePawns.push(A2, B2, C2, D2, E2, F2, G2, H2)
   for (let i=0; i < whitePawns.length; i++) {
        whitePawns[i].innerHTML = "p"
        whitePawns[i].addEventListener("click", movePawn)
        whitePawns[i].classList.add("piece")
   }



   let A8 = document.getElementById("A8")
   A8.innerHTML = "R"
   let B8 = document.getElementById("B8")
   B8.innerHTML = "N"
   let C8 = document.getElementById("C8")
   C8.innerHTML = "B"
   let D8 = document.getElementById("D8")
   D8.innerHTML = "Q"
   let E8 = document.getElementById("E8")
   E8.innerHTML = "K"
   let F8 = document.getElementById("F8")
   F8.innerHTML = "B"
   let G8 = document.getElementById("G8")
   G8.innerHTML = "N"
   let H8 = document.getElementById("H8")
   H8.innerHTML = "R"

   let A7 = document.getElementById("A7")
   let B7 = document.getElementById("B7")
   let C7 = document.getElementById("C7")
   let D7 = document.getElementById("D7")
   let E7 = document.getElementById("E7")
   let F7 = document.getElementById("F7")
   let G7 = document.getElementById("G7")
   let H7 = document.getElementById("H7")

   blackPawns.push(A7, B7, C7, D7, E7, F7, G7, H7)
   for (let i=0; i < blackPawns.length; i++) {
        blackPawns[i].innerHTML = "p"
        blackPawns[i].addEventListener("click", movePawn)
        blackPawns[i].classList.add("piece")
   }
}

let movePawn = (e) => {
    e.preventDefault()
    removeActive()
    removePotential()

    if(shouldResetListeners) {
        resetListeners()
        shouldResetListeners = false
    }


    tile = e.target
    activeTile = e.target
    let file = tile.getAttribute('id').split('')[0]
    let rank = tile.getAttribute('id').split('')[1]

    e.target.classList.add("active")

    // let targetTiles = []
    if (whitePawns.includes(e.target)) {
        let target = document.getElementById(file + (parseInt(rank) + 1).toString())
        target.classList.add("potential-move")
        potentialTiles.push(target)

        if (rank == 2) {
            target = document.getElementById(file + (parseInt(rank) + 2).toString())
            target.classList.add("potential-move")
            potentialTiles.push(target)
        }
    } else {
        let target = document.getElementById(file + (parseInt(rank) - 1).toString())
        target.classList.add("potential-move")
        potentialTiles.push(target)

        if (rank == 7) {
            target = document.getElementById(file + (parseInt(rank) - 2).toString())
            target.classList.add("potential-move")
            potentialTiles.push(target)
        }
    }

    for(let i=0; i < potentialTiles.length; i++) {
        potentialTiles[i].addEventListener("click", move)
    }
    
    if(checkPawnCaptures(file, rank)) {
        shouldResetListeners = true
    }
}

let move = (e) => {
    let piece = activeTile

    e.target.innerHTML = activeTile.innerHTML
    e.target.addEventListener("click", movePawn)
    e.target.classList.add("piece")
    

    piece.innerHTML = ""
    piece.removeEventListener("click", movePawn)
    piece.classList.remove("piece")

    if(whitePawns.includes(piece)) {
        whitePawns.push(e.target)
        let index = whitePawns.indexOf(piece)
        if (index !== -1) {
            whitePawns.splice(index, 1)
        }
    } else {
        blackPawns.push(e.target)
        let index = blackPawns.indexOf(piece)
        if (index !== -1) {
            blackPawns.splice(index, 1)
        }
    }

    // if(whitePawns.includes(e.target)) {
    //     let index = whitePawns.indexOf(e.target)
    //     if (index !== -1) {
    //         whitePawns.splice(index, 1)
    //     }
    // }
    // if(blackPawns.includes(e.target)) {
    //     let index = blackPawns.indexOf(e.target)
    //     if (index !== -1) {
    //         blackPawns.splice(index, 1)
    //     }
    // }

    removeActive()
    removePotential()
}

let checkPawnCaptures = (file, rank) => {
    file = file.toLowerCase().charCodeAt(0) - 97
    let potentialCapture = false


    if (whitePawns.includes(activeTile)) {
        let leftFile = String.fromCharCode(97 + file - 1).toUpperCase()

        let rightFile = String.fromCharCode(97 + file + 1).toUpperCase()
        rank = (parseInt(rank) + 1).toString()
        
        let left = document.getElementById(leftFile + rank)
        let right = document.getElementById(rightFile + rank)
        
        if (blackPawns.includes(left)) {
            left.classList.add("potential-move")
            left.addEventListener("click", move)
            left.removeEventListener("click", movePawn)
            potentialCapture = true
        }
        if (blackPawns.includes(right)) {
            right.classList.add("potential-move")
            right.addEventListener("click", move)
            right.removeEventListener("click", movePawn)
            potentialCapture = true
        }
    }
    
    
    if (blackPawns.includes(activeTile)) {
        let leftFile = String.fromCharCode(97 + file - 1).toUpperCase()
        
        let rightFile = String.fromCharCode(97 + file + 1).toUpperCase()
        rank = (parseInt(rank) - 1).toString()
        
        let left = document.getElementById(leftFile + rank)
        let right = document.getElementById(rightFile + rank)
        
        if (whitePawns.includes(left)) {
            left.classList.add("potential-move")
            left.addEventListener("click", move)
            left.removeEventListener("click", movePawn)
            potentialCapture = true
        }
        if (whitePawns.includes(right)) {
            right.classList.add("potential-move")
            right.addEventListener("click", move)
            right.removeEventListener("click", movePawn)
            potentialCapture = true
        }
    }

    return potentialCapture
}

let resetListeners = () => {
    for(let i=0; i<blackPawns.length; i++) {
        blackPawns[i].addEventListener("click", movePawn)
    }
    for(let i=0; i<whitePawns.length; i++) {
        whitePawns[i].addEventListener("click", movePawn)
    }
}

let removeActive = () => {
    if (activeTile) {
        activeTile.classList.remove("active")
    }
}

let removePotential = () => {
    if (potentialTiles == []) {
        return
    } else {
        for(let i=0; i<potentialTiles.length; i++) {
            potentialTiles[i].classList.remove("potential-move")
            potentialTiles[i].removeEventListener("click", move)
        }
    }
}

createTiles()

addGridCharacters("upper")
addGridCharacters("lower")

addGridNumbers("left")
addGridNumbers("right")

setPieces()

