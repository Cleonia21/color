class Circle {
    static MOUSE_LEFT_ID = 0
    static MOUSE_WHEEL_ID = 1
    static MOUSE_RIGHT_ID = 2

    static ENTER_ID = 13

    static #circle = document.getElementById('circle')

    // массивы временных отрезков
    #redPauses = []
    #yellowPauses = []
    #betweenPauses = []
    #redDisplay = []
    #yellowDisplay = []

    // количество отображения сигналов
    #redNum = 0
    #yellowNum = 0

    // в какой последовательности были поданы сигналы
    #sequence = []

    #lastTime = 0
    #lastColorSignal = -1

    constructor() {

    }
}

// коды кнопок мыши
const redID = 0
const yellowID = 2
const mouseWheelID = 1

// коды клавиш
const enterID = 13

// массивы временных отрезков
let redPauses = []
let yellowPauses = []
let betweenPauses = []
let redDisplay = []
let yellowDisplay = []

// количество отображения сигналов
let redNum = 0
let yellowNum = 0

// в какой последовательности были поданы сигналы
let sequence = []

let lastTime = 0
let lastColorSignal = -1

const circle = document.getElementById('circle')
// флаг на отобразить результат/закрыть результат
let resultFlag = 1

// определяем, поддерживается ли pointerLock
var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;
if(!havePointerLock){
    alert('Ваш браузер не поддерживает блокировку мышки');
}

// Элемент, для которого будем включать pointerLock
var requestedElement = document.getElementById('parent');

addEventListener('mousedown', function (event) {
    // игнорируем клик мыши если на данный момент на экране результат
    if (nowResultStage() === 2)
        return
    keyDown(event.button)
})

addEventListener('mouseup', function (event) {
    // игнорируем клик мыши если на данный момент на экране результат
    if (nowResultStage() === 2)
        return
    keyUp(event.buttons)
})

$(this).on('keypress', function(event) {
    if (event.keyCode === enterID) {
        stageSwitch()
    } else {
        console.log(event.keyCode)
    }
})

function stageSwitch() {
    // отключаем pointerLock 
    document.exitPointerLock();

    // завершаем исследование, выводим результат
    if (resultFlag === 1) {
        resultFlag = 2
        saveResult()
        document.getElementById('parent').style.visibility = 'hidden'
        document.body.appendChild(resultParent)
        document.body.style.backgroundColor = '#fff'
    } else if (resultFlag === 2) { // удаляем контейнер с результатом, начинаем новое исследование
        resultFlag = 1
        document.getElementById('tmp').remove()
        resultParent = document.createElement('div')
        resultParent.className = 'ResultParent'
        resultParent.id = 'tmp'
        document.getElementById('parent').style.visibility = 'visible'
        document.body.style.backgroundColor = '#6f6f6f'
    }
}

function keyDown(code) {
    // включаем pointerLock
    requestedElement.requestPointerLock();

    // зажигаем круг красным, записываем необходимые данные
    if (code === redID) {
        turnCircleRed()
    } else if (code === yellowID) { // зажигаем круг желтым, записываем необходимые данные
        turnCircleYellow()
    } else if (code === mouseWheelID) { // сохраняем собранные данные, один из этапов исследования завершен
        ControPoint()
    } else {
        console.log(code)
    }
}

function keyUp(code) {
    // игнорируем клик мыши если на данный момент на экране результат
    if (nowResultStage() === 2)
        return

    // гасим красный/желтый цвет круга, сохраняем данные
    if (code === redID || code === yellowID) {
        circle.style.background = '#6f6f6f'
        if (lastColorSignal === redID) {
            redDisplay.push(performance.now() - lastTime)
        }
        if (lastColorSignal === yellowID) {
            yellowDisplay.push(performance.now() - lastTime)
        }
        lastTime = performance.now()
    }
}

function nowResultStage() {
    if (resultFlag === 2) {
        return true
    }
    return false
}

function ControPoint() {
    saveResult()
    displayControPoint()
}

function displayControPoint() {
    new Toast({
        title: false,
        text: 'Часть исследования завершена',
        theme: 'light',
        autohide: true,
        interval: 1000
    });
}

function turnCircleRed() {
    circle.style.background = '#ff0000'

    sequence.push('к')
    redNum++

    if (lastColorSignal === redID) {
        redPauses.push(performance.now() - lastTime)
    } else if (lastColorSignal === yellowID) {
        betweenPauses.push(performance.now() - lastTime)
    }
    lastColorSignal = redID
    lastTime = performance.now()
}

function turnCircleYellow() {
    circle.style.background = 'yellow'

    sequence.push('ж')
    yellowNum++

    if (lastColorSignal === yellowID) {
        yellowPauses.push(performance.now() - lastTime)
    } else if (lastColorSignal === redID) {
        betweenPauses.push(performance.now() - lastTime)
    }
    lastColorSignal = yellowID
    lastTime = performance.now()
}
  



let resultParent = document.createElement('div')
resultParent.className = 'ResultParent'
resultParent.id = 'tmp'

function saveResult() {
    let table = document.createElement('table')

    table.appendChild(createTableRow('Подано сигналов', redNum + yellowNum))
    table.appendChild(createTableRow('Красных', redNum))
    table.appendChild(createTableRow('Желтых', yellowNum))
    table.appendChild(createTableRow('Пауза между красными (средняя)', round(average(redPauses)) + ' мс'))
    table.appendChild(createTableRow('Пауза между жёлтыми (средняя)', round(average(yellowPauses)) + ' мс'))
    table.appendChild(createTableRow('Пауза при смене сигнала (средняя)', round(average(betweenPauses)) + ' мс'))
    table.appendChild(createTableRow('Время горения красного сигнала (средняя)', round(average(redDisplay)) + ' мс'))
    table.appendChild(createTableRow('Время горения жёлтого сигнала (средняя)', round(average(yellowDisplay)) + ' мс'))

    let div = document.createElement('div')
    div.className = 'MilestoneResult'

    let p = document.createElement('p')
    p.textContent = 'Проба ' + (resultParent.children.length + 1).toString()
    div.appendChild(p)
    div.appendChild(table)
    div.appendChild(sequenceToTable(sequence))
    resultParent.appendChild(div)

    redPauses = []
    yellowPauses = []
    betweenPauses = []
    redDisplay = []
    yellowDisplay = []
    redNum = 0
    yellowNum = 0
    sequence = []
    lastTime = 0
    lastColorSignal = -1
}
