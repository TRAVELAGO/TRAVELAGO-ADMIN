import { CheckDecagram, HomeOutline, Table, AlertBox, ChartAreaspline, Sale } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      sectionTitle: 'Analytics'
    },
    {
      title: 'Overview',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Summary',
      icon: ChartAreaspline,
      path: '/summary'
    },
    {
      sectionTitle: 'User Manage'
    },
    {
      title: 'User',
      icon: Table,
      path: '/users'
    },
    {
      title: 'Approve Account',
      icon: CheckDecagram,
      path: '/approve-account'
    },
    {
      sectionTitle: 'Feedback Manage'
    },
    {
      title: 'Report Feedback',
      icon: AlertBox,
      path: '/report'
    },
    {
      sectionTitle: 'Voucher Manage'
    },
    {
      title: 'Voucher',
      icon: Sale,
      path: '/voucher'
    },
  ]
}

export default navigation
