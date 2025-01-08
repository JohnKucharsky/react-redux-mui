import CloseIcon from '@mui/icons-material/Close'
import { Box, DialogContent, DialogTitle } from '@mui/material'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { object } from 'yup'
import DialogActionsEl from '@/components/DialogActionsEl'
import CloseButton from '@/components/StyledComponents/CloseButton.tsx'
import { useEditUserMutation } from '@/features/users/data/api.ts'
import { userInputOutput } from '@/features/users/data/input-output'
import { useYupSchemaUsers } from '@/features/users/data/service'
import { type User } from '@/features/users/data/types'
import SameFields from '@/features/users/SameFields'

export default function Edit({
  handleEditClose,
  initialValues,
}: {
  handleEditClose: () => void
  initialValues: User
}) {
  const [editUser, mutation] = useEditUserMutation()

  const { t } = useTranslation()
  const schema = useYupSchemaUsers()

  const handleCreateSuccess = () => {
    handleEditClose()
  }

  return (
    <>
      <CloseButton onClick={handleEditClose} color={'primary'}>
        <CloseIcon />
      </CloseButton>

      <DialogTitle
        sx={{
          px: { xs: 1, md: 2 },
        }}
      >
        {t('Edit')}
      </DialogTitle>
      <Formik
        initialValues={userInputOutput.getInitialValues(initialValues)}
        validationSchema={object().shape(schema)}
        onSubmit={async (
          { submit: _submit, ...restValues },
          { resetForm, setErrors },
        ) => {
          try {
            await editUser({
              id: initialValues.id,
              ...userInputOutput.formatValues(restValues),
            })

            resetForm()
            handleCreateSuccess()
          } catch (err) {
            if (err instanceof Error) {
              setErrors({
                submit: err.message,
              })
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent
              sx={{
                px: { xs: 1, md: 2 },
                py: 1,
              }}
            >
              <Box display={'grid'} gap={1}>
                <SameFields
                  touched={touched}
                  errors={errors}
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Box>
            </DialogContent>
            <DialogActionsEl
              submit={errors.submit}
              isSubmitting={mutation.isLoading}
              buttonTitle={t('Edit')}
              testKey={'edit-button'}
            />
          </form>
        )}
      </Formik>
    </>
  )
}
