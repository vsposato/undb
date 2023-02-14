import type { ICreateFieldSchema } from '@egodb/core'
import { RATING_MAX, RATING_MAX_DEFAULT } from '@egodb/core'
import { NumberInput, TextInput } from '@egodb/ui'
import { Controller, useFormContext } from 'react-hook-form'
import { useCurrentTable } from '../../hooks/use-current-table'
import { FieldInputLabel } from '../field-inputs/field-input-label'
import type { FieldBase } from '../field-inputs/field-picker.type'
import { FieldsPicker } from '../field-inputs/fields-picker'
import { SelectFieldControl } from '../field-inputs/select-field-control'

export const CreateFieldVariantControl: React.FC = () => {
  const table = useCurrentTable()

  const form = useFormContext<ICreateFieldSchema>()
  const type = form.watch('type')
  const fields: FieldBase[] = table.schema.nonSystemFields.map((f) => ({
    id: f.id.value,
    name: f.name.value,
    type: f.type,
  }))

  if (type === 'rating') {
    return (
      <Controller
        name="max"
        render={(props) => (
          <NumberInput
            {...props.field}
            defaultValue={RATING_MAX_DEFAULT}
            max={RATING_MAX}
            onChange={(number) => props.field.onChange(number)}
          />
        )}
      />
    )
  }
  if (type === 'select') {
    return (
      <Controller
        name="options"
        render={(props) => <SelectFieldControl onChange={(options) => props.field.onChange(options)} />}
      />
    )
  }

  if (type === 'tree') {
    return (
      <>
        <Controller
          name="parentFieldName"
          render={(props) => (
            <TextInput
              label={<FieldInputLabel>parent field name</FieldInputLabel>}
              {...props.field}
              value={props.field.value ?? ''}
            />
          )}
        />
        <Controller
          name={'displayFieldIds'}
          render={(props) => (
            <FieldsPicker
              fields={fields}
              {...props.field}
              onChange={(ids) => props.field.onChange(ids)}
              variant="default"
            />
          )}
        />
      </>
    )
  }
  return null
}
