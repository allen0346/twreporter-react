'use strict'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import map from 'lodash/map'
import serialize from 'serialize-javascript'

const _ = {
  map
}

export default class Html extends PureComponent {
  static propTypes = {
    assets: PropTypes.object.isRequired,
    component: PropTypes.node,
    store: PropTypes.object.isRequired,
    styleTags: PropTypes.string.isRequired
  }
  render() {
    const { assets, content, store, styleTags } = this.props
    const head = Helmet.rewind()
    return (
      <html lang="zh-TW">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="content-type" content="text/html; charSet=utf-8" />
          <meta httpEquiv="Cache-control" content="public" />
          <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1, initial-scale=1" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#E30B20" />
          <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="https://www.twreporter.org/rss2.xml" />
          <link href="https://www.twreporter.org/images/apple-touch-icon.png" rel="apple-touch-icon" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-152x152.png" rel="apple-touch-icon" sizes="152x152" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-167x167.png" rel="apple-touch-icon" sizes="167x167" />
          <link href="https://www.twreporter.org/images/apple-touch-icon-180x180.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="https://www.twreporter.org/images/icon-hires.png" rel="icon" sizes="192x192" />
          <link href="https://www.twreporter.org/images/icon-normal.png" rel="icon" sizes="128x128" />
          <link href="/asset/favicon.png"  rel="shortcut icon" />
          {_.map(assets.stylesheets, (stylesheet, key) =>
            <link href={stylesheet} key={'stylesheet' + key} media="all"
              rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
          <style dangerouslySetInnerHTML={{ __html: styleTags }} />
        </head>
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script defer src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.zh-Hant-TW" />
          <script dangerouslySetInnerHTML={{ __html: `window.__REDUX_STATE__=${serialize(store.getState())};` }} charSet="UTF-8"/>
          <script src={assets.javascripts.main} charSet="UTF-8"/>

          {/* <!-- Load typekit fonts for twreporter.org domain--> */}
          <script
            dangerouslySetInnerHTML={{ __html:
              `(function(d) {
                var config = {
                kitId: 'ckp5jxu',
                scriptTimeout: 3000,
                async: true
              },h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);`
            }}
          />
          {/* <!-- End - Load typekit fonts for twreporter.org domain--> */}
        </body>
      </html>
    )
  }
}
