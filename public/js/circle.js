class Circle {
    #RED_ID = 0
    #YELLOW_ID = 2

    #RED_COLOR = '#ff0000'
    #YELLOW_COLOR = 'yellow'
    #DEFAULT_COLOR

    #circle = document.getElementById('circle')

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

    #ofFlag = false

    constructor() {
        this.#DEFAULT_COLOR = this.#circle.style.background
    }

    turnRed() {
        if (this.#ofFlag)
            return
        this.#ofFlag = true
        this.#circle.style.background = this.#RED_COLOR

        this.#sequence.push('к')
        this.#redNum++

        if (this.#lastColorSignal === this.#RED_ID) {
            this.#redPauses.push(performance.now() - this.#lastTime)
        } else if (this.#lastColorSignal === this.#YELLOW_ID) {
            this.#betweenPauses.push(performance.now() - this.#lastTime)
        }
        this.#lastColorSignal = this.#RED_ID
        this.#lastTime = performance.now()
    }

    turnYellow() {
        if (this.#ofFlag)
            return
        this.#ofFlag = true
        this.#circle.style.background = this.#YELLOW_COLOR

        this.#sequence.push('ж')
        this.#yellowNum++

        if (this.#lastColorSignal === this.#YELLOW_ID) {
            this.#yellowPauses.push(performance.now() - this.#lastTime)
        } else if (this.#lastColorSignal === this.#RED_ID) {
            this.#betweenPauses.push(performance.now() - this.#lastTime)
        }
        this.#lastColorSignal = this.#YELLOW_ID
        this.#lastTime = performance.now()
    }

    turnOf() {
        this.#ofFlag = false
        this.#circle.style.background = '#6f6f6f'
        if (this.#lastColorSignal === this.#RED_ID) {
            this.#redDisplay.push(performance.now() - this.#lastTime)
        }
        if (this.#lastColorSignal === this.#YELLOW_ID) {
            this.#yellowDisplay.push(performance.now() - this.#lastTime)
        }
        this.#lastTime = performance.now()
    }

    getResult() {
        return {
            signalNum: this.#redNum + this.#yellowNum,
            redNum: this.#redNum,
            yellowNum: this.#yellowNum,
            redPauses: this.#redPauses,
            yellowPauses: this.#yellowPauses,
            betweenPauses: this.#betweenPauses,
            redDisplay: this.#redDisplay,
            yellowDisplay: this.#yellowDisplay,
            sequence: this.#sequence
        }
    }
}