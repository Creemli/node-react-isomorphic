import Router from 'koa-router'
import controller from './controller'
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../../react/src/index';
import { match, RouterContext } from 'react-router'
import routes from '../../react/src/routes';


const router = Router()
// demo page
router.get('/page', controller.page)
router.get('/', controller.page);

const m = function(location) {
    return new Promise((resolve, reject) => {
        match({routes: routes(), location}, (err, redirect, props) => {
            const html = renderToString(<App routeProps={props}/>);
            resolve(html);
        });
    })
}

router.get('*', async (ctx) => {
    const html = await m(ctx.url);
    await ctx.render('./index', {
        html,
        initState: JSON.stringify({a:123}),
        scriptUrl: 'http://172.18.20.1:3003/build/main.js'
    })

})


export default router
