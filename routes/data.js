const fs = require("fs")

const estaciones = [
    "Moreno",
    "Paso del Rey",
    "Merlo",
    "S. A. de Padua",
    "Ituzaingó",
    "Castelar",
    "Morón",
    "Haedo",
    "Ramos Mejía",
    "Ciudadela",
    "Liniers",
    "Villa Luro",
    "Floresta",
    "Flores",
    "Caballito",
    "Once"
]

const directions = [
    "moreno-once",
    "once-moreno"
]

const timeRegex = /\d\d:\d\d/

/**
 * returns the file name for a given date and direction
 * @param date
 * @param isHoliday, whether it's a holiday or not
 * @param direction, either "moreno-once" or "once-moreno"
 * @returns {string}
 */
function getFile(date, isHoliday, direction) {
    const day = date.getDay()
    if (isHoliday || day === 0) {
        return `domingo-${direction}.txt`
    }
    if (day === 6) {
        return `sabado-${direction}.txt`
    }
    return `lunes-a-viernes-${direction}.txt`
}

/**
 * returns direction given an origin and a destination
 * @param origin, one of "estaciones", trip start
 * @param destination, one of "estaciones", trip end
 */
function getDirection(origin, destination) {
    const startIdx = estaciones.indexOf(origin)
    const endIdx = estaciones.indexOf(destination)
    if (startIdx === -1 || endIdx === -1) {
        throw Error(`Invalid parameters: ${origin} or ${destination}`)
    }
    if (startIdx > endIdx) {
        return directions[1]
    }
    return directions[0]
}

function getIndexInFile(origin, direction) {
    const internalIndex = estaciones.indexOf(origin)
    if (direction === directions[0]) {
        return internalIndex + 1
    }
    return estaciones.length - internalIndex
}

function collectTimes(origin, destination, isHoliday) {
    const direction = getDirection(origin, destination)
    const date = new Date()
    const source = getFile(date, isHoliday, direction)
    const path = require("path").resolve(__dirname, source)
    const lines = fs.readFileSync(path, 'utf-8').split("\n")
    const startIndex = getIndexInFile(origin, direction)
    const endIndex = getIndexInFile(destination, direction)
    const startTimes = []
    const endTimes = []
    for (let line of lines) {
        const train = line.split(" ")
        let startTime = train[startIndex]
        let endTime = train[endIndex]
        if (startTime.match(timeRegex) && endTime.match(timeRegex)) {
            startTimes.push(startTime)
            endTimes.push(endTime)
        }
    }
    return { [origin]: startTimes, [destination]: endTimes }
}

module.exports = {
    estaciones,
    collectTimes
}