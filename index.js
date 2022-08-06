let quizDetails = document.querySelector('.quiz-details');
let quizQuestions = document.querySelector(".quiz-questions")
let quizAnswers = document.querySelector(".quiz-answers")
let button = document.querySelector(".confirm-answers")
let bullets = document.querySelector(".bullets")
let countDown = document.querySelector(".count-down")
let jsonIndex;
let counter;
let result = 0;
let commingQuestions;
let httpRequest = new XMLHttpRequest()


httpRequest.onreadystatechange = () =>
{

    if (httpRequest.readyState == 4 && httpRequest.status == 200)
    {
        commingQuestions = JSON.parse(httpRequest.responseText)
        questionsNumber = commingQuestions.length

        jsonIndex = Math.floor(Math.random() * questionsNumber);

        makeQuestionsNumber(questionsNumber)

        makeQuestions(commingQuestions)

        makeAnswers(commingQuestions)


        makeBullets(questionsNumber)

        makeTimer(30)

        let n = 1;
        let takenNums = [jsonIndex]

        button.onclick = () =>
        {
            
            // the counter

            clearInterval(counter);
            makeTimer(30)

            // to count the right answers

            trueAnswer = commingQuestions[jsonIndex]["true-answer"]

            inputs = [...document.getElementsByTagName("input")]
            inputs.forEach(element =>
            {
                if (element.checked == true)
                {

                    if (element.value == trueAnswer)
                    {
                        result++;
                    }
                }
            })

            // to the questions unarranged
            jsonIndex = Math.floor(Math.random() * (questionsNumber))
            let random = () =>
            {
                if (takenNums.length > questionsNumber)
                {
                    return true;
                }
                if (takenNums.includes(jsonIndex))
                {
                    jsonIndex = Math.floor(Math.random() * (questionsNumber))
                    random()
                } else
                {
                    takenNums.push(jsonIndex)
                }
            }
            random()

            if (takenNums.length <= questionsNumber)
            {
                
                quizQuestions.innerHTML = ""
                quizAnswers.innerHTML = ""

                makeQuestions(commingQuestions)
                makeAnswers(commingQuestions)
                bullets.children[n].className = "make-it-colored"
                ++n
                if (takenNums.length == questionsNumber)
                {
                    takenNums.length++
                }
            } else
            {
                quizQuestions.innerHTML = ""
                quizAnswers.innerHTML = ""
                button.remove()
                bullets.remove()
                countDown.remove()
                theResult = document.createElement("div")
                if (result < 5)
                {
                    theResultText = document.createTextNode(`Poor you got ${ result } from ${questionsNumber}`)

                } else if (result >= 5 && result < 10)
                {
                    theResultText = document.createTextNode(`Good you got ${ result } from ${questionsNumber}`)

                } else
                {
                    theResultText = document.createTextNode(`Excellent you got ${ result } from ${questionsNumber}`)
                }


                theResult.style.fontSize = "25px"
                theResult.style.textAlign = "center"


                theResult.appendChild(theResultText)
                quizAnswers.appendChild(theResult)

                makeAgainbutton()

            }



        }

    }
}
httpRequest.open('GET', "/index.json", true)
httpRequest.send()


makeQuestionsNumber = (nums) =>
{
    detailsSpan = document.createElement('span')
    detailsSpanText = document.createTextNode(`questions number is ${ nums }`)

    detailsSpan.appendChild(detailsSpanText)
    quizDetails.appendChild(detailsSpan)
}


makeQuestions = (ques) =>
{
    questionsH2 = document.createElement('h2')
    questionsH2Text = document.createTextNode(`${ ques[jsonIndex].title }`)
    questionsH2.appendChild(questionsH2Text)

    quizQuestions.appendChild(questionsH2)
}
let i
makeAnswers = (comingAnswer) =>
{
    let iArrange = Math.floor(Math.random() * 4)
    let takenNumsAnswers = []
    for (i = 1; i < 5; i++)
    {
        // to the questions unarranged

        let randomAnswers = () =>
        {
            if (takenNumsAnswers.includes(iArrange))
            {
                iArrange = Math.floor(Math.random() * 4)
                randomAnswers()
            } else
            {
                takenNumsAnswers.push(iArrange)
            }

        }
        randomAnswers()

        answers = document.createElement('div')
        answers.className = 'answer'

        answersInput = document.createElement('input')
        answersLabel = document.createElement("label")
        answersInput.type = "radio"
        answersInput.name = "input"
        answersInput.id = `${ comingAnswer[jsonIndex][`answer-${ iArrange + 1 }`] }`
        answersInput.className = "input"
        answersInput.value = comingAnswer[jsonIndex][`answer-${ iArrange + 1 }`]

        if (i == 1)
        {
            answersInput.checked = "true"
        }

        answersLabel.htmlFor = `${ comingAnswer[jsonIndex][`answer-${ iArrange + 1 }`] }`

        answersLabel.innerHTML = comingAnswer[jsonIndex][`answer-${ iArrange + 1 }`]

        answers.appendChild(answersInput)
        answers.appendChild(answersLabel)
        quizAnswers.appendChild(answers)
    }


}

makeBullets = (num) =>
{
    for (let i = 0; i < num; i++)
    {
        bulletElemnt = document.createElement("span")
        bullets.appendChild(bulletElemnt)
    }
    bullets.children[0].className = "make-it-colored"
}

makeTimer = (nums) =>
{

    minutes = parseInt(nums / 60)
    seconds = nums % 60


    counter = setInterval(() =>
    {

        minutes = parseInt(nums / 60)
        seconds = nums % 60
        if (minutes >= 10)
        {
            minutes = `${ minutes }`
        } else
        {
            minutes = `0${ minutes }`
        }
        if (seconds >= 10)
        {
            seconds = `${ seconds }`
        } else
        {
            seconds = `0${ seconds }`
        }
        countDown.innerHTML = `${ minutes }:${ seconds }`
        if (nums == 0)
        {
            button.click()
        }
        --nums

    }, 1000);



}
makeAgainbutton = () =>
{
    startAgainButton = document.createElement("button")
    startAgainButton.innerHTML = "Start Again"
    startAgainButton.style.marginTop = "40px"
    startAgainButton.onclick = () =>
    {
        document.location.reload()
    }
    quizAnswers.appendChild(startAgainButton)
}


