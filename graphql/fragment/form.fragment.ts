import { gql } from 'apollo-boost'

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

export interface FormFieldOptionFragment {
  key?: string
  title?: string
  value: string
}

export interface FormFieldLogicJumpFragment {
  fieldA?: string
  valueB?: string
  expressionString?: string
  jumpTo?: string
  enabled: boolean
}

export interface FormFieldFragment {
  id: string
  title: string
  slug?: string
  type: string
  description: string
  required: boolean
  value: string

  options: FormFieldOptionFragment[]

  logicJump: FormFieldLogicJumpFragment

  rating?: {
    steps?: number
    shape?: string
  }
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
      slug
      type
      description
      required
      value

      options {
        key
        title
        value
      }

      logicJump {
        fieldA
        valueB
        expressionString
        jumpTo
        enabled
      }
      rating {
        steps
        shape
      }
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
