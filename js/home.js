// коды кнопок мыши
const redID = 0
const yellowID = 2

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

addEventListener('mousedown', function (event) {
    // игнорируем клик мыши если на данный момент на экране результат
    if (resultFlag === 2)
        return

    // зажигаем круг красным, записываем необходимые данные
    if (event.button === redID) {
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
    } else if (event.button === yellowID) { // зажигаем круг желтым, записываем необходимые данные
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
    } else if (event.button === 1) { // сохраняем собранные данные, один из этапов исследования завершен
        saveResult()
        new Toast({
            title: false,
            text: 'Часть исследования завершена',
            theme: 'light',
            autohide: true,
            interval: 1000
        });
    }
})

addEventListener('mouseup', function (event) {
    // игнорируем отпускание кнопки мыши если на данный момент на экране результат
    if (resultFlag === 2)
        return
    // гасим красный/желтый цвет круга, сохраняем данные
    if (event.buttons === redID || event.buttons === yellowID) {
        circle.style.background = '#fff'
        if (lastColorSignal === redID) {
            redDisplay.push(performance.now() - lastTime)
        }
        if (lastColorSignal === yellowID) {
            yellowDisplay.push(performance.now() - lastTime)
        }
        lastTime = performance.now()
    }
})

$(this).on('keypress', function(event) {
    // по нажатию Enter
    if (event.keyCode === 13) {
        // завершаем исследование, выводим результат
        if (resultFlag === 1) {
            resultFlag = 2
            saveResult()
            document.getElementById('parent').style.visibility = 'hidden'
            document.body.appendChild(resultParent)
            resultFlag = 2
        } else if (resultFlag === 2) { // удаляем контейнер с исследованием, начинаем новое исследование
            document.getElementById('tmp').remove()
            resultParent = document.createElement('div')
            resultParent.className = 'ResultParent'
            resultParent.id = 'tmp'
            document.getElementById('parent').style.visibility = 'visible'
            resultFlag = 1
        }
    }
})

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
