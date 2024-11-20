// определяем, поддерживается ли pointerLock
const havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;
if(!havePointerLock){
    alert('Ваш браузер не поддерживает блокировку мышки');
}

// Элемент, для которого будем включать pointerLock
let requestedElement = document.getElementById('parent');

let resultFlag = 1

let circle = new Circle()
let result = new ResearchResult()

const [redID, yellowID, mouseWheelID] = [0, 2, 1]

function nowResultStage() {
    return resultFlag === 2;
}

addEventListener('mousedown', function (event) {
    // игнорируем клик мыши если на данный момент на экране результат
    if (nowResultStage())
        return
    // включаем pointerLock
    requestedElement.requestPointerLock();
    // зажигаем круг красным, записываем необходимые данные
    if (event.button === redID) {
        circle.turnRed()
    } else if (event.button === yellowID) { // зажигаем круг желтым, записываем необходимые данные
        circle.turnYellow()
    } else if (event.button === mouseWheelID) { // сохраняем собранные данные, один из этапов исследования завершен
        result.saveStep(circle.getResult())
        result.alert()
        circle = new Circle()
    } else {
        console.log(event.button)
    }
})

addEventListener('mouseup', function (event) {
    // игнорируем клик мыши если на данный момент на экране результат
    if (nowResultStage())
        return
    if (event.button === redID || event.button === yellowID)
        circle.turnOf()
})

addEventListener('keydown', function(event) {
    if (event.code === 'Enter') { //enterID
        stageSwitch()
    } else if (event.code === 'Space') {
        result.saveStep(circle.getResult())
        result.alert()
        circle = new Circle()
    } else if (event.code === 'ArrowLeft') {
        circle.turnRed()
    } else if (event.code === 'ArrowRight') {
        circle.turnYellow()
    } else {
        console.log(event.code)
    }
})

addEventListener('keyup', function(event) {
    if (event.code === 'ArrowLeft' || 'ArrowRight') {
        circle.turnOf()
    } else {
        console.log(event.code)
    }
})

function stageSwitch() {
    // отключаем pointerLock
    document.exitPointerLock();

    // завершаем исследование, выводим результат
    if (resultFlag === 1) {
        resultFlag = 2

        result.saveStep(circle.getResult())
        circle = new Circle()

        document.getElementById('parent').style.visibility = 'hidden'

        document.body.appendChild(result.result)
        document.body.style.backgroundColor = '#fff'
    } else if (resultFlag === 2) { // удаляем контейнер с результатом, начинаем новое исследование
        resultFlag = 1

        result.clear()

        document.getElementById('parent').style.visibility = 'visible'
        document.body.style.backgroundColor = '#6f6f6f'
    }
}
