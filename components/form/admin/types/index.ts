import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import { AdminFieldTypeProps } from './type.props'

export const adminTypes: {
  [key: string]: ComponentType<AdminFieldTypeProps>
} = {
  checkbox: dynamic<AdminFieldTypeProps>(() => import('./checkbox.type').then(c => c.CheckboxType )),
  date: dynamic<AdminFieldTypeProps>(() => import('./date.type').then(c => c.DateType )),
  dropdown: dynamic<AdminFieldTypeProps>(() => import('./dropdown.type').then(c => c.DropdownType )),
  email: dynamic<AdminFieldTypeProps>(() => import('./email.type').then(c => c.EmailType )),
  hidden: dynamic<AdminFieldTypeProps>(() => import('./hidden.type').then(c => c.HiddenType )),
  link: dynamic<AdminFieldTypeProps>(() => import('./link.type').then(c => c.LinkType )),
  location: dynamic<AdminFieldTypeProps>(() => import('./location.type').then(c => c.LocationType ), { ssr: false }),
  number: dynamic<AdminFieldTypeProps>(() => import('./number.type').then(c => c.NumberType )),
  radio: dynamic<AdminFieldTypeProps>(() => import('./radio.type').then(c => c.RadioType )),
  rating: dynamic<AdminFieldTypeProps>(() => import('./rating.type').then(c => c.RatingType )),
  slider: dynamic<AdminFieldTypeProps>(() => import('./slider.type').then(c => c.SliderType )),
  textarea: dynamic<AdminFieldTypeProps>(() => import('./textarea.type').then(c => c.TextareaType )),
  textfield: dynamic<AdminFieldTypeProps>(() => import('./text.type').then(c => c.TextType )),
  yes_no: dynamic<AdminFieldTypeProps>(() => import('./yes_no.type').then(c => c.YesNoType )),
}
