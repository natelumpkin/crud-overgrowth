import {Editor, convertFromRaw, EditorState} from 'draft-js'

import AnswerUserControls from "../AnswerUserControls";
import UserInfoCard from "../UserInfoCard";

const AnswerCard = ({answer, currentUser}) => {

  console.log('answer in AnswerCard: ', answer)
  console.log('currentUser in AnswerCard: ', currentUser)

  let answerContent
  let stateToDisplay
  if (answer.answer) answerContent = convertFromRaw(JSON.parse(answer.answer))
  if (answerContent) stateToDisplay = EditorState.createWithContent(answerContent)

  return (
    <div>
      <div>
      <Editor
        editorState={stateToDisplay}
        readOnly
      />
      </div>
      <div>
        {currentUser && answer.User.id === currentUser.id && (
          <AnswerUserControls answer={answer}/>
        )}
      </div>
      <div>
        <UserInfoCard user={answer.User} responseType={"answer"} response={answer}/>
      </div>
    </div>
  )
}

export default AnswerCard;
