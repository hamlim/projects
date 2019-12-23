import React, { useEffect, useReducer, useCallback, useRef } from 'react'
import Editor from 'react-simple-code-editor'

function getLineNumber(codeString, selectionStart) {
  return codeString.substring(0, selectionStart).split('\n').length
}

function getSelectionState(editorElement) {
  return {
    end: editorElement.selectionEnd,
    start: editorElement.selectionStart,
  }
}

function createReducer(options) {
  return function reducer(state, action) {
    switch (action.type) {
      case 'EDIT': {
        return {
          ...state,
          code: action.payload,
        }
      }
      case 'COMMENT_LINE': {
        const { lineNumber, selectionState } = action.payload
        let didRemoveComment = false
        let newCode = state.code
          .split('\n')
          .reduce((newCode, line, lineIndex) => {
            if (lineIndex + 1 === lineNumber) {
              // @TODO use block comments if within render method
              // Probably requires some kind of jsx and/or look[ahead / behind] searching
              if (line.startsWith('// ')) {
                didRemoveComment = true
              }
              return [
                ...newCode,
                line.startsWith('// ') ? line.split('// ')[1] : `// ${line}`,
              ]
            }
            return [...newCode, line]
          }, [])
          .join('\n')
        return {
          ...state,
          selectionState: selectionState,
          code: newCode,
          didRemoveComment,
        }
      }
      case 'FORMAT_CODE': {
        return {
          ...state,
          code: options.formatCode(state.code),
          selectionState: action.payload,
        }
      }
      default:
        return state
    }
  }
}

function ComplexEditor({ initialValue, formatCode, formatOnSave, ...props }) {
  const [state, dispatch] = useReducer(createReducer({ formatCode }), {
    code: initialValue,
    selectionState: { end: 0, start: 0 },
    didRemoveComment: false,
  })

  const editorRef = useRef(null)

  const isMacRef = useRef(false)

  useEffect(() => {
    // Do initial setup of the refs, we use one to store the textarea instance
    // and another to determine if we are on a mac or not to switch keyboard shortcuts
    editorRef.current = document.querySelector(
      '#react-complex-code-editor--element',
    )
    isMacRef.current = navigator.userAgent.includes('Mac OS X')
  }, [])

  useEffect(() => {
    // set the start and end selection states to the start before
    // the comment started. This is because we only support single line comments
    // so we want to restore the cursor to where it was or where it should be
    // depending on if we are removing the comment or adding it.
    editorRef.current.selectionEnd = state.didRemoveComment
      ? state.selectionState.start - 3
      : state.selectionState.start + 3
    editorRef.current.selectionStart = state.didRemoveComment
      ? state.selectionState.start - 3
      : state.selectionState.start + 3
  }, [state.selectionState, state.didRemoveComment])

  const handleKeyDown = useCallback(
    event => {
      // If the key is a slash and the user is using a mac and holding the "meta" (aka command) key
      // or if the key is a slash and the user is using a pc and holding the control key
      // then we want to comment out the current line the cursor is on
      if (
        (event.key === '/' && isMacRef.current && event.metaKey) ||
        (event.key === '/' && !isMacRef.current && event.ctrlKey)
      ) {
        const selectionState = getSelectionState(editorRef.current)
        const lineNumber = getLineNumber(state.code, selectionState.start)
        dispatch({
          type: 'COMMENT_LINE',
          payload: {
            lineNumber,
            selectionState,
          },
        })
      } else if (
        // If the formatOnSave is enabled, and the formatCode prop is a function
        // and if the user is on mac and they pressed command + s
        // or if the user is on windows and they pressed control + s
        (typeof formatCode === 'function' &&
          formatOnSave &&
            ((event.key === 's' && isMacRef.current && event.metaKey) ||
              (event.key === 's' && !isMacRef.current && event.ctrlKey))) ||
        (event.key === 'f' && isMacRef.current && event.metaKey) ||
        (event.key === 'f' && !isMacRef.current && event.ctrlKey)
      ) {
        const selectionState = getSelectionState(editorRef.current)
        // prevent default to not show the default save page popup
        event.preventDefault()
        dispatch({
          type: 'FORMAT_CODE',
          payload: selectionState,
        })
      }
    },
    [state.code],
  )

  const onValueChange = useCallback(
    code => dispatch({ type: 'EDIT', payload: code }),
    [],
  )

  return (
    <Editor
      {...props}
      value={state.code}
      onValueChange={onValueChange}
      textareaId="react-complex-code-editor--element"
      onKeyDown={handleKeyDown}
    />
  )
}

export default ComplexEditor
