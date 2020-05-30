import {gql} from 'apollo-boost'

export interface FormPageFragment {
  show: boolean
  title?: string
  paragraph?: string
  buttonText?: string
  buttons: {
    url?: string
    action?: string
    text?: string
    bgColor?: string
    activeColor?: string
    color?: string
  }[]
}

export interface FormFieldFragment {
  id: string
  title: string
  type: string
  description: string
  required: boolean
  value: string
}

export interface FormDesignFragment {
  colors: {
    backgroundColor: string
    questionColor: string
    answerColor: string
    buttonColor: string
    buttonActiveColor: string
    buttonTextColor: string
  }
  font?: string
}

export interface FormFragment {
  id?: string
  title: string
  created: string
  language: string
  showFooter: boolean
  fields: FormFieldFragment[]
  design: FormDesignFragment
  startPage: FormPageFragment
  endPage: FormPageFragment
}

export const FORM_FRAGMENT = gql`
  fragment Form on Form {
    id
    title
    language
    showFooter
    
    fields {
      id
      title
      type
      description
      required
      value
    }
    
    design {
      colors {
        backgroundColor
        questionColor
        answerColor
        buttonColor
        buttonActiveColor
        buttonTextColor
      }
      font
    }
    
    startPage {
      show
      title
      paragraph
      buttonText
      buttons {
        url
        action
        text
        bgColor
        activeColor
        color
      }
    }
    
    endPage {
      show
      title
      paragraph
      buttonText
      buttons {
        url
        action
        text
        bgColor
        activeColor
        color
      }
    }
  }
`
