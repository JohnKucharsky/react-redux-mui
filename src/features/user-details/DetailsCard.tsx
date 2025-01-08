import { useMemo } from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import {
  Box,
  BoxProps,
  IconButton,
  Paper,
  Stack,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import TypographySkeleton from '@/components/TypographySkeleton.tsx'
import {
  boxPropsObj,
  typographyPropsObj,
} from '@/features/user-details/data/service.tsx'
import { User } from '@/features/users/data/types.ts'
import { addTestKey } from '@/utils/test-keys.ts'

export default function DetailsCard({ user }: { user?: User }) {
  const navigate = useNavigate()

  const { t } = useTranslation()
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))

  const typographyProps = useMemo(
    (): Record<'title' | 'paragraph' | 'paragraphTitle', TypographyProps> =>
      isDownMd ? typographyPropsObj.mobile : typographyPropsObj.desktop,
    [isDownMd],
  )

  const boxProps = useMemo(
    (): Record<'main' | 'address' | 'company', BoxProps> =>
      isDownMd ? boxPropsObj.mobile : boxPropsObj.desktop,
    [isDownMd],
  )

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        mb={2}
        alignItems={'center'}
        justifyContent="space-between"
      >
        <TypographySkeleton
          {...addTestKey('name-title')}
          {...typographyProps.title}
          fontWeight={'bold'}
        >
          {user?.name}
        </TypographySkeleton>
        <IconButton
          onClick={() => {
            navigate('/')
          }}
          color={'primary'}
          size={'small'}
        >
          <HomeOutlinedIcon fontSize={'large'} />
        </IconButton>
      </Stack>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          direction: 'row',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'flex-start',
          overflow: 'auto',
        }}
      >
        {/*main*/}
        <Box display={'grid'} {...boxProps.main}>
          <Typography {...typographyProps.paragraphTitle}>
            {t('userName')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.username}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Phone')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.phone}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Email')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.email}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Website')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.website}
          </TypographySkeleton>
        </Box>
        {/*main*/}
        {/*address*/}
        <Box display={'grid'} {...boxProps.address}>
          <Typography
            sx={{ gridColumn: 'span 2' }}
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {t('Address')}:
          </Typography>

          <Typography {...typographyProps.paragraphTitle}>
            {t('City')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.address.city}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Street')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.address.street}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('Suite')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.address.suite}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('ZipCode')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.address.zipcode}
          </TypographySkeleton>
        </Box>
        {/*address*/}
        {/*company*/}
        <Box display={'grid'} {...boxProps.company}>
          <Typography
            sx={{ gridColumn: 'span 2' }}
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {t('Company')}:
          </Typography>

          <Typography {...typographyProps.paragraphTitle}>
            {t('companyName')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.company.name}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('catchPhrase')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.company.catchPhrase}
          </TypographySkeleton>
          <Typography {...typographyProps.paragraphTitle}>
            {t('bs')}:
          </Typography>
          <TypographySkeleton
            {...typographyProps.paragraph}
            fontWeight={'bold'}
          >
            {user?.company.bs}
          </TypographySkeleton>
        </Box>
        {/*company*/}
      </Paper>
    </>
  )
}
