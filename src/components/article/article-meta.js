import { componentMargin, layout } from '../../themes/common-variables'
import { HeadingAuthor } from './HeadingAuthor'
import { PublishDate } from './PublishDate'
import { screen } from '../../themes/screen'
import { ShareBt } from './ShareBt'
import FontChangeButton from '../FontChangeButton'
import PrintButton from '../shared/PrintButton'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: block;
  margin: 0 auto 24px auto;
  > div {
    margin-bottom: 24px;
  }
  ${screen.desktopAbove`
    width: ${layout.desktop.small};
    margin-bottom: ${componentMargin.marginBottom};
  `}
  ${screen.tablet`
    width: ${layout.tablet.small};
  `}
  ${screen.mobile`
    margin: 0 ${componentMargin.horizontalMargin} 24px ${componentMargin.horizontalMargin};
  `}
`

class ArticleMeta extends React.Component {
  render() {
    const { authors, extendByline, publishedDate, appId, url, title, fbIcon, twitterIcon, lineIcon, changeFontSize, fontSize } = this.props
    return (
      <Container>
        <HeadingAuthor
          authors={authors}
          extendByline={extendByline}
        >
          <PublishDate
            date={publishedDate}
          />
        </HeadingAuthor>
        <div className={'hidden-print'}>
          <ShareBt
            appId={appId}
            url={url}
            title={title}
            fbIcon={fbIcon}
            twitterIcon={twitterIcon}
            lineIcon={lineIcon}
          />
          <PrintButton />
          <FontChangeButton
            changeFontSize={changeFontSize}
            fontSize={fontSize}/>
        </div>
      </Container>
    )
  }
}

export default ArticleMeta
