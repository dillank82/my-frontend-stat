import type { ReactElement } from 'react'
import { Header } from '../Header/Header'
import { StatBlock } from '../StatBlock/StatBlock'
import { Footer } from '../Footer/Footer'
import { portfolioLink } from '../../config/siteSettings'

export const App = (): ReactElement => {

  return (
    <>
      <Header text='my frontend stats' />
      <StatBlock />
      <Footer portfolioLink={ portfolioLink }/>
    </>
  )
}
