import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as answerActions from '../../store/answer'

import AnswerCard from "../AnswerCard";
import CreateAnswer from "../CreateAnswer";
import './QuestionAnswers.css'

const QuestionAnswers = ({question, currentUser}) => {

  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [alreadyAnswered, setAlreadyAnswered] = useState(false)
  const [wantsToAddAnotherAnswer, setWantsToAddAnotherAnswer] = useState(false)
  const [displayForm, setDisplayForm] = useState(true)
  const answers = useSelector(state => state.answers)

  useEffect(() => {
    dispatch(answerActions.getAnswersToQuestion(question.id))
      .then(setLoaded(true))
  },[dispatch])

  const userList = [];
  const answersArr = [];
  for (let answerId in answers) {
    answersArr.push(answers[answerId])
    if (answers[answerId]) userList.push(answers[answerId].userId)
  }

  console.log(userList)
  console.log(userList.includes(currentUser?.id))

  useEffect(() => {
    if (userList.includes(currentUser?.id)) {
      setAlreadyAnswered(true)
    } else {
      setAlreadyAnswered(false)
    }
  }, [userList])

  useEffect(() => {
    // if alreadyAnswered is False, then show the create form no matter what
    if (!alreadyAnswered) setDisplayForm(true)
    // if alreadyAnswered is True and wantsToAnswer is True, then show the create form
    if (alreadyAnswered && wantsToAddAnotherAnswer) setDisplayForm(true)
    // otherwise is alreadyAnswered is True and wantsToAnswer is false, then hide it
    if (alreadyAnswered && !wantsToAddAnotherAnswer) setDisplayForm(false)
  }, [alreadyAnswered, wantsToAddAnotherAnswer])

  console.log(displayForm)

  const addAnotherAnswer = (e) => {
    setWantsToAddAnotherAnswer(true)
  }

  if (!loaded) {
    return null
  }

  // console.log('question in QuestionAnswers: ', question)


  return (
    <div id="answers-container">
      <div id="num-answers-container">
        <h4>{answersArr.length} {answersArr.length === 1 ? "Answer" : "Answers"}</h4>
      </div>
      <div id="answers-card-container">
        {answersArr.map(answer => (
          <AnswerCard answer={answer} currentUser={currentUser}/>
        ))}
      </div>

      {currentUser && displayForm && (
      <div>
          <CreateAnswer questionId={question.id}/>
      </div>
      )}
      {
        currentUser && !displayForm && (
          <div id="create-question-button-container" className="add-another-answer-div">
            <button id="post-question-button" className="ask-question-button" onClick={addAnotherAnswer}>Add Another Answer</button>
          </div>
        )
      }
    </div>
  )
}

export default QuestionAnswers;
