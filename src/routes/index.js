import Router from 'koa-router';
import demo from './demo';
import dbtest from './dbtest';
const router = Router()
// demo
router.use('/demo', demo.routes(), demo.allowedMethods());
// homePage
router.get('/', async (ctx, next) => {
 await ctx.render('./index', {
   title: 'homePage'
 })
});

router.use('/dbtest', dbtest.routes(), dbtest.allowedMethods())



export default router;
