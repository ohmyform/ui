import React from 'react'
import { DateType } from './date.type'
import { DropdownType } from './dropdown.type'
import { EmailType } from './email.type'
import { LinkType } from './link.type'
import { NumberType } from './number.type'
import { RadioType } from './radio.type'
import { RatingType } from './rating.type'
import { TextType } from './text.type'
import { TextareaType } from './textarea.type'
import { FieldTypeProps } from './type.props'
import { YesNoType } from './yes_no.type'

export const fieldTypes: {
  [key: string]: React.FC<FieldTypeProps>
} = {
  textfield: TextType,
  date: DateType,
  email: EmailType,
  textarea: TextareaType,
  link: LinkType,
  dropdown: DropdownType,
  rating: RatingType,
  radio: RadioType,
  yes_no: YesNoType,
  number: NumberType,
}
