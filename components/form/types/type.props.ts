import { FormDesignFragment, FormFieldFragment } from '../../../graphql/fragment/form.fragment'

export interface FieldTypeProps {
  field: FormFieldFragment
  design: FormDesignFragment
  urlValue?: string
}
