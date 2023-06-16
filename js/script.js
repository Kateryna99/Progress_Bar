class CreateProgressBar {
    constructor(tcTitle, progressAmount, progressBarBlockTitle, progressBarTitle, iconTitle, buttonContainerTitle, buttonTitle, buttonsContainerTitle) {
        this.tcTitle = tcTitle
        this.progressAmount = progressAmount
        this.progressBarBlockTitle = progressBarBlockTitle
        this.progressBarTitle = progressBarTitle
        this.iconTitle = iconTitle
        this.buttonContainerTitle = buttonContainerTitle
        this.buttonTitle = buttonTitle
        this.buttonsContainerTitle = buttonsContainerTitle
        this.progressBarList = []
        this.currentIndex = 0
    }

    createProgressBar() {
        const progressBarBlock = document.createElement('div')
        progressBarBlock.classList.add(this.progressBarBlockTitle)

        for (let i = 0; i < this.progressAmount; i++) {
            const progressBar = document.createElement('div')
            progressBar.classList.add(this.progressBarTitle)

            const icon = document.createElement('span')
            icon.classList.add(this.iconTitle)

            progressBar.append(icon)
            this.progressBarList.push(progressBar)

            progressBarBlock.append(progressBar)
        }
        return progressBarBlock
    }

    createButton(status) {
        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add(this.buttonContainerTitle)

        const button = document.createElement('button')
        button.classList.add(this.buttonTitle, `${this.buttonTitle}--${status}`)
        button.addEventListener('click', () => {
            this.changeItems(status, button)
        })

        buttonContainer.append(button)

        return buttonContainer
    }

    changeItems() {
        this.prevButton.disabled = this.currentIndex === 0;
        this.nextButton.disabled = this.currentIndex + 1 === this.progressAmount - 1;


        if(this.currentIndex < 0) this.currentIndex = 0;
        if(this.currentIndex > this.progressAmount - 1) this.currentIndex = this.progressAmount - 1;

        this.progressBarList.forEach((element, index) => {
            if (index <= this.currentIndex) {
                element.classList.add(`${this.progressBarTitle}--active`)
            } else element.classList.remove(`${this.progressBarTitle}--active`)
        });
    }

    addButtons() {
        const buttonsContainer = document.createElement('div')
        buttonsContainer.classList.add(this.buttonsContainerTitle)


        this.prevButton = this.createButton('prev');
        this.nextButton = this.createButton('next');

        this.prevButton.addEventListener('click', () => {this.currentIndex-=1;this.changeItems()});
        this.nextButton.addEventListener('click', () => {this.currentIndex+=1;this.changeItems()});


        buttonsContainer.append(this.prevButton, this.nextButton)

        return buttonsContainer
    }

    render() {
        document.querySelector(this.tcTitle).append(this.createProgressBar(), this.addButtons())
        this.changeItems();
    }
}

const createProgressBar = new CreateProgressBar('.progress-bar__wrapper',5,'progress-bar__progress','progress-bar__item','progress-bar__icon','progress-bar__element','progress-bar__button','progress-bar__block')

createProgressBar.render()