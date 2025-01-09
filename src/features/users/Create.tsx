import { useState } from 'react'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { object } from 'yup'
import DialogActionsEl from '@/components/DialogActionsEl'
import CloseButton from '@/components/StyledComponents/CloseButton.tsx'
import { useAddUserMutation } from '@/features/users/data/api.ts'
import { userInputOutput } from '@/features/users/data/input-output'
import { useYupSchemaUsers } from '@/features/users/data/service'
import SameFields from '@/features/users/SameFields'
import { addTestKey } from '@/utils/test-keys.ts'

export default function Create() {
  const [opened, setOpened] = useState(false)

  const { t } = useTranslation()
  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box>
      <Dialog
        fullScreen={isDownSm}
        fullWidth
        maxWidth="xs"
        open={opened}
        onClose={() => setOpened(false)}
      >
        <CreateContent handleClose={() => setOpened(false)} />
      </Dialog>

      <Button
        {...addTestKey('add-button')}
        variant={'contained'}
        startIcon={<AddTwoToneIcon />}
        onClick={() => setOpened(true)}
      >
        {t('Create')}
      </Button>
    </Box>
  )
}

function CreateContent({ handleClose }: { handleClose: () => void }) {
  const [addUser, mutation] = useAddUserMutation()

  const { t } = useTranslation()
  const schema = useYupSchemaUsers()

  return (
    <>
      <CloseButton onClick={handleClose} color={'primary'}>
        <CloseIcon />
      </CloseButton>
      <DialogTitle
        sx={{
          px: { xs: 1, md: 2 },
        }}
      >
        {t('createUser')}
      </DialogTitle>
      <Formik
        initialValues={userInputOutput.emptyInitialValues}
        validationSchema={object().shape(schema)}
        onSubmit={async (
          { submit: _, ...restValues },
          { resetForm, setErrors },
        ) => {
          try {
            await addUser(userInputOutput.formatValues(restValues))

            resetForm()
            handleClose()
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
        }) => {
          return (
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
                buttonTitle={t('Create')}
                testKey={'create-button'}
              />
            </form>
          )
        }}
      </Formik>
    </>
  )
}
