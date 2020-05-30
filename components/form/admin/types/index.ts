import React from 'react'
import {DateType} from './date.type'
import {DropdownType} from './dropdown.type'
import {EmailType} from './email.type'
import {HiddenType} from './hidden.type'
import {LinkType} from './link.type'
import {NumberType} from './number.type'
import {RadioType} from './radio.type'
import {RatingType} from './rating.type'
import {TextType} from './text.type'
import {TextareaType} from './textarea.type'
import {AdminFieldTypeProps} from './type.props'
import {YesNoType} from './yes_no.type'

export const adminTypes: {
  [key: string]: React.FC<AdminFieldTypeProps>
} = {
  'textfield': TextType,
  'date': DateType,
  'email': EmailType,
  'textarea': TextareaType,
  'link': LinkType,
  'dropdown': DropdownType,
  'rating': RatingType,
  'radio': RadioType,
  'hidden': HiddenType,
  'yes_no': YesNoType,
  'number': NumberType,
}
