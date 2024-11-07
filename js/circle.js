class Circle {
    static #MOUSE_LEFT_ID = 0
    static #MOUSE_WHEEL_ID = 1
    static #MOUSE_RIGHT_ID = 2

    // static #ENTER_ID = 13

    // static #STAGE_RESEARCH_ID = 1
    // static #STAGE_RESULT_ID = 2
    // // флаг отобразить результат/закрыть результат
    // #stageFlag = 1

    static #circle = document.getElementById('circle')

    // Элемент, для которого будем включать pointerLock
    static #requestedElement = document.getElementById('parent');

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
        // включаем pointerLock
        this.#requestedElement.requestPointerLock();

    }



}