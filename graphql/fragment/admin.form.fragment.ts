import { gql } from 'apollo-boost'

export interface AdminFormPageFragment {
  show: boolean
  title?: string
  paragraph?: string
  buttonText?: string
  buttons: {
    url?: string
    action?: string
    text?: string
    bgColor?: string
    color?: string
  }[]
}

export interface AdminFormFieldOptionFragment {
  key?: string
  title?: string
  value: string
}

export interface AdminFormFieldOptionKeysFragment {
  [key: string]: string
}

export interface AdminFormFieldLogicJumpFragment {
  fieldA?: string
  valueB?: string
  expressionString?: string
  jumpTo?: string
  enabled: boolean
}

export interface AdminFormFieldFragment {
  id: string
  title: string
  slug?: string
  type: string
  description: string
  required: boolean
  value: string

  options: AdminFormFieldOptionFragment[]
  optionKeys?: AdminFormFieldOptionKeysFragment

  logicJump: AdminFormFieldLogicJumpFragment

  rating?: {
    steps?: number
    shape?: string
  }
}

export interface AdminFormHookFragment {
  id: string
  enabled: boolean
  url?: string
  format?: string
}

export interface AdminFormFragment {
  id?: string
  title: string
  created: string
  lastModified?: string
  language: string
  showFooter: boolean
  isLive: boolean
  fields: AdminFormFieldFragment[]
  hooks: AdminFormHookFragment[]
  selfNotifications: {
    enabled: boolean
    subject?: string
    htmlTemplate?: string
    fromField?: string
    toEmail?: string
  }
  respondentNotifications: {
    enabled: boolean
    subject?: string
    htmlTemplate?: string
    toField?: string
    fromEmail?: string
  }
  design: {
    colors: {
      backgroundColor: string
      questionColor: string
      answerColor: string
      buttonColor: string
      buttonTextColor: string
    }
    font?: string
  }
  startPage: AdminFormPageFragment
  endPage: AdminFormPageFragment
  admin: {
    id: string
    username: string
    email: string
  }
}

export const ADMIN_FORM_FRAGMENT = gql`
  fragment AdminForm on Form {
    id
    title
    created
    lastModified
    language
    showFooter
    isLive
    
    hooks {
      id
      enabled
      format
      url
    }

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

    selfNotifications {
      enabled
      subject
      htmlTemplate
      fromField
      toEmail
    }
    respondentNotifications {
      enabled
      subject
      htmlTemplate
      toField
      fromEmail
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
    admin {
      id
      username
      email
    }
  }
`
