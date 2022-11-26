import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js'
import FormEditor from "../FormEditor";
import * as questionActions from '../../store/question'

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [titleErrors, setTitleErrors] = useState([])
  const [bodyErrors, setBodyErrors] = useState([])
  const [disableButton, setDisableButton] = useState(true)

  useEffect(() => {
    let bodyLength = editorState.getCurrentContent().getPlainText().length;
    if (title.length > 15 && title.length < 150
      && bodyLength > 30 && bodyLength < 10000) {
        setDisableButton(false)
      } else {
        setDisableButton(true)
      }
    if (title.length > 15 && title.length < 150) {
      handleTitleErrors()
    }
    if (bodyLength > 30 && bodyLength < 10000) {
      handleBodyErrors()
    }
  }, [title, editorState])


  // console.log(editorState.getCurrentContent().getPlainText().length)

  const handleTitleErrors = () => {
    let errors = [];
    if (title.length < 15) errors.push('Title must be more than 15 characters')
    if (title.length > 150) errors.push('Title must be less than 150 characters')
    setTitleErrors(errors)
  }

  const handleBodyErrors = () => {
    let errors = [];
    let bodyLength = editorState.getCurrentContent().getPlainText().length;
    if (bodyLength < 30) errors.push('Body must be more than 30 characters')
    if (bodyLength > 10000) errors.push('Body must be less than 10,000 characters')
    setBodyErrors(errors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleBodyErrors()
    handleTitleErrors()

    if (!bodyErrors.length && !titleErrors.length) {
      const content = editorState.getCurrentContent()
      const bodyToSave = JSON.stringify(convertToRaw(content))

      const newQuestion = {
        title: title,
        body: bodyToSave
      }
      dispatch(questionActions.createQuestion(newQuestion))
        .then((question) => history.push(`/questions/${question.id}`))
      setTitle('')
      setEditorState(EditorState.createEmpty())
    }
  }

  const titlePlaceholder = 'e.g. Is there an R function for finding the index of an element in a vector?'
  const bodyPlaceholder = ''

  return (
    <div id="create-question-container">
      <h2>Ask a Public Question</h2>
      <div id="create-question-form-container">
        <div id="create-question-guidelines-container">
          <h4>Writing a Good Question</h4>
          <p>You’re ready to ask a programming-related question and this form will help guide you through the process.</p>
          <ul>
            Steps
            <li>Summarize your problem in a one-line title</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <p>Be specific and imagine you’re asking a question to another person.</p>
            <input value={title} placeholder={titlePlaceholder}  onChange={(e) => setTitle(e.target.value)} onBlur={handleTitleErrors}></input>
              <ul>
                {titleErrors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
          </div>
          <div onBlur={handleBodyErrors}>
            <label>Body</label>
            <p>The body of your question contains your problem details and results. Minimum 30 characters.</p>
            <FormEditor placeHolder={''} editorState={editorState} setEditorState={setEditorState} onChange={(e) => setEditorState(e.target.value)} />
              <ul>
                {bodyErrors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
          </div>
          <button disabled={disableButton}>Post Your Question</button>
        </form>
      </div>
      <div id="create-question-directions-container"></div>
    </div>
  )
}

export default CreateQuestion;
